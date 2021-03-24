const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isClick = (evt) => {
  return evt.type === 'click';
};

const removeClasses = (el, mask) => {
  const re = new RegExp(`^${mask.replace(/\*/g, '\\S+')}`);
  el.classList.remove(...[...el.classList].filter(n => n.match(re)));
}

const isActiveElement = (input) => {
  return input === document.activeElement;
};

const addTemporaryRedBorder = (element, showTime) => {
  element.style.border= '3px solid red';
  element.style.outline= 'none';
  setTimeout(() => {
    element.style.border= '';
    element.style.outline= '';
  }, showTime);
};

const removeСhildByClass = (parentElement, childClass) => {
  const arrayChildren = Array.from(parentElement.children);
  arrayChildren.forEach((element) => {
    if(element.classList.contains(childClass)) {
      parentElement.removeChild(element);
    }
  });
};

export {isEscPressed, isClick, removeClasses, isActiveElement, addTemporaryRedBorder, removeСhildByClass};

