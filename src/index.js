import "./index.css";
import { makeSidebar } from "./makeSideBar/sidebar.js";
import {
  elementMaker,
  takeProjectNameFromUserForm,
  enterProject,
  taskObjFactoryFunction,
  projectFunctions,
  taskListContainerFuncs,
  makeTaskContainer,
  makeTaskContainerHeader,
} from "./commonUtilities";

makeSidebar();
takeProjectNameFromUserForm();
let mainContainer = elementMaker("div", "mainContainer");
document.querySelector("body").append(mainContainer);

document.querySelector(".addProjectIcon").addEventListener("click", () => {
  const projectFormDiv = document.querySelector(".projectFormDiv");
  projectFormDiv.classList.toggle("hidden");
});

document.querySelector(".submitButton").addEventListener("click", enterProject);

document.querySelector(".cancelButton").addEventListener("click", () => {
  const projectFormDiv = document.querySelector(".projectFormDiv");
  projectFormDiv.classList.toggle("hidden");
});

document.querySelector(".To-Do").addEventListener("click", () => {
  const projectName = "default";
  makeTaskContainerHeader(projectName);
  taskListContainerFuncs.fillInCompleteTaskListContainer(projectName);
  taskListContainerFuncs.fillCompleteTaskListContainer(projectName);
  makeTaskContainer(projectName);

  document.querySelector(".inputButton").addEventListener("click", function () {
    const inputValue = document.querySelector(".taskTitleInput").value;
    if (inputValue) {
      const projectName = this.id;

      const newTaskObj = taskObjFactoryFunction(inputValue);
      projectFunctions.appendNewObj(projectName, newTaskObj);

      document.querySelector(".taskTitleInput").value = ""; // Reset the input field by assigning an empty string to its value

      taskListContainerFuncs.fillInCompleteTaskListContainer(projectName);
      taskListContainerFuncs.fillCompleteTaskListContainer(projectName);
    }
  });
});
