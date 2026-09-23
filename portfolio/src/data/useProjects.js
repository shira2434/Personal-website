import { useState } from 'react';
import { projectsData } from './projects';

const STORAGE_KEY = 'custom_projects';
const MEDIA_KEY = 'project_media_overrides';

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}

function loadCustom() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}

export function useProjects() {
  const [custom, setCustom] = useState(loadCustom);
  const [mediaOverrides, setMediaOverrides] = useState(() => load(MEDIA_KEY));

  const allProjects = [
    ...projectsData,
    ...custom.map((p, i) => ({
      ...p,
      num: String(projectsData.length + i + 1).padStart(2, '0'),
    })),
  ].map((p) => ({
    ...p,
    images: mediaOverrides[p.id]?.images ?? p.images,
    video: mediaOverrides[p.id]?.video ?? p.video,
  }));

  function addProject(project) {
    const updated = [...custom, { ...project, id: `custom-${Date.now()}` }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCustom(updated);
  }

  function deleteProject(id) {
    const updated = custom.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCustom(updated);
  }

  function updateMedia(id, images, video) {
    const updated = { ...mediaOverrides, [id]: { images, video } };
    localStorage.setItem(MEDIA_KEY, JSON.stringify(updated));
    setMediaOverrides(updated);
  }

  return { allProjects, addProject, deleteProject, updateMedia, customCount: custom.length };
}
