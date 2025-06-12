import { login } from '../api/auth-api.js';

const loginPresenter = {
  init(view) {
    const btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', async () => {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        view.showError('Email dan password harus diisi.');
        return;
      }

      try {
        const result = await login({ email, password });
        const token = result.token || result.data?.token;

        if (!token) throw new Error('Token tidak ditemukan di response.');

        localStorage.setItem('token', token);
        view.showSuccess('Login berhasil!');
        window.location.hash = '#/dashboard';
      } catch (error) {
        view.showError(error.message || 'Login gagal.');
      }
    });
  },
};

export default loginPresenter;
