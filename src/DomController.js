import { ProjectController } from "./ProjectController.js";

export const DomController = () => {
  const project_controller = ProjectController();

  const project_header = document.querySelector(".project-header ul");


  const displayProjects = () => {
    project_controller.getProjects().forEach((project) => {
      const project_item = document.createElement("li");
      project_header.appendChild(project_item);
      const project_button = document.createElement("button");
      project_item.appendChild(project_button);
      project_button.textContent = project.project_name;
    });
  };

  const createTodoCard = (title, dueDate, projectId, todoId) => {
    const li = document.createElement("li");

    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.dataset.projectId = projectId;
    card.dataset.todoId = todoId;

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const cardStatus = document.createElement("div");
    cardStatus.classList.add("card-status");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    const cardDue = document.createElement("div");
    cardDue.classList.add("card-due");
    cardDue.textContent = `Due on ${dueDate}`;

    cardHeader.appendChild(cardStatus);
    cardHeader.appendChild(cardTitle);

    card.appendChild(cardHeader);
    card.appendChild(cardDue);

    li.appendChild(card);

    return li;
  };

  const displayTodoList = (project) => {
    const todo_list = document.querySelector(".todo-list");
    const add_todo_area = document.querySelector(".add-todo-area");
    todo_list.replaceChildren();
    add_todo_area.replaceChildren();

    project.getTodoList().forEach((todo) => {
      const li = createTodoCard(
        todo.getTitle(),
        todo.getDueDate(),
        project.getId(),
        todo.getId(),
      );
      todo_list.appendChild(li);
    });

    const add_todo_btn = document.createElement('button');
    add_todo_btn.classList.add("add-todo-btn");
    add_todo_btn.dataset.projectId = project.getId();
    add_todo_btn.textContent = "Add Task";
    add_todo_area.appendChild(add_todo_btn);

    add_todo_btn.addEventListener('click', (e) => {
        const form = createTodoForm(project.getId());
        add_todo_area.replaceChildren();
        add_todo_area.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form); 
            project.addTodoItem(
                formData.get('todo_title'),
                formData.get('todo_desc'),
                formData.get('todo_due'),
                formData.get('todo_priority')
                // title = formData.get('todo_title'),
                // description = formData.get('todo_desc'),
                // dueDate = formData.get('todo_due'),
                // priority = formData.get('todo_priority')
            );
            displayTodoList(project);

        })
    })

  };

  const createTodoForm = (project_id) => {
    const form = document.createElement("form");
    form.setAttribute("action", "#");

    // Title
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "todo-title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.name = "todo_title";
    titleInput.id = "todo-title";
    titleInput.type = "text";
    titleInput.required = true;

    // Description
    const descLabel = document.createElement("label");
    descLabel.setAttribute("for", "todo-desc");
    descLabel.textContent = "Description";

    const descInput = document.createElement("input");
    descInput.name = "todo_desc";
    descInput.id = "todo-desc";
    descInput.type = "text";

    // Due date
    const dueLabel = document.createElement("label");
    dueLabel.setAttribute("for", "todo-due");
    dueLabel.textContent = "Due date";

    const dueInput = document.createElement("input");
    dueInput.name = "todo_due";
    dueInput.id = "todo-due";
    dueInput.type = "date";

    // Priority
    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "todo-priority");
    priorityLabel.textContent = "Priority";

    const prioritySelect = document.createElement("select");
    prioritySelect.name = "todo_priority";
    prioritySelect.id = "todo-priority";

    const priorityOptions = [
      { value: "", text: "--Please choose a priority--" },
      { value: "high", text: "High" },
      { value: "medium", text: "Medium" },
      { value: "low", text: "Low" },
    ];

    priorityOptions.forEach(({ value, text }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      prioritySelect.appendChild(option);
    });

    // Submit
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.dataset.projectId = project_id;
    submitBtn.textContent = "Add Task";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dueLabel);
    form.appendChild(dueInput);
    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);
    form.appendChild(submitBtn);

    return form;
  };


  const initialRender = () => {
    displayProjects();
    displayTodoList(project_controller.getProjects()[0])
  }





  return { initialRender, displayProjects };
};
