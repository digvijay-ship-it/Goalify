import { fillSideBarMainProjectListContainer } from "./makeSideBar/sidebar";
function elementMaker(elementName, elementClass = "") {
  const element = document.createElement(elementName);
  if (elementClass) {
    element.classList.add(elementClass);
  }
  return element;
}

function taskObjFactoryFunction(title, notes = "", dueDate = "") {
  return {
    title,
    notes,
    dueDate,
    subTask: [],
    priorityList: [],
  };
}

function priorityTags() {
  const tagList = ["important", "work"];
  const appendElement = (newTag) => tagList.push(newTag);
  const returnLatestTagList = () => tagList;
  return {
    appendElement,
    returnLatestTagList,
  };
}

function projectList() {
  const projectList = { default: [] };
  const completedProjectList = { default: [] };

  const appendNewProject = (newProjectName) => {
    projectList[newProjectName] = [];
    completedProjectList[newProjectName] = [];
  };
  const returnLatestProjectList = () => projectList;
  const appendNewObj = (projectName, taskObj) => {
    projectList[projectName].push(taskObj);
  };

  const returnLatestCompletedProjectList = () => completedProjectList;
  const appendFromProjectListToCompleteProjectList = (
    projectName,
    taskIndex
  ) => {
    // because splice return arr of removed element instead of plain element
    // we have use index here to take removed element as element instead of arr[removeElement]
    completedProjectList[projectName].push(
      projectList[projectName].splice(taskIndex, 1)[0]
    );
  };
  const appendFromCompleteProjectListToProjectList = (
    projectName,
    taskIndex
  ) => {
    projectList[projectName].push(
      completedProjectList[projectName].splice(taskIndex, 1)[0]
    );
  };
  const clearCompletedProject = (projectName) => {
    completedProjectList[projectName] = [];
  };
  return {
    appendNewProject,
    returnLatestProjectList,
    appendNewObj,
    returnLatestCompletedProjectList,
    appendFromProjectListToCompleteProjectList,
    appendFromCompleteProjectListToProjectList,
    clearCompletedProject,
  };
}

function takeProjectNameFromUserForm() {
  const projectFormDiv = elementMaker("div", "projectFormDiv");
  projectFormDiv.classList.add("hidden");

  const projectFormLabel = elementMaker("label");
  projectFormLabel.setAttribute("for", "projectName");
  projectFormLabel.innerText = "Project Name";
  const projectFormInput = elementMaker("input");
  projectFormInput.setAttribute("id", "projectName");
  projectFormInput.setAttribute("type", "text");

  const buttonDiv = elementMaker("div", "buttonDiv");
  const submitButton = elementMaker("button", "submitButton");
  submitButton.innerText = "Submit";
  const cancelButton = elementMaker("button", "cancelButton");
  cancelButton.innerText = "Cancel";
  buttonDiv.append(submitButton, cancelButton);

  projectFormDiv.append(projectFormLabel, projectFormInput, buttonDiv);
  document.querySelector("body").append(projectFormDiv);
}

function enterProject() {
  const formInput = document.querySelector("#projectName");

  if (formInput.value) {
    projectFunctions.appendNewProject(formInput.value);
  }
  formInput.value = "";
  const projectFormDiv = document.querySelector(".projectFormDiv");
  projectFormDiv.classList.toggle("hidden");

  fillSideBarMainProjectListContainer(
    projectFunctions.returnLatestProjectList()
  );
}

function simpleSvgMaker(svgInternal, className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.innerHTML = svgInternal;
  return svg;
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
    console.log("complete");
    console.log(projectObject);
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

      const taskElement = elementMaker("p");
      taskElement.innerText = taskList[i].title;

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

function makeTaskContainer(projectName) {
  deleteTaskContainer();
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
  inputContainer.append(...makeInputElement(projectName));
  taskContainer.append(taskListContainer, inputContainer);
  document.querySelector(".mainContainer").append(taskContainer);
}

function deleteTaskContainer() {
  const taskContainerToRemove = document.querySelector(".taskContainer");
  if (taskContainerToRemove) {
    taskContainerToRemove.remove();
  }
}

function makeInputElement(projectName) {
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

function makeTaskContainerHeader(projectName) {
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

const priorityTagsFunc = priorityTags();
const projectFunctions = projectList();
const taskListContainerFuncs = taskListContainerFunc(projectFunctions);
export {
  elementMaker,
  priorityTagsFunc,
  taskObjFactoryFunction,
  takeProjectNameFromUserForm,
  projectFunctions,
  enterProject,
  simpleSvgMaker,
  taskListContainerFuncs,
  makeTaskContainer,
  makeTaskContainerHeader,
};
