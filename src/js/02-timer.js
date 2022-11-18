import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

btnStart.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    console.log(selectedDate[0])
    
    if (options.defaultDate > selectedDate[0]) {
      Notify.failure("Please choose a date in the future")
    }
     else {
      btnStart.removeAttribute("disabled")
      btnStart.addEventListener('click', timer);
      }
  },
};

const fp = flatpickr('#datetime-picker', options);

function renderTimer(number) {
  dataDays.textContent = addLeadingZero(number.days);
  dataHours.textContent = addLeadingZero(number.hours);
  dataMinutes.textContent = addLeadingZero(number.minutes); 
  dataSeconds.textContent = addLeadingZero(number.seconds);
}

let timerId = null;

function timer(targetDate) {
   timerId = setInterval(() => {
    const selectedDate = fp.selectedDates[0].getTime()
    const delta = selectedDate  - new Date()
    let dataItem = convertMs(delta)
    renderTimer(dataItem); 
  }, 1000);

  input.disabled = true;
  btnStart.setAttribute("disabled", true)
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
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
