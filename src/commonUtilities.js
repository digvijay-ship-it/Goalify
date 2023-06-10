function elementMaker(elementName, elementClass = "") {
  const element = document.createElement(elementName);
  if (elementClass) {
    element.classList.add(elementClass);
  }
  return element;
}
export { elementMaker };
