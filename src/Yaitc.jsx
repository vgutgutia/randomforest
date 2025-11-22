import MeshGradient from "./MeshGradient";
import "./Yaitc.css";

export default function Yaitc() {
  return (
    <div className="yaitc-root">

      {/* Back Button */}
      <a href="/" className="yaitc-back-btn">← back to main site</a>

      <header className="yaitc-header">
        <h1 className="yaitc-title">Youth AI Tech Club</h1>
      </header>

      <div className="yaitc-mesh-bg">
        <MeshGradient />
      </div>

      <main className="yaitc-content">

        <p className="yaitc-lede">
          we teach the next generation of builders how modern ai works—clearly,
          simply, and hands-on.
        </p>

        <section className="yaitc-section">
          <h2 className="yaitc-subtitle">our mission.</h2>
          <p>
            the Youth AI Tech Club makes AI education accessible, creative, and
            empowering. we help young learners explore concepts through art,
            music, storytelling, and code—while developing real understanding of
            how intelligent systems work.
          </p>
          <p>
            every student builds their own small app by the end of the program,
            learning practical ideas behind machine learning, creativity models,
            safety, and responsible design.
          </p>
        </section>

        <section className="yaitc-section">
          <h2 className="yaitc-subtitle">what students learn</h2>
          <ul className="yaitc-list">
            <li>how AI models understand text, images, and sound</li>
            <li>AI for art, music, animation, and storytelling</li>
            <li>building simple generative tools</li>
            <li>designing safe + responsible ai projects</li>
            <li>making a real app using AI by the end</li>
          </ul>
        </section>

        {/* ⭐ Student Project Embed */}
        <section className="yaitc-section">
          <h2 className="yaitc-subtitle">student project example</h2>

          <div className="yaitc-iframe-wrapper">
            <iframe
              src="/student-app/asmr.html"
              title="Student Project"
              className="yaitc-iframe"
            />
          </div>
        </section>
      </main>

      <footer className="yaitc-footer">
        © {new Date().getFullYear()} RandomForest — Youth AI Tech Club
      </footer>
    </div>
  );
}
