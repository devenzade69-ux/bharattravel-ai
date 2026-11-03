import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export interface UserProfileData {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  baseCity?: string;
  createdAt: string;
}

/**
 * Maps Firebase Auth error codes to user-friendly error messages
 */
export const getAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return error?.message || 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Register a new user with Email, Password & Full Name
 */
export const registerUser = async (
  email: string, 
  password: string, 
  fullName: string
): Promise<{ user: FirebaseUser; profile: UserProfileData }> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update Auth Profile Display Name
  await updateProfile(user, {
    displayName: fullName
  });

  const profileData: UserProfileData = {
    uid: user.uid,
    name: fullName,
    email: user.email || email,
    createdAt: new Date().toISOString()
  };

  // Save to Firestore `users` collection
  await setDoc(doc(db, 'users', user.uid), profileData);

  return { user, profile: profileData };
};

/**
 * Login user with Email & Password
 */
export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Logout current user
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * Send password reset email
 */
export const resetPasswordEmail = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

/**
 * Fetch User Profile Document from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfileData | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
};

/**
 * Update User Profile Data in Firestore and Firebase Auth
 */
export const updateUserProfileData = async (
  uid: string,
  data: { name: string; photoURL?: string; baseCity?: string }
): Promise<void> => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      displayName: data.name,
      photoURL: data.photoURL || user.photoURL
    });
  }

  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    name: data.name,
    photoURL: data.photoURL || '',
    baseCity: data.baseCity || 'New Delhi, IN'
  });
};
