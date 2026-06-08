import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const ROLES = [
  'Full Stack Developer',
  'React & Angular Expert',
  'C# Backend Engineer',
  'AI-Assisted Developer',
  'Clean Code Advocate',
];

const stats = [
  { label: 'Projects',      value: '9',   icon: '◈', color: 'from-sky-400 to-cyan-400' },
  { label: 'Technologies',  value: '15+', icon: '⬡', color: 'from-indigo-400 to-purple-400' },
  { label: 'Grade Average', value: '98',  icon: '✦', color: 'from-amber-400 to-orange-400' },
  { label: 'Certifications',value: '4',   icon: '◉', color: 'from-emerald-400 to-teal-400' },
];

const techStack = [
  { name: 'Angular',          color: 'from-red-400 to-rose-400' },
  { name: 'React',            color: 'from-sky-400 to-cyan-400' },
  { name: 'TypeScript',       color: 'from-blue-400 to-indigo-400' },
  { name: 'JavaScript',       color: 'from-yellow-400 to-amber-400' },
  { name: 'C#',               color: 'from-purple-400 to-violet-400' },
  { name: 'Node.js',          color: 'from-green-400 to-emerald-400' },
  { name: '.NET Core',        color: 'from-indigo-400 to-purple-400' },
  { name: 'Python',           color: 'from-yellow-300 to-blue-400' },
  { name: 'Java',             color: 'from-orange-400 to-red-400' },
  { name: 'SQL Server',       color: 'from-orange-400 to-amber-400' },
  { name: 'MongoDB',          color: 'from-green-500 to-teal-400' },
  { name: 'Git',              color: 'from-orange-500 to-amber-400' },
  { name: 'ChatGPT',          color: 'from-emerald-400 to-teal-400' },
  { name: 'GitHub Copilot',   color: 'from-slate-300 to-white' },
  { name: 'Amazon Q',         color: 'from-sky-300 to-indigo-400' },
  { name: 'LangChain',        color: 'from-fuchsia-400 to-pink-400' },
  { name: 'Linux',            color: 'from-slate-400 to-gray-300' },
  { name: 'OOP',              color: 'from-violet-400 to-purple-400' },
];

/* ── Particles ── */
function Particles() {
  const particles = useRef(
    [...Array(25)].map(() => ({
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      color: ['#38bdf8','#818cf8','#e879f9','#34d399'][Math.floor(Math.random()*4)],
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 18 + 12,
      delay: Math.random() * 12,
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particle-float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }} />
      ))}
    </div>
  );
}

/* ── Typewriter ── */
function TypeWriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) setTimeout(() => setDeleting(true), 2000);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIndex(i => (i+1) % ROLES.length); }
      }
    }, deleting ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="gradient-text">
      {text}
      <span className="inline-block w-0.5 h-8 bg-sky-400 ml-1 animate-pulse align-middle" />
    </span>
  );
}

/* ── Spotlight mouse tracker ── */
function Spotlight() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove}
      className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 hover:opacity-100" />
  );
}

