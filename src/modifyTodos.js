import projectPage from "./projectPage.js";
export function editTodo(arrayItem) {
  const content = document.querySelector("#content");
  const dialog = document.createElement("dialog");
  content.appendChild(dialog);

  const form = document.createElement("form");
  form.method = "dialog";
  dialog.appendChild(form);

  const titleLabel = document.createElement("label");
  titleLabel.htmlFor = "newTitle";
  titleLabel.textContent = "Enter new title: ";
  form.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.id = "newTitle";
  titleInput.placeholder = "Enter new title";
  titleInput.name = "newTitle";
  form.appendChild(titleInput);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  descriptionLabel.htmlFor = "todo-description";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "todo-description";
  descriptionInput.placeholder = "Edit description";

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
  priorityLabel.textContent = "Edit priority: ";
  priorityLabel.htmlFor = "todo-priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.id = "todo-priority";
  prioritySelect.name = "priority";
  let getPriority = arrayItem.getPriority();
  prioritySelect.value = getPriority;

  const priorities = ["Low", "Medium", "High"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority.toLowerCase();
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  form.appendChild(priorityLabel);
  form.appendChild(prioritySelect);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("button-container");

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    let getTitle, getDescription, getDueDate;
    !titleInput.value || titleInput.value.trim() === ""
      ? (getTitle = arrayItem.getTitle())
      : (getTitle = titleInput.value);
    !descriptionInput.value || descriptionInput.value.trim() === ""
      ? (getDescription = arrayItem.getDescription())
      : (getDescription = descriptionInput.value);
    !dueDateInput.value || isNaN(dueDateInput.value)
      ? (getDueDate = arrayItem.getDueDate())
      : (getDueDate = dueDateInput.value);

    arrayItem.setTitle(getTitle);
    arrayItem.setDescription(getDescription);
    arrayItem.setDueDate(getDueDate);
    arrayItem.setPriority(prioritySelect.value);
    projectPage();
  });
  btnContainer.appendChild(cancelButton);
  btnContainer.appendChild(saveButton);

  form.appendChild(btnContainer);

  dialog.showModal();
}
export function deleteTodo(array, object) {
  const content = document.querySelector("#content");
  const dialog = document.createElement("dialog");
  content.appendChild(dialog);

  const form = document.createElement("form");
  const deleteQuery = document.createElement("p");
  deleteQuery.id = "delete-query";
  deleteQuery.textContent = " Are you sure you want to delete this todo?";
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
    const index = array.findIndex((todo) => todo.title === object.title);

    if (index !== -1) {
      array.splice(index, 1);
      dialog.close();
      projectPage();
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
