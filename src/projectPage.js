import { editProject, deleteProject } from "./modifyProject.js";
import { editTodo, deleteTodo } from "./modifyTodos.js";
import { loadProject, saveProject } from "./storage.js";

export const projects = loadProject(); // This will hold the list of projects

export default function projectPage() {
  const content = document.querySelector("#content");
  content.textContent = "";

  const projectContent = document.createElement("div");
  projectContent.id = "project-content";
  content.appendChild(projectContent);

  const projectPageHeading = document.createElement("h2");
  projectPageHeading.textContent = "Your Projects";
  projectContent.appendChild(projectPageHeading);

  function renderPage() {
    // Placeholder for projects list
    projectContent.textContent = ""; // Clear previous content
    projectContent.appendChild(projectPageHeading); // Re-add the heading
    const projectsList = document.createElement("div");
    projectsList.id = "projects-list";
    if (projects.length === 0) {
      projectsList.textContent =
        "No projects yet. Click ' ➕ ' button to create your first project!";
    } else {
      const projectItemUl = document.createElement("ul");
      projectContent.appendChild(projectItemUl);
      projects.forEach((project) => {
        const projectItemLi = document.createElement("li"); // Create a list item for each project item
        const projectItem = document.createElement("div"); // Create a div to hold the project item
        projectItemLi.appendChild(projectItem);

        const projectTitleDiv = document.createElement("div"); // Create a div to hold the project title and buttons
        projectTitleDiv.classList.add("project-title-div");
        projectItem.appendChild(projectTitleDiv);

        const projectTitle = document.createElement("div"); // Create a div for the project title
        projectTitle.classList.add("project-title");
        projectTitle.textContent = project.title;

        const projectButtonsSpan = document.createElement("span");
        projectButtonsSpan.classList.add("project-buttons-span");

        const projectEditButton = document.createElement("button");
        projectEditButton.textContent = " ✏️";
        projectEditButton.title = "Edit project";
        projectEditButton.classList.add("edit-project-button");
        projectEditButton.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the project title div
          editProject(project);
          saveProject(projects);
        });
        projectButtonsSpan.appendChild(projectEditButton);

        const projectDeleteButton = document.createElement("button");
        projectDeleteButton.textContent = " 🗑️";
        projectDeleteButton.title = "Delete project";
        projectDeleteButton.classList.add("delete-project-button");
        projectDeleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteProject(projects, project);
          saveProject(projects);
        });
        projectButtonsSpan.appendChild(projectDeleteButton);

        projectTitleDiv.appendChild(projectTitle);

        projectItem.appendChild(projectTitleDiv);
        projectTitleDiv.appendChild(projectButtonsSpan);

        const projectTodos = document.createElement("div");
        projectTodos.classList.add("project-todos");
        projectItem.appendChild(projectTodos);

        projectItem.classList.add("project-item");
        projectItemUl.appendChild(projectItemLi);

        projectTitle.addEventListener("click", () => {
          // Toggle the visibility of the project todos when the project title is clicked
          if (projectTodos.style.display === "none") {
            projectTodos.style.display = "block";
          } else {
            projectTodos.style.display = "none";
          }
        });

        if (project.todos) {
          // If the project has todos, display the todos under the project title
          project.todos.forEach((todo) => {
            const todoPropDiv = document.createElement("div");
            todoPropDiv.classList.add("todo-properties");

            const todoTitleDiv = document.createElement("div");
            todoTitleDiv.classList.add("todo-title");

            const todoBox = document.createElement("input");
            todoBox.type = "checkbox";
            todoBox.classList.add("todo-box");
            todoBox.addEventListener("change", () => {
              // Add an event listener to the checkbox to update the checked status of the todo when the checkbox is toggled
              if (todoBox.checked) {
                todo.setChecked(true);
              } else {
                todo.setChecked(false);
              }
            });
            const checked = todo.getChecked();
            todoBox.checked = checked;
            todoTitleDiv.appendChild(todoBox);

            const todoTitle = document.createElement("span");
            todoTitle.id = "todoBox-title";
            todoTitle.textContent = todo._title;
            todoTitleDiv.appendChild(todoTitle);

            const todoPriorityColor = document.createElement("span"); // to show priority color next to the title

            todoPriorityColor.id = "todo-priority-color";
            if (todo._priority === "low") {
              todoPriorityColor.style.backgroundColor = "purple";
            } else if (todo._priority === "medium") {
              todoPriorityColor.style.backgroundColor = "orange";
            } else {
              todoPriorityColor.style.backgroundColor = "red";
            }
            todoTitle.appendChild(todoPriorityColor);

            const todoButtonsSpan = document.createElement("span"); // Create a span to hold the todo modify buttons
            todoButtonsSpan.classList.add("todo-buttons-span");
            todoTitleDiv.appendChild(todoButtonsSpan);

            const todoEditButton = document.createElement("button");
            todoEditButton.textContent = " ✏️";
            todoEditButton.title = "Edit todo";
            todoEditButton.classList.add("edit-todo-button");
            todoButtonsSpan.appendChild(todoEditButton);
            todoEditButton.addEventListener("click", (e) => {
              e.preventDefault();
              editTodo(todo);
              saveProject(projects);
            });

            const todoDeleteButton = document.createElement("button");
            todoDeleteButton.textContent = " 🗑️";
            todoDeleteButton.title = "Delete todo";
            todoDeleteButton.classList.add("delete-todo-button");
            todoButtonsSpan.appendChild(todoDeleteButton);
            todoDeleteButton.addEventListener("click", (e) => {
              e.preventDefault();
              let todos = project.todos; // reference the todos array inside each project.
              deleteTodo(todos, todo);
              saveProject(projects);
            });

            const todoDescription = document.createElement("div");
            todoDescription.id = "todoBox-description";
            todoDescription.textContent = todo._description;
            todoPropDiv.appendChild(todoDescription);

            const todoDueDate = document.createElement("div");
            todoDueDate.id = "todoBox-dueDate";
            todoDueDate.textContent = `Due: ${todo._dueDate}`;
            todoPropDiv.appendChild(todoDueDate);

            const todoPriority = document.createElement("div");
            todoPriority.id = "todoBox-priority";

            todoPriority.textContent = `Priority: ${todo._priority}`;
            todoPropDiv.appendChild(todoPriority);
            projectTodos.appendChild(todoTitleDiv);
            projectTodos.appendChild(todoPropDiv);
            todoPropDiv.style.display = "none"; // Hide the todo properties by default

            // add event listener to the div to toggle the visibility of the todo properties when the project title is clicked
            todoTitle.addEventListener("click", () => {
              if (todoPropDiv.style.display === "none") {
                todoPropDiv.style.display = "block";
              } else {
                todoPropDiv.style.display = "none";
              }
            });
          });
        }
      });
    }
    projectContent.appendChild(projectsList);

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = " ➕";
    newProjectButton.classList.add("add-project-button");

    newProjectButton.addEventListener("click", createProjectDialog);
    projectContent.appendChild(newProjectButton);
  }
  renderPage();

  function createProjectDialog() {
    const projectDialog = document.createElement("dialog");
    projectDialog.classList.add("project-dialog");

    const form = document.createElement("form");
    form.method = "dialog";
    form.noValidate = true;

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Project Title: ";
    const errorValidationSpan = document.createElement("span");
    errorValidationSpan.classList.add("error-validation");
    titleLabel.appendChild(errorValidationSpan);
    form.appendChild(titleLabel);

    const projectTitleInput = document.createElement("input");
    projectTitleInput.type = "text";
    projectTitleInput.name = "project-title";
    projectTitleInput.required = true;
    projectTitleInput.placeholder = "Enter project title";
    form.appendChild(projectTitleInput);

    const projectDialogDiv = document.createElement("div");
    projectDialogDiv.classList.add("project-dialog-buttons");
    form.appendChild(projectDialogDiv);

    const submitButton = document.createElement("button");
    submitButton.classList.add("project-submit-button");
    submitButton.type = "submit";
    submitButton.textContent = "Create";
    form.addEventListener("submit", (e) => {
      // Prevent the default form submission behavior
      // so that I can do manual validation.
      e.preventDefault();
    });
    submitButton.addEventListener("click", () => {
      if (!projectTitleInput.value || projectTitleInput.value.trim() === "") {
        errorValidationSpan.textContent = " Project title cannot be empty.";
        setTimeout(() => {
          errorValidationSpan.textContent = "";
        }, 3000); // Clear the error message after 3 seconds
        return;
      }
      const newProject = {
        title: projectTitleInput.value,
        todos: [], // Initialize an empty array for todos in the new project
      };
      projects.push(newProject);
      saveProject(projects);
      projectDialog.close();
      renderPage(); // Refresh the project page to show the new project
    });
    projectDialogDiv.appendChild(submitButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("project-cancel-button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () => {
      projectDialog.close();
    });
    projectDialogDiv.appendChild(cancelButton);

    projectDialog.appendChild(form);

    const projectContent = document.querySelector("#project-content");
    projectContent.appendChild(projectDialog);
    projectDialog.showModal();
  }

  return renderPage;
}
