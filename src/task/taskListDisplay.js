import "./taskListDisplay.css";
import {
  projectFunctions,
  elementMaker,
  simpleSvgMaker,
} from "../commonUtilities";
import { showTaskDetailInUi } from "./taskIndividualDisplay.js";

function makeTaskListContainerHeader(projectName) {
  const taskContainerHeaderChecker = document.querySelector(
    ".taskContainerHeader"
  );
  if (taskContainerHeaderChecker) {
    taskContainerHeaderChecker.remove();
  }
  const taskContainerHeader = elementMaker("div", "taskContainerHeader");

  const ProjectNameInHeader = elementMaker("h2");
  ProjectNameInHeader.innerText = projectName;
  const clearCompletedTasksButton = elementMaker(
    "button",
    "clearCompletedTasksButton"
  );
  clearCompletedTasksButton.setAttribute("type", "button");
  clearCompletedTasksButton.innerText = "Clear completed tasks";

  taskContainerHeader.append(ProjectNameInHeader, clearCompletedTasksButton);
  document.querySelector(".mainContainer").append(taskContainerHeader);

  // make an eventListener for .clearCompletedTasksButton
  clearCompletedTasksButton.addEventListener("click", () => {
    projectFunctions.clearCompletedProject(projectName); // to clear it from BackEnd
    taskListContainerFuncs.fillCompleteTaskListContainer(projectName); // and Reload .completedTaskContainer
  });
}
function makeTaskListContainer(projectName) {
  deleteTaskListContainer();
  const taskContainer = elementMaker("div", "taskContainer");

  const taskListContainer = elementMaker("div", "taskListContainer"); //	one for task List
  taskListContainer.classList.add(projectName);

  const incompleteTaskContainer = elementMaker(
    "div",
    "incompleteTaskContainer"
  );
  const completedTaskContainer = elementMaker("div", "completedTaskContainer");

  const inputContainer = elementMaker("div", "inputContainer");

  taskListContainer.append(incompleteTaskContainer, completedTaskContainer);
  inputContainer.append(...makeInputElementForTaskList(projectName));
  taskContainer.append(taskListContainer, inputContainer);
  document.querySelector(".mainContainer").append(taskContainer);
}

function deleteTaskListContainer() {
  const taskContainerToRemove = document.querySelector(".taskContainer");
  if (taskContainerToRemove) {
    taskContainerToRemove.remove();
  }
}

function makeInputElementForTaskList(projectName) {
  const inputElement = elementMaker("input", "taskTitleInput");

  const inputButton = elementMaker("button", "inputButton");
  inputButton.id = projectName;
  // add class to Svg so that when clicked on it it will take input from string and make task Obj
  const uploadSvg = simpleSvgMaker(
    '<title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />'
  );
  inputButton.append(uploadSvg);
  return [inputElement, inputButton];
}

function taskListContainerFunc(project) {
  function resetInCompleteTaskListContainer() {
    const incompleteTaskContainer = document.querySelector(
      ".incompleteTaskContainer"
    );
    if (incompleteTaskContainer) {
      incompleteTaskContainer.innerText = "";
    }
  }
  function resetCompleteTaskListContainer() {
    const completedTaskContainer = document.querySelector(
      ".completedTaskContainer"
    );
    if (completedTaskContainer) {
      completedTaskContainer.innerText = "";
    }
  }
  function returnTaskListFromProject(projectName) {
    const projectObject = project.returnLatestProjectList();
    return projectObject[projectName];
  }
  function returnTaskListFromCompleteProject(projectName) {
    const projectObject = project.returnLatestCompletedProjectList();
    return projectObject[projectName];
  }
  function returnInCompleteTaskListBasedOnProject(projectName) {
    const projectObject = project.returnLatestCompletedProjectList();
    return projectObject[projectName];
  }
  function fillInCompleteTaskListContainer(projectName) {
    const taskList = returnTaskListFromProject(projectName);
    resetInCompleteTaskListContainer();
    const taskListContainer = document.querySelector(
      ".incompleteTaskContainer"
    );
    for (let i = 0; i < taskList.length; i++) {
      const taskDiv = elementMaker("div", "taskDiv");

      const taskElement = elementMaker("p", "taskTitle");
      taskElement.innerText = taskList[i].title;

      taskElement.addEventListener(
        "click",
        showTaskDetailInUi.bind(null, projectName)
      );

      const taskCheckBox = elementMaker("input", `${i}`);
      taskCheckBox.classList.add(projectName);
      taskCheckBox.setAttribute("type", "checkBox");

      taskCheckBox.addEventListener("click", () => {
        projectFunctions.appendFromProjectListToCompleteProjectList(
          projectName,
          i
        );

        taskDiv.remove();
        fillCompleteTaskListContainer(projectName);
      });
      taskDiv.append(taskCheckBox, taskElement);
      taskListContainer.append(taskDiv);
    }
  }

  function fillCompleteTaskListContainer(projectName) {
    const completeTaskList = returnTaskListFromCompleteProject(projectName);
    const completedTaskContainer = document.querySelector(
      ".completedTaskContainer"
    );
    resetCompleteTaskListContainer();
    for (let i = 0; i < completeTaskList.length; i++) {
      const taskDiv = elementMaker("div", "taskDiv");
      const taskElement = elementMaker("p");

      taskElement.innerText = completeTaskList[i].title;

      const taskCheckBox = elementMaker("input", `${i}`);
      taskCheckBox.classList.add(projectName);
      taskCheckBox.setAttribute("type", "checkBox");
      taskCheckBox.checked = true;

      taskCheckBox.addEventListener("click", () => {
        projectFunctions.appendFromCompleteProjectListToProjectList(
          projectName,
          i
        );
        taskElement.addEventListener("click", () => {
          // make a window to display task details
        });
        taskDiv.remove();
        fillInCompleteTaskListContainer(projectName);
      });

      taskDiv.append(taskCheckBox, taskElement);
      completedTaskContainer.append(taskDiv);
    }
  }
  return {
    resetInCompleteTaskListContainer,
    resetCompleteTaskListContainer,
    returnTaskListFromProject,
    fillInCompleteTaskListContainer,
    fillCompleteTaskListContainer,
    returnInCompleteTaskListBasedOnProject,
  };
}

const taskListContainerFuncs = taskListContainerFunc(projectFunctions);

export {
  makeTaskListContainerHeader,
  makeTaskListContainer,
  taskListContainerFuncs,
};
