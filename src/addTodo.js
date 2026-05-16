import projectPage, { projects } from "./projectPage.js";
import { Todo } from "./createTodo.js";
import { saveProject } from "./storage.js";
export default function addTodoPage() {
  const addTodoDialog = document.createElement("dialog"); // Create a dialog element for the add todo form
  addTodoDialog.id = "add-todo-dialog";

  const form = document.createElement("form");
  form.method = "dialog";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  titleLabel.htmlFor = "todo-title"; // for attribute to link label to input
  // javaScript does not have a "for" attribute for labels(it is a reserved keyword),
  // instead I used htmlFor to link the label to the input field
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "todo-title";
  titleInput.name = "title";
  titleInput.placeholder = "Enter todo title";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  descriptionLabel.htmlFor = "todo-description";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "todo-description";
  descriptionInput.name = "description";
  descriptionInput.placeholder = "Describe your todo";
  descriptionInput.minLength = 10;
  descriptionInput.maxLength = 100;

  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);

  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due date: ";
  dueDateLabel.htmlFor = "todo-due-date";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";

  form.appendChild(dueDateLabel);
  form.appendChild(dueDateInput);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority: ";
  priorityLabel.htmlFor = "todo-priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.id = "todo-priority";
  prioritySelect.name = "priority";

  const priorities = ["Low", "Medium", "High"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority.toLowerCase();
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  form.appendChild(priorityLabel);
  form.appendChild(prioritySelect);

  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Add to project: ";

  const projectSelect = document.createElement("select");
  projectSelect.id = "project-select";
  const defaultOption = document.createElement("option");
  defaultOption.value = "choose-project";
  defaultOption.textContent = "Choose a project";
  defaultOption.disabled = true; // Disable the default option to prevent selection
  defaultOption.selected = true; // Set the default option as selected
  projectSelect.appendChild(defaultOption);
  // projectSelect.name = "project";

  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.title;
    option.textContent = project.title;
    projectSelect.appendChild(option);
  });

  form.appendChild(projectLabel);
  form.appendChild(projectSelect);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("button-container");

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    addTodoDialog.close();
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Todo";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!titleInput.value || titleInput.value.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }
    if (
      !descriptionInput.value ||
      descriptionInput.value.trim() === "" ||
      descriptionInput.value.length < 10
    ) {
      alert("Description must be at least 10 characters long.");
      return;
    }
    addTodo();
    addTodoDialog.close();
  });
  btnContainer.appendChild(cancelButton);
  btnContainer.appendChild(submitButton);

  function addTodo() {
    const selectedProjectTitle = projectSelect.value;
    const selectedProject = projects.find(
      (project) => project.title === selectedProjectTitle,
    );

    if (selectedProjectTitle == "choose-project") {
      // If no project is selected, add the todo to the "Unnamed Project"
      if (projects.some((project) => project.title === "Unnamed Project")) {
        // If the "Unnamed Project" already exists, add the todo to it
        const unNamedProject = projects.find(
          (project) => project.title === "Unnamed Project",
        );

        const newTodo = new Todo(
          titleInput.value,
          descriptionInput.value,
          dueDateInput.value,
          prioritySelect.value.toLowerCase(),
          unNamedProject.title,
          false,
        );
        unNamedProject.todos.push(newTodo);
        saveProject(projects);
        projectPage(); // Refresh the project page to show the new todo
        // createTodo(newTodo, projectDom);
      } else {
        const unNamedProject = {
          title: "Unnamed Project",
          todos: [], // Initialize an empty array for todos in the new project
        };
        projects.push(unNamedProject);
        projectPage(); // Refresh the project page to show the new project
        // const projectPageInstance = projectPage(); // Get the instance of the project page
        // projectPageInstance.renderPage(); // Call the renderPage method to update the project list

        const newTodo = new Todo(
          titleInput.value,
          descriptionInput.value,
          dueDateInput.value,
          prioritySelect.value.toLowerCase(),
          unNamedProject.title,
          false,
        );
        unNamedProject.todos.push(newTodo);
        saveProject(projects);
        projectPage(); // Refresh the project page to show the new todo
      }
    } else {
      const newTodo = new Todo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.value,
        prioritySelect.value.toLowerCase(),
        selectedProject.title,
        false,
      );

      selectedProject.todos.push(newTodo);
      saveProject(projects);
      projectPage(); // Refresh the project page to show the new todo
    }
  }

  form.appendChild(btnContainer);

  addTodoDialog.appendChild(form);

  const body = document.querySelector("body");
  body.appendChild(addTodoDialog);

  addTodoDialog.showModal();
}
