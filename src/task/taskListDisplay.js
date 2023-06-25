import "./taskListDisplay.css";
import {
  projectFunctions,
  elementMaker,
  simpleSvgMaker,
  priorityTagsFunc,
  clearMainContainer,
  taskObjFactoryFunction,
} from "../commonUtilities";
import { format } from "date-fns";

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

  function fillTaskTags(taskPriorityList) {
    const tagListFieldset = elementMaker("fieldset", "tagListFieldset");
    const tagListLegend = elementMaker("legend", "tagListLegend");
    tagListLegend.innerText = "Tags";

    const tagObj = priorityTagsFunc.returnLatestTagObject();
    // based on this list
    for (let index = 0; index < taskPriorityList.length; index++) {
      if (tagObj.has(taskPriorityList[index])) {
        const tagLabel = elementMaker("label");
        tagLabel.innerText = tagObj.get(taskPriorityList[index]) + ", ";
        tagListFieldset.append(tagLabel);
      }
    }
    tagListFieldset.append(tagListLegend);
    return tagListFieldset;
  }

  function fillInCompleteTaskListContainer(projectName) {
    const taskList = returnTaskListFromProject(projectName);
    resetInCompleteTaskListContainer();
    const taskListContainer = document.querySelector(
      ".incompleteTaskContainer"
    );
    for (let i = 0; i < taskList.length; i++) {
      const taskDiv = elementMaker("div", "taskDiv");

      const taskTitle = elementMaker("p", "taskTitle");
      taskTitle.innerText = taskList[i].title;

      // taskOtherDetailContainer
      const taskOtherDetailContainer = elementMaker(
        "div",
        "taskOtherDetailContainer"
      );

      const taskTagContainer = elementMaker("div", "taskTagContainer");
      const taskPriorityList = projectFunctions.returnTaskPriorityList(
        projectName,
        i
      );
      taskTagContainer.append(fillTaskTags(taskPriorityList));

      const taskDateContainer = elementMaker("div", "taskDateContainer");
      const taskDate = projectFunctions.returnTaskDate(projectName, i);
      if (taskDate) {
        taskDateContainer.innerText = format(taskDate, "dd/MM/yyyy");
      }

      taskOtherDetailContainer.append(taskTagContainer, taskDateContainer);

      taskDiv.addEventListener("click", function (event) {
        deletePreviousPopUpContainerDate();
        showTaskDetailInUi(projectName, event, this);
      });

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
      taskDiv.append(taskCheckBox, taskTitle, taskOtherDetailContainer);
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

      const taskTitle = elementMaker("p", "taskTitle");
      taskTitle.innerText = completeTaskList[i].title;

      // taskOtherDetailContainer
      const taskOtherDetailContainer = elementMaker(
        "div",
        "taskOtherDetailContainer"
      );

      const taskTagContainer = elementMaker("div", "taskTagContainer");

      const completeTaskPriorityList =
        projectFunctions.returnCompletedTaskPriorityList(projectName, i);

      taskTagContainer.append(fillTaskTags(completeTaskPriorityList));

      const taskDateContainer = elementMaker("div", "taskDateContainer");
      const taskDate = projectFunctions.returnTaskDateOfCompleteTask(
        projectName,
        i
      );
      if (taskDate) {
        taskDateContainer.innerText = format(taskDate, "dd/MM/yyyy");
      }

      taskOtherDetailContainer.append(taskTagContainer, taskDateContainer);

      taskDiv.addEventListener("click", function (event) {
        deletePreviousPopUpContainerDate();
        showTaskDetailInUi(projectName, event, this, "complete");
      });

      const taskCheckBox = elementMaker("input", `${i}`);
      taskCheckBox.classList.add(projectName);
      taskCheckBox.setAttribute("type", "checkBox");
      taskCheckBox.checked = true;

      taskCheckBox.addEventListener("click", () => {
        projectFunctions.appendFromCompleteProjectListToProjectList(
          projectName,
          i
        );
        taskTitle.addEventListener("click", () => {
          // make a window to display task details
        });
        taskDiv.remove();
        fillInCompleteTaskListContainer(projectName);
      });
      taskDiv.append(taskCheckBox, taskTitle, taskOtherDetailContainer);
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

function deletePreviousPopUpContainerDate() {
  const popUpContainerDate = document.querySelector("#popUpContainerDate");
  if (popUpContainerDate) {
    popUpContainerDate.remove();
  }
}

function makeTaskListView(projectName) {
  console.log("hit");
  clearMainContainer();

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
}

const taskListContainerFuncs = taskListContainerFunc(projectFunctions);

export {
  makeTaskListContainerHeader,
  makeTaskListContainer,
  taskListContainerFuncs,
  makeTaskListView,
};
