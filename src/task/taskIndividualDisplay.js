import "./taskIndividualDisplay.css";
import {
  elementMaker,
  simpleSvgMaker,
  projectFunctions,
  priorityTagsFunc,
} from "../commonUtilities";

import {
  tasKDetailViewHeader,
  tasKDetailViewTitle,
  taskDetailViewDate,
  taskDetailViewDescription,
} from "./taskDetailViewDependency";

function deleteExistingPriorityMultiSelectContainer() {
  const priorityMultiSelectContainerChecker = document.querySelector(
    ".priorityMultiSelectContainer"
  );
  if (priorityMultiSelectContainerChecker) {
    priorityMultiSelectContainerChecker.remove();
  }
}

function showTaskDetailInUi(projectName, event, element, taskStatus) {
  // make a window to display and edit task details
  const firstChild = element.querySelector(":first-child");
  if (!(event.target === firstChild)) {
    const taskIndex = firstChild.classList.item(0);

    const taskDetailViewContainer = elementMaker(
      "div",
      "taskDetailViewContainer"
    );

    const taskDetailsContainer = elementMaker("div", "taskDetailsContainer");

    if (taskStatus === "complete") {
      taskDetailsContainer.classList.add("CompletedTask");
    }

    // // // enter header container with projectName and a button to close
    const taskDetailHeaderContainer = tasKDetailViewHeader(projectName);

    // // // container to edit title
    const taskNameUpdate = tasKDetailViewTitle(
      event.target.textContent,
      projectName,
      taskIndex
    );

    const TaskDetailButtonContainer = elementMaker(
      "div",
      "TaskDetailButtonContainer"
    );

    const dateContainer = elementMaker("div", "dateContainer");
    const createPriorityContainerButton = elementMaker(
      "button",
      "createPriorityContainerButton"
    );
    createPriorityContainerButton.innerText = "Set priority";

    createPriorityContainerButton.addEventListener("click", () => {
      const mainContainer = document.querySelector(".mainContainer");

      // delete the container if exit
      deleteExistingPriorityMultiSelectContainer();

      // make container
      const priorityMultiSelectContainer = elementMaker(
        "div",
        "priorityMultiSelectContainer"
      );
      const priorityObj = priorityTagsFunc.returnLatestTagObject();
      // // in that container one multiselect key as value and that Pair Value in in InnerText
      const taskPriorityList = projectFunctions.returnTaskPriorityList(
        projectName,
        taskIndex
      );

      const tagContainer = elementMaker("div", "tagContainer");
      const preTagContainer = elementMaker("div", "preTagContainer");
      const nonPreTagContainer = elementMaker("div", "nonPreTagContainer");

      // multiselect.multiple = true;
      for (const [key, value] of priorityObj) {
        // check if that key exist in that task object then make it checked
        // if not than make it unmarked
        if (taskPriorityList.includes(key)) {
          const tagWrapper = elementMaker("div", "tagWrapper");
          const checkbox = elementMaker("input");
          checkbox.setAttribute("id", `${key}`); // Set the ID for the checkbox
          checkbox.setAttribute("type", "checkbox");
          checkbox.checked = true;
          const label = elementMaker("label");
          label.innerText = value;

          tagWrapper.appendChild(checkbox);
          tagWrapper.appendChild(label);
          preTagContainer.append(tagWrapper);
        } else {
          const tagWrapper = elementMaker("div", "tagWrapper");
          const checkbox = elementMaker("input");
          checkbox.setAttribute("id", `${key}`); // Set the ID for the checkbox
          checkbox.setAttribute("type", "checkbox");
          const label = elementMaker("label");
          label.innerText = value;

          tagWrapper.appendChild(checkbox);
          tagWrapper.appendChild(label);
          nonPreTagContainer.append(tagWrapper);
        }
      }
      // // Make Div To hold two button 1 submit and 2nd close
      const priorityContainerButtons = elementMaker(
        "div",
        "priorityContainerButtons"
      );
      const priorityContainerSubmit = elementMaker(
        "button",
        "priorityContainerSubmit"
      );
      priorityContainerSubmit.innerText = "Submit";
      priorityContainerSubmit.addEventListener("click", () => {
        // check if any element is unchecked in preTagContainer
        deleteTagFromTask(projectName, taskIndex);
        // check if any element is checked in nonPreTagContainer
        addTagToTask(projectName, taskIndex);
        // delete priorityMultiSelectContainer element
        priorityMultiSelectContainer.remove();
      });

      const priorityContainerClose = elementMaker(
        "button",
        "priorityContainerClose"
      );
      priorityContainerClose.innerText = "Close";
      priorityContainerClose.addEventListener("click", () => {
        // delete priorityMultiSelectContainer element
        priorityMultiSelectContainer.remove();
      });

      priorityContainerButtons.append(
        priorityContainerSubmit,
        priorityContainerClose
      );

      tagContainer.append(preTagContainer, nonPreTagContainer);

      priorityMultiSelectContainer.append(
        tagContainer,
        priorityContainerButtons
      );
      mainContainer.append(priorityMultiSelectContainer);
    });

    TaskDetailButtonContainer.append(
      dateContainer,
      createPriorityContainerButton
    );

    // // // container to edit description
    const descContainer = elementMaker("div", "descContainer");

    // // // container to add subTask
    const preSubTaskContainer = elementMaker("div", "preSubTaskContainer");

    const preSubTaskDiv = elementMaker("div", "preSubTaskDiv");
    const preCompletedSubTaskDiv = elementMaker(
      "div",
      "preCompletedSubTaskDiv"
    );

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
      TaskDetailButtonContainer,
      descContainer,
      preSubTaskContainer,
      newTempSubTaskDiv,
      subTaskContainer
    );

    taskDetailViewContainer.append(taskDetailsContainer);

    document.querySelector(".mainContainer").append(taskDetailViewContainer);

    // // // container to edit date, priority
    taskDetailViewDate(projectName, taskIndex, taskStatus);
    taskDetailViewDescription(projectName, taskIndex, taskStatus);

    reloadCompleteSubTaskDiv(projectName, taskIndex, taskStatus);
    reloadInCompleteSubTaskDiv(projectName, taskIndex, taskStatus);

    function deleteTagFromTask(projectName, taskIndex) {
      const tagSelectedInputList = document.querySelectorAll(
        ".preTagContainer .tagWrapper"
      );
      for (let index = 0; index < tagSelectedInputList.length; index++) {
        if (!tagSelectedInputList[index].querySelector("input").checked) {
          const id = tagSelectedInputList[index]
            .querySelector("input")
            .getAttribute("id");
          projectFunctions.deleteTagFromTaskList(projectName, taskIndex, id);
        }
      }
    }
    function addTagToTask(projectName, taskIndex) {
      const tagNonSelectedInputList = document.querySelectorAll(
        ".nonPreTagContainer .tagWrapper"
      );
      for (let index = 0; index < tagNonSelectedInputList.length; index++) {
        if (tagNonSelectedInputList[index].querySelector("input").checked) {
          const id = tagNonSelectedInputList[index]
            .querySelector("input")
            .getAttribute("id");
          projectFunctions.addTagToTaskList(projectName, taskIndex, id);
        }
      }
    }
  }
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

function reloadInCompleteSubTaskDiv(projectName, taskIndex, taskStatus) {
  const preSubTaskDiv = document.querySelector(".preSubTaskDiv");
  preSubTaskDiv.innerText = "";
  let subTaskList;
  if (taskStatus === "complete") {
    subTaskList = projectFunctions.returnSubtaskListOfCompletedTask(
      projectName,
      taskIndex
    );
  } else {
    subTaskList = projectFunctions.returnSubtaskList(projectName, taskIndex);
  }
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

function reloadCompleteSubTaskDiv(projectName, taskIndex, taskStatus) {
  const preSubTaskDiv = document.querySelector(".preCompletedSubTaskDiv");
  preSubTaskDiv.innerText = "";
  let subTaskList;
  if (taskStatus === "complete") {
    subTaskList = projectFunctions.returnCompleteSubtaskListOfCompletedTask(
      projectName,
      taskIndex
    );
  } else {
    subTaskList = projectFunctions.returnCompleteSubtaskList(
      projectName,
      taskIndex
    );
  }
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
