function elementMaker(elementName, elementClass = "") {
  const element = document.createElement(elementName);
  if (elementClass) {
    element.classList.add(elementClass);
  }
  return element;
}

function clearMainContainer() {
  const mainContainer = document.querySelector(".mainContainer");
  mainContainer.innerText = "";
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
  let tagObject = new Map();
  tagObject.set(0, "Important");
  tagObject.set(1, "Work");
  tagObject.set(2, "Urgent");
  tagObject.set(3, "Priority");
  tagObject.set(4, "Family");

  const appendNewTag = (indexNumber, newTag) => {
    tagObject.set(indexNumber, newTag);
    getAssetsToLocal();
  };
  const returnLatestTagObject = () => {
    return tagObject;
  };

  const setTagObject = (newTagObject) => {
    tagObject = newTagObject;
  };

  const deleteOneTagObjectProperty = (propertyName) => {
    const propertyNameInt = parseInt(propertyName);
    tagObject.delete(propertyNameInt);
    getAssetsToLocal();
  };
  return {
    appendNewTag,
    returnLatestTagObject,
    deleteOneTagObjectProperty,
    setTagObject,
  };
}

function projectList() {
  let projectList = { default: [] };
  let completedProjectList = { default: [] };

  const appendNewProject = (newProjectName) => {
    projectList[newProjectName] = [];
    completedProjectList[newProjectName] = [];
    getAssetsToLocal();
  };
  const returnLatestProjectList = () => projectList;
  const setLatestProjectList = (newProjectList) => {
    projectList = newProjectList;
  };

  const appendNewTaskObj = (projectName, taskObj) => {
    projectList[projectName].push(taskObj);
    getAssetsToLocal();
  };

  const returnLatestCompletedProjectList = () => completedProjectList;
  const setLatestCompletedProjectList = (newCompletedProjectList) => {
    completedProjectList = newCompletedProjectList;
  };
  const appendFromProjectListToCompleteProjectList = (
    projectName,
    taskIndex
  ) => {
    // because splice return arr of removed element instead of plain element
    // we have use index here to take removed element as element instead of arr[removeElement]
    completedProjectList[projectName].push(
      projectList[projectName].splice(taskIndex, 1)[0]
    );
    getAssetsToLocal();
  };
  const appendFromCompleteProjectListToProjectList = (
    projectName,
    taskIndex
  ) => {
    projectList[projectName].push(
      completedProjectList[projectName].splice(taskIndex, 1)[0]
    );
    getAssetsToLocal();
  };

  const clearCompletedProject = (projectName) => {
    completedProjectList[projectName] = [];
    getAssetsToLocal();
  };

  const addSubTaskToTask = (projectName, taskIndex, subTask) => {
    projectList[projectName][taskIndex].subTaskList.push(subTask);
    getAssetsToLocal();
  };

  const returnSubtaskList = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].subTaskList;
  };
  const returnSubtaskListOfCompletedTask = (projectName, taskIndex) => {
    return completedProjectList[projectName][taskIndex].subTaskList;
  };

  const returnCompleteSubtaskList = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].completeSubTaskList;
  };
  const returnCompleteSubtaskListOfCompletedTask = (projectName, taskIndex) => {
    return completedProjectList[projectName][taskIndex].completeSubTaskList;
  };

  const updateSubTask = (projectName, taskIndex, subTaskIndex, subTask) => {
    projectList[projectName][taskIndex].subTaskList[subTaskIndex] = subTask;
    getAssetsToLocal();
  };

  const updateTaskTitle = (projectName, taskIndex, newTitle) => {
    projectList[projectName][taskIndex].title = newTitle;
    getAssetsToLocal();
  };

  const updateTaskDescription = (projectName, taskIndex, desc) => {
    projectList[projectName][taskIndex].notes = desc;
    getAssetsToLocal();
  };

  const returnTaskDescription = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].notes;
  };

  const returnTaskDescriptionOfCompletedTask = (projectName, taskIndex) => {
    return completedProjectList[projectName][taskIndex].notes;
  };

  const returnTaskPriorityList = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].priorityList;
  };

  const returnCompletedTaskPriorityList = (projectName, taskIndex) => {
    return completedProjectList[projectName][taskIndex].priorityList;
  };

  const addDateToTask = (projectName, taskIndex, date) => {
    projectList[projectName][taskIndex].dueDate = date;
    getAssetsToLocal();
  };

  const insertFromSubtaskListToCompletedSubTaskList = (
    projectName,
    taskIndex,
    subTaskIndex
  ) => {
    projectList[projectName][taskIndex].completeSubTaskList.push(
      projectList[projectName][taskIndex].subTaskList.splice(subTaskIndex, 1)[0]
    );
    getAssetsToLocal();
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
    getAssetsToLocal();
  };

  const returnTaskDate = (projectName, taskIndex) => {
    return projectList[projectName][taskIndex].dueDate;
  };
  const returnTaskDateOfCompleteTask = (projectName, taskIndex) => {
    return completedProjectList[projectName][taskIndex].dueDate;
  };

  const deleteTagFromTaskList = (projectName, taskIndex, tagValue) => {
    const indexOfTagValue = projectList[projectName][
      taskIndex
    ].priorityList.indexOf(parseInt(tagValue));

    if (indexOfTagValue !== -1 || indexOfTagValue === 0) {
      projectList[projectName][taskIndex].priorityList.splice(
        indexOfTagValue,
        1
      );
    }
    getAssetsToLocal();
  };
  const addTagToTaskList = (projectName, taskIndex, id) => {
    projectList[projectName][taskIndex].priorityList.push(parseInt(id));
    getAssetsToLocal();
  };

  return {
    setLatestProjectList,
    setLatestCompletedProjectList,
    appendNewProject,
    returnLatestProjectList,
    appendNewTaskObj,
    returnLatestCompletedProjectList,
    appendFromProjectListToCompleteProjectList,
    appendFromCompleteProjectListToProjectList,
    clearCompletedProject,
    addSubTaskToTask,
    returnSubtaskList,
    returnSubtaskListOfCompletedTask,
    returnCompleteSubtaskList,
    returnCompleteSubtaskListOfCompletedTask,
    updateSubTask,
    insertFromSubtaskListToCompletedSubTaskList,
    insertFromCompleteSubtaskListToSubTaskList,
    updateTaskTitle,
    addDateToTask,
    returnTaskDate,
    returnTaskDateOfCompleteTask,
    updateTaskDescription,
    returnTaskDescription,
    returnTaskDescriptionOfCompletedTask,
    returnTaskPriorityList,
    returnCompletedTaskPriorityList,
    deleteTagFromTaskList,
    addTagToTaskList,
  };
}

