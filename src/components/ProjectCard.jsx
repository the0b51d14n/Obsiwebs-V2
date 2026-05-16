/* Carte projet — utilis\u00e9e par le carrousel.
   Affiche capture (ou placeholder), badge de statut, stack et liens. */

export default function ProjectCard({ project }) {
  const { kind, title, status, statusLabel, desc, contribution, stack, image, links } = project;

  return (
    <article className="project-card panel">
      <div className="project-thumb">
        {image ? (
          <img src={image} alt={`Aper\u00e7u du projet ${title}`} />
        ) : (
          <span className="project-thumb-placeholder">
            [ capture à venir ]
          </span>
        )}
        <span className={`project-status ${status}`}>{statusLabel}</span>
      </div>

      <div className="project-body">
        <p className="project-kind">{kind}</p>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{desc}</p>
        {contribution && (
          <p className="project-desc" style={{ color: 'var(--text-faint)', fontSize: '0.86rem' }}>
            {contribution}
          </p>
        )}

        <div className="project-stack">
          {stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {links.map((link, i) =>
            link.type === 'none' ? (
              <span key={i} className="project-link muted">
                {link.label}
              </span>
            ) : (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {link.label} <span aria-hidden="true">{'\u2192'}</span>
              </a>
            )
          )}
        </div>
      </div>
    </article>
  );
}