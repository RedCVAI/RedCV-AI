"use strict";

const Hapi = require("@hapi/hapi");
const { registerAuthStrategy } = require("./src/middleware/auth-middleware");

// Import Route
const routes = require("./src/routes/auth-routes");
const CVRoutes = require("./src/routes/cv-routes");
const aiRoutes = require("./src/routes/ai-routes");

const init = async () => {
  console.log("server time at start:", new Date().toISOString(), "WIB");

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  // Daftarkan strategi autentikasi
  console.log("Mendaftarkan strategi autentikasi...");
  await registerAuthStrategy(server);

  // Debugging autentikasi
  server.ext("onPreAuth", (request, h) => {
    if (request.path === "/cv/upload") {
      console.log("onPreAuth /cv/upload", {
        headers: request.headers.authorization,
        rawHeaders: request.raw.req.headers,
      });
    }
    return h.continue;
  });

  // Daftarkan rute
  console.log("Mendaftarkan rute...");
  server.route(routes);
  server.route(CVRoutes);
  server.route(aiRoutes);

  // Tangani error autentikasi
  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
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
