"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authErrorToMessage } from "@/lib/auth-errors";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { UserRole } from "@/types";

type Step = "role" | "auth" | "details" | "welcome";

export default function OnboardingPage() {
  const router = useRouter();
  const { signup, signInWithGoogle, configured, user } = useAuth();

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<UserRole>("student");

  // Auth fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Detail fields
  const [level, setLevel] = useState("S3");
  const [subjects, setSubjects] = useState<string[]>(["mathematics"]);

  // ---- Step transitions ----

  function pickRole(r: UserRole) {
    setRole(r);
    setStep("auth");
  }

  async function handleEmailAuth() {
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      await signup(email, password, name, role);
      setStep("details");
    } catch (err) {
      setError(authErrorToMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle(role);
      setStep("details");
    } catch (err) {
      setError(authErrorToMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function finishDetails() {
    // Save level + subjects to Firestore (students only)
    if (role === "student" && user) {
      try {
        await updateDoc(doc(db, "students", user.uid), {
          level,
          enrolledSubjects: subjects,
        });
      } catch (err) {
        console.error("Failed to save student details:", err);
        // Non-blocking: continue to welcome even if this fails
      }
    }
    setStep("welcome");
  }

  function goToDashboard() {
    router.push("/dashboard");
  }

  // ---- Render ----

  return (
    <div style={shellStyle}>
      <div style={cardWrapStyle}>
        {/* Logo */}
        <Link href="/" style={logoStyle}>
          <BrandMark />
          <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 23 }}>Soma</span>
        </Link>

        {/* Progress dots */}
        <ProgressDots step={step} />

        <div className="card" style={innerCardStyle}>
          {!configured && <SetupNote />}

          {step === "role" && (
            <RoleStep onPick={pickRole} />
          )}

          {step === "auth" && (
            <AuthStep
              role={role}
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              authMethod={authMethod} setAuthMethod={setAuthMethod}
              error={error} loading={loading}
              configured={configured}
              onEmail={handleEmailAuth}
              onGoogle={handleGoogleAuth}
              onBack={() => { setStep("role"); setError(""); }}
            />
          )}

          {step === "details" && (
            <DetailsStep
              role={role}
              level={level} setLevel={setLevel}
              subjects={subjects} setSubjects={setSubjects}
              onContinue={finishDetails}
            />
          )}

          {step === "welcome" && (
            <WelcomeStep role={role} name={name} onGo={goToDashboard} />
          )}
        </div>

        {step === "role" && (
          <p style={signInLinkStyle}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--terracotta)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   STEP 1: ROLE
   ============================================================ */
function RoleStep({ onPick }: { onPick: (r: UserRole) => void }) {
  return (
    <>
      <h1 className="font-serif-display" style={h1Style}>
        Let&apos;s get started.
      </h1>
      <p style={subStyle}>Are you a student or a parent?</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        <RoleCard
          active={false}
          onClick={() => onPick("student")}
          title="I'm a student"
          desc="Learning for my UNEB exams"
        />
        <RoleCard
          active={false}
          onClick={() => onPick("parent")}
          title="I'm a parent"
          desc="Tracking my child's progress"
        />
      </div>
    </>
  );
}

function RoleCard({ onClick, title, desc }: { active: boolean; onClick: () => void; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "20px 22px",
        borderRadius: "var(--r-md)",
        border: "1.5px solid var(--hairline)",
        background: "var(--white)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 17, color: "var(--charcoal)" }}>{title}</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 3 }}>{desc}</div>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

/* ============================================================
   STEP 2: AUTH
   ============================================================ */
function AuthStep({
  role, name, setName, email, setEmail, password, setPassword,
  authMethod, setAuthMethod, error, loading, onEmail, onGoogle, onBack, configured,
}: {
  role: UserRole;
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  authMethod: "google" | "email" | null; setAuthMethod: (m: "google" | "email") => void;
  error: string; loading: boolean;
  onEmail: () => void; onGoogle: () => void; onBack: () => void;
  configured: boolean;
}) {
  return (
    <>
      <BackButton onClick={onBack} />
      <h1 className="font-serif-display" style={h1Style}>
        {role === "student" ? "Create your account." : "Create your parent account."}
      </h1>
      <p style={subStyle}>7 days free. No card needed.</p>

      {error && <ErrorBox message={error} />}

      {/* Auth method toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, marginTop: 8 }}>
        <MethodTab active={authMethod === null || authMethod === "email"} onClick={() => setAuthMethod("email")} label="Email" />
        <MethodTab active={authMethod === "google"} onClick={() => setAuthMethod("google")} label="Google" />
      </div>

      {authMethod === "google" ? (
        <div>
          <p style={{ ...subStyle, marginBottom: 20 }}>
            You&apos;ll sign in with your Google account. We&apos;ll set up your profile next.
          </p>
          <GoogleSignupButton loading={loading} onClick={onGoogle} disabled={!configured} />
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); onEmail(); }}
          style={{ display: "flex", flexDirection: "column", gap: 22 }}
        >
          <div>
            <Label>Your name</Label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "student" ? "Aisha Nakato" : "Your name"}
              required
              className="input-clean"
              autoComplete="name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-clean"
              autoComplete="email"
            />
          </div>
          <div>
            <Label>Password</Label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="input-clean"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" disabled={loading || !configured} className="btn btn-primary" style={{ width: "100%", marginTop: 4 }}>
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>
      )}
    </>
  );
}

/* ============================================================
   STEP 3: DETAILS
   ============================================================ */
function DetailsStep({
  role, level, setLevel, subjects, setSubjects, onContinue,
}: {
  role: UserRole;
  level: string; setLevel: (v: string) => void;
  subjects: string[]; setSubjects: (v: string[]) => void;
  onContinue: () => void;
}) {
  function toggleSubject(id: string) {
    setSubjects(subjects.includes(id)
      ? subjects.filter((s) => s !== id)
      : [...subjects, id]
    );
  }

  if (role === "parent") {
    return <ParentDetailsStep onContinue={onContinue} />;
  }

  return (
    <>
      <h1 className="font-serif-display" style={h1Style}>A few details.</h1>
      <p style={subStyle}>We&apos;ll personalise your learning from here.</p>

      {/* Level */}
      <div style={{ marginTop: 8, marginBottom: 32 }}>
        <Label>What level are you?</Label>
        <div className="grid-collapse-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {["S1", "S2", "S3", "S4"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              style={{
                padding: "14px 8px",
                borderRadius: "var(--r-md)",
                border: level === l ? "1.5px solid var(--terracotta)" : "1.5px solid var(--hairline)",
                background: level === l ? "rgba(192,106,75,0.06)" : "var(--white)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 15,
                color: level === l ? "var(--terracotta)" : "var(--charcoal)",
                transition: "all 0.15s ease",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div style={{ marginBottom: 28 }}>
        <Label>Which subjects? (pick any)</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SubjectPicker id="mathematics" name="Mathematics" color="var(--terracotta)" selected={subjects.includes("mathematics")} onToggle={toggleSubject} />
          <SubjectPicker id="biology" name="Biology" color="var(--sage-dk)" selected={subjects.includes("biology")} onToggle={toggleSubject} />
          <SubjectPicker id="chemistry" name="Chemistry" color="var(--blue-dk)" selected={subjects.includes("chemistry")} onToggle={toggleSubject} />
        </div>
      </div>

      <button onClick={onContinue} className="btn btn-primary" style={{ width: "100%" }}>
        Continue
      </button>
    </>
  );
}

function SubjectPicker({ id, name, color, selected, onToggle }: {
  id: string; name: string; color: string; selected: boolean; onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderRadius: "var(--r-md)",
        border: selected ? `1.5px solid ${color}` : "1.5px solid var(--hairline)",
        background: "var(--white)",
        cursor: "pointer",
        transition: "all 0.15s ease",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
        <span style={{ fontWeight: 600, fontSize: 15.5, color: "var(--charcoal)" }}>{name}</span>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        border: selected ? "none" : "2px solid var(--hairline)",
        background: selected ? color : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selected && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </div>
    </button>
  );
}

function ParentDetailsStep({ onContinue }: { onContinue: () => void }) {
  const [code, setCode] = useState("");
  const [skip, setSkip] = useState(false);

  return (
    <>
      <h1 className="font-serif-display" style={h1Style}>Link your child.</h1>
      <p style={subStyle}>
        Enter your child&apos;s study code to see their progress. You can skip this and add it later.
      </p>

      <div style={{ marginTop: 8, marginBottom: 28 }}>
        <Label>Study code (optional)</Label>
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setSkip(false); }}
          placeholder="e.g. K7M2QP"
          maxLength={6}
          className="input-clean"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 22, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}
        />
      </div>

      <button
        onClick={onContinue}
        className="btn btn-primary"
        style={{ width: "100%" }}
      >
        {code.trim() ? "Link and continue" : "Continue"}
      </button>

      {!code.trim() && (
        <button
          onClick={() => { setSkip(true); onContinue(); }}
          style={{
            width: "100%",
            marginTop: 12,
            padding: "12px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 14,
            color: "var(--ink-muted)",
            fontWeight: 500,
          }}
        >
          Skip for now
        </button>
      )}
    </>
  );
}

/* ============================================================
   STEP 4: WELCOME
   ============================================================ */
function WelcomeStep({ role, name, onGo }: { role: UserRole; name: string; onGo: () => void }) {
  return (
    <div style={{ textAlign: "center", paddingTop: 20 }}>
      <div style={{ width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%", background: "rgba(126,142,99,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dk)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1 className="font-serif-display" style={{ ...h1Style, fontSize: 28 }}>
        {role === "student" ? "You're all set." : "You're all set."}
      </h1>
      <p style={{ ...subStyle, maxWidth: 320, margin: "0 auto 28px" }}>
        {role === "student"
          ? "Your study space is ready. Pick up where you left off anytime."
          : "Your parent dashboard is ready. You can link your child's account anytime."}
      </p>
      <button onClick={onGo} className="btn btn-primary" style={{ width: "100%" }}>
        Go to dashboard
      </button>
    </div>
  );
}

/* ============================================================
   SHARED UI
   ============================================================ */
function ProgressDots({ step }: { step: Step }) {
  const steps: Step[] = ["role", "auth", "details", "welcome"];
  const current = steps.indexOf(step);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div
          key={s}
          style={{
            width: i === current ? 24 : 8,
            height: 8,
            borderRadius: 999,
            background: i <= current ? "var(--terracotta)" : "var(--hairline)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "4px 0",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "var(--ink-muted)",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  );
}

function MethodTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "var(--r-sm)",
        border: active ? "1.5px solid var(--charcoal)" : "1.5px solid var(--hairline)",
        background: active ? "var(--cream-deep)" : "var(--white)",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
        color: active ? "var(--charcoal)" : "var(--ink-muted)",
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>
      {children}
    </label>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{ background: "rgba(192,106,75,0.1)", borderLeft: "3px solid var(--terracotta)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 14, color: "var(--terracotta-dk)", lineHeight: 1.5 }}>
      {message}
    </div>
  );
}

function SetupNote() {
  return (
    <div style={{ background: "var(--cream-deep)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
      <strong style={{ color: "var(--charcoal)" }}>Setup needed:</strong> Firebase keys are missing. See MANUAL_TASKS.md MT-001.
    </div>
  );
}

function GoogleSignupButton({ loading, onClick, disabled }: { loading: boolean; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "13px 20px",
        borderRadius: 999,
        border: "1.5px solid var(--hairline)",
        background: "var(--white)",
        cursor: loading ? "wait" : "pointer",
        fontSize: 15,
        fontWeight: 600,
        color: "var(--charcoal)",
      }}
    >
      {loading ? (
        <span>Connecting...</span>
      ) : (
        <>
          <GoogleIcon />
          Continue with Google
        </>
      )}
    </button>
  );
}

function BrandMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--charcoal)" }}>
      <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
      <path d="M20 11 L20 29" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ---------- Styles ---------- */
const shellStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 20px",
  position: "relative",
  overflow: "hidden",
};

const cardWrapStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  position: "relative",
  zIndex: 2,
};

const innerCardStyle: React.CSSProperties = {
  padding: "32px 28px",
};

const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  textDecoration: "none",
  color: "var(--charcoal)",
  marginBottom: 32,
  justifyContent: "center",
};

const h1Style: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  marginBottom: 6,
  lineHeight: 1.2,
};

const subStyle: React.CSSProperties = {
  color: "var(--ink-muted)",
  fontSize: 15,
  marginBottom: 0,
  lineHeight: 1.5,
};

const signInLinkStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: 24,
  fontSize: 14.5,
  color: "var(--ink-soft)",
};
