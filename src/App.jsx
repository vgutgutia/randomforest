import LiquidMetal from "./LiquidMetal";
import MeshGradient from "./MeshGradient";
import Metaballs from "./Metaballs";
import "./App.css";

export default function App() {
  return (
    <div id="top" className="site-root">
      {/* Header */}
      <header className="site-header">
        <div className="header-wrap">
          <a href="#top" className="brand">
            <LiquidMetal size={64} mountDelayMs={0} style={{ borderRadius: 10 }} />
          </a>

          <nav className="nav">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Hero video */}
        <section className="hero">
          <video
            src="/STG_boost.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="hero-video"
          />
        </section>

        {/* Intro (redesigned) */}
        <section className="intro section reveal">
          <div className="container intro-inner">
            <h1 className="title-xl">
              RandomForest
            </h1>
            <p className="kicker">Practical AI learning—clear, rigorous, hands-on.</p>
            <p className="lede">
              We design approachable resources and projects that help people
              understand, build, and evaluate modern AI systems with confidence.
            </p>
          </div>

          {/* Decorative metaballs (top/right) */}
          <div className="blob blob-top-right">
            <Metaballs style={{ width: 420, height: 320 }} />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section reveal">
          <div className="container">
            <h2 className="title-lg">our projects</h2>

            <div className="projects-grid">
              {/* Project 1 */}
              <div className="project-card">
                <a
                  href="https://randomforest.co/yaitc"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="project-thumb"
                >
                  <LiquidMetal size={260} mountDelayMs={0} />
                </a>
                <span className="project-label">YAITC</span>
              </div>

              {/* Coming soon */}
              {[450, 900].map((delay, i) => (
                <div className="project-card" key={i}>
                  <div className="project-thumb" title="Coming soon">
                    <LiquidMetal size={260} mountDelayMs={delay} />
                  </div>
                  <span className="project-label muted">Coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goal (clean text, no white boxes) */}
        <section id="goal" className="section section-gradient reveal">
          <div className="mesh-bg">
            <MeshGradient />
          </div>

          <div className="container prose">
            <h3 className="title-md">our goal.</h3>
            <p>
              Empower everyone to understand and responsibly build with AI.
              We put clarity first and pair explanations with working demos,
              so learners can explore and create with rigor and good judgment.
            </p>
            <ul className="bullets">
              <li>Plain-English guides backed by code.</li>
              <li>Open projects that invite critique and contribution.</li>
              <li>Practical evaluation of risks, trade-offs, and impact.</li>
            </ul>
          </div>
        </section>

        {/* Ribbon (more space below) */}
        <section aria-hidden="true" className="section ribbon reveal">
          <div className="container center">
            <img
              src="/ribbon1.gif"
              alt=""
              className="ribbon-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </section>

        {/* About (inline) */}
        <section id="about" className="section section-gradient reveal">
          <div className="mesh-bg">
            <MeshGradient variant="about" />
          </div>

          <div className="container prose">
            <h3 className="title-md">about us.</h3>
            <p>
              RandomForest is a nonprofit for AI education. We build public
              resources, workshops, and open projects to help people understand
              and evaluate modern AI systems—while developing practical skills
              and informed judgment.
            </p>

            {/* Team cards */}
            <div className="team">
              {/* Vansh */}
              <div className="team-card">
                <div className="avatar">
                  <img
                    src="/vansh.jpg"
                    alt="Vansh Gutgutia"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span>VG</span>
                </div>
                <div className="team-meta">
                  <span className="name">Vansh Gutgutia</span>
                  <a href="mailto:vansh.gutgutia@gmail.com">vansh.gutgutia@gmail.com</a>
                </div>
              </div>

              {/* Anthony */}
              <div className="team-card">
                <div className="avatar">
                  <img
                    src="/anthony.jpg"
                    alt="Anthony Wang"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span>AW</span>
                </div>
                <div className="team-meta">
                  <span className="name">Anthony Wang</span>
                  <a href="mailto:anthonywang5000@gmail.com">anthonywang5000@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative metaballs (bottom/left, randomized mount & safe) */}
          <div className="blob blob-bottom-left">
            {/* Different timing/size so it feels distinct. If your Metaballs supports custom props like seed/variant, add them here. */}
            <Metaballs style={{ width: 360, height: 300 }} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        © {new Date().getFullYear()} RandomForest. Nonprofit organization.
      </footer>
    </div>
  );
}
