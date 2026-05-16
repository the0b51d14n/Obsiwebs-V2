import { useRef, useState, useEffect } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import useReveal from './useReveal';

export default function ProjectCarousel() {
  const ref = useReveal();
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // met à jour l'état des boutons selon la position de scroll
  function updateControls() {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateControls();
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    return () => {
      track.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, []);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.project-card');
    const amount = card ? card.offsetWidth + 22 : 360;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  return (
    <section id="projects" className="section">
      <div ref={ref} className="reveal">
        <p className="section-label">Projets</p>
        <h2 className="section-title">Ce que j&apos;ai construit</h2>

        <div className="carousel-wrap">
          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              aria-label="Projet pr\u00e9c\u00e9dent"
            >
              {'\u2190'}
            </button>
            <button
              className="carousel-btn"
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label="Projet suivant"
            >
              {'\u2192'}
            </button>
          </div>

          <div className="carousel-track" ref={trackRef}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}