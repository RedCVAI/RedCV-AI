backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # Inisialisasi koneksi MySQL
│   │   └── db.config.js         # Load variabel koneksi dari .env
│   ├── routes/
│   │   ├── auth.routes.js       # API: /auth/register, /auth/login
│   │   ├── cv.routes.js         # API: /cv/upload, /cv/:id
│   │   └── ai.routes.js         # API: /ai/analyze, /ai/train
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── cv.controller.js
│   │   └── ai.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── cv.service.js
│   │   └── ai.service.js
│   ├── middleware/
│   │   ├── auth.middleware.js    # Validasi JWT
│   │   └── upload.middleware.js  # Validasi & parsing file
│   ├── models/
│   │   ├── user.model.js         # Skema dan query user
│   │   ├── cv.model.js           # Skema dan query CV
│   │   └── analysis.model.js     # Skema dan query hasil analisis
│   ├── migrations/
│   │   └── init-schema.sql       # SQL inisialisasi tabel MySQL
│   └── utils/
│       └── response.helper.js    # Fungsi bantu untuk response API
├── .env                           # Konfigurasi DB & token (DB_HOST, DB_USER, ...)
├── .gitignore                     # Ignore node_modules, .env, dll.
├── package.json                   # Dependensi dan script npm
├── server.js                      # Entry point: setup Hapi server & koneksi DB
└── README.md                      # Dokumentasi singkat backend
