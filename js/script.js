'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //tabs
        const tabs = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tabcontent'),
        tabsContainer = document.querySelector('.tabheader__items');

  function hideTabContent() {
      tabContents.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show')
      });
      tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');
      })
  }

  function showTabContent(i=0) {
      tabContents[i].classList.add('show');
      tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsContainer.addEventListener('click', ({target}) => {
        if (target&&target.classList.contains('tabheader__item')){
            tabs.forEach((item,i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
  });
  //timer
  let deadline = '2020-11-10T09:10:00';

function getTimeRemaining(endTime){
    let timeDiff = Date.parse(endTime)- Date.parse(new Date()),
        seconds = Math.floor((timeDiff/1000) % 60),
        minutes = Math.floor((timeDiff/1000/60) % 60),
        hours = Math.floor((timeDiff/1000/60/60) % 24),
        days = Math.floor(timeDiff/(1000*60*60*24));
    return {
        'total' : timeDiff,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function setTimerValue(id, endTime){
    let timer = document.querySelector(id),
        timerDays = timer.querySelector('#days'),
        timerHours = timer.querySelector('#hours'),
        timerMinutes = timer.querySelector('#minutes'),
        timerSeconds = timer.querySelector('#seconds'),
        timerInterval = setInterval(updateTimer, 1000);

    function updateTimer(){
        let t = getTimeRemaining(endTime);
        for(let key in t){
            if(t[key]<=9){
                t[key] = '0'+t[key];
            }
        }
            timerDays.textContent = t.days;
            timerHours.textContent = t.hours;
            timerMinutes.textContent = t.minutes;
            timerSeconds.textContent = t.seconds;


            if(t.total<=0){
                clearInterval(timerInterval);
                timerDays.textContent = '00';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
    }
}
setTimerValue('#timer', deadline);
//modal window
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');
      function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow ='hidden';
        clearInterval(modalTimerId);
      }
      function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow ='';
      }
      modalTrigger.forEach(el => el.addEventListener('click', openModal));
      modalCloseBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', ({target}) => {
          if(target === modal && modal.classList.contains('show')){
             closeModal();
          }
      });
      document.addEventListener('keydown', ({code}) =>{
          if(code === 'Escape'){
              closeModal();
          }
      });
      const modalTimerId = setTimeout(openModal, 10000);
      function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
      }
      window.addEventListener('scroll', showModalByScroll);

      // fetch form

      let forms = document.querySelectorAll('form')
      const message = {
        loading: 'img/icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
      };
      function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
      };
      forms.forEach(item=>{
          bindPostData(item)
      });

      const postData = async (url , data) =>{
        const res = await fetch( url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
      };

      function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);
        let object ={id: Math.round(Math.random() * 1e9)};
        formData.forEach((value, key) => {
            object[key]=value
        });
        postData('https://my-json-server.typicode.com/Selestina84/Fitnes-menu/requests', JSON.stringify(object))
        .then(json =>{
            console.log(json);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        })

    })
 }
});
