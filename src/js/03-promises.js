import Notiflix from 'notiflix';

const refs = {
  submitBtn: document.querySelector("button"),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]')
} 

const values = {
  delayValue: null,
  stepValue: null,
  amountValue: null
}

refs.submitBtn.addEventListener('click', onSubmit);


function onSubmit(e) { 
  e.preventDefault();  

  refs.submitBtn.disabled = true;
  
  values.delayValue = Number(refs.delay.value);
  values.stepValue = Number(refs.step.value);
  values.amountValue = Number(refs.amount.value);

  for (let position = 1; position <= values.amountValue; position += 1) {
    
    createPromise(position, values.delayValue)
      .then(success => Notiflix.Notify.success(success))
      .catch(error => Notiflix.Notify.failure(error));
    
    values.delayValue = values.delayValue + values.stepValue;
  };

    refs.submitBtn.disabled = false;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    }
  )
}