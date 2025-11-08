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
          <a href="#top" className="brand" aria-label="RandomForest Home">
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

        {/* Intro — new: desktop uses GIF title; mobile uses text title */}
        <section className="intro section reveal">
          <div className="container intro-inner">
            {/* Desktop GIF title (hidden on mobile) */}
            <img
              src="/ribbon1.gif"
              alt="RandomForest"
              className="title-gif"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />

            {/* Mobile text title (hidden on desktop) */}
            <h1 className="title-xl">RandomForest</h1>

            <p className="lede">
              Practical AI learning—clear, rigorous, hands-on. We design
              approachable resources and projects so anyone can build and
              evaluate modern AI systems with confidence.
            </p>
          </div>

          {/* Decorative metaballs (top/right) */}
          <div className="blob blob-top-right">
            <Metaballs style={{ width: 420, height: 320 }} />
          </div>
        </section>

        {/* Projects — refined visuals; no clunky “coming soon” text */}
        <section id="projects" className="section reveal">
          <div className="container">
            <h2 className="title-lg">our projects</h2>

            <div className="projects-grid">
              {/* Live Project */}
              <a
                className="project-tile"
                href="https://randomforest.co/yaitc"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="YAITC project"
              >
                <span className="tile-border" />
                <div className="tile-inner">
                  <LiquidMetal size={260} mountDelayMs={0} />
                  <div className="tile-caption">
                    <span className="badge live">Live</span>
                    <span className="name">YAITC</span>
                  </div>
                </div>
              </a>

              {/* Placeholder tiles — tasteful, no big 'coming soon' */}
              {[450, 900].map((delay, i) => (
                <div className="project-tile disabled" key={i} aria-disabled="true">
                  <span className="tile-border" />
                  <div className="tile-inner">
                    <LiquidMetal size={260} mountDelayMs={delay} />
                    <div className="tile-caption">
                      <span className="badge soon">Soon</span>
                      <span className="name muted">Project</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goal — same fade top/bottom treatment as About; white text on gradient */}
        <section id="goal" className="section section-gradient fade-edges reveal">
          <div className="mesh-bg">
            <MeshGradient />
          </div>

          <div className="container prose">
            <h3 className="title-md">our goal.</h3>
            <p>
              Empower everyone to understand and responsibly build with AI. We
              pair clear explanations with working demos so learners can explore,
              create, and evaluate with rigor and good judgment.
            </p>
            <ul className="bullets">
              <li>Plain-English guides backed by code.</li>
              <li>Open projects that invite critique and contribution.</li>
              <li>Practical evaluation of risks, trade-offs, and impact.</li>
            </ul>
          </div>
        </section>

        {/* About — same fade edges, fixed bleed & no clipping */}
        <section id="about" className="section section-gradient fade-edges reveal">
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

            {/* Team */}
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

          {/* Decorative metaballs (bottom/left), safe & not clipped */}
          <div className="blob blob-bottom-left">
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
