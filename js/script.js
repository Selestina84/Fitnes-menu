'use strict';
window.addEventListener('DOMContentLoaded', () => {
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

});