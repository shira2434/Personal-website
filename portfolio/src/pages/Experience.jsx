import React from 'react';

const experiences = [
  {
    period: '2026 – Present',
    company: 'Israel Tax Authority',
    role: 'Software Development Practicum',
    type: 'Practicum',
    color: 'from-sky-500 to-indigo-500',
    highlights: [
      'Writing advanced code in Angular and developing complex SQL Server procedures, focusing on robust logic and clean, organized code.',
      'Working closely within the team including pair programming, mutual code reviews, and real-time brainstorming for problem-solving.',
      'Ongoing work with Git — version management, code pushes, and tracking changes and bug fixes as part of the team development process.',
      'Meticulous attention to interface aesthetics and precise design (Material Design), focusing on the smallest UI/UX details.',
    ],
    tags: ['Angular', 'SQL Server', 'Git', 'Material Design', 'TypeScript'],
  },
];

const education = [
  {
    period: '2024 – 2026',
    school: 'Bnot Elisheva Seminar',
    degree: 'Software Engineering Practical Engineer',
    detail: 'Studies under MAHAT · Grade Average: 98',
    extra: 'Kama-Tech (UltraCode) Extension Program',
    color: 'from-indigo-500 to-purple-500',
    icon: '🎓',
  },
  {
    period: '2020 – 2024',
    school: 'Bnot Elisheva',
    degree: 'High School Diploma',
    detail: 'Electronics (10 units) · Mathematics (5 units) · English (5 units)',
    color: 'from-slate-500 to-slate-600',
    icon: '📚',
  },
];

export default function Experience() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:px-8">

        {/* Work Experience */}
        <div className="mb-20 animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Experience</p>
          <h2 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">
            Where I've
            <span className="gradient-text"> worked.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/40 via-indigo-500/20 to-transparent" />

          {experiences.map((exp, i) => (
            <div key={exp.company}
              className="relative pl-16 animate-reveal-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.15}s` }}>

              {/* Dot */}
              <div className={`absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${exp.color} shadow-lg shadow-sky-500/20`}>
                <span className="text-white text-xs font-black">IT</span>
              </div>

              <div className="card-glow rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur mb-8 hover:border-sky-500/30 transition duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-sky-400 border border-sky-500/30 bg-sky-500/10 px-3 py-1 rounded-full">{exp.period}</span>
                      <span className="text-xs border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">{exp.type}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mt-2">{exp.role}</h3>
                    <p className="gradient-text text-lg font-semibold">{exp.company}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="skill-pill rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-400 mb-3">Education</p>
          <h2 className="text-3xl font-extrabold text-white mb-10">
            Academic <span className="gradient-text">Background</span>
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent" />

            {education.map((edu, i) => (
              <div key={edu.school}
                className="relative pl-16 mb-6 animate-reveal-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${0.3 + i * 0.15}s` }}>

                <div className={`absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${edu.color} text-xl shadow-lg`}>
                  {edu.icon}
                </div>

                <div className="card-glow rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur hover:border-indigo-500/30 transition duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-mono text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full">{edu.period}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                  <p className="text-sm text-slate-300 mt-1">{edu.degree}</p>
                  <p className="text-xs text-slate-500 mt-1">{edu.detail}</p>
                  {edu.extra && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 text-xs text-sky-400">
                      ✦ {edu.extra}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
