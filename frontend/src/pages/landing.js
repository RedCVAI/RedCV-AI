import LandingView from '../views/landingView.js';

const landingPage = {
  getElement() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = LandingView();
    return wrapper;
  }
};

export default landingPage;
