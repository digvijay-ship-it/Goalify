import "./index.css";
import { makeSidebar } from "./makeSideBar/sidebar.js";
import { elementMaker } from "./commonUtilities";
import { takeProjectNameFromUserForm } from "./form-for-project/form";
import { makeTaskListView } from "./task/taskListDisplay";

makeSidebar();

let mainContainer = elementMaker("div", "mainContainer");
document.querySelector("body").append(mainContainer);

document.querySelector(".addProjectIcon").addEventListener("click", () => {
  takeProjectNameFromUserForm();
});

document.querySelector(".To-Do").addEventListener("click", () => {
  const projectName = "default";
  makeTaskListView(projectName);
});
