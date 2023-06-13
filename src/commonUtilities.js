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
  const appendNewProject = (newProjectName) =>
    (projectList[newProjectName] = []);
  const returnLatestProjectList = () => projectList;
  const appendNewObj = (projectName, taskObj) => {
    projectList[projectName].push(taskObj);
  };
  return {
    appendNewProject,
    returnLatestProjectList,
    appendNewObj,
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
  // const project = project;
  function resetTaskListContainer() {
    // reset taskListContainer
    const taskListContainer = document.querySelector(".taskListContainer");
    taskListContainer.innerText = "";
  }
  function returnTaskListBasedOnProject(projectName) {
    // get og object
    // then from that obj get list you want
    const projectObject = project.returnLatestProjectList();
    return projectObject[projectName];
  }
  function fillTaskListContainer(taskList, projectName) {
    const taskListContainer = document.querySelector(".taskListContainer");
    taskListContainer.innerText = "";
    for (let i = 0; i < taskList.length; i++) {
      // make element and insert it one by one in taskListContainer
      const task = elementMaker("div", projectName);
      task.innerText = taskList[i].title;
      taskListContainer.append(task);
      console.log(taskList[i].title);
    }
  }
  return {
    resetTaskListContainer,
    returnTaskListBasedOnProject,
    fillTaskListContainer,
  };
}

function makeTaskContainer(projectName) {
  deleteTaskContainer();
  const taskContainer = elementMaker("div", "taskContainer");

  // two divs
  const taskListContainer = elementMaker("div", "taskListContainer"); //	one for task List
  const inputContainer = elementMaker("div", "inputContainer"); // one for input list

  inputContainer.append(...makeInputElement(projectName));
  taskContainer.append(taskListContainer, inputContainer); // then insert these two in myDayContainer
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
};
