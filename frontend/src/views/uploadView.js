export default class UploadView {
  constructor() {
    this.container = document.createElement('div');
    this.container.innerHTML = this.template();
  }

  template() {
    return `
      <section class="container">
        <a href="#/dashboard" class="back-link">← Kembali ke Dashboard</a>
        <h2>Unggah CV Anda</h2>
        <div class="card">
          <form id="uploadForm">
            <div class="upload-box" id="uploadBox">
              <input type="file" id="cvFile" accept=".pdf" hidden />
              <p>Seret dan jatuhkan file Anda di sini, atau <span class="highlight" id="browseTrigger">telusuri file</span></p>
              <p class="note">Ukuran maksimal: 5MB</p>
            </div>
            <div class="requirements">
              <ul>
                <li>Format yang diterima: PDF/doc</li>
                <li>Ukuran maksimal: 5MB</li>
              </ul>
            </div>

            <label for="degree">Degree (Gelar):</label>
            <select id="degree" name="degree" required>
              <option value="">-- Pilih Gelar --</option>
              <option value="S1">S1</option>
            </select>

            <label for="programStudi">Program Studi:</label>
            <select id="programStudi" name="programStudi" required>
              <option value="">-- Pilih Program Studi --</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Manajemen">Manajemen</option>
              <option value="Informatika">Informatika</option>
              <option value="Hukum">Hukum</option>
            </select>

            <label for="profesion">Profesi:</label>
            <input type="text" id="profesion" name="profesion" placeholder="Tulis profesi..." required />

            <button class="button-primary" type="submit">Unggah CV</button>
          </form>
          <div id="loading-indicator" class="mt-2 mb-2"></div>
          <div id="uploadMessage" class="text-danger mt-2"></div>
        </div>
      </section>
    `;
  }

  getElement() {
    return this.container;
  }

  bindFileChange(handler) {
    const fileInput = this.container.querySelector('#cvFile');
    const uploadBox = this.container.querySelector('#uploadBox');
    const browseTrigger = this.container.querySelector('#browseTrigger');

    browseTrigger.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', handler);

    uploadBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadBox.classList.add('dragover');
    });

    uploadBox.addEventListener('dragleave', () => {
      uploadBox.classList.remove('dragover');
    });

    uploadBox.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadBox.classList.remove('dragover');
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  bindSubmit(handler) {
    const form = this.container.querySelector('#uploadForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  getDegree() {
    return this.container.querySelector('#degree').value.trim();
  }

  getProfesion() {
    return this.container.querySelector('#profesion').value.trim();
  }

  getProgramStudi() {
  return this.container.querySelector('#programStudi').value.trim();
  }


  tampilkanFileTerpilih(namaFile) {
    const message = this.container.querySelector('#uploadMessage');
    message.textContent = `* File dipilih: ${namaFile}`;
    message.className = 'text-success mt-2';
  }

  tampilkanError(pesan) {
    const message = this.container.querySelector('#uploadMessage');
    message.textContent = pesan;
    message.className = 'text-danger mt-2';
  }

  tampilkanSukses(pesan) {
    const message = this.container.querySelector('#uploadMessage');
    message.textContent = pesan;
    message.className = 'text-success mt-2';
  }

  tampilkanLoading() {
    const loading = this.container.querySelector('#loading-indicator');
    loading.innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Memuat...</span>
      </div>
    `;
  }

  sembunyikanLoading() {
    const loading = this.container.querySelector('#loading-indicator');
    loading.innerHTML = "";
  }

  animasiMenujuFeedback(callback) {
    this.container.style.transition = "opacity 0.5s";
    this.container.style.opacity = 0;
    setTimeout(() => {
      callback();
    }, 500);
  }
}
