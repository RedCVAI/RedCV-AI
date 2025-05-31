const Multer = require("multer");
const path = require("path");

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder penyimpanan file
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    cb(null, `${timestamp}-${originalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // izinkan file
  } else {
    const error = new Error("Only .pdf and .docx files are allowed");
    error.statusCode = 400;
    cb(error, false); // Tolak file
  }
};

const upload = Multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("cv");

module.exports = { upload };
