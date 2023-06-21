import "./taskIndividualDisplay.css";
import {
  elementMaker,
  simpleSvgMaker,
  projectFunctions,
} from "../commonUtilities";

import {
  tasKDetailViewHeader,
  tasKDetailViewTitle,
  taskDetailViewDate,
  taskDetailViewDescription,
} from "./taskDetailViewDependency";

function showTaskDetailInUi(projectName, event) {
  // make a window to display and edit task details
  const previousSibling = event.target.previousElementSibling;
  const taskIndex = previousSibling.classList.item(0);

  const taskDetailsContainer = elementMaker("div", "taskDetailsContainer");

  // // // enter header container with projectName and a button to close
  const taskDetailHeaderContainer = tasKDetailViewHeader(projectName);

  // // // container to edit title
  const taskNameUpdate = tasKDetailViewTitle(
    event.target.textContent,
    projectName,
    taskIndex
  );

  const dateContainer = elementMaker("div", "dateContainer");

  // // // container to edit description
  const descContainer = elementMaker("div", "descContainer");

  // // // container to add subTask
  const preSubTaskContainer = elementMaker("div", "preSubTaskContainer");

  const preSubTaskDiv = elementMaker("div", "preSubTaskDiv");
  const preCompletedSubTaskDiv = elementMaker("div", "preCompletedSubTaskDiv");

  preSubTaskContainer.append(preSubTaskDiv, preCompletedSubTaskDiv);

  const newTempSubTaskDiv = elementMaker("div", "newTempSubTaskDiv");

  const subTaskContainer = elementMaker("div", "subTaskContainer");
  const subTaskInput = elementMaker("input", "subTaskInput");

  const plusIcon = simpleSvgMaker(
    '<title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />'
  );
  // add event Listener to subTaskDiv to create new subtask pair but check if last one has some value
  subTaskInput.setAttribute("placeholder", "Add sub task");
  subTaskInput.disabled = true;
  subTaskContainer.append(plusIcon, subTaskInput);
  subTaskContainer.addEventListener(
    "click",
    addTempSubTask.bind(this, projectName, taskIndex)
  );
  taskDetailsContainer.append(
    taskDetailHeaderContainer,
    taskNameUpdate,
    dateContainer,
    descContainer,
    preSubTaskContainer,
    newTempSubTaskDiv,
    subTaskContainer
  );

  document.querySelector(".mainContainer").append(taskDetailsContainer);

  // // // container to edit date, priority
  taskDetailViewDate(projectName, taskIndex);
  taskDetailViewDescription(projectName, taskIndex);

  reloadCompleteSubTaskDiv(projectName, taskIndex);
  reloadInCompleteSubTaskDiv(projectName, taskIndex);
}
function addTempSubTask(projectName, taskIndex) {
  // check if last childSubTaskDiv' input element one has some value
  const newTempSubTaskDiv = document.querySelector(".newTempSubTaskDiv");
  if (!newTempSubTaskDiv.innerHTML) {
    // to create new subtask pair
    const tempInput = elementMaker("input", "tempSubTask");
    tempInput.classList.add(projectName);
    tempInput.classList.add(taskIndex);
    newTempSubTaskDiv.append(tempInput);

    tempInput.addEventListener("blur", addSubTask);
  }
  function addSubTask(event) {
    const projectName = event.target.classList[1];
    const taskIndex = event.target.classList[2];
    if (event.target.value) {
      // inset value in respected Task's subTaskList
      projectFunctions.addSubTaskToTask(
        projectName,
        taskIndex,
        event.target.value
      );

      // reload preSubTaskDiv with new values
      reloadInCompleteSubTaskDiv(projectName, taskIndex);
    }
    event.target.parentNode.innerText = "";
  }
}

function reloadInCompleteSubTaskDiv(projectName, taskIndex) {
  const preSubTaskDiv = document.querySelector(".preSubTaskDiv");
  preSubTaskDiv.innerText = "";
  const subTaskList = projectFunctions.returnSubtaskList(
    projectName,
    taskIndex
  );
  for (let index = 0; index < subTaskList.length; index++) {
    const wrapper = subTaskMaker(
      projectName,
      taskIndex,
      index,
      subTaskList[index]
    );

    const checkbox = wrapper.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("click", () => {
      // when checkBox is clicked remove that sub task from current
      // and insert in opposite subtaskList and reload all
      projectFunctions.insertFromSubtaskListToCompletedSubTaskList(
        projectName,
        taskIndex,
        index
      );
      reloadInCompleteSubTaskDiv(projectName, taskIndex);
      reloadCompleteSubTaskDiv(projectName, taskIndex);
    });

    const inputBox = wrapper.querySelector(":last-child");
    inputBox.addEventListener("blur", () => {
      if (inputBox.value) {
        // saveChanges in backEnd;
        projectFunctions.updateSubTask(
          projectName,
          taskIndex,
          index,
          inputBox.value
        );
      }
    });

    preSubTaskDiv.append(wrapper);
  }
}

function reloadCompleteSubTaskDiv(projectName, taskIndex) {
  const preSubTaskDiv = document.querySelector(".preCompletedSubTaskDiv");
  preSubTaskDiv.innerText = "";
  const subTaskList = projectFunctions.returnCompleteSubtaskList(
    projectName,
    taskIndex
  );
  for (let index = 0; index < subTaskList.length; index++) {
    //
    const wrapper = subTaskMaker(
      projectName,
      taskIndex,
      index,
      subTaskList[index]
    );

    const checkbox = wrapper.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("click", () => {
      projectFunctions.insertFromCompleteSubtaskListToSubTaskList(
        projectName,
        taskIndex,
        index
      );
      reloadInCompleteSubTaskDiv(projectName, taskIndex);
      reloadCompleteSubTaskDiv(projectName, taskIndex);
    });

    const inputBox = wrapper.querySelector(":last-child");
    inputBox.disabled = true;

    const crossLine = elementMaker("hr", "crossLine");
    wrapper.append(crossLine);

    preSubTaskDiv.append(wrapper);
  }
}

function subTaskMaker(projectName, taskIndex, subTaskIndex, subTaskValue) {
  const wrapper = elementMaker("div", "inputWrapper");
  wrapper.classList.add(projectName);
  wrapper.classList.add(taskIndex);

  // checkBox input of wrapper
  const checkBox = elementMaker("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add(subTaskIndex);

  //input area of
  const subTaskInput = elementMaker("input", "subTaskInput");
  subTaskInput.classList.add(subTaskIndex);
  subTaskInput.value = subTaskValue;

  wrapper.append(checkBox, subTaskInput);
  return wrapper;
}

export { showTaskDetailInUi };
