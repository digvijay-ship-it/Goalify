import { elementMaker, projectFunctions } from "../commonUtilities";
import { fillSideBarMainProjectListContainer } from "../makeSideBar/sidebar";
import "./form.css";

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
export { takeProjectNameFromUserForm, enterProject };
