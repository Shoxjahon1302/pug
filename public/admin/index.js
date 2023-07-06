const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}
let getStatus = localStorage.getItem("mode");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});
const subMenu = document.getElementById("subMenu");
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}
window.onclick = (event) => {
  if (!event.target.matches(".btn")) {
    if (subMenu.classList.contains("open-menu")) {
      subMenu.classList.remove("open-menu");
    }
  }
};
subMenu.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
});
fetch("/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const html = data
      .map(
        (item) => `
       <tr>
        <th>${item.id}</th>
        <th>${item.first_name}</th>
        <th>${item.email}</th>
        <th>${item.Shohjaxon}</th>
       </tr>`
      )
      .join("");
    document.getElementById("myList").innerHTML = html;
  })
  .catch((error) => {
    console.log("Error:", error);
  });

function changeColor(element) {
  element.classList.toggle("clicked");
}
