// import { TodoItem } from "./todo.js";

import { createTodoItem } from "./todo.js";

export const createProject = (project_name, id) => {
    let todo_list = [];

    const getId = () => id;

    const getTodoList = () => [...todo_list];

    const addTodoItem = (title, description, dueDate, priority, id = crypto.randomUUID()) => {
        const todo_item = createTodoItem(title, description, dueDate, priority, id);
        todo_list.push(todo_item);
    }

    const deleteTodoItem = (id) => {
        let index = todo_list.findIndex(todo_item => todo_item.getId() === id);
        todo_list.splice(index, 1);
    }

    return {project_name, addTodoItem, deleteTodoItem, getTodoList, getId};
}