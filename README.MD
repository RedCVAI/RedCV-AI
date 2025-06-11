![Logo_RedCV_AI](https://your-logo-url.com) <!-- Ganti dengan URL logo jika ada -->

# Our Team
|         Nama         |  Cohort-ID   |               Path               |
|----------------------|--------------|----------------------------------|
| Wahyu Pelita Jaya    | MC865D5Y2251 | Machine Learning Engineer        |
| Annisa Saninah       | MC370D5X0531 | Machine Learning Engineer        |
| Aprilia Yuli Lestari | MC501D5X2132 | Machine Learning Engineer        |
| Alvin Krisna Valensa | FC853D5Y1010 | Front-End and Back-End Developer |
| Fitri Dwi Anisa      | FC131D5X0066 | Front-End and Back-End Developer |

# Project Overview

**RedCV AI** adalah sebuah platform cerdas berbasis web yang dirancang untuk membantu para pencari kerja dalam mempersiapkan Curriculum Vitae (CV) yang efektif dan sesuai dengan kebutuhan industri. Melalui teknologi Machine Learning, RedCV AI mampu menganalisis CV dan memberikan umpan balik secara real-time mengenai struktur, relevansi konten, dan potensi perbaikannya. 

Aplikasi ini hadir sebagai solusi praktis, terutama bagi para fresh graduate dan jobseeker yang masih bingung tentang bagaimana menampilkan keunggulan mereka dalam sebuah CV. Harapannya, RedCV AI dapat meningkatkan peluang pengguna untuk lolos ke tahap seleksi rekrutmen berikutnya.

# Business Understanding

## Problem Statement
1. Banyak pencari kerja belum mengetahui struktur CV yang ideal dan profesional.
2. Sulit mendapatkan feedback objektif terhadap CV tanpa bantuan HR atau profesional.
3. Tidak ada alat berbasis AI yang mudah diakses dan gratis untuk mengevaluasi kualitas CV secara menyeluruh.

## Goal
1. Mengembangkan platform berbasis web yang mampu memberikan analisis mendalam terhadap CV pengguna secara otomatis.
2. Memberikan insight yang aplikatif dan mudah dipahami untuk meningkatkan kualitas CV.
3. Membantu pengguna memahami elemen penting dalam sebuah CV yang relevan dengan kebutuhan industri saat ini.

# Technologies

## Machine Learning
- Python
- scikit-learn
- pandas
- numpy
- nltk / spaCy (untuk analisis teks)
- joblib / pickle (untuk model deployment)

Model AI kami dikembangkan untuk melakukan klasifikasi dan penilaian komponen CV seperti:
- Penilaian kualitas ringkasan diri
- Pendeteksian kata kunci relevan
- Penilaian struktur dan kesesuaian format

Model dilatih menggunakan dataset CV berlabel dan di-deploy dalam format `.pkl` agar bisa diintegrasikan ke dalam aplikasi web.

## Front-End and Back-End Developer
Techstack fullstack: Next.js + Express.js

### Setup Project

1. Install dependencies:
```
npm install
```

2. Set up .env:
```
DATABASE_URL="YOUR_DATABASE_SUPABASE_URL"
DIRECT_URL="YOUR_DIRECT_DATABASE_SUPABASE_URL"
BETTER_AUTH_SECRET=YOUR_SECRET
BETTER_AUTH_URL=YOUR_AUTH_URL

NEXT_PUBLIC_SUPABASE_URL=YOUR_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

3. Run development mode:
```
npm run dev
```

4. Or build/production mode:
```
npm run build
```

# Contact
| Nama                 | Email                                                                       | Path                             |
| -------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| Wahyu Pelita Jaya    | [wahyupelitajaya1@gmail.com](mailto:wahyupelitajaya1@gmail.com)             | Machine Learning                 |
| Annisa Saninah       | [saninahannisa@gmail.com](mailto:saninahannisa@gmail.com)                   | Machine Learning                 |
| Aprilia Yuli Lestari | [aprilialestari.analyst@gmail.com](mailto:aprilialestari.analyst@gmail.com) | Machine Learning                 |
| Alvin Krisna Valensa | [alvinkrisna116@gmail.com](mailto:alvinkrisna116@gmail.com)                 | Front-End and Back-End Developer |
| Fitri Dwi Anisa      | [sablahnisa201@gmail.com](mailto:sablahnisa201@gmail.com)                   | Front-End and Back-End Developer |
