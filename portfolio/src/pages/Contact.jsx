import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const contacts = [
  { label: 'Email', value: 'shirameren2434@gmail.com', href: 'mailto:shirameren2434@gmail.com', icon: '✉', color: 'from-sky-500 to-cyan-500' },
  { label: 'LinkedIn', value: 'linkedin.com/in/shira-merenstein', href: 'https://www.linkedin.com/in/shira-merenstein-b284aa403/', icon: '⚡', color: 'from-blue-500 to-indigo-500' },
  { label: 'GitHub', value: 'github.com/shira2434', href: 'https://github.com/shira2434', icon: '◈', color: 'from-slate-400 to-slate-500' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await emailjs.send(
        'service_lc4hkpw',
        'template_a9gdb1m',
        { name: form.name, email: form.email, message: form.message, title: 'Portfolio Contact' },
        'Msl7gvtuWwferlS3G'
      );
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
    setSending(false);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.07),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.05),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] items-start">

          {/* Left */}
          <div className="space-y-8 animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-400 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Available for new projects
              </div>
              <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Get In Touch</p>
              <h2 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">
                Your next project
                <span className="block gradient-text">can start here.</span>
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Have an idea, need a redesign or a focused build? Fill out the form and I'll get back to you with a tailored proposal.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contacts.map((c, i) => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="card-glow group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur transition duration-300 hover:border-slate-700 hover:-translate-y-0.5"
                  style={{ animation: `reveal-up 0.5s ease forwards`, animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white text-sm shadow-lg transition group-hover:scale-110`}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{c.label}</p>
                    <p className="text-sm font-semibold text-white">{c.value}</p>
                  </div>
                  <span className="ml-auto text-slate-600 transition group-hover:text-white group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="text-sm font-semibold text-white">Fast Response</p>
                  <p className="text-xs text-slate-500">Typically replies within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit}
              className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur shadow-2xl shadow-slate-950/40 overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/3 via-transparent to-indigo-500/3 pointer-events-none" />

              {sent && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-sm font-semibold text-green-300">Message sent!</p>
                    <p className="text-xs text-green-400/70">I'll get back to you shortly.</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <span className="text-xl">❌</span>
                  <div>
                    <p className="text-sm font-semibold text-rose-300">Something went wrong</p>
                    <p className="text-xs text-rose-400/70">Try again or email directly.</p>
                  </div>
                </div>
              )}

              <div className="relative grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', key: 'name', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email', type: 'email', key: 'email', placeholder: 'john@example.com' },
                  ].map((field) => (
                    <label key={field.id} className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {field.label}
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        required
                        className="mt-2 w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10 hover:border-slate-600 normal-case font-normal"
                      />
                    </label>
                  ))}
                </div>

                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center justify-between mb-2">
                    <span>Message</span>
                    <span className={`text-xs font-normal ${form.message.length > 400 ? 'text-amber-400' : 'text-slate-600'}`}>
                      {form.message.length}/500
                    </span>
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 500) })}
                    placeholder="Tell me about your project..."
                    required
                    rows="5"
                    className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/10 hover:border-slate-600 resize-none normal-case font-normal"
                  />
                </label>

                <button type="submit" disabled={sending}
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:shadow-sky-500/40 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {sending ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Send Message <span className="transition group-hover:translate-x-1">→</span></>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
