import RegisterView from '../views/registerView.js';
import RegisterPresenter from '../presenters/registerPresenter.js';

const registerPage = {
  getElement() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = RegisterView.getTemplate();

    setTimeout(() => {
      RegisterPresenter.init();
    }, 0);

    return wrapper;
  }
};

export default registerPage;
