import MeshGradient from "./MeshGradient";
import Metaballs from "./Metaballs";

export default function About() {
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
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          width: "100%",
          boxSizing: "border-box",
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
          <Link to="/"
            style={{
              textDecoration: "none",
              color: "#0b1220",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
            }}
          >
            ← Back
          </Link>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#0b1220",
            }}
          >
            About RandomForest
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background animation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            zIndex: 0,
            opacity: 0.55,
            filter: "blur(50px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <MeshGradient
            variant="about"
            style={{
              width: "100vw",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content Card */}
        <div
          className="white-card"
          style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 16,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 42px)",
              color: "#0b1220",
              marginTop: 0,
              marginBottom: 20,
            }}
          >
            about us.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#1e293b",
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            RandomForest is a nonprofit dedicated to AI education. We build
            public resources, workshops, and open projects to help people
            understand and evaluate modern AI systems—while developing
            practical skills and informed judgment.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#1e293b",
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.9,
              marginTop: 20,
            }}
          >
            Our mission is to empower students and enthusiasts alike to explore
            machine learning and generative AI responsibly. Through hands-on
            demos, ethical discussions, and collaborative projects, we aim to
            make AI accessible and understandable for everyone.
          </p>
        </div>

        {/* Team Section */}
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Vansh */}
          <div
            style={{
              background: "rgba(2,6,23,0.65)",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                overflow: "hidden",
                flex: "0 0 auto",
                background: "#0b1220",
                display: "grid",
                placeItems: "center",
                color: "#e2e8f0",
                fontWeight: 700,
                position: "relative",
              }}
            >
              <img
                src="/vansh.jpg"
                alt="Vansh Gutgutia"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span style={{ position: "absolute" }}>VG</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  color: "#e2e8f0",
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Vansh Gutgutia
              </span>
              <a
                href="mailto:vansh.gutgutia@gmail.com"
                style={{
                  color: "#60a5fa",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                vansh.gutgutia@gmail.com
              </a>
            </div>
          </div>

          {/* Anthony */}
          <div
            style={{
              background: "rgba(2,6,23,0.65)",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                overflow: "hidden",
                flex: "0 0 auto",
                background: "#0b1220",
                display: "grid",
                placeItems: "center",
                color: "#e2e8f0",
                fontWeight: 700,
                position: "relative",
              }}
            >
              <img
                src="/anthony.jpg"
                alt="Anthony Wang"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span style={{ position: "absolute" }}>AW</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  color: "#e2e8f0",
                  fontSize: 17,
                  fontWeight: 600,
                }}
              >
                Anthony Wang
              </span>
              <a
                href="mailto:anthonywang5000@gmail.com"
                style={{
                  color: "#60a5fa",
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                anthonywang5000@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Decorative metaballs */}
        <div
          className="metaballs-fx"
          style={{
            position: "absolute",
            top: 80,
            right: -120,
            zIndex: 2,
            opacity: 0.9,
            pointerEvents: "none",
          }}
        >
          <Metaballs
            variant="variant"
            style={{ width: "450px", height: "350px" }}
          />
        </div>
      </main>

      {/* FOOTER */}
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
