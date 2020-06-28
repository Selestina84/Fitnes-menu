function timer(id, deadline) {

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
  function setTimeInDescr(endTime){
    const text = document.querySelector('.promotion__descr-time');
    text.innerHTML= `${endTime}`
  }
  setTimerValue(id, deadline);
  setTimeInDescr(deadline)
}

export default timer