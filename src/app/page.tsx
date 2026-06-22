import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* ==================== NAV ==================== */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(251, 248, 243, 0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--charcoal)" }}>
            <BrandMark />
            <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 23, letterSpacing: "-0.01em" }}>
              Soma
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <NavLink href="#subjects">Subjects</NavLink>
            <NavLink href="#guarantee">The guarantee</NavLink>
            <NavLink href="/login">Sign in</NavLink>
          </div>
          <Link href="/signup" className="btn btn-primary" style={{ padding: "11px 22px", fontSize: "14.5px" }}>
            Start free trial
          </Link>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section style={{ padding: "84px 0 96px", overflow: "hidden", position: "relative" }}>
        <div className="wrap" style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            {/* Left: copy */}
            <div className="animate-fade">
              <div className="eyebrow">Uganda&apos;s lower secondary curriculum</div>
              <h1
                className="font-serif-display"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(2.6rem, 5.4vw, 4.3rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.022em",
                  margin: "22px 0 26px",
                }}
              >
                Study the way UNEB{" "}
                <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
                  actually marks you.
                </em>
              </h1>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                  maxWidth: 520,
                  marginBottom: 34,
                }}
              >
                Soma teaches the new competency-based curriculum the way examiners grade it. Learn
                interactively, get feedback on every answer, and watch your{" "}
                <span className="highlight">predicted grade climb.</span> Built for S3 and S4
                students.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/signup" className="btn btn-primary">
                  Start free trial
                </Link>
                <Link href="#subjects" className="btn btn-ghost">
                  See how it works
                </Link>
              </div>
              <div
                style={{
                  marginTop: 26,
                  fontSize: "13.5px",
                  color: "var(--ink-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <CheckIcon />
                7 days free. No card needed. Maths, Biology, Chemistry.
              </div>
            </div>

            {/* Right: line-art book + floating chip */}
            <div style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="blob" style={{ width: 360, height: 360, background: "var(--terracotta)", top: 10, right: 0, opacity: 0.32 }} />
              <div className="blob" style={{ width: 240, height: 240, background: "var(--sage)", bottom: 0, left: 10, opacity: 0.3 }} />
              <div style={{ width: 330, height: 330, position: "relative", zIndex: 2, color: "var(--charcoal)" }}>
                <BookLineArt />
              </div>
              <FloatingGradeChip />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GUARANTEE ==================== */}
      <section
        id="guarantee"
        style={{
          background: "var(--cream-deep)",
          padding: "92px 0",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div className="blob" style={{ width: 300, height: 300, background: "var(--terracotta)", top: -60, left: -40, opacity: 0.18 }} />
        <div className="blob" style={{ width: 260, height: 260, background: "var(--sage)", bottom: -80, right: -30, opacity: 0.2 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--terracotta)", marginBottom: 22 }}>
            The promise
          </div>
          <h2
            className="font-serif-display"
            style={{ fontWeight: 500, fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "var(--ink-muted)" }}>Your child is at 40%.</span>
            <br />
            <span style={{ color: "var(--terracotta)" }}>
              We get them to 80%, or your subscription is refunded.
            </span>
          </h2>
          <p
            style={{
              margin: "24px auto 0",
              maxWidth: 560,
              color: "var(--ink-soft)",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            The guarantee is tracked on your parent dashboard, in plain numbers. It depends on your
            child staying engaged. If they put in the work and we don&apos;t deliver, you don&apos;t
            pay.
          </p>
          <div style={{ margin: "38px auto 0", width: 92, height: 92 }}>
            <GuaranteeSeal />
          </div>
        </div>
      </section>

      {/* ==================== SUBJECTS ==================== */}
      <section id="subjects" style={{ padding: "96px 0 80px" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 54px" }}>
            <div className="eyebrow" style={{ color: "var(--terracotta)" }}>
              Three subjects, for starters
            </div>
            <h2
              className="font-serif-display"
              style={{ fontWeight: 500, fontSize: "clamp(1.9rem, 3.8vw, 2.7rem)", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "16px 0 0" }}
            >
              Colour is identity, not decoration.
            </h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 17 }}>
              Each subject owns one earthy tone. So a glance tells a student and a parent what is
              being learned, without a single word.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <SubjectCard
              icon={<MathIcon />}
              name="Mathematics"
              desc="Algebra, geometry, and the problem-solving style UNEB now rewards. Show your working. Earn method marks."
              accentClass="text-math"
              iconBgClass="bg-math-soft"
              colorName="Terracotta"
            />
            <SubjectCard
              icon={<BioIcon />}
              name="Biology"
              desc="Cells, systems, and how to answer describe and explain for full marks. The keywords examiners listen for."
              accentClass="text-bio"
              iconBgClass="bg-bio-soft"
              colorName="Sage green"
            />
            <SubjectCard
              icon={<ChemIcon />}
              name="Chemistry"
              desc="Bonding, reactions, and the structured-answer format examiners expect. Plain steps, real feedback, full marks."
              accentClass="text-chem"
              iconBgClass="bg-chem-soft"
              colorName="Dusty blue"
            />
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{ borderTop: "1px solid var(--hairline)", padding: "44px 0 50px" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BrandMark small />
              <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>
                Soma - made for Ugandan students.
              </span>
            </div>
            <div style={{ display: "flex", gap: 26 }}>
              <NavLink href="#subjects">Subjects</NavLink>
              <NavLink href="/login">Sign in</NavLink>
              <NavLink href="/signup">Start free trial</NavLink>
            </div>
          </div>
          <div style={{ fontSize: "12.5px", color: "var(--ink-muted)", marginTop: 18 }}>
            (c) 2026 Soma. Built for the new lower secondary curriculum.
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- Small components ---------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{ color: "var(--ink-soft)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
    >
      {children}
    </Link>
  );
}

function SubjectCard({
  icon,
  name,
  desc,
  accentClass,
  iconBgClass,
  colorName,
}: {
  icon: React.ReactNode;
  name: string;
  desc: string;
  accentClass: string;
  iconBgClass: string;
  colorName: string;
}) {
  return (
    <div className="card" style={{ padding: "32px 28px", borderRadius: "var(--r-lg)" }}>
      <div
        className={iconBgClass}
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
        }}
      >
        <span className={accentClass}>{icon}</span>
      </div>
      <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 24, marginBottom: 10 }}>
        {name}
      </h3>
      <p style={{ color: "var(--ink-soft)", fontSize: "15.5px", lineHeight: 1.55 }}>{desc}</p>
      <span className={accentClass} style={{ marginTop: 20, display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {colorName}
      </span>
    </div>
  );
}

/* ---------- SVG Icons ---------- */

function BrandMark({ small = false }: { small?: boolean }) {
  const size = small ? 26 : 30;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--charcoal)" }}>
      <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
      <path d="M20 11 L20 29" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function BookLineArt() {
  return (
    <svg viewBox="0 0 340 340" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <path d="M170 92 C128 76 60 80 36 92 L36 244 C60 232 128 228 170 244 C212 228 280 232 304 244 L304 92 C280 80 212 76 170 92 Z" />
      <path d="M170 92 L170 244" />
      <path d="M62 124 L150 132" />
      <path d="M62 146 L150 154" />
      <path d="M62 168 L130 175" />
      <path d="M190 132 L278 124" />
      <path d="M190 154 L278 146" />
      <path d="M190 175 L230 168" />
      <path d="M170 92 C170 70 162 52 150 44" />
      <path d="M150 44 C156 50 164 50 170 44" />
      <path d="M170 70 C180 64 188 52 188 40" />
      <path d="M188 40 C182 46 176 46 170 42" />
    </svg>
  );
}

function FloatingGradeChip() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 4,
        bottom: 6,
        right: -6,
        transform: "rotate(3deg)",
        background: "var(--white)",
        borderRadius: "var(--r-md)",
        padding: "16px 20px",
        boxShadow: "var(--shadow-float)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 40, lineHeight: 1, color: "var(--terracotta)" }}>
        B
      </span>
      <div style={{ fontSize: "12.5px", color: "var(--ink-soft)", lineHeight: 1.35 }}>
        <strong style={{ color: "var(--charcoal)", display: "block", fontSize: 13 }}>Predicted - Maths</strong>
        <span style={{ color: "var(--sage)", fontWeight: 700 }}>up from C</span>
      </div>
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <svg viewBox="0 0 92 92" fill="none" stroke="var(--terracotta)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <circle cx="46" cy="46" r="42" />
      <path d="M28 47 L41 60 L64 33" />
    </svg>
  );
}

function MathIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24 L24 24 L24 6 Z" />
      <path d="M4 24 L24 6" />
      <path d="M18 24 A6 6 0 0 0 12 18" />
    </svg>
  );
}

function BioIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4 C24 18 14 24 4 24 C4 12 14 4 24 4 Z" />
      <path d="M4 24 L18 10" />
    </svg>
  );
}

function ChemIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4 L17 4" />
      <path d="M12 4 L12 12 L5 23 C4 24.5 5 25 6 25 L22 25 C23 25 24 24.5 23 23 L16 12 L16 4" />
      <path d="M8 19 L20 19" />
    </svg>
  );
}
