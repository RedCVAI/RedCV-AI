# 🧠 RedCV AI – Backend

**RedCV AI** adalah backend server berbasis Node.js yang menyediakan API untuk menganalisis dan mengelola Curriculum Vitae (CV) secara cerdas menggunakan AI. Dibangun dengan arsitektur modular menggunakan Hapi.js, project ini mendukung upload CV, autentikasi pengguna, dan integrasi model analisis CV berbasis AI.

---

## 📁 Struktur Direktori

# 🧠 RedCV AI – Backend

**RedCV AI** adalah backend server berbasis Node.js yang menyediakan API untuk menganalisis dan mengelola Curriculum Vitae (CV) secara cerdas menggunakan AI. Dibangun dengan arsitektur modular menggunakan Hapi.js, project ini mendukung upload CV, autentikasi pengguna, dan integrasi model analisis CV berbasis AI.

---

## 📁 Struktur Direktori

backend/
├── src/
│ ├── config/
│ │ ├── db.js # Inisialisasi koneksi MySQL
│ │ └── db.config.js # Load variabel koneksi dari .env
│ ├── routes/
│ │ ├── auth.routes.js # API: /auth/register, /auth/login
│ │ ├── cv.routes.js # API: /cv/upload, /cv/:id
│ │ └── ai.routes.js # API: /ai/analyze, /ai/train
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── cv.controller.js
│ │ └── ai.controller.js
│ ├── services/
│ │ ├── auth.service.js
│ │ ├── cv.service.js
│ │ └── ai.service.js
│ ├── middleware/
│ │ ├── auth.middleware.js # Validasi JWT
│ │ └── upload.middleware.js # Validasi & parsing file
│ ├── models/
│ │ ├── user.model.js # Skema dan query user
│ │ ├── cv.model.js # Skema dan query CV
│ │ └── analysis.model.js # Skema dan query hasil analisis
│ ├── migrations/
│ │ └── init-schema.sql # SQL inisialisasi tabel MySQL
│ └── utils/
│ └── response.helper.js # Fungsi bantu untuk response API
├── .env # Konfigurasi DB & token (DB_HOST, DB_USER, ...)
├── .gitignore # Ignore node_modules, .env, dll.
├── package.json # Dependensi dan script npm
├── server.js # Entry point: setup Hapi server & koneksi DB
└── README.md # Dokumentasi singkat backend

🛠️ Stack Teknologi

1. Node.js + Hapi.js – Server backend
2. MySQL – Database relasional
3. Multer – Upload dan validasi file
4. JWT (jsonwebtoken) – Autentikasi token
5. dotenv – Manajemen environment variables
6. bcrypt – Enkripsi password
7. nodemon – Auto-restart saat development

📌 API Endpoint Penting
🔐 Auth - POST /auth/register – Registrasi user - POST /auth/login – Login & dapatkan JWT - POST /auth/logout - Logout pengguna (opsional jika pakai token-based) - GET /auth/me - Mendapatkan detail user yang sedang login (via JWT)

    📄 CV
    - POST /cv/upload – Upload file CV
    - GET /cv/:id – Ambil data CV spesifik
    - GET /analyst/:cvId - Ambil hasil analisis CV
    - GET /analyst/all - Lihat semua riwayat analisis

    🧠 AI
    - POST /ai/analyze – Analisis konten CV

📄 Lisensi

Jika kamu ingin file README ini langsung saya perbarui ke dalam file `README.md` yang sudah kamu upload, tinggal beri izin saja dan saya bantu langsung ubah isinya.
