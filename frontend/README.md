RedCV AI Frontend

Ini adalah proyek frontend dari RedCV AI, sebuah aplikasi web berbasis SPA (Single Page Application) yang memungkinkan pengguna untuk menganalisis Curriculum Vitae (CV) mereka menggunakan kecerdasan buatan.

📁 Struktur Folder

frontend/
├── src/
│   ├── api/                  # Modul untuk koneksi API (fetch data)
│   ├── pages/                # Halaman login, register, dashboard, dll
│   ├── presenters/           # Logic halaman (presenter sesuai arsitektur MVP)
│   ├── views/                # Komponen visual UI (HTML templates)
│   ├── styles/               # File CSS dan konfigurasi tampilan
│   ├── router.js             # Routing untuk navigasi antar halaman
│   ├── main.js               # Inisialisasi dan bootstrap aplikasi
├── public/                   # File statis seperti icon, manifest PWA, dan index.html
├── style.css                 # Styling utama
├── .env                      # Konfigurasi environment jika diperlukan
├── webpack.config.js         # Konfigurasi bundling menggunakan Webpack
└── package.json              # Dependensi dan script NPM

🔧 Cara Menjalankan Proyek Ini

1. Clone Repositori

git clone https://github.com/RedCVAI/RedCV-AI.git
cd RedCV-AI/frontend

2. Install Dependensi

npm install

3. Install Bootstrap (jika belum)

npm install bootstrap

4. Jalankan Server Development

npm run dev

Akses melalui browser di:
🌐 http://localhost:8080

📌 Halaman yang Tersedia

/ — Landing page

/#/login — Login

/#/register — Register

/#/dashboard — Dashboard

/#/upload — Upload CV

/#/feedback — Hasil analisis

/#/profile — Profil pengguna


💡 Catatan

Pastikan backend (port 3000) sudah berjalan dan mendukung CORS.

Pastikan koneksi ke API backend sesuai (http://localhost:3000/).

Proyek ini menggunakan arsitektur Model-View-Presenter (MVP).

---

© 2025 RedCV AI

