import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const buttonStart = document.getElementsByTagName('button')[0];
const timerDisplay = document.querySelectorAll('.value');
console.log(buttonStart);
let userSelectedDate;
const days = timerDisplay[0];
const hours = timerDisplay[1];
const minutes = timerDisplay[2];
const seconds = timerDisplay[3];
let buttonActive = false;
const input = document.getElementById('datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() >= selectedDates[0].getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      buttonActive = false;
      buttonStart.classList.remove('active-button');
    } else {
      userSelectedDate = Date.parse(selectedDates);
      buttonStart.classList.add('active-button');
      buttonActive = true;
    }
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  for (let key in value) {
    value[key] = String(value[key]).padStart(2, '0');
  }
  return value;
}

flatpickr('#datetime-picker', options);

function timer() {
  input.disabled = true;
  if (buttonActive) {
    buttonActive = false;
    buttonStart.classList.remove('active-button');
    const timerId = setInterval(() => {
      const setTime = userSelectedDate - Date.now();
      const rightTime = addLeadingZero(convertMs(setTime));
      days.innerHTML = rightTime.days;
      hours.innerHTML = rightTime.hours;
      minutes.innerHTML = rightTime.minutes;
      seconds.innerHTML = rightTime.seconds;
      if (setTime <= 1000) {
        clearInterval(timerId);
        input.disabled = false;
      }
    }, 1000);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
}

buttonStart.addEventListener('click', timer);
