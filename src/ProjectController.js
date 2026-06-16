import { createProject } from "./project.js";

export function ProjectController () {
    let projects = [];

    const deleteProject = (id) => {
        let index = projects.findIndex((project) => project.getId() === id);
        projects.splice(index, 1);
    }

    const getProjects = () => [...projects];

    const addProject = (name, id = crypto.randomUUID()) => {
        let project = createProject(name, id);
        projects.push(project);
        return project;
    }

    const findProject = (id) => {
        return projects.find((project) => project.getId() === id);
    }

    return {getProjects, deleteProject, addProject, findProject};

    
}