const SHOW_TIME = 5000;

const showWarningMessage = (message) => {
  const messageContainer = document.createElement('div');

  messageContainer.style.zIndex = 1000;
  messageContainer.style.position = 'fixed';
  messageContainer.style.left = 0;
  messageContainer.style.top = '18px';
  messageContainer.style.right = 0;
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.fontSize = '20px'
  messageContainer.style.lineHeight =  '28px';
  messageContainer.style.fontFamily = 'Open Sans,Arial,sans-serif'
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = '#FE4D4D';
  messageContainer.textContent = message;
  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, SHOW_TIME);
}

export {showWarningMessage};
