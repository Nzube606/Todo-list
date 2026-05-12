export default function addTodoPage() {
  const content = document.querySelector("#content");
  content.textContent = "";

  const addTodoDialog = document.createElement("dialog");
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
  addTodoDialog.appendChild(form);

  const body = document.querySelector("body");
  body.appendChild(addTodoDialog);

  addTodoDialog.showModal();
  //   content.appendChild(addTodoDialog);
}
