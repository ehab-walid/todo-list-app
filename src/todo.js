export function createTodoItem(title, description, dueDate, priority) {
  const id = crypto.randomUUID();
  const getId = () => id;
  const getTitle = () => title;
  const getDesc = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

  const setTitle = (new_title) => (title = new_title);
  const setDesc = (new_desc) => (description = new_desc);
  const setDueDate = (new_dueDate) => (dueDate = new_dueDate);
  const setPriority = (new_priority) => (priority = new_priority);

  return {
    getId,
    getTitle,
    getDesc,
    getDueDate,
    getPriority,
    setTitle,
    setDesc,
    setDueDate,
    setPriority,
  };
}
