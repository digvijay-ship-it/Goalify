import "./sidebar.css";
import { elementMaker } from "../commonUtilities.js";

export default function makeSidebar() {
  function myDayContainer() {
    const myDayContainer = elementMaker("div", "myDayContainer");
    const myDay = elementMaker("p");
    myDay.innerText = "My day";

    const myDayIcon = simpleSvgMaker(
      '<title>bullseye</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />'
    );

    myDayContainer.append(myDayIcon, myDay);
    return myDayContainer;
  }
  function sevenDayContainer() {
    const sevenDayContainer = elementMaker("div", "sevenDayContainer");
    const sevenDay = elementMaker("p");
    sevenDay.innerText = "7 Days";

    const sevenDayIcon = simpleSvgMaker(
      '<title>calendar-week-begin-outline</title><path d="M19 3C20.11 3 21 3.89 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.9 3 5 3H6V1H8V3H16V1H18V3H19M19 19V9H5V19H19M19 7V5H5V7H19M7 11H9V17H7V11" />'
    );
    sevenDayContainer.append(sevenDayIcon, sevenDay);
    return sevenDayContainer;
  }
  function allMyTaskContainer() {
    const allTaskContainer = elementMaker("div", "sevenDayContainer");
    const allTask = elementMaker("p");
    allTask.innerText = "All my tasks";

    const allTaskIcon = simpleSvgMaker(
      '<title>format-list-checks</title><path d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" />'
    );
    allTaskContainer.append(allTaskIcon, allTask);
    return allTaskContainer;
  }

  function simpleSvgMaker(svgInternal) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.innerHTML = svgInternal;
    return svg;
  }

  const sideBar = elementMaker("div", "sidebar");
  // now insert complete side bar in it

  const sideBarHeader = elementMaker("h1", "sideBarHeader");
  sideBarHeader.innerText = "Hello User";

  const sideBarMain = elementMaker("div", "sideBarMain");

  const sideBarMainDaysList = elementMaker("ol", "sideBarMainDaysContainer");

  const myDay = myDayContainer();

  const next7Days = sevenDayContainer();

  const allMyTask = allMyTaskContainer();
  sideBarMainDaysList.append(myDay, next7Days, allMyTask);

  const myProjects = elementMaker("div", "myProjects");
  const myProjectTitle = elementMaker("div");
  myProjectTitle.innerText = "Projects List";

  const addProjectIcon = simpleSvgMaker(
    '<title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />'
  );

  myProjects.append(myProjectTitle, addProjectIcon);

  // Create sideBarMainProjectList and append it to sideBarMain
  const sideBarMainProjectList = elementMaker(
    "ol",
    "sideBarMainProjectListContainer"
  );

  sideBarMainProjectList.append();
  sideBarMain.append(sideBarMainDaysList, myProjects, sideBarMainProjectList);

  sideBar.append(sideBarHeader, sideBarMain);
  document.querySelector("body").appendChild(sideBar);
}
