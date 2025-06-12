export default class HeaderPresenter {
  constructor(view) {
    this.view = view;
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = this.decodeJWT(token);
    const name = payload?.username || payload?.email || 'User';

    this.view.setUserName(name);
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
}
