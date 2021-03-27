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

const getRandomFloatFromRange = (min, max, decimal = 0) => {
  min = Math.abs(min);
  max = Math.abs(max);
  decimal = Math.abs(decimal);
  return Math.abs((Math.random() * (max - min) + min).toFixed(decimal));
}

const setThrottle = (func, ms) => {
  let ignore = false;
  let lastArgs = null;
  let lastThis = null;

  const throttle = function() {
    if(ignore) {
      lastArgs = arguments;
      lastThis = this;
      return;
    }

    func.apply(this, arguments);

    ignore = true;

    setTimeout(() => {
      ignore = false;
      if(lastArgs) {
        throttle.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, ms);
  };

  return throttle;
};

export {isEscPressed, isClick, removeClasses, isActiveElement, addTemporaryRedBorder, removeСhildByClass, getRandomFloatFromRange, setThrottle};

