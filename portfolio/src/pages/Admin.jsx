import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../data/useProjects';

const GRADIENTS = [
  'from-sky-500/20 to-cyan-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-indigo-500/20 to-purple-500/20',
  'from-rose-500/20 to-pink-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-green-500/20 to-emerald-500/20',
  'from-teal-500/20 to-green-500/20',
  'from-yellow-500/20 to-amber-500/20',
];

const EMPTY = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  tags: '',
  live: '',
  repo: '',
  icon: '🚀',
  gradient: GRADIENTS[0],
  highlights: '',
  video: '',
  images: [],
};

export default function Admin() {
  const { allProjects, addProject, deleteProject, updateMedia, customCount } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [imageUrls, setImageUrls] = useState('');
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState('add'); // 'add' | 'manage' | 'media'

  // media edit state
  const [selectedId, setSelectedId] = useState('');
  const [editImages, setEditImages] = useState([]);
  const [editVideo, setEditVideo] = useState('');
  const [editUrlInput, setEditUrlInput] = useState('');
  const [mediaSaved, setMediaSaved] = useState(false);

  const selectedProject = allProjects.find((p) => p.id === selectedId);

  useEffect(() => {
    if (!selectedProject) return;
    setEditImages(selectedProject.images || []);
    setEditVideo(selectedProject.video || '');
    setEditUrlInput('');
  }, [selectedId]);

  function handleEditImageFiles(e) {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => setEditImages((prev) => [...prev, ev.target.result]);
      reader.readAsDataURL(file);
    });
  }

  function addEditUrls() {
    const urls = editUrlInput.split('\n').map((u) => u.trim()).filter(Boolean);
    setEditImages((prev) => [...prev, ...urls]);
    setEditUrlInput('');
  }

  function handleVideoFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditVideo(ev.target.result);
    reader.readAsDataURL(file);
  }

  function saveMedia() {
    updateMedia(selectedId, editImages, editVideo);
    setMediaSaved(true);
    setTimeout(() => {
      setMediaSaved(false);
      navigate(`/projects/${selectedId}`);
    }, 1000);
  }

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleImageFiles(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, images: [...f.images, ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const urlImages = imageUrls
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);

    addProject({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
      live: form.live || '#',
      repo: form.repo || '#',
      images: [...form.images, ...urlImages],
    });

    setForm(EMPTY);
    setImageUrls('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  const customProjects = allProjects.slice(allProjects.length - customCount);

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-sky-400">Admin Panel</p>
        <h2 className="mt-2 text-4xl font-extrabold text-white">
          Manage <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-2 text-slate-400 text-sm">
          Total projects: <span className="text-sky-400 font-semibold">{allProjects.length}</span>
          {customCount > 0 && <span className="ml-2 text-slate-500">({customCount} added by you)</span>}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {['add', 'media', 'manage'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              tab === t
                ? 'border-sky-400/50 bg-sky-500/10 text-sky-300'
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}>
            {t === 'add' ? '+ Add Project' : t === 'media' ? '🖼 Edit Media' : '📋 Manage'}
          </button>
        ))}
      </div>

      {/* ── ADD TAB ── */}
      {tab === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {success && (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
              ✅ Project added successfully! It now appears in your portfolio.
            </div>
          )}

          <Field label="Project Title *">
            <input required value={form.title} onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. My Awesome App" className={inputCls} />
          </Field>

          <Field label="Short Description *">
            <input required value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
              placeholder="One-line summary shown on the projects card" className={inputCls} />
          </Field>

          <Field label="Full Description">
            <textarea rows={4} value={form.fullDescription} onChange={(e) => set('fullDescription', e.target.value)}
              placeholder="Detailed description shown on the project detail page" className={inputCls} />
          </Field>

          <Field label="Tags (comma separated) *">
            <input required value={form.tags} onChange={(e) => set('tags', e.target.value)}
              placeholder="React, Node.js, TypeScript" className={inputCls} />
          </Field>

          <Field label="Key Highlights (one per line)">
            <textarea rows={4} value={form.highlights} onChange={(e) => set('highlights', e.target.value)}
              placeholder={"Feature one\nFeature two\nFeature three"} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Live URL">
              <input value={form.live} onChange={(e) => set('live', e.target.value)}
                placeholder="https://..." className={inputCls} />
            </Field>
            <Field label="GitHub Repo URL">
              <input value={form.repo} onChange={(e) => set('repo', e.target.value)}
                placeholder="https://github.com/..." className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Icon (emoji)">
              <input value={form.icon} onChange={(e) => set('icon', e.target.value)}
                placeholder="🚀" className={inputCls} />
            </Field>
            <Field label="Card Color">
              <select value={form.gradient} onChange={(e) => set('gradient', e.target.value)} className={inputCls}>
                {GRADIENTS.map((g, i) => (
                  <option key={g} value={g}>Color {i + 1}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Video URL (YouTube embed or direct .mp4)">
            <input value={form.video} onChange={(e) => set('video', e.target.value)}
              placeholder="https://www.youtube.com/embed/..." className={inputCls} />
          </Field>

          <Field label="Upload Images">
            <input type="file" accept="image/*" multiple onChange={handleImageFiles}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-500/20 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-sky-300 hover:file:bg-sky-500/30 transition" />
            {form.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.images.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="h-16 w-24 rounded-lg object-cover border border-slate-700" />
                    <button type="button" onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                      className="absolute -top-1 -right-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">×</button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          <Field label="Image URLs (one per line)">
            <textarea rows={3} value={imageUrls} onChange={(e) => setImageUrls(e.target.value)}
              placeholder={"https://example.com/image1.png\nhttps://example.com/image2.png"} className={inputCls} />
          </Field>

          <button type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-90 active:scale-[0.98]">
            + Add Project to Portfolio
          </button>
        </form>
      )}

      {/* ── MEDIA TAB ── */}
      {tab === 'media' && (
        <div className="space-y-6">
          <Field label="Select Project">
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className={inputCls}>
              <option value="">— choose a project —</option>
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>{p.num}. {p.title}</option>
              ))}
            </select>
          </Field>

          {selectedProject && (
            <>
              {mediaSaved && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                  ✅ Media saved! Changes are live on the site.
                </div>
              )}

              {/* Images */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">📸 Images ({editImages.length})</p>

                {/* Existing images grid */}
                {editImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {editImages.map((src, i) => (
                      <div key={i} className="relative group">
                        <img src={src} alt="" className="h-20 w-full rounded-xl object-cover border border-slate-700" />
                        <button type="button"
                          onClick={() => setEditImages((prev) => prev.filter((_, j) => j !== i))}
                          className="absolute -top-1.5 -right-1.5 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs shadow">
                          ×
                        </button>
                        <span className="absolute bottom-1 left-1 rounded bg-slate-950/70 px-1 text-[10px] text-slate-400">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload from computer */}
                <div>
                  <p className="text-xs text-slate-500 mb-1.5">Upload from computer</p>
                  <input type="file" accept="image/*" multiple onChange={handleEditImageFiles}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-500/20 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-sky-300 hover:file:bg-sky-500/30 transition" />
                </div>

                {/* Add by URL */}
                <div>
                  <p className="text-xs text-slate-500 mb-1.5">Add by URL (one per line)</p>
                  <div className="flex gap-2">
                    <textarea rows={2} value={editUrlInput} onChange={(e) => setEditUrlInput(e.target.value)}
                      placeholder="https://example.com/image.png" className={inputCls + ' flex-1'} />
                    <button type="button" onClick={addEditUrls}
                      className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 text-sm text-sky-300 hover:bg-sky-500/20 transition shrink-0">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">🎬 Video</p>

                <div>
                  <p className="text-xs text-slate-500 mb-1.5">Upload video from computer</p>
                  <input type="file" accept="video/*" onChange={handleVideoFile}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-sky-500/20 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-sky-300 hover:file:bg-sky-500/30 transition" />
                </div>

                <Field label="Or paste YouTube / .mp4 URL">
                  <div className="flex gap-2">
                    <input value={editVideo} onChange={(e) => setEditVideo(e.target.value)}
                      placeholder="https://www.youtube.com/embed/..." className={inputCls + ' flex-1'} />
                    {editVideo && (
                      <button type="button" onClick={() => setEditVideo('')}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-xs text-red-400 hover:bg-red-500/20 transition shrink-0">
                        Remove
                      </button>
                    )}
                  </div>
                </Field>

                {editVideo && (
                  <div className="overflow-hidden rounded-xl border border-slate-700 aspect-video">
                    {editVideo.startsWith('data:') || (!editVideo.includes('youtube') && !editVideo.includes('youtu.be')) ? (
                      <video src={editVideo} controls className="w-full h-full object-cover" />
                    ) : (
                      <iframe src={editVideo} className="w-full h-full" allowFullScreen />
                    )}
                  </div>
                )}
              </div>

              <button onClick={saveMedia}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-90">
                💾 Save Media
              </button>
            </>
          )}
        </div>
      )}

      {/* ── MANAGE TAB ── */}
      {tab === 'manage' && (
        <div className="space-y-3">
          {customCount === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center text-slate-500">
              No custom projects yet. Add one from the "Add Project" tab.
            </div>
          ) : (
            customProjects.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-2xl">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{p.title}</p>
                  <p className="text-xs text-slate-500 truncate">{p.shortDescription}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => navigate(`/projects/${p.id}`)}
                    className="rounded-xl border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition">
                    View
                  </button>
                  <button onClick={() => deleteProject(p.id)}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none backdrop-blur focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition';
