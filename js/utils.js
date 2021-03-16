const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isClick = (evt) => {
  return evt.type === 'click';
};

export {isEscPressed, isClick};
