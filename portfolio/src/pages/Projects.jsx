import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

const categories = ['All', 'React', 'Angular', 'C#', '.NET', 'API'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'list'

  const filtered = useMemo(() =>
    projectsData.filter((p) => {
      const matchCat = activeCategory === 'All' || p.tags.some((t) => t === activeCategory);
      const matchSearch = search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    }),
    [activeCategory, search]
  );

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(129,140,248,0.05),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">

        {/* Header */}
        <div className="mb-12 animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400">My Work</p>
          <h2 className="mt-3 text-5xl font-extrabold text-white">
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">
            Click any project to see full details, tech stack and screenshots.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-slate-700 bg-slate-900/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-500 outline-none backdrop-blur focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'border-sky-400/50 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-200 shadow-lg shadow-sky-500/10'
                      : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex rounded-xl border border-slate-700 overflow-hidden">
              <button onClick={() => setView('grid')}
                className={`px-3 py-2 transition ${view === 'grid' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-500 hover:text-white'}`}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
                </svg>
              </button>
              <button onClick={() => setView('list')}
                className={`px-3 py-2 transition ${view === 'list' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-500 hover:text-white'}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="mb-6 text-xs text-slate-600">
          Showing <span className="text-sky-400 font-semibold">{filtered.length}</span> of {projectsData.length} projects
        </p>

        {/* Grid view */}
        {view === 'grid' && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Link key={project.id} to={`/projects/${project.id}`}
                className="card-glow group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-sky-500/40"
                style={{ animation: `reveal-up 0.5s ease forwards`, animationDelay: `${i * 0.07}s`, opacity: 0 }}>

                {/* Thumbnail */}
                <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} border-b border-slate-800`}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  {project.images[0] ? (
                    <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="text-6xl transition duration-500 group-hover:scale-125 group-hover:rotate-6">{project.icon}</span>
                  )}
                  <span className="absolute top-3 left-3 gradient-text text-2xl font-black opacity-30">{project.num}</span>
                  {project.live !== '#' && (
                    <span className="absolute top-3 right-3 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Live</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700/60 bg-slate-950/60 px-2 py-0.5 text-xs text-slate-400">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-full border border-slate-700/60 bg-slate-950/60 px-2 py-0.5 text-xs text-slate-500">+{project.tags.length - 3}</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white transition duration-300 group-hover:gradient-text leading-snug">{project.title}</h3>
                  <p className="mt-2 flex-1 text-xs text-slate-500 leading-relaxed line-clamp-2">{project.shortDescription}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
                    <span className="text-xs font-semibold text-sky-400 group-hover:text-sky-200 transition">View Details →</span>
                    {project.images.length > 0 && (
                      <span className="text-xs text-slate-600">{project.images.length} screenshots</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* List view */}
        {view === 'list' && (
          <div className="space-y-3">
            {filtered.map((project, i) => (
              <Link key={project.id} to={`/projects/${project.id}`}
                className="card-glow group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur transition duration-300 hover:border-sky-500/40 hover:-translate-x-1"
                style={{ animation: `reveal-up 0.4s ease forwards`, animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.gradient} text-3xl transition group-hover:scale-110`}>
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white group-hover:gradient-text transition truncate">{project.title}</h3>
                    {project.live !== '#' && <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Live</span>}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{project.shortDescription}</p>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1 shrink-0">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-xs text-slate-400">{tag}</span>
                  ))}
                </div>
                <span className="text-slate-600 transition group-hover:text-sky-400 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-slate-400">No projects found for "<span className="text-white">{search || activeCategory}</span>"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-sm text-sky-400 hover:text-sky-200 transition">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
