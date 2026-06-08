import React from 'react';
import { useRef, useEffect, useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-sky-400 to-cyan-400',
    glow: 'hover:shadow-sky-500/20',
    border: 'hover:border-sky-500/40',
    icon: '◈',
    skills: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'SASS'],
  },
  {
    title: 'Backend',
    color: 'from-indigo-400 to-purple-400',
    glow: 'hover:shadow-indigo-500/20',
    border: 'hover:border-indigo-500/40',
    icon: '⬡',
    skills: ['Node.js', '.NET Core', 'Entity Framework', 'WebAPI', 'OOP', 'Python', 'Flask', 'Java', 'C#', 'C++'],
  },
  {
    title: 'Databases',
    color: 'from-emerald-400 to-teal-400',
    glow: 'hover:shadow-emerald-500/20',
    border: 'hover:border-emerald-500/40',
    icon: '◉',
    skills: ['SQL Server', 'MongoDB', 'SQL'],
  },
  {
    title: 'Dev Environments & OS',
    color: 'from-amber-400 to-orange-400',
    glow: 'hover:shadow-amber-500/20',
    border: 'hover:border-amber-500/40',
    icon: '⬟',
    skills: ['VS Code', 'Visual Studio', 'PyCharm', 'Git', 'Linux'],
  },
  {
    title: 'AI & Tools',
    color: 'from-green-400 to-emerald-400',
    glow: 'shadow-green-500/15 hover:shadow-green-500/35',
    border: 'border-green-500/30 hover:border-green-400/60',
    icon: '✦',
    glowAlways: true,
    skills: ['ChatGPT', 'Gemini', 'Claude', 'Prompt Engineering', 'GitHub Copilot', 'Amazon Q', 'OpenAI GPT-4o', 'LangChain', 'Pinecone', 'UI/UX Design'],
  },
];

const values = [
  { icon: '⚡', title: 'Fast Learner', description: 'Strong self-learning abilities — picking up new technologies quickly and effectively.' },
  { icon: '✦', title: 'Clean Code', description: 'High-quality, modular code following Clean Code principles and best practices.' },
  { icon: '◈', title: 'Team Player', description: 'Experienced in teamwork, pair programming and collaborative problem-solving.' }
];

const education = [
  {
    period: '2024 – 2026',
    school: 'Bnot Elisheva Seminar',
    degree: 'Software Engineering Practical Engineer – Year 2',
    detail: 'Studies under MAHAT · Grade Average: 98 · Kama-Tech (UltraCode) Extension Program'
  },
  {
    period: '2020 – 2024',
    school: 'Bnot Elisheva',
    degree: 'High School Diploma',
    detail: 'Electronics (10 units) · Mathematics (5 units) · English (5 units)'
  }
];

const certifications = [
  'UX Design',
  'AI Course',
  'Advanced Data Security & Privacy',
  'Kama-Tech (UltraCode) Program'
];

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.07),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.05),transparent_55%)]" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 left-20 h-48 w-48 rounded-full bg-sky-500/5 blur-3xl animate-glow-pulse" style={{animationDelay:'2s'}} />

      <div className="relative mx-auto max-w-6xl px-6 py-28 lg:px-8">
        <div className="mb-16 animate-reveal-up opacity-0" style={{animationFillMode:'forwards'}}>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400">About</p>
          <h2 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">
            Building digital solutions
            <span className="block gradient-text">that serve businesses.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-8 animate-reveal-left opacity-0" style={{animationFillMode:'forwards',animationDelay:'0.1s'}}>
            {/* Bio */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur space-y-4 text-slate-300 leading-8 text-base">
              <p>
                Full Stack Development graduate specializing in <span className="text-sky-400 font-semibold">Angular, React and C#</span>. Experienced in frontend and back-end development, working with databases and writing high-quality, modular code.
              </p>
              <p>
                Maintains a <span className="text-sky-400 font-semibold">98 average grade</span>. Characterized by a strong work ethic and fast self-learning abilities. Experienced in teamwork and excellent collaboration, with high interpersonal communication skills, a proactive approach and a striving for excellence.
              </p>
            </div>

            {/* Values */}
            <div className="grid gap-4 sm:grid-cols-3">
              {values.map((item) => (
                <div key={item.title} className="card-glow group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:border-sky-500/40 backdrop-blur">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="mt-3 font-semibold text-white group-hover:gradient-text transition">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-400">Education</p>
              {education.map((edu) => (
                <div key={edu.period} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-sky-400 font-mono shrink-0">{edu.period}</span>
                    <div className="text-right">
                      <p className="font-semibold text-white">{edu.school}</p>
                      <p className="text-sm text-slate-300">{edu.degree}</p>
                      <p className="mt-1 text-xs text-slate-500">{edu.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-400 mb-4">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <span key={c} className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4 animate-reveal-right opacity-0" style={{animationFillMode:'forwards',animationDelay:'0.2s'}}>
            {skillCategories.map((cat) => (
              <div key={cat.title}
                className={`relative card-glow rounded-2xl border bg-slate-900/60 p-5 backdrop-blur transition duration-300 shadow-lg
                  ${cat.glowAlways ? `border-green-500/30 shadow-green-500/15 hover:shadow-green-500/35 hover:border-green-400/60` : `border-slate-800 ${cat.border} ${cat.glow}`}`}>
                {cat.glowAlways && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none" />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${cat.color} text-lg`}>{cat.icon}</span>
                  <p className={`text-xs font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r ${cat.color}`}>{cat.title}</p>
                  {cat.glowAlways && (
                    <span className="ml-auto flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.6)]">
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill}
                      className={`skill-pill rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200
                        ${cat.glowAlways
                          ? 'border-green-500/20 bg-green-500/5 text-green-300 hover:border-green-400/50 hover:bg-green-500/10'
                          : 'border-slate-700 bg-slate-950/80 text-slate-300'
                        }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Languages */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Languages</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
                  </div>
                  <span className="text-sm text-slate-300">Hebrew — Native</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
                  </div>
                  <span className="text-sm text-slate-300">English — High Proficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
