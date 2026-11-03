import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Global Toast Stack Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-md w-full px-margin-mobile pointer-events-none">
        {toasts.map((toast) => {
          let bg = 'bg-primary text-white border-primary/30';
          let icon = 'info';

          if (toast.type === 'success') {
            bg = 'bg-emerald-700 text-white border-emerald-500/30';
            icon = 'check_circle';
          } else if (toast.type === 'error') {
            bg = 'bg-error text-on-error border-error-container';
            icon = 'error';
          } else if (toast.type === 'warning') {
            bg = 'bg-amber-600 text-white border-amber-400/30';
            icon = 'warning';
          }

          return (
            <div
              key={toast.id}
              className={`p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 pointer-events-auto animate-in slide-in-from-bottom duration-300 ${bg}`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl shrink-0" data-icon={icon}>
                  {icon}
                </span>
                <span className="font-label-lg text-body-md font-semibold">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                aria-label="Dismiss Toast"
              >
                <span className="material-symbols-outlined text-lg" data-icon="close">
                  close
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
