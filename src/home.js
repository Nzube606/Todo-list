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

  const homeDescriptions = [
    'Click the "Add Todo" button to get started.',
    'Click on "Projects" to see you existing todos',
  ];
  const homeDescriptionsUl = document.createElement("ul");
  homeDescriptionsUl.classList.add("home-description");
  homeDescriptions.forEach((homeDescription) => {
    const li = document.createElement("li");
    li.textContent = homeDescription;
    homeDescriptionsUl.appendChild(li);
  });
  homePage.appendChild(homeDescriptionsUl);

  content.appendChild(homePage);
}