/* ── Animated counter ── */
function Counter({ value, label, icon, color }) {
  const [count, setCount] = useState(0);
  const num = parseInt(value);
  const hasPlus = value.includes('+');

  useEffect(() => {
    let start = 0;
    const end = num;
    const duration = 1800;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [num]);

  return (
    <div className="card-glow border-glow glass group relative overflow-hidden rounded-2xl p-6 text-center cursor-default">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
      <div className={`absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br ${color} opacity-5 blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`} />
      <span className={`text-2xl bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{icon}</span>
      <p className={`mt-2 text-4xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}{hasPlus ? '+' : ''}
      </p>
      <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-slate-950 noise">

      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-bg" />
      </div>

      {/* Morphing blobs */}
      <div className="absolute top-20 left-[10%] h-80 w-80 rounded-full bg-sky-500/6 blur-3xl animate-morph" />
      <div className="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-indigo-500/6 blur-3xl animate-morph" style={{animationDelay:'3s'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-fuchsia-500/4 blur-3xl animate-morph" style={{animationDelay:'6s'}} />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Spinning rings */}
      <div className="pointer-events-none absolute top-1/4 right-[5%] opacity-10">
        <div className="h-64 w-64 rounded-full border border-sky-400/30 animate-spin-slow" />
        <div className="absolute inset-4 rounded-full border border-indigo-400/20 animate-spin-reverse" />
        <div className="absolute inset-8 rounded-full border border-fuchsia-400/20 animate-spin-slow" style={{animationDuration:'6s'}} />
      </div>
      <div className="pointer-events-none absolute bottom-1/4 left-[5%] opacity-8">
        <div className="h-48 w-48 rounded-full border border-purple-400/20 animate-spin-reverse" />
      </div>

      <Particles />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">

        {/* Badge */}
        <div className="mb-10 flex justify-center animate-slide-up opacity-0 delay-0" style={{animationFillMode:'forwards'}}>
          <div className="relative inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-sky-500/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] text-sky-300 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
            </span>
            Open to work · Israel Tax Authority Practicum
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 animate-pulse" />
          </div>
        </div>

        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="animate-slide-up opacity-0 delay-100" style={{animationFillMode:'forwards'}}>
            <h1 className="text-6xl font-black leading-none tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[9rem]">
              <span className="block animate-text-flicker">Shira</span>
              <span className="block gradient-text leading-tight">Merenstein</span>
            </h1>
          </div>

          <div className="animate-slide-up opacity-0 delay-200 flex justify-center items-center h-12" style={{animationFillMode:'forwards'}}>
            <p className="text-xl font-medium text-slate-300 sm:text-2xl">
              <TypeWriter />
            </p>
          </div>

          <p className="animate-slide-up opacity-0 delay-300 mx-auto max-w-2xl text-base text-slate-400 leading-8" style={{animationFillMode:'forwards'}}>
            Full Stack Development graduate specializing in Angular, React & C#.
            Maintaining a <span className="text-sky-400 font-semibold relative underline-draw">98 average grade</span> with
            a strong work ethic, fast self-learning and a passion for clean, scalable code.
          </p>

          {/* CTAs */}
          <div className="animate-slide-up opacity-0 delay-400 flex flex-wrap items-center justify-center gap-4 pt-2" style={{animationFillMode:'forwards'}}>
            <Link to="/projects"
              className="btn-magnetic group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-sky-500/30">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <Link to="/contact"
              className="btn-magnetic border-glow inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-bold text-white backdrop-blur">
              Get In Touch
            </Link>

            <a href="https://github.com/shira2434" target="_blank" rel="noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-6 py-4 text-sm font-medium text-slate-400 backdrop-blur hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Stats with animated counters */}
        <div className="animate-slide-up opacity-0 delay-500 mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4" style={{animationFillMode:'forwards'}}>
          {stats.map((s) => <Counter key={s.label} {...s} />)}
        </div>

        {/* Tech stack */}
        <div className="mt-20 animate-slide-up opacity-0 delay-600" style={{animationFillMode:'forwards'}}>
          <p className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-slate-600">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map((tech, i) => (
              <div key={tech.name}
                className="skill-pill group relative cursor-default rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 backdrop-blur"
                style={{ animationDelay: `${i * 0.03}s` }}>
                <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${tech.color} opacity-0 blur-md transition-all duration-400 group-hover:opacity-15`} />
                <span className={`absolute inset-0 rounded-full border border-transparent bg-gradient-to-r ${tech.color} opacity-0 transition-opacity duration-300 group-hover:opacity-30`}
                  style={{WebkitMask:'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite:'xor', padding:'1px'}} />
                <span className="relative text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center animate-fade-in opacity-0 delay-700" style={{animationFillMode:'forwards'}}>
          <div className="flex flex-col items-center gap-2 text-slate-700 hover:text-slate-500 transition-colors cursor-default">
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <div className="relative h-10 w-px overflow-hidden rounded-full bg-slate-800">
              <div className="absolute top-0 h-4 w-full bg-gradient-to-b from-sky-400 to-transparent animate-[slide-up_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
