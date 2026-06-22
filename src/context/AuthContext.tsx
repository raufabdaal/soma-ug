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
  signOut,
  updateProfile,
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
        // Fetch the user's profile from Firestore
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

  async function signup(email: string, password: string, displayName: string, role: UserRole) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });

    // Create the user document in Firestore
    const newUser: Omit<AppUser, "createdAt"> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      uid: credential.user.uid,
      email,
      displayName,
      role,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", credential.user.uid), newUser);

    // If student, create a student profile with a study code
    if (role === "student") {
      await setDoc(doc(db, "students", credential.user.uid), {
        userId: credential.user.uid,
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

    // If parent, create a parent profile
    if (role === "parent") {
      await setDoc(doc(db, "parents", credential.user.uid), {
        userId: credential.user.uid,
        studentIds: [],
      });
    }

    setProfile({ ...newUser, createdAt: { seconds: 0, nanoseconds: 0 } as unknown as AppUser["createdAt"] });
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
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
