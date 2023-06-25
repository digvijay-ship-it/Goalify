import "./priority.css";
import { elementMaker, priorityTagsFunc } from "../commonUtilities.js";

function makeTagHome() {
  let tagHomeContainer = document.querySelector("#TagHome");
  if (tagHomeContainer) {
    tagHomeContainer.innerText = "";
  } else {
    tagHomeContainer = document.createElement("div");
    tagHomeContainer.id = "TagHome";
  }
  document.querySelector("mainContainer");

  makeNewTagTakerContainer();

  makeTagHeaderButtonContainer();
}

function makeTagHeaderButtonContainer() {
  const newTagInputContainer = document.querySelector("#newTagInputContainer");

  const mainContainer = document.querySelector(".mainContainer");
  // Create the main container element
  const tagHomeContainer = document.createElement("div");
  tagHomeContainer.id = "TagHome";

  // Create the first inner div element
  const tagButtonContainer = elementMaker("div", "tagButtonContainer");

  // Create the "Add New Tag" button
  const addTagButton = document.createElement("button");
  addTagButton.id = "AddTag";
  addTagButton.textContent = "Add New Tag";
  addTagButton.addEventListener("click", () => {
    newTagInputContainer.classList.remove("hidden");
  });

  // Create the "Remove Selected Tags" button
  const removeTagButton = document.createElement("button");
  removeTagButton.id = "removeSelectedTag";
  removeTagButton.textContent = "Remove Selected Tags";
  removeTagButton.addEventListener("click", () => {
    //
    const tagWrappers = document.querySelectorAll(".tagWrapper");
    if (tagWrappers) {
      // to check if all first child element which are checked
      for (let index = 0; index < tagWrappers.length; index++) {
        if (tagWrappers[index].firstChild.checked) {
          const propertyName = tagWrappers[index].firstChild.classList.item(0);
          priorityTagsFunc.deleteOneTagObjectProperty(propertyName);
        }
      }
      refreshTagsContainer();
    }
  });

  // Append the buttons to the first div
  tagButtonContainer.appendChild(addTagButton);
  tagButtonContainer.append(removeTagButton);

  // Create the second inner div element
  const tagsContainer = document.createElement("div");
  tagsContainer.id = "TagsContainer";

  // Append the divs to the main container
  tagHomeContainer.appendChild(tagButtonContainer);
  tagHomeContainer.appendChild(tagsContainer);

  // Append the main container to the document body
  mainContainer.appendChild(tagHomeContainer);
}

function addNewTag(newTagValue) {
  const priorityDict = priorityTagsFunc.returnLatestTagObject();
  // get latest key
  const priorityLastKey = Array.from(priorityDict.keys()).pop();
  // add +1 in that key and assign it to new key
  const newkey = priorityLastKey + 1;
  // enter that tag in backEnd
  priorityTagsFunc.appendNewTag(newkey, newTagValue);

  refreshTagsContainer();
}

function refreshTagsContainer() {
  const tagsContainer = document.querySelector("#TagsContainer");
  tagsContainer.innerText = "";
  const tagMap = priorityTagsFunc.returnLatestTagObject();

  for (let [key, value] of tagMap) {
    const tagWrapper = elementMaker("div", "tagWrapper");

    const checkBox = elementMaker("input", `${key}`);
    checkBox.setAttribute("type", "checkbox");

    const priorityName = document.createElement("div");
    priorityName.textContent = value;

    tagWrapper.append(checkBox, priorityName);
    tagsContainer.append(tagWrapper);
  }
}

function makeNewTagTakerContainer() {
  // Create the main container element
  const tagHomeContainer = document.querySelector(".mainContainer");

  // Create the new tag input container
  const newTagInputContainer = document.createElement("div");
  newTagInputContainer.id = "newTagInputContainer";
  newTagInputContainer.classList.add("hidden");

  //wrapper
  const tagInputWrapper = document.createElement("div");
  tagInputWrapper.id = "tagInputWrapper";

  // Create the input element
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.id = "newTag";

  // Create the buttons container
  const buttonsContainer = document.createElement("div");

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.id = "submitNewTag";
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", () => {
    if (inputElement.value) {
      newTagInputContainer.classList.add("hidden");
      // enter this tag in Tag list
      // reload
      addNewTag(inputElement.value);
      inputElement.value = "";
    }
  });

  // Create the close button
  const closeButton = document.createElement("button");
  closeButton.id = "closeNewTagInputContainer";
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    newTagInputContainer.classList.add("hidden");
  });

  // Append the input element to the new tag input container
  tagInputWrapper.appendChild(
    document.createElement("div").appendChild(inputElement)
  );

  // Append the buttons to the buttons container
  buttonsContainer.appendChild(submitButton);
  buttonsContainer.appendChild(closeButton);

  // Append the buttons container to the new tag input container
  tagInputWrapper.appendChild(buttonsContainer);
  newTagInputContainer.appendChild(tagInputWrapper);

  // Append the new tag input container to the main container
  tagHomeContainer.appendChild(newTagInputContainer);

  // Append the main container to the document body
  document.body.appendChild(tagHomeContainer);
}

export { makeTagHome, refreshTagsContainer };
