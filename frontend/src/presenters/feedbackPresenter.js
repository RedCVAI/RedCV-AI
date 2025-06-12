export default class FeedbackPresenter {
  constructor(view) {
    this.view = view;
  }

  loadFeedbackData() {
    this.view.showLoader();

    console.log("DEBUG FeedbackPresenter: Memulai loadFeedbackData.");
    const storedResult = sessionStorage.getItem('analysisResult');
    console.log("DEBUG FeedbackPresenter: storedResult dari sessionStorage:", storedResult);

    if (storedResult) {
      try {
        const hapiData = JSON.parse(storedResult);
        console.log("DEBUG FeedbackPresenter: hapiData setelah parse JSON:", hapiData);

        const backendAnalysisData = hapiData.analysis?.analysis_data;
        console.log("DEBUG FeedbackPresenter: backendAnalysisData yang diekstrak:", backendAnalysisData);

        const precisionScoreValue = backendAnalysisData?.metric?.precission_score ?? 0;
        
        if (!backendAnalysisData || typeof backendAnalysisData.metric === 'undefined' || typeof backendAnalysisData.metric.precission_score === 'undefined') {
            console.error("ERROR FeedbackPresenter: Data analisis atau skor presisi tidak valid. Menggunakan nilai default.");
        }

        const feedbackMessages = [
          `Skor presisi: ${precisionScoreValue.toFixed(2)}`,
          precisionScoreValue >= 8 ? "Sangat relevan dengan profesi yang dituju." : "Perlu ditingkatkan relevansinya dengan profesi yang dituju.",
          `Derajat: ${backendAnalysisData?.degree || 'Tidak tersedia'}`,
          `Profesi yang dituju: ${backendAnalysisData?.for_profesion || 'Tidak tersedia'}`,
          `Konten CV: ${backendAnalysisData?.cv_content?.substring(0, Math.min(backendAnalysisData.cv_content.length, 150))}...` || 'Konten CV tidak tersedia.'
        ];
        console.log("DEBUG FeedbackPresenter: contentFeedback yang akan dikirim:", feedbackMessages);

        const displayData = {
          filename: hapiData.file_name || "Uploaded CV",
          date: new Date(hapiData.upload_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          
          contentScore: parseFloat(precisionScoreValue.toFixed(1)),
          
          contentFeedback: feedbackMessages,
          
          skills: backendAnalysisData?.skills || [] 
        };
        console.log("DEBUG FeedbackPresenter: displayData yang akan dirender:", displayData);

        this.view.renderFeedback(displayData);
      } catch (error) {
        console.error("ERROR FeedbackPresenter: Terjadi kesalahan saat memproses data analisis:", error);
        this.view.hideLoader();
      }
    } else {
      console.warn("WARNING FeedbackPresenter: Tidak ada data analisis di sessionStorage.");
      this.view.hideLoader();
    }
  }

  bindEvents() {
    this.view.bindUploadNewCV(() => {
      sessionStorage.removeItem('analysisResult');
      window.location.hash = '#/upload';
    });

    this.view.bindBackLink(() => {
      sessionStorage.removeItem('analysisResult');
      window.history.back();
    });
  }
}