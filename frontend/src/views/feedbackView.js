export default class FeedbackView {
  constructor() {
    this.app = document.createElement('div');
    this.app.className = 'feedback-view';
    this.app.innerHTML = `
      <div class="loader-container d-flex justify-content-center align-items-center" id="loader" style="height: 60vh;">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div class="container my-5 d-none" id="feedback-content">
        <h2>Hasil Analisis CV Anda</h2>
        <p><strong id="filename">resume.pdf</strong> — Dianalisis pada <span id="date">tanggal</span></p>

        <div class="score-section my-4">
          <div class="score-circle-container position-relative mx-auto" style="width: 140px; height: 140px;">
            <svg class="score-ring" width="140" height="140">
              <circle class="score-bg" cx="70" cy="70" r="60" stroke="#eee" stroke-width="12" fill="none"/>
              <circle class="score-value" id="scoreCircle" cx="70" cy="70" r="60" stroke-width="12" fill="none" stroke-linecap="round"/>
            </svg>
          <div class="score-text position-absolute top-50 start-50 translate-middle fw-bold" id="scoreText" style="font-size: 2.5rem; color: #fff;">0</div>
          </div>
        </div>

        <div class="analysis-box mt-4">
          <h3>Rekomendasi Konten</h3>
          <ul id="contentFeedbackList"></ul>
        </div>

        <div class="buttons mt-5 d-flex justify-content-between align-items-center">
          <span class="link-back" id="link-back" style="cursor:pointer; color: var(--primary-color);">← Kembali</span>
          <button id="btn-upload-ulang" class="btn btn-primary">Unggah CV Baru</button>
        </div>
      </div>
    `;
  }

  getElement() {
    return this.app;
  }

  showLoader() {
    this.app.querySelector('#loader').classList.remove('d-none');
    this.app.querySelector('#feedback-content').classList.add('d-none');
  }

  hideLoader() {
    this.app.querySelector('#loader').classList.add('d-none');
    this.app.querySelector('#feedback-content').classList.remove('d-none');
  }

  renderFeedback(data) {
    console.log("Data yang diterima di FeedbackView.renderFeedback:", data);
    this.hideLoader();

    this.app.querySelector('#filename').textContent = data.filename;
    this.app.querySelector('#date').textContent = data.date;

    const score = Math.max(0, Math.min(10, data.contentScore));
    const circle = this.app.querySelector('#scoreCircle');
    const text = this.app.querySelector('#scoreText');

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const percentage = score / 10;

    circle.setAttribute('stroke-dasharray', circumference);
    circle.setAttribute('stroke-dashoffset', circumference * (1 - percentage));

    let color = '#dc3545';
    if (score >= 8) color = '#28a745';
    else if (score >= 5) color = '#ffc107';
    circle.setAttribute('stroke', color);
    text.textContent = score;

    const contentList = this.app.querySelector('#contentFeedbackList');
    contentList.innerHTML = '';
    if (data.contentFeedback && Array.isArray(data.contentFeedback)) {
      data.contentFeedback.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        contentList.appendChild(li);
      });
    } else {
      console.warn("data.contentFeedback bukan array atau tidak terdefinisi:", data.contentFeedback);
      const li = document.createElement('li');
      li.textContent = "Tidak ada rekomendasi konten yang tersedia.";
      contentList.appendChild(li);
    }
  }

  bindUploadNewCV(handler) {
    const btn = this.app.querySelector('#btn-upload-ulang');
    if (btn) btn.addEventListener('click', handler);
  }

  bindBackLink(handler) {
    const link = this.app.querySelector('#link-back');
    if (link) link.addEventListener('click', handler);
  }
}
