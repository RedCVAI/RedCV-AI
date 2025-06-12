import landingPage from '../pages/landing.js';

const LandingPresenter = {
  init(container) {
    const landingElement = landingPage.getElement();
    container.innerHTML = '';
    container.appendChild(landingElement);

    const btnAnalisis = landingElement.querySelector('#btn-analisis');
    const btnCobaGratis = landingElement.querySelector('#btn-coba-gratis');
    const btnMasuk = landingElement.querySelector('#btn-masuk');
    const linkDaftar = landingElement.querySelector('#btn-register');

    if (btnAnalisis) {
      btnAnalisis.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }

    if (btnCobaGratis) {
      btnCobaGratis.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }

    if (btnMasuk) {
      btnMasuk.addEventListener('click', () => {
        window.location.hash = '#/login';
      });
    }

    if (linkDaftar) {
      linkDaftar.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.hash = '#/register';
      });
    }
  }
};

export default LandingPresenter;
