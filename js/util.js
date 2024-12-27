const ALERT_SHOW_TIME = 5000;

const alertStyles = {
  zIndex : '100',
  position : 'absolute',
  left : '0',
  top : '0',
  right : '0',
  padding : '10px 3px',
  fontSize : '30px',
  lineHeight : '36px',
  textAlign : 'center',
  backgroundColor : '#232321',
  color: '#ffffff',
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function checkIds(idsSet, num) {
  let id;
  do {
    id = getRandomInteger(1, num);
  } while (idsSet.has(id));

  idsSet.add(id);
  return id;
}

const showAlert = (message) => {
  const alert = document.querySelector('div');
  Object.assign(alert.style, alertStyles);
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {checkIds, getRandomInteger, showAlert};
