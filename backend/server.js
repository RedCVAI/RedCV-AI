const Hapi = require("@hapi/hapi");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.port || 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "RedCV AI Backend";
    },
  });

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

process.on("unhandleRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
