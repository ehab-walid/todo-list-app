import { createProject } from "./project.js";

export function ProjectController () {
    let projects = [];
    let project_general = createProject('general');
    projects.push(project_general);

    const deleteProject = (id) => {
        let index = projects.findIndex((project) => project.getId() === id);
        projects.splice(index, 1);
    }

    const getProjects = () => [...projects];

    const addProject = (name) => {
        let project = createProject(name);
        projects.push(project);
    }

    return {getProjects, deleteProject, addProject};

    
}