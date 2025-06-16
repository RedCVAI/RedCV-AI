# 🧠 RedCV AI – Backend

**RedCV AI** adalah backend server berbasis Node.js yang menyediakan API untuk menganalisis dan mengelola Curriculum Vitae (CV) menggunakan Kecerdasan Buatan (AI). Dibangun dengan arsitektur modular menggunakan Hapi.js, project ini mendukung upload CV, autentikasi pengguna, dan integrasi model analisis CV berbasis AI.

---

🎯 Tujuan Proyek (di atas)

RedCV AI bertujuan membantu perusahaan atau recruiter dalam menganalisis isi CV kandidat secara otomatis menggunakan model AI. Sistem ini mempermudah proses screening awal dan pengambilan keputusan berdasarkan informasi yang disarikan dari file PDF CV.

---

## 📁 Struktur Direktori

backend/
├── src/
│ ├── config/ # Konfigurasi database dan koneksi ke MySQL
│ │ ├── db.js
│ │ └── db.config.js
│ │ ├── sequelize.js
│ │ ├── test-db.js
│ ├── controllers/ # Menangani request & response dari setiap Endpoint
│ │ └── ai.controller.js
│ │ ├── auth.controller.js
│ │ ├── cv.controller.js
│ ├── db/ # Koneksi ke Database
│ │ └── init-schema.sql
│ ├── helpers/ # Fungsi bantu seperti enkripsi dan JWT
│ │ ├── encrpyt.js
│ │ ├── jwt.js
│ ├── middleware/ # Melakukan autentikasi dan upload
│ │ ├── auth-middleware.js
│ │ ├── upload-middleware.js
│ ├── migrations/
│ ├── models/ # Struktur data/ORM model untuk entity
│ │ ├── analysis-mode.js
│ │ ├── cv-model.js
│ │ └── user-model.js
│ ├── routes/ # Routing untuk setiap Endpoint yang tersedia
│ │ ├── ai-routes.js
│ │ ├── auth-routes.js
│ │ └── cv-routes.js
│ ├── seeders/ # Populate data awal ke database
│ │ ├── 20250521000100-seedUsers.js
│ │ ├── 20250521000200-seedCVs.js
│ │ ├── 20250521000300-seedAnalysisResults.js
│ ├── services/ # Logika bisnis utama (pemrosesan, verifikasi, AI call)
│ │ ├── ai-service.js
│ │ ├── auth-service.js
│ │ └── cv-service.js
│ ├── utils/ # Helper umum, seperti format response standar
│ │ ├── response-helper.js
├── uploads/
├── .env
├── .gitignore
├── .sequelizerc
├── api-auth-documentation.json
├── app.js # Inisialisasi aplikasi & plugin Hapi.js
├── package-lock.json
├── package.json
├── README.md
├── test-analysis-model.js
└── server.js # Pengaturan server Hapi

🛠️ Stack Teknologi

1. Node.js + Hapi.js – Server backend
2. MySQL – Database relasional
3. Multer – Upload dan validasi file
4. JWT (jsonwebtoken) – Autentikasi token
5. dotenv – Manajemen environment variables
6. bcrypt – Enkripsi password
7. nodemon – Auto-restart saat development

📌 API Endpoint Penting
🔐 Auth

- POST /auth/register – Registrasi user
- POST /auth/login – Login & dapatkan JWT
- POST /auth/logout - Logout pengguna (opsional jika pakai token-based)
- GET /auth/me - Mendapatkan detail user yang sedang login (via JWT)

📄 CV

- POST /cv/upload – Upload file CV
- GET /cv/:id – Ambil data CV spesifik
- GET /analyst/:cvId - Ambil hasil analisis CV
- GET /analyst/all - Lihat semua riwayat analisis

🧠 AI

- POST /ai/analyze – Analisis konten CV

## 🚀 Cara Menjalankan

1. Clone repo
2. Instal Dependensi dengan menjalankan `npm install`
3. Copy `.env.example` ke `.env` dan sesuaikan isinya
4. Jalankan database MySQL
5. Jalankan migrasi dan seeder (jika pakai Sequelize CLI):
   - npx sequelize-cli db:migrate
   - npx sequelize-cli db:seed:all
6. Jalankan server:
   - npm run dev