export default class HeaderView {
  constructor() {
    this.container = document.createElement('header');
    this.container.className = 'bg-dark text-white px-4 py-2 d-flex justify-content-between align-items-center';
    this.container.innerHTML = this.template();

    this.dropdownToggle = this.container.querySelector('#profileDropdown');
    this.dropdownMenu = this.container.querySelector('.dropdown-menu');

    if (this.dropdownToggle && this.dropdownMenu) {
      this.dropdownToggle.style.cursor = 'pointer';
      this.dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown();
      });

      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.closeDropdown();
        }
      });
    }

    const logoutLink = this.container.querySelector('a[href="#/login"]');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.hash = '#/login';
      });
    }
  }

  toggleDropdown() {
    const isShown = this.dropdownMenu.classList.contains('show');
    if (isShown) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.dropdownMenu.classList.add('show');
    this.dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    this.dropdownMenu.classList.remove('show');
    this.dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  template() {
    return `
      <div class="fw-bold">RedCV AI</div>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="profileDropdown" aria-expanded="false" style="gap: 0.5rem;">
          <span id="userName">John Doe</span>
          <div class="rounded-circle bg-secondary" style="width: 36px; height: 36px;"></div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style="min-width: 10rem;">
          <li><a class="dropdown-item" href="#/profile">Edit Profil</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#/login">Logout</a></li>
        </ul>
      </div>
    `;
  }

  getElement() {
    return this.container;
  }

  setUserName(name) {
    const nameSpan = this.container.querySelector('#userName');
    if (nameSpan) nameSpan.textContent = name;
  }
}
