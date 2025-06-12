export default class DashboardPresenter {
  constructor(view) {
    this.view = view;
  }

  init() {
    this.view.bindUploadCV(() => {
      window.location.hash = '#/upload';
    });

    this.loadRecentAnalyses();
  }

  async loadRecentAnalyses() {
    this.view.showLoading();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.view.showError("Anda belum login atau token tidak ditemukan.");
        return;
      }

      console.log("DEBUG DashboardPresenter: Mengambil data analisis terbaru dari Hapi.js...");
      const response = await fetch("http://localhost:3000/cv/recent", { // Endpoint di Hapi.js
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData?.message || "Gagal memuat data analisis terbaru.";
        console.error("ERROR DashboardPresenter: Gagal memuat data:", message, errorData);
        this.view.showError(message);
        return;
      }

      const result = await response.json();
      console.log("DEBUG DashboardPresenter: Data analisis terbaru diterima:", result);

      if (result && result.data && Array.isArray(result.data)) {
        this.view.renderRecentAnalyses(result.data);
      } else {
        this.view.showError("Format data analisis terbaru tidak valid.");
      }

    } catch (error) {
      console.error("ERROR DashboardPresenter: Terjadi kesalahan fatal saat memuat data analisis terbaru:", error);
      this.view.showError(`Terjadi kesalahan: ${error.message}`);
    }
  }
}