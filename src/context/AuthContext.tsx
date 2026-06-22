"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  getAdditionalUserInfo,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, firebaseConfigured } from "@/lib/firebase/config";
import type { AppUser, UserRole } from "@/types";
import { generateStudyCode } from "@/lib/utils";

interface AuthContextValue {
  user: FirebaseUser | null;
  profile: AppUser | null;
  loading: boolean;
  configured: boolean;
  signup: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profileDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as AppUser);
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Create a user document + student/parent profile in Firestore.
   * Shared between email signup and Google signup.
   */
  async function createUserProfile(
    uid: string,
    email: string,
    displayName: string,
    role: UserRole
  ) {
    const newUser = {
      uid,
      email,
      displayName,
      role,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", uid), newUser);

    if (role === "student") {
      await setDoc(doc(db, "students", uid), {
        userId: uid,
        parentIds: [],
        level: "S3",
        enrolledSubjects: [],
        studyCode: generateStudyCode(),
        subscriptionStatus: "trial",
        trialStartDate: serverTimestamp(),
        subscriptionExpiry: null,
        diagnosticCompleted: false,
        diagnosticScores: {},
        predictedGrades: {},
      });
    }

    if (role === "parent") {
      await setDoc(doc(db, "parents", uid), {
        userId: uid,
        studentIds: [],
      });
    }

    setProfile({
      uid,
      email,
      displayName,
      role,
      createdAt: { seconds: 0, nanoseconds: 0 } as unknown as AppUser["createdAt"],
    });
  }

  async function signup(email: string, password: string, displayName: string, role: UserRole) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    await createUserProfile(credential.user.uid, email, displayName, role);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Google sign-in. Works for both login and signup:
   * - If the user already exists in Firestore, just signs them in.
   * - If they are new, creates their profile with the given role.
   */
  async function signInWithGoogle(role: UserRole) {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const uid = credential.user.uid;

    // Check if the user already has a profile
    const existingDoc = await getDoc(doc(db, "users", uid));

    if (existingDoc.exists()) {
      setProfile(existingDoc.data() as AppUser);
      return;
    }

    // New user: create profile
    const additionalInfo = getAdditionalUserInfo(credential);
    const displayName = credential.user.displayName || "Student";
    const email = credential.user.email || "";

    // For Google signup, skip the email step (Google handles it)
    void additionalInfo;
    await createUserProfile(uid, email, displayName, role);
  }

  async function logout() {
    await signOut(auth);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured: firebaseConfigured,
        signup,
        login,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
