import LiquidMetal from "./LiquidMetal";
import MeshGradient from "./MeshGradient";
import Metaballs from "./Metaballs";
import "./App.css";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(1000px 600px at 50% -10%, #0f172a 0%, #020617 40%, #000 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          background: "#ffffff",
          color: "#0b1220",
          borderBottom: "1px solid rgba(2,6,23,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "min(1200px, 95%)",
            margin: "0 auto",
            padding: "18px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "12px",
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <LiquidMetal
              size={64}
              mountDelayMs={0}
              style={{ borderRadius: 10, backgroundColor: "transparent" }}
            />
          </a>
          <nav
            style={{
              display: "flex",
              gap: 20,
              fontSize: 14,
              color: "#0b1220",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a href="#projects" style={{ color: "inherit" }}>
              Projects
            </a>
            <a href="#about" style={{ color: "inherit" }}>
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            aspectRatio: "16 / 7",
            maxHeight: 640,
            background: "#000",
            borderBottom: "1px solid rgba(148,163,184,0.12)",
            marginTop: "-18px",
          }}
        >
          <video
            src="/STG_boost.mp4"
            autoPlay
            muted
            playsInline
            loop
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </section>

        {/* Intro */}
        <section
          style={{
            width: "100%",
            maxWidth: 1100,
            padding: "28px 24px 12px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "8px auto 8px",
              color: "#94a3b8",
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            We educate about AI
          </p>
          <h2
            style={{
              margin: "0 auto 16px",
              maxWidth: 900,
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: 1.1,
              fontWeight: 800,
              background: "linear-gradient(90deg, #fff, #60a5fa)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Learn, build, and explore responsible AI with RandomForest
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 520, // narrower paragraph fix
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "#cbd5e1",
              lineHeight: 1.7,
            }}
          >
            Hands-on projects and resources that make machine learning and
            generative AI accessible to everyone.
          </p>
        </section>

        {/* Projects */}
        <section
          id="projects"
          style={{
            width: "100%",
            maxWidth: 1180,
            padding: "48px 24px 64px",
            position: "relative",
          }}
        >
          <h2
            style={{
              margin: "0 0 32px",
              fontSize: "clamp(26px, 4vw, 36px)",
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: 0.2,
              color: "#e2e8f0",
              textAlign: "center",
            }}
          >
            our projects
          </h2>

          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Project 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <a
                href="https://randomforest.co/yaitc"
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  background: "rgba(2,6,23,0.6)",
                  border: "1px solid rgba(148,163,184,0.15)",
                  padding: 8,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <LiquidMetal size={260} mountDelayMs={0} />
              </a>
              <span
                style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 700 }}
              >
                YAITC
              </span>
            </div>

            {/* Coming Soon */}
            {[450, 900].map((delay, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                    background: "rgba(2,6,23,0.6)",
                    border: "1px solid rgba(148,163,184,0.15)",
                    padding: 8,
                  }}
                  title="Coming soon"
                >
                  <LiquidMetal size={260} mountDelayMs={delay} />
                </div>
                <span
                  style={{ color: "#94a3b8", fontSize: 20, fontWeight: 700 }}
                >
                  Coming soon
                </span>
              </div>
            ))}
          </div>

          {/* Metaballs background, hidden on mobile */}
          <div
            className="metaballs-fx"
            style={{
              position: "absolute",
              bottom: -200,
              right: -60,
              zIndex: 2,
              opacity: 0.9,
              pointerEvents: "none",
            }}
          >
            <Metaballs style={{ width: "400px", height: "300px" }} />
          </div>
        </section>

        {/* Our Goal */}
        <section
          id="goal"
          style={{
            width: "100%",
            padding: "96px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.55,
              filter: "blur(50px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MeshGradient style={{ width: "100vw", height: "100%" }} />
          </div>

          <div
            className="goal-grid"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
              zIndex: 1,
              position: "relative",
            }}
          >
            <div className="white-card">
              <h3>our goal.</h3>
              <p>
                Empower everyone to understand and responsibly build with AI.
                We design approachable resources and hands-on projects that
                blend clarity, rigor, and creativity—so learners can explore,
                question, and create with confidence.
              </p>
            </div>
            <div className="white-card">
              <div>Plain-English explanations backed by working demos.</div>
              <div>Open projects that invite contributions and critique.</div>
              <div>Practical ethics: evaluating trade-offs, risks, and impacts.</div>
            </div>
          </div>
        </section>

        {/* Ribbon */}
        <section aria-hidden="true" style={{ width: "100%", padding: "24px 0 60px" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/ribbon1.gif"
              alt=""
              style={{
                width: "min(760px, 96%)",
                height: "auto",
                opacity: 0.65,
                filter: "drop-shadow(0 8px 24px rgba(2,6,23,0.35))",
              }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </section>

        {/* About (Back inline) */}
        <section
          id="about"
          style={{
            width: "100%",
            padding: "64px 0 120px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              opacity: 0.55,
              filter: "blur(50px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MeshGradient variant="about" style={{ width: "100vw", height: "100%" }} />
          </div>

          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              zIndex: 1,
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 16,
                padding: 28,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "clamp(26px, 4vw, 34px)", color: "#0b1220" }}>
                about us.
              </h3>
              <p
                style={{
                  margin: "12px 0 0",
                  color: "#1e293b",
                  lineHeight: 1.95,
                  fontSize: "clamp(16px, 2vw, 18px)",
                }}
              >
                RandomForest is a nonprofit for AI education. We build public
                resources, workshops, and open projects to help people understand
                and evaluate modern AI systems—while developing practical skills
                and informed judgment.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          borderTop: "1px solid rgba(148,163,184,0.15)",
          padding: "16px 24px",
          color: "#64748b",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} RandomForest. Nonprofit organization.
      </footer>
    </div>
  );
}
