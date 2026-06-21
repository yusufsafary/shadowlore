/* =============================================
   SHADOWLORE — Main JavaScript
   ============================================= */

'use strict';

/* ---- Nav scroll effect ---- */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ---- Mobile hamburger ---- */
const hamburger = document.querySelector('.btn-hamburger');
const drawer = document.querySelector('.nav-drawer');
if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Active nav link ---- */
(function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* ---- Hero loaded class ---- */
const hero = document.querySelector('.hero');
if (hero) {
  requestAnimationFrame(() => hero.classList.add('loaded'));
}

/* ---- Typewriter effect ---- */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'Where shadows breathe and whispers hold power.',
    'Every choice you make shapes the fate of unseen worlds.',
    'The darkness has a story — will you dare to read it?',
    'Ancient anthologies await those brave enough to enter.',
  ];
  let pi = 0, ci = 0, deleting = false;
  const speed = { type: 45, delete: 22, pause: 2400, pauseAfter: 600 };

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, speed.pauseAfter);
        return;
      }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
  setTimeout(tick, 1200);
})();

/* ---- Particle canvas ---- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = 55;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset = function() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = -Math.random() * 0.28 - 0.05;
      this.a  = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 260 + 140;
      this.gold = Math.random() > 0.55;
    };
    this.reset();
    this.y = Math.random() * H; // spread on init
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.life++;
      if (p.life > p.maxLife) { p.reset(); return; }
      const progress = p.life / p.maxLife;
      const alpha = p.a * Math.sin(progress * Math.PI);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(201,168,76,${alpha})`
        : `rgba(180,160,200,${alpha * 0.6})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
    });
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); }, { passive: true });
})();

/* ---- Ambient audio (Web Audio API) ---- */
let audioCtx = null, audioNodes = [], audioPlaying = false;
const audioBtn = document.querySelector('.btn-audio');

function buildAmbient() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0, audioCtx.currentTime);
  master.gain.linearRampToValueAtTime(0.14, audioCtx.currentTime + 3);
  master.connect(audioCtx.destination);

  // Deep drone oscillators
  const drones = [
    { freq: 55,   type: 'sine',     gain: 0.28 },
    { freq: 110,  type: 'sine',     gain: 0.12 },
    { freq: 82.4, type: 'triangle', gain: 0.10 },
    { freq: 164.8,type: 'sine',     gain: 0.06 },
  ];
  drones.forEach(d => {
    const osc = audioCtx.createOscillator();
    const g   = audioCtx.createGain();
    osc.type = d.type;
    osc.frequency.value = d.freq;
    g.gain.value = d.gain;
    osc.connect(g); g.connect(master);
    osc.start();
    audioNodes.push(osc, g);
    // Subtle vibrato
    const lfo = audioCtx.createOscillator();
    const lfoG = audioCtx.createGain();
    lfo.frequency.value = 0.08 + Math.random() * 0.12;
    lfoG.gain.value = 0.4;
    lfo.connect(lfoG); lfoG.connect(osc.frequency);
    lfo.start();
    audioNodes.push(lfo, lfoG);
  });

  // Noise layer (wind)
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 180;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.value = 0.04;
  noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(master);
  noise.start();
  audioNodes.push(noise, noiseFilter, noiseGain, master);
}

function toggleAudio() {
  if (!audioPlaying) {
    buildAmbient();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    audioPlaying = true;
    if (audioBtn) { audioBtn.classList.add('playing'); audioBtn.title = 'Mute Ambient'; audioBtn.innerHTML = '🔊'; }
  } else {
    if (audioCtx) audioCtx.suspend();
    audioPlaying = false;
    if (audioBtn) { audioBtn.classList.remove('playing'); audioBtn.title = 'Play Ambient'; audioBtn.innerHTML = '🔇'; }
  }
}

if (audioBtn) audioBtn.addEventListener('click', toggleAudio);

/* ---- Cookie banner ---- */
(function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('sl_cookie_consent')) return;

  setTimeout(() => banner.classList.add('visible'), 1500);

  document.querySelector('.btn-cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('sl_cookie_consent', 'accepted');
    banner.classList.remove('visible');
  });
  document.querySelector('.btn-cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('sl_cookie_consent', 'declined');
    banner.classList.remove('visible');
  });
})();
