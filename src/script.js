import "./style.css";
import homePage from "./home.js";
import addTodoPage from "./addTodo.js";
import projectPage from "./projectPage.js";

homePage();

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", homePage);
console.log("Hello, World!");

const addTodoButton = document.getElementById("add-todo");
addTodoButton.addEventListener("click", addTodoPage);

const projectButton = document.getElementById("projects");
projectButton.addEventListener("click", projectPage);
