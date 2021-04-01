import {closeModal, openModal} from './modal';
import {postData} from './servises';

function forms(formSelector, modalTimerId) {
  let forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item)
  });

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
      });
    })
  };

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 2000);
  };
};

export default forms;