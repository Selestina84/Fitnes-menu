function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
  tabContents = document.querySelectorAll(tabsContentSelector),
  tabsContainer = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContents.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show')
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    })
  }

  function showTabContent(i=0) {
    tabContents[i].classList.add('show');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsContainer.addEventListener('click', ({target}) => {
    if (target&&target.classList.contains(tabsSelector.slice(1))){
        tabs.forEach((item,i) => {
            if(target == item){
                hideTabContent();
                showTabContent(i);
            }
        });
    }
  });
}

export default tabs;