import { createContext, useContext, useState } from 'react';
import { projectsData } from './projects';

const STORAGE_KEY = 'custom_projects';
const MEDIA_KEY = 'project_media_overrides';

function load(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return parsed ?? fallback;
  } catch {
    console.warn(`[useProjects] Failed to parse localStorage key: ${key}`);
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`[useProjects] Failed to save to localStorage key: ${key}`);
  }
}

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [custom, setCustom] = useState(() => load(STORAGE_KEY, []));
  const [mediaOverrides, setMediaOverrides] = useState(() => load(MEDIA_KEY, {}));

  const allProjects = [
    ...projectsData,
    ...custom.map((p, i) => ({
      ...p,
      num: String(projectsData.length + i + 1).padStart(2, '0'),
    })),
  ].map((p) => ({
    ...p,
    images: mediaOverrides[p.id]?.images || p.images,
    video: mediaOverrides[p.id]?.video || p.video,
    live: (mediaOverrides[p.id]?.live && mediaOverrides[p.id].live !== '#') ? mediaOverrides[p.id].live : p.live,
  }));

  function addProject(project) {
    const updated = [...custom, { ...project, id: `custom-${Date.now()}` }];
    save(STORAGE_KEY, updated);
    setCustom(updated);
  }

  function deleteProject(id) {
    const updated = custom.filter((p) => p.id !== id);
    save(STORAGE_KEY, updated);
    setCustom(updated);
  }

  function updateMedia(id, images, video, live) {
    const updated = { ...mediaOverrides, [id]: { images, video, live } };
    save(MEDIA_KEY, updated);
    setMediaOverrides(updated);
  }

  function resetMedia(id) {
    const updated = { ...mediaOverrides };
    delete updated[id];
    save(MEDIA_KEY, updated);
    setMediaOverrides(updated);
  }

  return (
    <ProjectsContext.Provider value={{ allProjects, addProject, deleteProject, updateMedia, resetMedia, customCount: custom.length }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
