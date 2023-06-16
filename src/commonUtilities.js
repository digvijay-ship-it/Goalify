import { enterProject } from "./form-for-project/form";
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

function simpleSvgMaker(svgInternal, className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.innerHTML = svgInternal;
  return svg;
}

const priorityTagsFunc = priorityTags();
const projectFunctions = projectList();
export {
  elementMaker,
  priorityTagsFunc,
  taskObjFactoryFunction,
  projectFunctions,
  simpleSvgMaker,
};
