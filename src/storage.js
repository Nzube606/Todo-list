import { Todo } from "./createTodo.js";
function restoreProjects(parsed) {
  return parsed.map((project) => ({
    ...project,
    todos: project.todos.map((todoData) => Todo.fromJSON(todoData)),
  }));
}

export function loadProject() {
  const raw = localStorage.getItem("projects");
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return restoreProjects(parsed);
}

export function saveProject(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
