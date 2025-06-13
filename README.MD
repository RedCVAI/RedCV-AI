![Logo_RedCV_AI](https://github.com/RedCVAI/RedCV-AI/blob/main/public/logo.png)

# RedCV AI
**ID Team: CC25-CF214**

RedCV AI adalah platform cerdas berbasis web yang membantu para pencari kerja menyusun dan mengevaluasi Curriculum Vitae (CV) secara otomatis. Dengan memanfaatkan teknologi Machine Learning, RedCV AI memberikan umpan balik objektif dan aplikatif terkait struktur, konten, serta potensi perbaikan CV.

---

## 👨‍💻 Tim Kami
| Nama                 | Cohort-ID     | Role                              |
|----------------------|---------------|-----------------------------------|
| Wahyu Pelita Jaya    | MC865D5Y2251  | Machine Learning Engineer         |
| Annisa Saninah       | MC370D5X0531  | Machine Learning Engineer         |
| Aprilia Yuli Lestari | MC501D5X2132  | Machine Learning Engineer         |
| Alvin Krisna Valensa | FC853D5Y1010  | Front-End & Back-End Developer    |
| Fitri Dwi Anisa      | FC131D5X0066  | Front-End & Back-End Developer    |

---

## 🧠 Project Overview

RedCV AI hadir sebagai solusi bagi jobseeker, khususnya fresh graduate, untuk:
- Menilai kualitas CV secara real-time
- Mendapatkan saran perbaikan yang objektif
- Meningkatkan peluang lolos seleksi kerja

---

## 🧩 Business Understanding

### Problem Statement
1. Banyak pencari kerja tidak memahami struktur CV profesional.
2. Sulit memperoleh feedback CV tanpa bantuan HR.
3. Belum ada alat AI gratis dan mudah diakses untuk menilai CV secara menyeluruh.

### Goals
- Menganalisis CV secara otomatis
- Memberikan insight yang mudah dipahami
- Menyediakan feedback relevan sesuai standar industri

---

## 🔧 Tools & Technologies

### Machine Learning
- **Python** – Bahasa utama pengembangan ML
- **scikit-learn, pandas, numpy** – Preprocessing dan training model
- **spaCy / NLTK** – Natural Language Processing
- **joblib / pickle** – Model serialization untuk deployment

Model dikembangkan untuk:
- Menilai kualitas ringkasan diri
- Deteksi kata kunci relevan
- Evaluasi struktur & format CV

### Fullstack Development
- **Frontend**: html, css js
- **Backend**: Hapi js
- **Database**: Mysql
- **Deployment**: Hugging Face Spaces (opsional untuk ML model)

---

## ⚙️ Cara Menjalankan Project

1. **Install dependencies**
```bash
npm install
```

*Import file `initschema.sql` ke dalam database:
```bash
Import db initschema.sql
```

2. **Siapkan file `.env`**
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
```

3. **Jalankan dalam mode development**
```bash
npm run dev
```

4. **Atau build untuk production**
```bash
npm run build
```

---

## 📩 Kontak Tim

| Nama                 | Email                                         | Role                           |
|----------------------|-----------------------------------------------|--------------------------------|
| Wahyu Pelita Jaya    | wahyupelitajaya1@gmail.com                    | Machine Learning               |
| Annisa Saninah       | saninahannisa@gmail.com                       | Machine Learning               |
| Aprilia Yuli Lestari | aprilialestari.analyst@gmail.com              | Machine Learning               |
| Alvin Krisna Valensa | alvinkrisna116@gmail.com                      | Front-End & Back-End Developer |
| Fitri Dwi Anisa      | sablahnisa201@gmail.com                       | Front-End & Back-End Developer |

---

## ❤️ Terima Kasih

RedCV AI dikembangkan sebagai bagian dari final project Coding Camp 2025. Kami percaya bahwa dengan alat yang tepat, setiap pencari kerja bisa tampil lebih percaya diri dalam menghadapi dunia kerja.

---
