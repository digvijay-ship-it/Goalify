import "./index.css";
import { makeSidebar } from "./makeSideBar/sidebar.js";
import {
  elementMaker,
  taskObjFactoryFunction,
  projectFunctions,
} from "./commonUtilities";
import {
  takeProjectNameFromUserForm,
  enterProject,
} from "./form-for-project/form";
import {
  makeTaskListContainerHeader,
  makeTaskListContainer,
  taskListContainerFuncs,
} from "./task/taskListDisplay";

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

  makeTaskListContainerHeader(projectName);

  makeTaskListContainer(projectName);

  taskListContainerFuncs.fillInCompleteTaskListContainer(projectName);
  taskListContainerFuncs.fillCompleteTaskListContainer(projectName);

  document.querySelector(".inputButton").addEventListener("click", function () {
    const taskTitle = document.querySelector(".taskTitleInput").value;
    if (taskTitle) {
      const projectName = this.id;

      const newTaskObj = taskObjFactoryFunction(taskTitle);
      projectFunctions.appendNewObj(projectName, newTaskObj);

      document.querySelector(".taskTitleInput").value = ""; // Reset the input field by assigning an empty string to its value

      taskListContainerFuncs.fillInCompleteTaskListContainer(projectName);
      taskListContainerFuncs.fillCompleteTaskListContainer(projectName);
    }
  });
});
// when a we click on taskDiv it should open a related task where we can do some changes in it
