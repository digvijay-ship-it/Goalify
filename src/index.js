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
  makeTaskContainer(projectName);

  // now whenever an string is entered create a task obj enter it into related property
  document.querySelector(".inputButton").addEventListener("click", function () {
    const projectName = this.id;
    // take input from inputField and reset it
    const inputValue = document.querySelector(".taskTitleInput").value;
    const taskObj = taskObjFactoryFunction(inputValue);
    projectFunctions.appendNewObj(projectName, taskObj);

    document.querySelector(".taskTitleInput").value = ""; // Reset the input field by assigning an empty string to its value
    // then update .taskListContainer
    taskListContainerFuncs.fillTaskListContainer(
      taskListContainerFuncs.returnTaskListBasedOnProject(projectName)
    );
  });
});
