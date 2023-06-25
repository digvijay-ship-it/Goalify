import "./sidebar.css";
import {
  elementMaker,
  projectFunctions,
  simpleSvgMaker,
  clearMainContainer,
  taskObjFactoryFunction,
} from "../commonUtilities.js";

import { makeTagHome, refreshTagsContainer } from "../myPriority/priority";

import { makeTaskListView } from "../task/taskListDisplay.js";

function makeSidebar() {
  const sideBar = elementMaker("div", "sidebar");

  const sideBarHeader = elementMaker("h1", "sideBarHeader");
  sideBarHeader.innerText = "Hello User";

  const sideBarMain = elementMaker("div", "sideBarMain");

  const sideBarMainDaysList = elementMaker("ol", "sideBarMainDaysContainer");

  const allMyTask = allMyTaskContainer();
  sideBarMainDaysList.append(allMyTask);

  const myProjects = elementMaker("div", "myProjects");
  const myProjectTitle = elementMaker("div");
  myProjectTitle.innerText = "Projects List";

  const addProjectIcon = simpleSvgMaker(
    '<title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />'
  );
  addProjectIcon.classList.add("addProjectIcon");

  myProjects.append(myProjectTitle, addProjectIcon);

  const myTags = elementMaker("div", "myTags");
  const myTagTitle = elementMaker("div");
  myTagTitle.innerText = "Tags";

  const tagIcon = simpleSvgMaker(
    '<title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />'
  );
  tagIcon.classList.add("tagHome");

  tagIcon.addEventListener("click", () => {
    clearMainContainer();
    makeTagHome();
    refreshTagsContainer();
  });

  myTags.append(myTagTitle, tagIcon);

  sideBarMain.append(sideBarMainDaysList, myProjects, myTags);

  sideBar.append(sideBarHeader, sideBarMain);
  document.querySelector("body").appendChild(sideBar);
  fillSideBarMainProjectListContainer(
    projectFunctions.returnLatestProjectList()
  );
}

function fillSideBarMainProjectListContainer(projectList = []) {
  const removeThisElementIfExist = document.querySelector(
    ".sideBarMainProjectListContainer"
  );
  if (removeThisElementIfExist) {
    removeThisElementIfExist.remove();
  }
  const sideBarMainProjectList = elementMaker(
    "ol",
    "sideBarMainProjectListContainer"
  );
  if (projectList) {
    for (const projectName in projectList) {
      const element = elementMaker("div", `${projectName}`);
      element.classList.add("project");
      element.innerText = `${projectName}`;
      sideBarMainProjectList.append(element);

      element.addEventListener("click", () => {
        makeTaskListView(projectName);
      });
    }
  }
  document.querySelector(".sideBarMain").append(sideBarMainProjectList);
}

function allMyTaskContainer() {
  const defaultTask = elementMaker("div", "To-Do");
  const allTask = elementMaker("p");
  allTask.innerText = "To Do";

  const allTaskIcon = simpleSvgMaker(
    '<title>format-list-checks</title><path d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" />'
  );
  defaultTask.append(allTaskIcon, allTask);
  return defaultTask;
}

export { makeSidebar, fillSideBarMainProjectListContainer };
