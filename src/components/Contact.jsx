import { useState } from 'react';
import useReveal from './useReveal';

/* IMPORTANT — sécurité du formulaire :
   La clé Web3Forms est publique par nature (côté client), c'est inhérent
   au fait que le code tourne dans le navigateur du visiteur.
   La protection vient d'ailleurs : Advanced Spam Filter activé et
   Spam Protection Level = Strict dans le dashboard Web3Forms.
   (hCaptcha + restriction de domaine sont des options payantes.) */
const WEB3FORMS_KEY = '7d0cf3fb-81eb-4fd1-8da1-0f51285f9b4f';

export default function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });

    const formData = new FormData(e.target);
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'Nouveau message — Portfolio Obsiwebs',
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ state: 'ok', message: 'Message envoyé — je réponds sous 48h.' });
        e.target.reset();
      } else {
        setStatus({
          state: 'err',
          message: data.message || 'Une erreur est survenue, réessaie.',
        });
      }
    } catch {
      setStatus({
        state: 'err',
        message: 'Erreur réseau — vérifie ta connexion et réessaie.',
      });
    }
  }

  return (
    <section id="contact" className="section">
      <div ref={ref} className="reveal">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Discutons</h2>

        <div className="contact-grid">
          <div className="contact-intro">
            <p>
              Envie de collaborer, une question, une opportunité de stage
              ou d&apos;alternance ? Écris-moi — je réponds habituellement
              sous 48h.
            </p>

            <div className="contact-channels">
              <a
                className="contact-channel"
                href="mailto:theo.supinfo@gmail.com"
              >
                <span className="contact-channel-icon">@</span>
                <span>
                  <span className="contact-channel-label">Email</span>
                  <br />
                  <span className="contact-channel-value">
                    theo.supinfo@gmail.com
                  </span>
                </span>
              </a>
              <a
                className="contact-channel"
                href="https://github.com/the0b51d14n"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel-icon">{'{ }'}</span>
                <span>
                  <span className="contact-channel-label">GitHub</span>
                  <br />
                  <span className="contact-channel-value">the0b51d14n</span>
                </span>
              </a>
              <a
                className="contact-channel"
                href="https://www.instagram.com/obsiwebs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel-icon">◉</span>
                <span>
                  <span className="contact-channel-label">Instagram</span>
                  <br />
                  <span className="contact-channel-value">@obsiwebs</span>
                </span>
              </a>
            </div>
          </div>

          <form className="contact-form panel" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status.state === 'sending'}
              style={{ width: '100%' }}
            >
              {status.state === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>

            {status.message && (
              <p
                className={`form-message ${status.state === 'ok' ? 'ok' : 'err'}`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}