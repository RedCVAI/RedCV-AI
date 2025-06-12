require("dotenv").config();
"use strict";

const Hapi = require("@hapi/hapi");
const { registerAuthStrategy } = require("./src/middleware/auth-middleware");

const setupAssociations = require("./src/models/relationship"); // <-- Sesuaikan path jika berbeda

const sequelize = require('./src/config/sequelize');


const authRoutes = require("./src/routes/auth-routes");
const CVRoutes = require("./src/routes/cv-routes");
const aiRoutes = require("./src/routes/ai-routes");
const analystRoutes = require("./src/routes/analyst-route");

const init = async () => {
  console.log("server time at start:", new Date().toISOString(), "WIB");

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["http://localhost:8080", 'https://frontend-redcv.vercel.app'],
        additionalHeaders: ['cache-control', 'x-requested-with', 'authorization'],
      },
      payload: {
        output: "data",
        parse: true,
        allow: ["application/json", "multipart/form-data"],
        maxBytes: 1048576,
      },
    },
  });

  setupAssociations(); // <--- BARIS KRUSIAL INI!
  console.log('DEBUG: Sequelize model associations have been set up.');


  try {
    await sequelize.authenticate();
    console.log('DEBUG: Connection to database has been established successfully.');
  } catch (error) {
    console.error('ERROR: Unable to connect to the database:', error);
    process.exit(1); // Keluar jika koneksi DB gagal
  }


  console.log("Mendaftarkan strategi autentikasi...");
  await registerAuthStrategy(server);

  server.ext("onPreAuth", (request, h) => {
    if (request.path === "/cv/upload") {
      console.log("onPreAuth /cv/upload", {
        headers: request.headers.authorization,
        rawHeaders: request.raw.req.headers,
      });
    }
    return h.continue;
  });

  console.log("Mendaftarkan rute...");
  server.route(authRoutes);
  server.route(CVRoutes);
  server.route(aiRoutes);
  server.route(analystRoutes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response.isBoom && response.output.statusCode === 400) {
      console.error("400 Bad Request:", {
        path: request.path,
        payload: request.payload,
        validationMessage: response.message,
      });
    }

    if (response.isBoom && response.output.statusCode === 401) {
      console.log("401 Error:", {
        path: request.path,
        auth: request.auth,
        error: response.message,
        token: request.auth.artifacts?.token,
      });
      const errorMessage =
        response.data?.errorMessage || "Kredensial tidak valid";
      return h
        .response({
          statusCode: 401,
          error: "Unauthorized",
          message: errorMessage,
        })
        .code(401);
    }
    return h.continue;
  });

  // Mulai server
  console.log("Memulai server...");
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error("Kesalahan tidak tertangani:", err);
  process.exit(1);
});

init();