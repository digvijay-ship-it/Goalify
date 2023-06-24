import "./taskDetailViewDependency.css";

import { elementMaker, projectFunctions } from "../commonUtilities";
import { taskListContainerFuncs } from "./taskListDisplay";
import { format } from "date-fns";

import { addDays, addWeeks } from "date-fns";

function tasKDetailViewHeader(projectName) {
  const taskDetailHeaderContainer = elementMaker(
    "div",
    "taskDetailHeaderContainer"
  );

  const projectNamePara = elementMaker("p");
  projectNamePara.innerText = "Project Name->" + projectName;
  const closeTaskContainerButton = elementMaker(
    "button",
    "closeTaskContainerButton"
  );
  closeTaskContainerButton.innerText = "Close";

  closeTaskContainerButton.addEventListener("click", () => {
    const taskDetailsContainer = document.querySelector(
      ".taskDetailsContainer"
    );
    taskDetailsContainer.remove();
    taskListContainerFuncs.fillInCompleteTaskListContainer(projectName);
  });

  taskDetailHeaderContainer.append(projectNamePara, closeTaskContainerButton);
  return taskDetailHeaderContainer;
}

function tasKDetailViewTitle(title, projectName, taskIndex) {
  const taskTitle = elementMaker("input", "taskDetailTitle");
  taskTitle.classList.add(projectName);
  taskTitle.classList.add(taskIndex);
  taskTitle.value = title;
  let previousTaskTitle = title;
  taskTitle.addEventListener("blur", function (event) {
    const newValue = event.target.value;
    // Perform further actions with the new value...
    if (newValue) {
      if (previousTaskTitle !== newValue) {
        // which means value is change
        previousTaskTitle = newValue;
        // update new value into task Title
        projectFunctions.updateTaskTitle(projectName, taskIndex, newValue);
      }
    }
  });
  return taskTitle;
}

function addDateInTaskDetail(projectName, taskIndex) {
  const date = projectFunctions.returnTaskDate(projectName, taskIndex);
  if (date) {
    const dateContainer = document.querySelector(".dateContainer");

    const datePera = elementMaker("p", "datePera");
    datePera.innerText = format(date, "dd/MM/yyyy");

    dateContainer.append(datePera);
  }
}

function taskDetailViewDate(projectName, taskIndex) {
  const dateButtonContainer = document.querySelector(".dateContainer");

  // check if task date exist
  // //if it does then show it in <p>

  const openPopupButton = document.createElement("button");
  openPopupButton.setAttribute("id", "openPopup");
  openPopupButton.textContent = "Set Reminder";

  // Create the popup container
  const popupContainer = document.createElement("div");
  popupContainer.setAttribute("id", "popupContainer");
  popupContainer.classList.add("hidden");

  // Create the date picker
  const datePicker = document.createElement("div");
  datePicker.setAttribute("id", "datePicker");

  // Create the date input field
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "datetime-local");
  dateInput.setAttribute("id", "dateInput");

  // Create the Remind Me panel
  const remindMePanel = document.createElement("div");
  remindMePanel.classList.add("RemindMePanel");

  // Create the 'Tomorrow' button
  const tomorrowButton = elementMaker("button", "tomorrowButton");
  tomorrowButton.textContent = "Tomorrow";

  // Create the 'Next Week' button
  const nextWeekButton = elementMaker("button", "nextWeekButton");
  nextWeekButton.textContent = "Next Week";

  // Append the buttons to the Remind Me panel
  remindMePanel.appendChild(tomorrowButton);
  remindMePanel.appendChild(nextWeekButton);

  // Create the date action container
  const dateActionContainer = document.createElement("div");
  dateActionContainer.classList.add("dateAction");

  // Create the 'Submit' button
  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submitReminder");
  submitButton.textContent = "Submit";

  // Create the 'Close' button
  const closeButton = document.createElement("button");
  closeButton.setAttribute("id", "closePopup");
  closeButton.textContent = "Close";

  // Append the buttons to the date action container
  dateActionContainer.appendChild(submitButton);
  dateActionContainer.appendChild(closeButton);

  // Append the input field, Remind Me panel, and date action container to the date picker
  datePicker.appendChild(dateInput);
  datePicker.appendChild(remindMePanel);
  datePicker.appendChild(dateActionContainer);

  // Append the date picker to the popup container
  popupContainer.appendChild(datePicker);

  // Append the 'Set Reminder' button and the popup container to the body
  const body = document.querySelector("body");

  dateButtonContainer.append(openPopupButton);
  addDateInTaskDetail(projectName, taskIndex);

  body.append(popupContainer);

  addDateRelatedEventListener();
}

function addDateRelatedEventListener() {
  const taskTitle = document.querySelector(".taskDetailTitle");
  const projectName = taskTitle.classList.item(1);
  const taskIndex = taskTitle.classList.item(2);

  const popupContainer = document.querySelector("#popupContainer");
  const openPopupButton = document.querySelector("#openPopup");
  const closeButton = document.querySelector("#closePopup");
  const submitButton = document.getElementById("submitReminder");

  const tomorrowButton = document.querySelector(".tomorrowButton");
  const nextWeekButton = document.querySelector(".nextWeekButton");
  // const recurringButton = document.querySelector(".recurringButton");

  popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.classList.add("hidden");
    }
  });

  openPopupButton.addEventListener("click", () => {
    popupContainer.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    popupContainer.classList.add("hidden");
  });

  submitButton.addEventListener("click", () => {
    const selectedDate = new Date(dateInput.value);
    if (!isNaN(selectedDate)) {
      projectFunctions.addDateToTask(projectName, taskIndex, selectedDate);
      popupContainer.classList.add("hidden");
      addDateInTaskDetail(projectName, taskIndex);
    }
  });

  tomorrowButton.addEventListener("click", () => {
    const today = new Date();
    const Tomorrow = addDays(today, 1);
    projectFunctions.addDateToTask(projectName, taskIndex, Tomorrow);

    popupContainer.classList.add("hidden");
    addDateInTaskDetail(projectName, taskIndex);
  });

  nextWeekButton.addEventListener("click", () => {
    const today = new Date();
    today.setHours(9);
    today.setMinutes(0);
    today.setSeconds(0);
    const nextWeek = addWeeks(today, 1);
    projectFunctions.addDateToTask(projectName, taskIndex, nextWeek);

    popupContainer.classList.add("hidden");
    addDateInTaskDetail(projectName, taskIndex);
  });
}

function taskDetailViewDescription(projectName, taskIndex) {
  const descContainer = document.querySelector(".descContainer");

  const descLabel = elementMaker("label");
  descLabel.innerText = "Notes";
  descLabel.setAttribute("for", "notes");
  const descInput = elementMaker("input");
  descInput.setAttribute("id", "notes");

  if (projectFunctions.returnTaskDescription(projectName, taskIndex)) {
    descInput.value = projectFunctions.returnTaskDescription(
      projectName,
      taskIndex
    );
  }

  descInput.addEventListener("blur", function (event) {
    const newValue = event.target.value;
    // now if value exist then save it
    if (newValue) {
      projectFunctions.updateTaskDescription(projectName, taskIndex, newValue);
    }
  });

  descContainer.append(descLabel, descInput);
}

export {
  tasKDetailViewHeader,
  tasKDetailViewTitle,
  taskDetailViewDate,
  taskDetailViewDescription,
};
