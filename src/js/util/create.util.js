/**
 * @param { String } element
 * @param { String } classNames
 * @param { HTMLElement } child
 * @param { HTMLElement } parent
 * @param { ...array } dataAttr
 */

function create(element, classNames, child, parent, ...dataAttr) {
  let elem = null;

  try {
    elem = document.createElement(element);
  } catch (e) {
    throw new Error('Unable to create Element! Give a proper tag name');
  }

  if (classNames) elem.classList.add(...classNames.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => {
      elem.appendChild(childElement);
    });
  } else if (child && typeof child === 'object') {
    elem.appendChild(child);
  } else if (child && typeof child === 'string') {
    elem.innerHTML += child;
  }

  if (parent) parent.appendChild(elem);

  if (dataAttr.length !== 0) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        elem.setAttribute(attrName, '');
      } else if (attrName.match(/id|name|value|cols|rows|placeholder|spellcheck|autocorrect|src|href|type/)) {
        elem.setAttribute(attrName, attrValue);
      } else {
        elem.dataset[attrName] = attrValue;
      }
    });
  }

  return elem;
}

export default create;
