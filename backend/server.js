'use strict';

const Hapi = require('@hapi/hapi');
const { registerAuthStrategy } = require('./src/middleware/auth-middleware');
const routes = require('./src/routes/auth-routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  });

  // Daftarkan strategi autentikasi
  console.log('Mendaftarkan strategi autentikasi...');
  await registerAuthStrategy(server);

  // Daftarkan rute
  console.log('Mendaftarkan rute...');
  server.route(routes);

  // Tangani error autentikasi
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 401) {
      const errorMessage = response.data?.errorMessage || 'Kredensial tidak valid';
      return h.response({
        statusCode: 401,
        error: 'Unauthorized',
        message: errorMessage
      }).code(401);
    }
    return h.continue;
  });

  // Mulai server
  console.log('Memulai server...')
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Kesalahan tidak tertangani:', err);
  process.exit(1);
});

init();