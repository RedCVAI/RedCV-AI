const LandingView = () => {
  return `
    <header class="main-header">
      <div class="logo">
        <img src="/asset/logo.jpg" alt="Logo" />
      </div>
      <nav class="nav-menu">
        <a id="btn-register">Daftar</a>
        <button id="btn-masuk" class="btn-primary">Masuk</button>
      </nav>
    </header>

    <section class="hero-section">
      <div class="hero-content">
        <div class="text">
          <h1>Optimalkan CV-mu <span class="highlight">Bersama AI</span> di <strong class="typing-text">RedCV</strong></h1>
          <p>Tingkatkan peluang karirmu dengan analisis CV berbasis AI yang canggih dan cepat.</p>
          <div class="hero-buttons">
            <button id="btn-analisis" class="btn-primary">Mulai Analisis Sekarang</button>
          </div>
        </div>
      </div>
    </section>

    <section class="features hero-style">
      <h2>Fitur Unggulan</h2>
      <div class="feature-list">
        <div class="feature-item">
          <h3>Analisis AI</h3>
          <p>Menganalisis struktur dan isi CV secara otomatis dan akurat.</p>
        </div>
        <div class="feature-item">
          <h3>Skor Cv</h3>
          <p>Memberikan skor isi content ATS friendly.</p>
        </div>
        <div class="feature-item">
          <h3>Proses Cepat</h3>
          <p>Proses analisis cepat hanya dalam hitungan menit.</p>
        </div>
      </div>
    </section>

    <section class="visi-misi">
      <h2>Visi & Misi RedCV</h2>
      <h3>Visi</h3>
      <p>Menjadi platform terdepan dalam meningkatkan kualitas CV dan peluang karir melalui kecerdasan buatan.</p>

      <h3>Misi</h3>
      <ul>
        <li>Membantu pelamar kerja menganalisis CV dengan teknologi AI</li>
        <li>Meningkatkan kualitas dan daya saing CV di pasar kerja.</li>
        <li>Menyediakan tools praktis, cepat, dan ramah pengguna..</li>
      </ul>
    </section>

    <section class="cta">
      <h2>Siap Analisis CV Kamu?</h2>
      <p>Coba gratis sekarang!</p>
      <div class="cta-buttons">
        <button id="btn-coba-gratis" class="btn-primary">Coba Gratis</button>
      </div>
    </section>

    <footer class="main-footer">
      <p>&copy; 2025 RedCV AI. All rights reserved.</p>
    </footer>
  `;
};

export default LandingView;
