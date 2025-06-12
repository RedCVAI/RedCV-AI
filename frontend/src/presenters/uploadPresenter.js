export default class UploadPresenter {
  constructor(view) {
    this.view = view;
    this.selectedFile = null;
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    if (file && this.validasiFile(file)) {
      this.selectedFile = file;
      this.view.tampilkanFileTerpilih(file.name);
    } else {
      this.selectedFile = null;
      this.view.tampilkanError("* File tidak valid. Silakan unggah file PDF dengan ukuran maksimal 5MB.");
    }
  }

  validasiFile(file) {
    const tipeDiizinkan = ["application/pdf"];
    const ukuranMaks = 5 * 1024 * 1024;
    return tipeDiizinkan.includes(file.type) && file.size <= ukuranMaks;
  }

  async handleSubmit() {
    if (!this.selectedFile) {
      this.view.tampilkanError("* Silakan pilih file terlebih dahulu.");
      return;
    }

    const degree = this.view.getDegree();
    const programStudi = this.view.getProgramStudi();
    const profesion = this.view.getProfesion();

    if (!degree || !programStudi || !profesion) {
      this.view.tampilkanError("* Silakan lengkapi degree, program studi, dan profesi.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      this.view.tampilkanError("* Anda belum login atau token tidak ditemukan.");
      return;
    }

    this.view.tampilkanLoading();

    try {
      const formData = new FormData();
      formData.append("cv", this.selectedFile);
      formData.append("degree", degree);
      formData.append("program_studi", programStudi);
      formData.append("profesion", profesion);

      const response = await fetch("http://localhost:3000/cv/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
      const errorData = await response.json();

        if (response.status === 400 && errorData?.message === "No text found in PDF") {
          this.view.tampilkanError("* Tidak ada teks dalam file.");
        } else {
          const message = errorData?.message || "Terjadi kesalahan saat upload.";
          this.view.tampilkanError(`* Gagal mengunggah: ${message}`);
        }

        return;
      }

      const result = await response.json();
      console.log("Response Hapi.js yang diterima di UploadPresenter:", result);

      if (result && result.data) {
        sessionStorage.setItem('analysisResult', JSON.stringify(result.data));
      } else {
        throw new Error("Format respons Hapi.js tidak sesuai atau tidak ada data.");
      }

      this.view.tampilkanSukses(`* File "${this.selectedFile.name}" berhasil diunggah.`);
      this.view.animasiMenujuFeedback(() => {
        window.location.hash = "#/feedback";
      });

    } catch (error) {
      console.error("Error during upload:", error);
      this.view.tampilkanError(`* Terjadi kesalahan: ${error.message}`);
    } finally {
      this.view.sembunyikanLoading();
    }
  }
}