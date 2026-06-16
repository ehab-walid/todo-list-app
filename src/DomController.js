import { ProjectController } from "./ProjectController.js";

export const DomController = () => {
  const project_controller = ProjectController();

  const project_header = document.querySelector(".project-header ul");
  const new_project = document.querySelector(".add-project-section");

  const saveProjects = () => {
    const data = project_controller.getProjects().map((project) => ({
      id: project.getId(),
      title: project.project_name,
      todos: project.getTodoList().map((todo) => ({
        id: todo.getId(),
        title: todo.getTitle(),
        description: todo.getDesc(),
        dueDate: todo.getDueDate(),
        priority: todo.getPriority(),
      })),
    }));
    localStorage.setItem("projects", JSON.stringify(data));
  };

  const loadProjects = () => {
    const data = localStorage.getItem('projects');
    if (!data) return;

    JSON.parse(data).forEach(projectData => {
      const project = project_controller.addProject(projectData.title, projectData.id);
      projectData.todos.forEach((todo) => {
        project.addTodoItem(todo.title, todo.description, todo.dueDate, todo.priority, todo.id);
      })
    });
  }

  const createProjectForm = () => {
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("id", "new-project-form");

    // Title
    // const titleLabel = document.createElement("label");
    // titleLabel.setAttribute("for", "project-title");
    // titleLabel.textContent = "Project title";

    const titleInput = document.createElement("input");
    titleInput.name = "project_title";
    titleInput.id = "project-title";
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.required = true;

    // Submit
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    // submitBtn.dataset.projectId = project_id;
    submitBtn.textContent = "Add Project";

    // form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(submitBtn);

    return form;
  };

  const displayProjects = () => {
    project_header.replaceChildren();
    new_project.replaceChildren();
    project_controller.getProjects().forEach((project) => {
      const project_item = document.createElement("li");
      project_header.appendChild(project_item);
      const project_button = document.createElement("button");
      project_item.appendChild(project_button);
      project_button.textContent = project.project_name;
      project_button.classList.add("project-name");
      project_button.dataset.id = project.getId();
    });

    Array.from(document.querySelectorAll(".project-name"))
      .find(
        (btn) => btn.dataset.id === project_controller.getProjects()[0].getId(),
      )
      ?.classList.add("selected");

    const add_project_btn = document.createElement("button");
    add_project_btn.classList.add("add-project-btn");
    new_project.appendChild(add_project_btn);
    add_project_btn.textContent = "New Project";
    let isFormOpen = false;

    add_project_btn.addEventListener("click", () => {
      const project_form = createProjectForm();
      new_project.replaceChildren();
      new_project.appendChild(project_form);
      isFormOpen = true;

      project_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(project_form);
        const new_project = project_controller.addProject(
          formData.get("project_title"),
        );
        saveProjects();
        isFormOpen = false;
        displayProjects();
        document.querySelectorAll(".project-name").forEach((btn) => {
          if (btn.dataset.id === new_project.getId()) {
            btn.classList.add("selected");
          } else {
            btn.classList.remove("selected");
          }
        });
        displayTodoList(new_project);
      });
    });
    const bodyArea = document.querySelector("body");
    bodyArea.addEventListener("click", (e) => {
      if (
        isFormOpen &&
        !e.target.closest(".add-project-btn") &&
        !e.target.closest("#new-project-form")
      ) {
        isFormOpen = false;
        displayProjects();
      }
    });
  };

  project_header.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-name")) {
      document.querySelectorAll(".project-name").forEach((btn) => {
        btn.classList.remove("selected");
      });
      e.target.classList.add("selected");
      console.log(project_controller.findProject(e.target.dataset.id));
      displayTodoList(project_controller.findProject(e.target.dataset.id));
    }
  });

  const createTodoCard = (title, dueDate, projectId, todoId, priority) => {
    const li = document.createElement("li");

    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.dataset.projectId = projectId;
    card.dataset.todoId = todoId;

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const cardStatus = document.createElement("div");
    cardStatus.classList.add("card-status");

    const cardCheck = document.createElement("input");
    cardCheck.classList.add("card-checkbox");
    cardCheck.setAttribute("type", "checkbox");
    cardCheck.setAttribute("id", `todo-status-${todoId}`);
    cardCheck.setAttribute("name", "todo_status");

    const checkLabel = document.createElement("label");
    checkLabel.setAttribute("for", `todo-status-${todoId}`);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");

    const cardTitleText = document.createElement("span");
    cardTitleText.classList.add("card-title-text");
    cardTitleText.textContent = title;

    const cardDue = document.createElement("div");
    cardDue.classList.add("card-due");
    cardDue.textContent = `Due on ${dueDate}`;

    const cardDeleteDiv = document.createElement("div");
    cardDeleteDiv.classList.add("card-delete");
    const cardDeleteBtn = document.createElement("button");
    cardDeleteBtn.classList.add("card-delete-btn");
    cardDeleteBtn.dataset.id = todoId;
    cardDeleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;

    const cardPriority = document.createElement("div");
    cardPriority.classList.add("todo-priority");
    cardPriority.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
    cardPriority.classList.add(priority);
    // cardPriority.textContent = priority;

    cardStatus.appendChild(cardCheck);
    cardStatus.appendChild(checkLabel);
    cardTitle.appendChild(cardTitleText);
    cardDeleteDiv.appendChild(cardDeleteBtn);

    card.appendChild(cardStatus);
    card.appendChild(cardTitle);
    card.appendChild(cardDeleteDiv);
    card.appendChild(cardDue);
    card.appendChild(cardPriority);

    li.appendChild(card);
    // li.appendChild(cardRightDiv);

    cardCheck.addEventListener("change", () => {
      cardTitleText.classList.toggle("done", cardCheck.checked);
      cardDue.classList.toggle("done", cardCheck.checked);
    });

    return li;
  };

  // const createTodoCard = (title, dueDate, projectId, todoId) => {
  //   const li = document.createElement("li");

  //   const card = document.createElement("div");
  //   card.classList.add("todo-card");
  //   card.dataset.projectId = projectId;
  //   card.dataset.todoId = todoId;

  //   const cardLeft = document.createElement("div");
  //   cardLeft.classList.add("card-left");

  //   const cardStatus = document.createElement("div");
  //   cardStatus.classList.add("card-status");

  //   const cardCheck = document.createElement("input");
  //   cardCheck.classList.add("card-checkbox");
  //   cardCheck.setAttribute("name", "todo_status");

  //   const cardRight = document.createElement("div");
  //   cardRight.classList.add("card-right");

  //   const cardTitle = document.createElement("div");
  //   cardTitle.classList.add("card-title");
  //   cardTitle.textContent = title;

  //   const cardDue = document.createElement("div");
  //   cardDue.classList.add("card-due");
  //   cardDue.textContent = `Due on ${dueDate}`;

  //   cardLeft.appendChild(cardStatus);
  //   cardStatus.appendChild(cardCheck);
  //   cardRight.appendChild(cardTitle);
  //   cardRight.appendChild(cardDue);

  //   card.appendChild(cardLeft);
  //   card.appendChild(cardRight);

  //   li.appendChild(card);

  //   return li;
  // };

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
        todo.getPriority(),
      );
      todo_list.appendChild(li);
    });

    const add_todo_btn = document.createElement("button");
    add_todo_btn.classList.add("add-todo-btn");
    add_todo_btn.dataset.projectId = project.getId();
    add_todo_btn.textContent = "Add Task";
    add_todo_area.appendChild(add_todo_btn);

    add_todo_btn.addEventListener("click", (e) => {
      const form = createTodoForm(project.getId());
      add_todo_area.replaceChildren();
      add_todo_area.appendChild(form);

      const cancelBtn = form.querySelector(".cancel-todo-btn");
      cancelBtn.addEventListener("click", () => {
        displayTodoList(project);
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        project.addTodoItem(
          formData.get("todo_title"),
          formData.get("todo_desc"),
          formData.get("todo_due"),
          formData.get("todo_priority"),
        );
        saveProjects();
        displayTodoList(project);
      });
    });

    const deleteTodoBtns = document.querySelectorAll(".card-delete-btn");
    deleteTodoBtns.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        console.log(deleteButton.dataset.id);
        project.deleteTodoItem(deleteButton.dataset.id);
        saveProjects();
        displayTodoList(project);
      });
    });
  };

  const createTodoForm = (project_id) => {
    const form = document.createElement("form");
    form.setAttribute("action", "#");

    const createField = (input) => {
      const div = document.createElement("div");
      div.classList.add("label-input");
      // div.appendChild(label);
      div.appendChild(input);
      return div;
    };

    // Title
    // const titleLabel = document.createElement("label");
    // titleLabel.setAttribute("for", "todo-title");
    // titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.name = "todo_title";
    titleInput.id = "todo-title";
    titleInput.type = "text";
    titleInput.required = true;
    titleInput.placeholder = "Title";

    // Description
    // const descLabel = document.createElement("label");
    // descLabel.setAttribute("for", "todo-desc");
    // descLabel.textContent = "Description";

    const descInput = document.createElement("input");
    descInput.name = "todo_desc";
    descInput.id = "todo-desc";
    descInput.type = "text";
    descInput.placeholder = "Description";

    // Due date
    // const dueLabel = document.createElement("label");
    // dueLabel.setAttribute("for", "todo-due");
    // dueLabel.textContent = "Due date";

    const dueInput = document.createElement("input");
    dueInput.name = "todo_due";
    dueInput.id = "todo-due";
    dueInput.type = "date";

    // Priority
    // const priorityLabel = document.createElement("label");
    // priorityLabel.setAttribute("for", "todo-priority");
    // priorityLabel.textContent = "Priority";

    const prioritySelect = document.createElement("select");
    prioritySelect.name = "todo_priority";
    prioritySelect.id = "todo-priority";

    const priorityOptions = [
      { value: "", text: "Priority" },
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
    submitBtn.classList.add("add-todo-submit-btn");
    submitBtn.value = "submit";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.classList.add("cancel-todo-btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.value = "cancel";
    //     form.appendChild(createField(titleLabel, titleInput));
    // form.appendChild(createField(descLabel, descInput));
    // form.appendChild(createField(dueLabel, dueInput));
    // form.appendChild(createField(priorityLabel, prioritySelect));

    form.appendChild(createField(titleInput));
    form.appendChild(createField(descInput));
    form.appendChild(createField(dueInput));
    form.appendChild(createField(prioritySelect));

    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    return form;
  };

  const initialRender = () => {

    loadProjects();
    displayProjects();
    const projects = project_controller.getProjects();
    if (projects.length > 0){
      displayTodoList(project_controller.getProjects()[0]);
    }
    
  };

  return { initialRender, displayProjects };
};
