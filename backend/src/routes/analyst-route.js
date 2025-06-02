const AnalystController = require("../controllers/analyst-controller");

module.exports = [
  {
    method: "GET",
    path: "/analyst/all",
    handler: AnalystController.getAllAnalyses,
    options: {
      auth: "jwt",
      description: "Get all analysis results fot the authenticated user",
      tags: ["api", "analyst"],
    },
  },
];
