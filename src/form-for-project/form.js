import { elementMaker, projectFunctions } from "../commonUtilities";
import { fillSideBarMainProjectListContainer } from "../makeSideBar/sidebar";
import "./form.css";

function takeProjectNameFromUserForm() {
  const projectFormContainer = elementMaker("div", "projectFormContainer");
  projectFormContainer.classList.add("hidden");

  const projectFormDiv = elementMaker("div", "projectFormDiv");

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
  projectFormContainer.append(projectFormDiv);
  document.querySelector("body").append(projectFormContainer);
  addEventListenerForProjectForm();
}

function addEventListenerForProjectForm() {
  document
    .querySelector(".submitButton")
    .addEventListener("click", enterProject);

  document.querySelector(".cancelButton").addEventListener("click", () => {
    const projectFormContainer = document.querySelector(
      ".projectFormContainer"
    );
    projectFormContainer.classList.add("hidden");
  });
}

function enterProject() {
  const formInput = document.querySelector("#projectName");

  if (formInput.value) {
    projectFunctions.appendNewProject(formInput.value);
  }
  formInput.value = "";
  const projectFormContainer = document.querySelector(".projectFormContainer");
  projectFormContainer.classList.add("hidden");

  fillSideBarMainProjectListContainer(
    projectFunctions.returnLatestProjectList()
  );
}
export { takeProjectNameFromUserForm, enterProject };
