import useReveal from './useReveal';

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section">
      <div ref={ref} className="reveal">
        <p className="section-label">à propos</p>
        <h2 className="section-title">
          Du code, du design,<br />et beaucoup de progression.
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Je m&apos;appelle Théo Andrimananarisoa, et j&apos;ai découvert le
              développement web en seconde durant un cours où il fallait créer un
              site sur son jeu vidéo préféré. La facilité avec laquelle les
              choses sont venues m&apos;a fasciné, et je n&apos;ai plus arrêté de
              coder de l&apos;année.
            </p>
            <p>
              Mes études m&apos;ont ensuite éloigné de la pratique, jusqu&apos;à
              mon entrée à SUPINFO Lille : depuis, j&apos;y suis revenu pour de
              bon, cette fois avec toutes sortes de langages.
            </p>
            <p>
              Ce qui m&apos;anime, c&apos;est le <strong>design visuel</strong>, au
              point d&apos;en faire une vraie obsession, du web jusqu&apos;au montage
              vidéo. C&apos;est naturellement vers le front-end que je penche :
              c&apos;est là que ce sens du visuel s&apos;exprime le mieux. Mais
              j&apos;aime aussi la complexité du back-end, pour les défis
              qu&apos;elle pose. C&apos;est cette double attirance qui me pousse vers
              un objectif clair : devenir <strong>développeur full-stack</strong>,
              capable de créer des sites web complets — et, un jour, des
              applications.
            </p>
            <p>
              En dehors du code, je suis passionné de sport mécanique et de
              l&apos;univers automobile, et joueur de Rainbow Six Siege.
            </p>
          </div>

          <aside className="about-card panel">
            <h3>En bref</h3>
            <div className="about-fact">
              <span>Formation</span>
              <span>Bachelor of Science<br />SUPINFO Lille</span>
            </div>
            <div className="about-fact">
              <span>Année</span>
              <span>2ème année</span>
            </div>
            <div className="about-fact">
              <span>Recherche</span>
              <span>alternance à partir de sept. 2026</span>
            </div>
            <div className="about-fact">
              <span>Objectif</span>
              <span>Développeur full-stack</span>
            </div>
            <div className="about-fact">
              <span>Localisation</span>
              <span>Lille, France</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
