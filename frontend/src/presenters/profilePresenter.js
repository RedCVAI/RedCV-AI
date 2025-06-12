export default class ProfilePresenter {
  constructor(view) {
    this.view = view;

    this.view.bindTogglePassword(this.handleTogglePassword.bind(this));

    this.loadProfile();
  }

  loadProfile() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token tidak ditemukan. Silakan login kembali.');
      return;
    }

    const payload = this.decodeJWT(token);
    if (!payload) {
      alert('Gagal membaca data profil dari token.');
      return;
    }

    this.profileData = {
      email: payload.email || '',
      username: payload.username || '',
    };

    this.view.displayProfile(this.profileData);
  }

  decodeJWT(token) {
    try {
      const base64Payload = token.split('.')[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch (e) {
      console.error('Gagal decode JWT', e);
      return null;
    }
  }

  handleTogglePassword() {
    this.view.togglePasswordVisibility?.();
  }

}
