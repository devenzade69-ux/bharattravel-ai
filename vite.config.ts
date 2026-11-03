import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function localApiPlugin(apiKey: string): Plugin {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/generate-trip') && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || apiKey;
              const { default: handler } = await import('./api/generate-trip.js');

              const mockReq = {
                method: req.method,
                body: JSON.parse(bodyStr || '{}'),
                headers: req.headers
              };

              const mockRes = {
                statusCode: 200,
                status(code: number) {
                  this.statusCode = code;
                  res.statusCode = code;
                  return this;
                },
                setHeader(name: string, value: string) {
                  res.setHeader(name, value);
                  return this;
                },
                json(data: any) {
                  res.statusCode = this.statusCode || 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return this;
                },
                end() {
                  res.end();
                  return this;
                }
              };

              await handler(mockReq, mockRes);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Local API handler error' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const groqKey = env.GROQ_API_KEY || env.VITE_GROQ_API_KEY || '';

  return {
    plugins: [react(), localApiPlugin(groqKey)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          }
        }
      }
    }
  };
});
