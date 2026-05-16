import VolcanoCanvas from './VolcanoCanvas';

export default function Hero() {
  // le titre, mot par mot, pour l'animation d'apparition d\u00e9cal\u00e9e
  const words = [
    { text: 'Développeur', sheen: false },
    { text: 'web', sheen: false },
    { text: 'en', sheen: false },
    { text: 'formation,', sheen: false },
    { text: 'façonnée', sheen: true },
    { text: 'comme', sheen: false },
    { text: "l'obsidienne.", sheen: true },
  ];

  return (
    <section id="home" className="hero">
      <VolcanoCanvas />

      <div className="hero-inner">
        <p className="hero-eyebrow">Théo Andrimananarisoa — SUPINFO Lille</p>

        <h1 className="hero-title">
          {words.map((w, i) => (
            <span
              key={i}
              className={`word ${w.sheen ? 'sheen' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.09}s` }}
            >
              {w.text}
              {i < words.length - 1 ? '\u00a0' : ''}
            </span>
          ))}
        </h1>

        <p className="hero-lead">
          Né de la fusion du code et du design, Obsiwebs est mon portfolio et
          mon terrain d&apos;expérimentation. Je cherche un stage, puis une
          alternance à partir de septembre 2026, pour devenir développeur
          full-stack.
        </p>

        <div className="hero-actions">
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Me contacter
          </a>
        </div>

        <div className="hero-tags">
          <span className="hero-tag">HTML / CSS / JS</span>
          <span className="hero-tag">React</span>
          <span className="hero-tag">PHP / MySQL</span>
          <span className="hero-tag">Docker</span>
          <span className="hero-tag">Animation Canvas</span>
        </div>
      </div>
    </section>
  );
}