function simpleSvgMaker(svgInternal, className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.innerHTML = svgInternal;
  return svg;
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return storage;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const priorityTagsFunc = priorityTags();
const projectFunctions = projectList();

if (storageAvailable("localStorage")) {
  if (window.localStorage && Object.keys(window.localStorage).length > 0) {
    storeAssetsFromLocal();
  } // then reassign back to the respected
  else {
    getAssetsToLocal();
  }
}

function storeAssetsFromLocal() {
  const originalPriorityObj = new Map(
    JSON.parse(localStorage.getItem("priorityObj"))
  );

  priorityTagsFunc.setTagObject(originalPriorityObj);
  projectFunctions.setLatestProjectList(
    JSON.parse(localStorage.getItem("projectObject"))
  );
  projectFunctions.setLatestCompletedProjectList(
    JSON.parse(localStorage.getItem("completedProjectObject"))
  );
}

function getAssetsToLocal() {
  // then make a function to save projectList, completedProjectList, tagObject
  const projectObject = JSON.stringify(
    projectFunctions.returnLatestProjectList()
  );
  const completedProjectObject = JSON.stringify(
    projectFunctions.returnLatestCompletedProjectList()
  );

  const priorityObj = JSON.stringify([
    ...priorityTagsFunc.returnLatestTagObject(),
  ]);

  localStorage.setItem("projectObject", projectObject);
  localStorage.setItem("completedProjectObject", completedProjectObject);
  localStorage.setItem("priorityObj", priorityObj);
}

export {
  elementMaker,
  priorityTagsFunc,
  taskObjFactoryFunction,
  projectFunctions,
  simpleSvgMaker,
  clearMainContainer,
};
