import LoginView from '../views/loginView.js';

export default function loginPage() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = LoginView.getTemplate();
  return wrapper;
}