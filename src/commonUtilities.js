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
    subTaskList: [],
    completeSubTaskList: [],
    priorityList: [],
  };
}

function priorityTags() {
  const tagList = ["important", "work", "Any day", "Urgent"];
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
  const addSubTaskToTask = (projectName, taskIndex, subTask) => {
    projectList[projectName][taskIndex].subTaskList.push(subTask);
  };
  const returnSubtaskList = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].subTaskList;
  };
  const returnCompleteSubtaskList = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].completeSubTaskList;
  };

  const updateSubTask = (projectName, taskIndex, subTaskIndex, subTask) => {
    projectList[projectName][taskIndex].subTaskList[subTaskIndex] = subTask;
  };

  const updateTaskTitle = (projectName, taskIndex, newTitle) => {
    projectList[projectName][taskIndex].title = newTitle;
  };

  const updateTaskDescription = (projectName, taskIndex, desc) => {
    projectList[projectName][taskIndex].notes = desc;
  };

  const returnTaskDescription = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].notes;
  };

  const addDateToTask = (projectName, taskIndex, date) => {
    projectList[projectName][taskIndex].dueDate = date;
  };

  const insertFromSubtaskListToCompletedSubTaskList = (
    projectName,
    taskIndex,
    subTaskIndex
  ) => {
    projectList[projectName][taskIndex].completeSubTaskList.push(
      projectList[projectName][taskIndex].subTaskList.splice(subTaskIndex, 1)[0]
    );
  };

  const insertFromCompleteSubtaskListToSubTaskList = (
    projectName,
    taskIndex,
    subTaskIndex
  ) => {
    projectList[projectName][taskIndex].subTaskList.push(
      projectList[projectName][taskIndex].completeSubTaskList.splice(
        subTaskIndex,
        1
      )[0]
    );
  };

  const returnTaskDate = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].dueDate;
  };

  return {
    appendNewProject,
    returnLatestProjectList,
    appendNewObj,
    returnLatestCompletedProjectList,
    appendFromProjectListToCompleteProjectList,
    appendFromCompleteProjectListToProjectList,
    clearCompletedProject,
    addSubTaskToTask,
    returnSubtaskList,
    returnCompleteSubtaskList,
    updateSubTask,
    insertFromSubtaskListToCompletedSubTaskList,
    insertFromCompleteSubtaskListToSubTaskList,
    updateTaskTitle,
    addDateToTask,
    returnTaskDate,
    updateTaskDescription,
    returnTaskDescription,
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
