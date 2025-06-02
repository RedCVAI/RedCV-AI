const AiService = require("../services/ai-service");

const AnalystController = {
  async getAllAnalyses(request, h) {
    try {
      // Debugging: log keseluruhan
      console.log("Credentials:", request.auth.credentials);

      // Ambil userId dari JWT (via auth-middleware)
      const userId =
        request.auth.credentials?.userId ||
        request.auth.credentials?.id ||
        request.auth.credentials?.sub;

      if (!userId) {
        return h
          .response({
            statusCode: 401,
            error: "Unauthorized",
            message: "User ID not found in token",
          })
          .code(401);
      }

      // Panggil service untuk mengambil semua hasil analisis
      const analyses = await AiService.getAllAnalysesByUserId(userId);

      // Kembalikan respons sukses menggunakan response helper
      return h
        .response({
          status: "success",
          data: analyses,
        })
        .code(200);
    } catch (error) {
      console.log("Error in getAllAnalyses:", error);
      return h
        .response({
          statusCode: error.statusCode || 500,
          error: error.statusCode ? "Bad Request" : "Internal Server Error",
          message: error.message || "Failed to retrieve analysis results",
        })
        .code(error.statusCode || 500);
    }
  },
};

module.exports = AnalystController;
