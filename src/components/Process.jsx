import useReveal from './useReveal';

const STEPS = [
  {
    num: '01',
    title: 'Je réfléchis avant de coder',
    text: "Avant la première ligne, je pose le projet sur papier que se soit pour la structure des pages, l'accueil, l'organisation visuelle. Pour Supinfo.TV, c'est le schéma complet de la base de données qui a été dessiné avant d'écrire la moindre requête. Quand la direction artistique est libre, je construis mes palettes avec des outils comme Coolors plutôt qu'au hasard.",
  },
  {
    num: '02',
    title: "J'apprends ce dont j'ai besoin",
    text: "Quand un projet demande une techno que je ne connaissais pas, ou qui me meys en difficulté comme PHP, Docker, une API. Et bien, je vais l'apprendre, en autonomie, à la source. Ne pas savoir n'est pas un blocage, c'est le point de départ.",
  },
  {
    num: '03',
    title: 'Je sers le besoin, pas mon ego',
    text: "Mon univers est sombre et futuriste. Mais quand une cliente a besoin d'un site doux et chaleureux, je mets mon style de côté. Comprendre une vision et la traduire fidèlement fait partie du métier.",
  },
  {
    num: '04',
    title: 'Je reprends mon travail',
    text: "Je sais regarder ce que j'ai fait il y a six mois et voir ce qui ne va plus. Ce portfolio en est la preuve : je le reconstruis entièrement, parce que progresser, c'est aussi savoir se corriger.",
  },
];

export default function Process() {
  const ref = useReveal();

  return (
    <section id="process" className="section">
      <div ref={ref} className="reveal">
        <p className="section-label">Méthode</p>
        <h2 className="section-title">Ma façon de travailler</h2>

        <div className="process-grid">
          {STEPS.map((step) => (
            <article key={step.num} className="process-item panel">
              <div className="process-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}