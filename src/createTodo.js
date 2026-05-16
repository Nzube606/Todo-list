export class Todo {
  constructor(title, description, dueDate, priority, project, checked) {
    this._title = title;
    this._dueDate = dueDate;
    this._description = description;
    this._priority = priority;
    this._project = project;
    this._checked = checked;
  }

  setTitle(title) {
    this._title = title;
  }

  getTitle() {
    return this._title;
  }

  setDescription(description) {
    this._description = description;
  }

  getDescription() {
    return this._description;
  }

  setDueDate(dueDate) {
    this._dueDate = dueDate;
  }

  getDueDate() {
    return this._dueDate;
  }

  setPriority(priority) {
    this._priority = priority;
  }

  getPriority() {
    return this._priority;
  }
  setChecked(checked) {
    checked === true ? (this._checked = true) : (this._checked = false);
  }

  getChecked() {
    return this._checked;
  }
  toJSON() {
    // contros what JSON.stringify sees
    return {
      title: this._title,
      description: this._description,
      dueDate: this._dueDate,
      priority: this._priority,
      project: this._project,
      checked: this._checked,
    };
  }

  static fromJSON(obj) {
    return new Todo(
      obj.title,
      obj.description,
      obj.dueDate,
      obj.priority,
      obj.project,
      obj.checked,
    );
  }
}
