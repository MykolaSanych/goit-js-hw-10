import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const buttonStart = document.getElementById('button-start');
const timerDisplay = document.querySelectorAll('.value');
let userSelectedDate = {};
const days = timerDisplay[0];
const hours = timerDisplay[1];
const minutes = timerDisplay[2];
const seconds = timerDisplay[3];
let buttonActive = false;
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
flatpickr('#datetime-picker', options);
function timer() {
  if (buttonActive) {
    buttonActive = false;
    buttonStart.classList.remove('active-button');
    const timerId = setInterval(() => {
      const realTime = Date.now();
      const sec = Math.floor((userSelectedDate - realTime) / 1000);
      const min = Math.floor(sec / 60);
      const h = Math.floor(min / 60);
      days.innerHTML = String(Math.floor(h / 24)).padStart(2, '0');
      seconds.innerHTML = String(sec % 60).padStart(2, '0');
      minutes.innerHTML = String(min % 60).padStart(2, '0');
      hours.innerHTML = String(h % 24).padStart(2, '0');
      if (userSelectedDate - realTime <= 1000) {
        clearInterval(timerId);
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
