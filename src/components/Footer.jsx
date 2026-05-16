import { Mail, Github, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  function go(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src="/android-chrome-192x192.png"
            alt="Logo Obsiwebs — blason d'obsidienne"
            className="footer-blason"
          />

          <div className="nav-brand">
            <span className="nav-shard" aria-hidden="true" />
            Obsiwebs
          </div>

          <p>
            Portfolio de Théo Andrimananarisoa. Conçu et codé à Lille —
            direction artistique « obsidienne », V2.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>

          <a href="#home" onClick={(e) => go(e, 'home')}>
            Accueil
          </a>

          <a href="#about" onClick={(e) => go(e, 'about')}>
            À propos
          </a>

          <a href="#process" onClick={(e) => go(e, 'process')}>
            Méthode
          </a>

          <a href="#projects" onClick={(e) => go(e, 'projects')}>
            Projets
          </a>

          <a href="#contact" onClick={(e) => go(e, 'contact')}>
            Contact
          </a>
        </div>

        <div className="footer-col">
          <h4>Réseaux</h4>

          <a
            href="https://www.linkedin.com/in/théo-andrimananarisoa-a64973395/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
          >
            <Linkedin size={18} strokeWidth={1.8} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/the0b51d14n"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
          >
            <Github size={18} strokeWidth={1.8} />
            <span>GitHub</span>
          </a>

          <a
            href="mailto:theo.supinfo@gmail.com"
            className="footer-social"
          >
            <Mail size={18} strokeWidth={1.8} />
            <span>Email</span>
          </a>

          <a
            href="https://www.instagram.com/obsiwebs/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
          >
            <Instagram size={18} strokeWidth={1.8} />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {year} Théo Andrimananarisoa</span>
        <span>Design &amp; code — Obsiwebs</span>
      </div>
    </footer>
  );
}