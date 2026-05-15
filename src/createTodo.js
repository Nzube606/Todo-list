export class Todo {
  constructor(title, description, dueDate, priority, project, checked) {
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
    this.project = project;
    this.checked = checked;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }
  setChecked(checked) {
    checked === true ? (this.checked = true) : (this.checked = false);
  }

  getChecked() {
    return this.checked;
  }
}
