import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const delay = form.elements['delay'];
const state = form.elements['state'];
const submit = form.getElementsByTagName('button')[0];
submit.addEventListener('click', clickSubmit);
function clickSubmit(evt) {
  evt.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, parseInt(delay.value));
  });
  promise.then(
    () =>
      iziToast.success({
        icon: '',
        title: '✅',
        message: ` Fulfilled promise in ${delay.value}ms`,
        position: 'topRight',
      }),
    () =>
      iziToast.error({
        icon: '',
        title: ' ❌ ',
        message: `Rejected promise in ${delay.value}ms`,
        position: 'topRight',
      })
  );
}
