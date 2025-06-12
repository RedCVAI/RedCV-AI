export default class ProfileView {
  constructor() {
    this.app = document.createElement('div');
    this.app.className = 'profile-view container d-flex justify-content-center align-items-center';
    this.app.style.minHeight = '80vh';
    this.app.innerHTML = `
      <div class="card w-100" style="max-width: 480px;">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">My Profile</h2>
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="rounded-circle bg-secondary" style="width: 80px; height: 80px;"></div>
          </div>
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control email" id="email" readonly />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input type="password" class="form-control password" id="password" readonly />
                <button type="button" class="btn btn-outline-secondary toggle-password">Show</button>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <a href="#/dashboard" class="link-back" id="link-back">← Kembali</a>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  getElement() {
    return this.app;
  }

  displayProfile(profileData) {
    this.app.querySelector('.email').value = profileData.email || '';
    this.app.querySelector('.password').value = '********';
  }

  bindTogglePassword() {
    const toggleBtn = this.app.querySelector('.toggle-password');
    const passwordInput = this.app.querySelector('.password');

    toggleBtn.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      toggleBtn.textContent = isHidden ? 'Hide' : 'Show';
    });
  }

}
