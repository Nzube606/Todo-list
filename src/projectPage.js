export const projects = []; // This will hold the list of projects

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
        projectItem.classList.add("project-item");
        projectItem.textContent = project.title; // Display the project title

        projectItemUl.appendChild(projectItemLi);
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
      };
      projects.push(newProject);
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

  return { createProjectDialog, renderPage };
}
