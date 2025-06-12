import landingPage from './pages/landing.js';
import loginPage from './pages/login.js';
import registerPage from './pages/register.js';
import dashboardPage from './pages/dashboard.js';
import uploadPage from './pages/upload.js';
import feedbackPage from './pages/feedback.js';
import profilePage from './pages/profile.js';
import headerPage from './pages/header.js';
import LandingPresenter from './presenters/landingPresenter.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles/style.css';

const app = document.getElementById('app');

const routes = {
  '#/login': loginPage,
  '#/register': registerPage,
  '#/dashboard': dashboardPage,
  '#/upload': uploadPage,
  '#/feedback': feedbackPage,
  '#/profile': profilePage,
  '': landingPage,
};

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function isProtectedRoute(hash) {
  const protectedRoutes = ['#/dashboard', '#/upload', '#/feedback', '#/profile'];
  return protectedRoutes.includes(hash);
}

function renderPage() {
  const hash = window.location.hash;
  const page = routes[hash] || landingPage;

  if (isProtectedRoute(hash) && !isAuthenticated()) {
    window.location.hash = '#/login';
    return;
  }

  if ((hash === '#/login' || hash === '#/register') && isAuthenticated()) {
    window.location.hash = '#/dashboard';
    return;
  }

  app.innerHTML = '';

  const withoutHeader = ['#/login', '#/register', ''];
  if (!withoutHeader.includes(hash)) {
    const headerElement = headerPage.getElement();
    app.appendChild(headerElement);
  }

  const pageElement = typeof page === 'function' ? page() : page.getElement();
  app.appendChild(pageElement);

  if (hash === '') {
    LandingPresenter.init(app);
  } else if (hash === '#/login') {
    import('./presenters/loginPresenter.js').then(({ default: loginPresenter }) => {
      loginPresenter.init({
        onSubmit: (callback) => {
          const button = pageElement.querySelector('#btnLogin');
          button.addEventListener('click', () => {
            const email = pageElement.querySelector('#email').value.trim();
            const password = pageElement.querySelector('#password').value.trim();
            callback({ email, password });
          });
        },
        showSuccess: (message) => {
          alert(message);
          window.location.hash = '#/dashboard';
        },
        showError: (message) => {
          alert(`Login gagal: ${message}`);
        },
      });
    });
  }
}

window.addEventListener('load', renderPage);
window.addEventListener('hashchange', renderPage);

console.log('Rendering:', window.location.hash);
