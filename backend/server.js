require("dotenv").config();
console.log('JWT SECRET:', process.env.JWT_SECRET); // Debug
const Hapi = require("@hapi/hapi");
const { registerAuthStrategy } = require("./src/middleware/auth-middleware");

const init = async () => {
  const server = Hapi.server({
    port: process.env.port || 3000,
    host: "localhost",
  });

  // Daftarkan strategi autentifikasi JWT
  await registerAuthStrategy(server);

  // Tambahkan rute autentifikasi
  server.route(require("./src/routes/auth-routes"));

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "RedCV AI Backend";
    },
  });

  // Uji koneksi database Sequelize
  const sequelize = require("./src/config/sequelize");
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

process.on("unhandleRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
