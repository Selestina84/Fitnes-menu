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
        return await res.json();
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
    };
    //render data
   /* class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    };*/

    const getResourse = async (url) => {
        const res = await fetch(url)
         if(!res.ok){
            throw new Error(`Could not fetch ${url} status ${res.status}`)
        }
        return await res.json();
    };

   /* getResourse("https://my-json-server.typicode.com/Selestina84/Fitnes-menu/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) =>
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            );
        })*/
    getResourse("https://my-json-server.typicode.com/Selestina84/Fitnes-menu/menu")
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) =>{
            const element = document.createElement('div');
            element.classList.add("menu__item")
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        })
    });
    //slider
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    //calculator

    const result = document.querySelector('.calculating__result span')
    let sex = "female",
        height,
        weight,
        age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});
