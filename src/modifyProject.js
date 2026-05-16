import projectPage, { projects } from "./projectPage.js";
import { saveProject } from "./storage.js";

export function editProject(project) {
  const content = document.querySelector("#content"); // this is to attach the dialog to the screen
  const dialog = document.createElement("dialog"); // dialog to take in new values
  dialog.classList.add("edit-project-dialog");

  const form = document.createElement("form");
  form.method = "dialog";
  dialog.appendChild(form);

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Project Title:";
  titleLabel.htmlFor = "edit-project-title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "edit-project-title";
  titleInput.required = true;
  titleInput.name = "title";
  titleInput.placeholder = "Enter new project title";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  const editProjectDialogButtons = document.createElement("div");
  editProjectDialogButtons.id = "edit-project-dialog-buttons";
  form.appendChild(editProjectDialogButtons);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.type = "submit";
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!titleInput.value || titleInput.value.trim() === "") {
      alert("Please fill in a valid title");
      return;
    } else {
      project.title = titleInput.value;
      dialog.close();
      projectPage();
      saveProject(projects);
    }
  });
  editProjectDialogButtons.appendChild(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.type = "button";
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
  editProjectDialogButtons.appendChild(cancelButton);
  content.appendChild(dialog);
  dialog.showModal();
}

export function deleteProject(array, arrayItem) {
  const content = document.querySelector("#content");
  const dialog = document.createElement("dialog");
  content.appendChild(dialog);

  const form = document.createElement("form");
  const deleteQuery = document.createElement("p");
  deleteQuery.id = "delete-query";
  deleteQuery.textContent = " Are you sure you want to delete this project?";
  form.appendChild(deleteQuery);
  dialog.appendChild(form);

  const confirmButtonsDiv = document.createElement("div");
  confirmButtonsDiv.id = "confirm-buttons-div";
  form.appendChild(confirmButtonsDiv);

  const yesButton = document.createElement("button");
  yesButton.textContent = "Yes";
  yesButton.type = "submit";
  confirmButtonsDiv.appendChild(yesButton);
  yesButton.addEventListener("click", (e) => {
    e.preventDefault();
    const index = array.findIndex(
      (project) => project.title === arrayItem.title,
    );

    if (index !== -1) {
      array.splice(index, 1);
      dialog.close();
      projectPage();
      saveProject(projects);
    }
  });

  const noButton = document.createElement("button");
  noButton.textContent = "No";
  noButton.type = "button";
  confirmButtonsDiv.appendChild(noButton);

  noButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.showModal();
}
