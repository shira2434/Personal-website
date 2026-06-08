import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500`}>
      {/* Rainbow line */}
      <div className="h-px w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 opacity-60" />

      <nav className={`transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-3xl shadow-2xl shadow-slate-950/60 border-b border-white/5'
          : 'bg-slate-950/30 backdrop-blur-xl border-b border-white/3'
      }`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-all duration-300 group-hover:shadow-sky-500/50 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-sm font-black text-white">SM</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-60" />
            </div>
            <div>
              <span className="block text-sm font-bold tracking-tight text-white transition-colors group-hover:gradient-text">Shira Merenstein</span>
              <span className="block text-xs text-slate-600 transition-colors group-hover:text-slate-400">Full Stack Developer</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}
                  onMouseEnter={() => setHoveredItem(item.to)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}>
                  {(active || hoveredItem === item.to) && (
                    <span className="absolute inset-0 rounded-lg bg-white/5 border border-white/8 transition-all" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <span className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  )}
                </Link>
              );
            })}

            <Link to="/contact"
              className="btn-magnetic ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40">
              Hire Me
              <span className="gradient-text-warm font-black">✦</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative h-8 w-8 flex flex-col items-center justify-center gap-1.5">
            <span className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-6'}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-3xl px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-white border border-sky-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}>
                {location.pathname === item.to && (
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                )}
                {item.label}
              </Link>
            ))}
            <Link to="/contact"
              className="mt-2 block rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-center text-sm font-bold text-white shadow-lg">
              Hire Me ✦
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
