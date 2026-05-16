import { useRef, useEffect } from 'react';

/* ===================================================================
   VolcanoCanvas
   -------------------------------------------------------------------
   Reprise du moteur d'animation original d'Obsiwebs V1 (obsiwebs.js),
   encapsul\u00e9 proprement dans un composant React et retravaill\u00e9 pour
   la direction artistique "obsidienne" :
   - on quitte les oranges de lave
   - on passe \u00e0 des particules froides (violet / bleu / vert glac\u00e9)
   - la "lave" devient une coul\u00e9e de verre volcanique luminescente

   Points techniques importants pour l'int\u00e9gration React :
   - le canvas est r\u00e9f\u00e9renc\u00e9 via useRef
   - toute l'animation vit dans un useEffect
   - le cleanup annule le requestAnimationFrame et retire les listeners
     -> indispensable, sinon fuite m\u00e9moire / animation en double
   - respect de prefers-reduced-motion
   =================================================================== */

export default function VolcanoCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W, H, DPR;
    let rafId = null;
    let last = performance.now();

    const particles = [];
    const smoke = [];
    let glassOffset = 0;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.floor(canvas.clientWidth * DPR);
      H = Math.floor(canvas.clientHeight * DPR);
      canvas.width = W;
      canvas.height = H;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    /* --- Le massif d'obsidienne (ancienne "base du volcan") --- */
    function drawObsidianMass() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.55;
      const cy = h / 2 + 18;

      ctx.save();

      // sol
      ctx.fillStyle = 'rgba(5,5,7,0.9)';
      ctx.fillRect(0, h / 2, w, h / 2);

      // la silhouette anguleuse du massif
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy + 90);
      ctx.quadraticCurveTo(cx - 40, cy - 30, cx, cy - 140);
      ctx.quadraticCurveTo(cx + 40, cy - 30, cx + 160, cy + 90);
      ctx.lineTo(cx + 160, h);
      ctx.lineTo(cx - 160, h);
      ctx.closePath();
      ctx.fillStyle = '#0a0a0f';
      ctx.fill();

      // irisation froide sur la roche
      const sheen = ctx.createLinearGradient(cx - 160, cy - 140, cx + 160, cy + 140);
      sheen.addColorStop(0, 'rgba(124,92,255,0.05)');
      sheen.addColorStop(0.5, 'rgba(74,168,255,0.03)');
      sheen.addColorStop(1, 'rgba(61,240,184,0.04)');
      ctx.fillStyle = sheen;
      ctx.fill();

      ctx.restore();
    }

    /* --- La coul\u00e9e de verre volcanique (ancienne "lave") --- */
    function drawGlassFlow() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.55;
      const baseY = h / 2 + 20;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - 40, baseY - 80);
      ctx.bezierCurveTo(cx - 20, baseY - 30, cx - 20, baseY + 20, cx - 10, baseY + 80);
      ctx.lineTo(cx + 60, h);
      ctx.lineTo(cx - 120, h);
      ctx.closePath();

      const g = ctx.createLinearGradient(0, baseY - 120 + glassOffset, 0, h);
      g.addColorStop(0, 'rgba(168,176,216,0.10)');
      g.addColorStop(0.25, 'rgba(124,92,255,0.16)');
      g.addColorStop(0.55, 'rgba(74,168,255,0.32)');
      g.addColorStop(0.85, 'rgba(61,240,184,0.14)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fill();

      // le c\u0153ur lumineux de la coul\u00e9e
      ctx.beginPath();
      ctx.moveTo(cx - 18, baseY - 70);
      ctx.bezierCurveTo(cx - 8, baseY - 40, cx - 8, baseY - 5, cx + 6, baseY + 60);
      ctx.lineTo(cx + 30, h);
      ctx.lineTo(cx - 90, h);
      ctx.closePath();
      const core = ctx.createLinearGradient(0, baseY - 100 + glassOffset, 0, h);
      core.addColorStop(0, 'rgba(200,210,255,0.18)');
      core.addColorStop(0.35, 'rgba(124,92,255,0.5)');
      core.addColorStop(0.7, 'rgba(74,168,255,0.7)');
      core.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core;
      ctx.shadowBlur = 28;
      ctx.shadowColor = 'rgba(124,92,255,0.7)';
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();

      glassOffset += reduceMotion ? 0 : 0.7;
      if (glassOffset > 200) glassOffset = 0;
    }

    /* --- Particules (\u00e9clats d'obsidienne incandescents) --- */
    function spawnParticle() {
      const cx = canvas.clientWidth * 0.55;
      particles.push({
        x: cx + (Math.random() - 0.5) * 70,
        y: canvas.clientHeight * 0.45 + (Math.random() * 40 - 20),
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.6 + Math.random() * 1.6),
        r: 1.6 + Math.random() * 2.6,
        life: 120 + Math.random() * 120,
        age: 0,
        // teinte : on r\u00e9partit entre violet, bleu et vert glac\u00e9
        tint: Math.floor(Math.random() * 3),
      });
    }

    function updateParticles(dt) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        p.x += p.vx * dt * 0.6;
        p.y += p.vy * dt * 0.6;
        p.vy += 0.003 * dt;
        if (p.age > p.life) particles.splice(i, 1);
      }
      const target = Math.min(70, Math.floor((canvas.clientWidth / 400) * 36));
      if (particles.length < target && Math.random() < 0.9) spawnParticle();
    }

    const TINTS = [
      [124, 92, 255],   // violet
      [74, 168, 255],   // bleu
      [61, 240, 184],   // vert glac\u00e9
    ];

    function drawParticles() {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        const t = p.age / p.life;
        const alpha = Math.max(0, 1 - t);
        const size = p.r * (1 + 0.6 * t);
        const [r, g, b] = TINTS[p.tint];
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        grad.addColorStop(0, `rgba(${r},${g},${b},${0.9 * alpha})`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${0.32 * alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - size * 1.5, p.y - size * 1.5, size * 3, size * 3);
      }
      ctx.restore();
    }

    /* --- Fum\u00e9e / brume froide --- */
    function spawnSmoke() {
      const cx = canvas.clientWidth * 0.55;
      smoke.push({
        x: cx + (Math.random() - 0.5) * 110,
        y: canvas.clientHeight * 0.42 + 10 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.07 - Math.random() * 0.12,
        r: 40 + Math.random() * 70,
        life: 4000 + Math.random() * 4000,
        age: 0,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.002,
      });
    }

    function updateSmoke(dt) {
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.age += dt;
        s.x += s.vx * dt * 0.12;
        s.y += s.vy * dt * 0.12;
        s.rot += s.rotV * dt * 0.1;
        if (s.age > s.life) smoke.splice(i, 1);
      }
      if (smoke.length < 6 && Math.random() < 0.016) spawnSmoke();
    }

    function drawSmoke() {
      ctx.save();
      for (const s of smoke) {
        const t = s.age / s.life;
        const alpha = (1 - t) * 0.22;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s.r);
        grad.addColorStop(0, `rgba(120,130,170,${alpha * 0.3})`);
        grad.addColorStop(0.4, `rgba(90,100,140,${alpha * 0.14})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.filter = 'blur(16px)';
        ctx.fillRect(-s.r, -s.r * 0.6, s.r * 2, s.r * 1.2);
        ctx.restore();
      }
      ctx.restore();
    }

    /* --- Boucle principale --- */
    function frame(now) {
      const dt = Math.min(60, now - last);
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, 'rgba(10,10,15,1)');
      bg.addColorStop(1, 'rgba(5,5,7,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      updateSmoke(dt);
      drawSmoke();
      drawObsidianMass();
      drawGlassFlow();
      updateParticles(dt);
      drawParticles();

      // halo froid sur l'horizon
      const horizon = ctx.createLinearGradient(0, h * 0.54, 0, h);
      horizon.addColorStop(0, 'rgba(124,92,255,0.03)');
      horizon.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = horizon;
      ctx.fillRect(0, h * 0.52, w, h * 0.5);

      rafId = window.requestAnimationFrame(frame);
    }

    // --- Initialisation ---
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 14; i++) spawnSmoke();
    for (let i = 0; i < 22; i++) spawnParticle();

    if (reduceMotion) {
      // une seule frame statique, pas de boucle
      frame(performance.now());
      window.cancelAnimationFrame(rafId);
    } else {
      rafId = window.requestAnimationFrame(frame);
    }

    // --- CLEANUP : essentiel en React ---
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="hero-canvas" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}