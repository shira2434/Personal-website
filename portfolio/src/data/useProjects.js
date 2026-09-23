import { useState, useEffect } from 'react';
import { projectsData } from './projects';

const STORAGE_KEY = 'custom_projects';

function loadCustom() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function useProjects() {
  const [custom, setCustom] = useState(loadCustom);

  const allProjects = [
    ...projectsData,
    ...custom.map((p, i) => ({
      ...p,
      num: String(projectsData.length + i + 1).padStart(2, '0'),
    })),
  ];

  function addProject(project) {
    const newProject = {
      ...project,
      id: `custom-${Date.now()}`,
    };
    const updated = [...custom, newProject];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCustom(updated);
  }

  function deleteProject(id) {
    const updated = custom.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCustom(updated);
  }

  return { allProjects, addProject, deleteProject, customCount: custom.length };
}
