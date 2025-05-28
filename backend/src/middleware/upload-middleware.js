const Multer = require("multer");

const storage = Multer.memoryStorage(); // Simpan file di memori

const upload = Multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("cv");

module.exports = { upload };
