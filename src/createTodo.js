export class Todo {
  constructor(title, description, dueDate, priority, project, checked) {
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
    this.project = project;
    this.checked = checked;
  }

  setChecked(checked) {
    checked === true ? (this.checked = true) : (this.checked = false);
  }

  getChecked() {
    return this.checked;
  }
}
