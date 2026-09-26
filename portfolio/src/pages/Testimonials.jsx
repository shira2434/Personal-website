import React from 'react';

const testimonials = [
  { quote: 'Shira worked professionally, quickly and was available throughout the entire project. The result works amazingly and the client is thrilled.', name: 'Ori Cohen', role: 'Product Manager', initials: 'OC' },
  { quote: 'The project was delivered on time, with great code quality and excellent communication. Highly recommended.', name: 'Dana Levi', role: 'Startup Founder', initials: 'DL' },
  { quote: 'The combination of technical thinking with a focus on user experience brought us better results than we ever imagined.', name: 'Yonatan Bar', role: 'Digital Marketer', initials: 'YB' }
];

const stars = Array(5).fill('★');

export default function Testimonials() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(129,140,248,0.08),_transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.05),transparent_55%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 left-20 h-48 w-48 rounded-full bg-sky-500/5 blur-3xl animate-glow-pulse" style={{animationDelay:'2s'}} />

      <div className="relative mx-auto max-w-6xl px-6 py-28 lg:px-8">
        <div className="mb-14 animate-reveal-up opacity-0" style={{animationFillMode:'forwards'}}>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Testimonials</p>
          <h2 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">
            What clients
            <span className="gradient-text"> are saying</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">
            Solutions that deliver real value — clients who speak about precise work, supportive communication and high quality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <article
              key={item.name}
              className="card-glow group relative flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-indigo-500/30 animate-reveal-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-sky-500/0 transition-all duration-500 group-hover:from-indigo-500/5 group-hover:to-sky-500/5" />
              <span className="absolute top-6 right-6 text-6xl font-black text-slate-800 select-none leading-none group-hover:text-indigo-900/60 transition duration-300">"</span>

              <div className="flex gap-0.5 mb-4">
                {stars.map((s, j) => (
                  <span key={j} className="text-amber-400 text-sm" style={{ animationDelay: `${j * 0.1}s` }}>{s}</span>
                ))}
              </div>

              <p className="relative z-10 flex-1 text-slate-300 leading-8 text-sm italic">{item.quote}</p>

              <div className="mt-8 flex items-center gap-4 border-t border-slate-800/60 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-sky-500/20 shrink-0 ring-2 ring-sky-500/20 group-hover:ring-sky-500/40 transition">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
