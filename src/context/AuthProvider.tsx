import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  getUserProfile, 
  loginUser, 
  logoutUser, 
  registerUser, 
  resetPasswordEmail, 
  UserProfileData 
} from '../services/auth';

export interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfileData | null;
  loading: boolean;
  login: typeof loginUser;
  register: typeof registerUser;
  logout: typeof logoutUser;
  resetPassword: typeof resetPasswordEmail;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (currentUser: FirebaseUser | null) => {
    if (currentUser) {
      const profile = await getUserProfile(currentUser.uid);
      if (profile) {
        setUserProfile(profile);
      } else {
        // Fallback profile if Firestore doc isn't fetched yet
        setUserProfile({
          uid: currentUser.uid,
          name: currentUser.displayName || 'Traveler',
          email: currentUser.email || '',
          createdAt: new Date().toISOString()
        });
      }
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      await fetchProfile(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        resetPassword: resetPasswordEmail,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
