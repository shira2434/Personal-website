import React from 'react';
import { Link } from 'react-router-dom';

const socials = [
  {
    label: 'Email',
    href: 'mailto:shirameren2434@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shira-merenstein-b284aa403/',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shira2434',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800/40 bg-slate-950">
      {/* Aurora glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-500/3 via-indigo-500/2 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 h-40 w-80 rounded-full bg-indigo-500/5 blur-3xl animate-glow-pulse" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-6">

          {/* Logo */}
          <Link to="/" className="group text-center">
            <span className="block text-2xl font-black gradient-text transition-opacity group-hover:opacity-80">
              Shira Merenstein
            </span>
            <span className="block text-xs text-slate-600 mt-1 group-hover:text-slate-500 transition-colors">
              Full Stack Developer · Angular · React · C#
            </span>
          </Link>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noreferrer' : undefined}
                title={s.label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60 text-slate-500 backdrop-blur transition-all duration-300 hover:border-sky-500/40 hover:text-sky-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10">
                {s.icon}
              </a>
            ))}
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          <p className="text-xs text-slate-700 hover:text-slate-600 transition-colors">
            © {new Date().getFullYear()} Shira Merenstein · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
