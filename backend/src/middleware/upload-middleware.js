const Multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Gunakan UPLOAD_DIR dari .env atau fallback ke path relatif
const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
console.log("Current workinng directory:", process.cwd());
console.log("Upload directory dikonfigurasi:", uploadDir);

// Pastikan folder uploads/ ada
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Folder uploads/ dibuat:", uploadDir);
  } catch (err) {
    console.error("Gagal membuat folder uploads/:", err.message);
    throw new Error(`Gagal membuat folder uploads/: ${err.message}`);
  }
}

// Verifikasi izin menulis
try {
  fs.accessSync(uploadDir, fs.constants.W_OK);
  console.log("Folder uploads/ dapat ditulis");
} catch (err) {
  console.error("Folder uploads/ tidak dapat ditulis:", err.message);
  throw new Error(`Folder uploads/ tidak dapat ditulis: ${err.message}`);
}

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Menyimpan file ke:", uploadDir);
    try {
      fs.accessSync(uploadDir, fs.constants.W_OK);
      cb(null, uploadDir);
    } catch (err) {
      console.error("Error menyimpan file ke uploads/:", err.message);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const filename = `${timestamp}-${originalName}`;
    console.log("Nama file:", filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    console.log("File diterima:", file.originalname); // Log file diterima
    cb(null, true);
  } else {
    const error = new Error("Only .pdf and .docx files are allowed");
    error.statusCode = 400;
    console.error("File ditolak:", file.originalname); // Log file ditolak
    cb(error, false);
  }
};

const upload = Multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("cv");

module.exports = { upload };
