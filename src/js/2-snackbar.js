import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const delay = form.elements['delay'];
const state = document.querySelectorAll('input[name="state"]');
function radioValues() {
  for (const radio of state) {
    if (radio.checked) {
      return radio.value;
    }
  }
}
const submit = form.getElementsByTagName('button')[0];
submit.addEventListener('click', clickSubmit);
let timeOutResolve;
let timeOutReject;
function clickSubmit(evt) {
  evt.preventDefault();
  const promise = new Promise((resolve, reject) => {
    if (radioValues() === 'fulfilled') {
      timeOutResolve = delay.value;
      setTimeout(() => {
        resolve();
      }, parseInt(delay.value));
    }
    if (radioValues() === 'rejected') {
      timeOutReject = delay.value;
      setTimeout(() => {
        reject();
      }, parseInt(delay.value));
    }
  });

  promise.then(
    () =>
      iziToast.success({
        icon: '',
        title: '✅',
        message: ` Fulfilled promise in ${timeOutResolve}ms`,
        position: 'topRight',
      }),
    () =>
      iziToast.error({
        icon: '',
        title: ' ❌ ',
        message: `Rejected promise in ${timeOutReject}ms`,
        position: 'topRight',
      })
  );
}
