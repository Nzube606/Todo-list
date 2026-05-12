import homeIcon from "../Images/favicon.jpg";

export default function homePage() {
  const content = document.querySelector("#content");
  content.textContent = "";

  const homePage = document.createElement("div");
  homePage.id = "home-page";

  const homeImage = document.createElement("img");
  homeImage.src = homeIcon;
  homeImage.alt = "Todo Icon";
  homeImage.style.width = "200px";
  homeImage.style.height = "200px";
  homePage.appendChild(homeImage);

  const homeTitle = document.createElement("h2");
  homeTitle.textContent = "Welcome to Your Todo List";
  homePage.appendChild(homeTitle);

  const homeDescription2 = document.createElement("p");
  homeDescription2.textContent = 'Click the "Add Todo" button to get started.';
  homePage.appendChild(homeDescription2);

  content.appendChild(homePage);
}
