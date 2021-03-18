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

export {isEscPressed, isClick, removeClasses};
