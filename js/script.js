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

  
});