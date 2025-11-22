import { useEffect } from "react";
import LiquidMetal from "./LiquidMetal";
import MeshGradient from "./MeshGradient";
import Metaballs from "./Metaballs";
import CampSlideshow from "./CampSlideshow"; // slideshow import
import "./App.css";

export default function HomePage() {
  useEffect(() => {
    // Reveal-on-scroll animation
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));

    // Custom cursor
    const cursor = document.querySelector(".custom-cursor");
    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div id="top" className="site-root">

      {/* Custom Cursor */}
      <div className="custom-cursor"></div>

      {/* Header */}
      <header className="site-header">
        <div className="header-wrap">
          <a href="/" className="brand" aria-label="RandomForest Home">
            <LiquidMetal size={56} mountDelayMs={0} style={{ borderRadius: 10 }} />
          </a>
          <nav className="nav">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="/yaitc">YAITC</a>
          </nav>
        </div>
      </header>

      {/* MAIN PAGE */}
      <main>

        {/* Hero Section */}
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

        {/* Intro */}
        <section className="intro section reveal">
          <div className="container intro-inner">
            <p className="lede">
              Practical AI learning— inclear, rigorous, hands-on. We design
              approachable resources and projects so anyone can build and
              evaluate modern AI systems with confidence.
            </p>
          </div>
          <div className="blob blob-top-right">
            <Metaballs style={{ width: 380, height: 300 }} />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section reveal">
          <div className="container">
            <h2 className="title-lg">our projects</h2>

            {/* ⭐ SLIDESHOW ADDED RIGHT HERE */}
            <CampSlideshow
              images={[
                "/camp1.jpg",
                "/camp2.jpg",
                "/camp3.jpg",
                "/camp4.jpg",
                "/camp5.jpg"
              ]}
            />

            <div className="projects-grid">
              <a
                className="project-tile"
                href="/yaitc"
                aria-label="YAITC project"
              >
                <span className="tile-border" />
                <div className="tile-inner">
                  <LiquidMetal size={240} mountDelayMs={0} />
                  <div className="tile-caption">
                    <span className="badge live">Live</span>
                    <span className="name">YAITC</span>
                  </div>
                </div>
              </a>

              {[450, 900].map((delay, i) => (
                <div className="project-tile disabled" key={i} aria-disabled="true">
                  <span className="tile-border" />
                  <div className="tile-inner">
                    <LiquidMetal size={240} mountDelayMs={delay} />
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

        {/* Goal Section */}
        <section id="goal" className="section section-gradient fade-edges reveal">
          <div className="mesh-bg animated-bg">
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

        {/* Ribbon */}
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

        {/* About Section */}
        <section id="about" className="section section-gradient fade-edges reveal">
          <div className="mesh-bg animated-bg">
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

            <div className="team">
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
                  <a href="mailto:vansh.gutgutia@gmail.com">
                    vansh.gutgutia@gmail.com
                  </a>
                </div>
              </div>

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
                  <a href="mailto:anthonywang5000@gmail.com">
                    anthonywang5000@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="blob blob-bottom-left">
            <Metaballs style={{ width: 320, height: 260 }} />
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
