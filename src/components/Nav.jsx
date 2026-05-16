import { useState, useEffect } from 'react';

const LINKS = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'process', label: 'Méthode' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);

      const y = window.scrollY + window.innerHeight * 0.3;
      let current = 'home';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= y) current = link.id;
      }
      setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function go(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-brand" onClick={(e) => go(e, 'home')}>
        <span className="nav-shard" aria-hidden="true" />
        Obsiwebs
      </a>

      <nav>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.id ? 'active' : ''}`}
              onClick={(e) => go(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Ouvrir le menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}