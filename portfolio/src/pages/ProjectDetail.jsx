import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import ImageZoomModal from '../components/ImageZoomModal';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const prev = projectsData[currentIndex - 1];
  const next = projectsData[currentIndex + 1];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  // משתנה בוליאני פשוט - האם המודל פתוח או סגור
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    setCurrentImgIndex(0);
    setIsZoomOpen(false);
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Project not found.</p>
        <Link to="/projects" className="text-sky-400 hover:text-sky-200">← Back to Projects</Link>
      </div>
    );
  }

  // פונקציות הניווט תומכות גם באירועי לחיצה קטנים בקרוסלה המקורית
  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[12rem] opacity-5 select-none animate-float">
          {project.icon}
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-sky-400 transition mb-8 group">
            <span className="transition group-hover:-translate-x-1">←</span>
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="gradient-text text-5xl font-black opacity-40 leading-none">{project.num}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-white lg:text-5xl leading-tight max-w-3xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-slate-300 leading-8">
            {project.fullDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer"
              className="btn-magnetic inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-sky-500/40">
              <GitHubIcon />
              View Code
            </a>
            {project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">

          {/* Screenshots קרוסלה */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Screenshots</p>
            {project.images && project.images.length > 0 ? (
              <div className="space-y-4">
                <div 
                  onClick={() => setIsZoomOpen(true)}
                  className="relative card-glow overflow-hidden rounded-2xl border border-slate-800 shadow-2xl shadow-slate-950/50 group cursor-zoom-in"
                >
                  <img 
                    src={project.images[currentImgIndex]} 
                    alt={`${project.title} screenshot ${currentImgIndex + 1}`}
                    className="w-full object-cover aspect-video transition duration-500 hover:scale-[1.01]" 
                  />
                  
                  {project.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white border border-slate-800 backdrop-blur transition opacity-0 group-hover:opacity-100 hover:bg-sky-500/20 hover:border-sky-500/40 z-10"
                      >
                        ←
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white border border-slate-800 backdrop-blur transition opacity-0 group-hover:opacity-100 hover:bg-sky-500/20 hover:border-sky-500/40 z-10"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                {/* Dots */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 pt-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImgIndex(i);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentImgIndex ? 'w-6 bg-sky-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={`relative flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="text-center space-y-3 relative z-10">
                  <span className="block text-7xl animate-float">{project.icon}</span>
                  <p className="text-sm text-slate-400">Screenshots coming soon</p>
                  <code className="block text-xs text-sky-400/70">src/assets/projects/</code>
                </div>
              </div>
            )}
          </div>

          {/* Right side (Features, Tech Stack, Links) */}
          <div className="space-y-5">
            <div className="glass card-glow rounded-3xl border border-slate-800 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-5">Key Features</p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed group/item">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 group-hover/item:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-shadow" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass card-glow rounded-3xl border border-slate-800 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-pill relative rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-white cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl border border-slate-800 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-4">Links</p>
              <div className="space-y-2">
                <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-400 transition hover:border-sky-500/30 hover:text-white group">
                  <span className="flex items-center gap-2"><GitHubIcon /> GitHub Repository</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                {project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 text-sm text-sky-400 transition hover:bg-sky-500/10 group">
                    <span>Live Demo</span>
                    <span className="transition group-hover:translate-x-1">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          {prev ? (
            <Link to={`/projects/${prev.id}`} className="card-glow glass group rounded-2xl border border-slate-800 p-5 transition hover:border-sky-500/30">
              <p className="text-xs text-slate-600 mb-1">← Previous</p>
              <p className="text-sm font-semibold text-white group-hover:gradient-text transition truncate">{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/projects/${next.id}`} className="card-glow glass group rounded-2xl border border-slate-800 p-5 text-right transition hover:border-sky-500/30">
              <p className="text-xs text-slate-600 mb-1">Next →</p>
              <p className="text-sm font-semibold text-white group-hover:gradient-text transition truncate">{next.title}</p>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* העברת ה-Props החדשים למודל */}
      <ImageZoomModal 
        isOpen={isZoomOpen} 
        src={project.images[currentImgIndex]} 
        onClose={() => setIsZoomOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
        showArrows={project.images.length > 1}
      />
    </div>
  );
}