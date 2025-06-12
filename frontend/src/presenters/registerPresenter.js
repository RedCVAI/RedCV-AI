const RegisterPresenter = {
  init() {
    const btnRegister = document.getElementById('btnRegister');

    btnRegister.addEventListener('click', async () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!name || !email || !password) {
        alert('Semua field harus diisi.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          alert(result.message || 'Registrasi gagal.');
        } else {
          alert('Registrasi berhasil! Silakan login.');
          window.location.hash = '#/login';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Coba lagi nanti.');
      }
    });
  }
};

export default RegisterPresenter;
