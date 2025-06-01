const analyzeCV = (cvData) => {
  // Mock data: Simulasi analisis CV berdasarkan kata kunci
  const keywords = [
    "javascript",
    "phyton",
    "react",
    "node",
    "sql",
    "teamwork",
    "leadership",
  ];
  let score = 0;
  const analysisData = {
    score: 0,
    comment: "",
    suggestions: [],
  };

  // Contoh logika analisis: Hitung skor berdasarkan kata kunci yang ditemukan
  const cvText = JSON.stringify(cvData).toLowerCase();
  keywords.forEach((keyword) => {
    if (cvText.includes(keyword)) {
      score += 10; // Tambah 10 poin per kata kunci
      analysisData.suggestions.push(`Strength: Proficient in ${keyword}`);
    }
  });

  // Set skor dan komentar berdasarkan hasil analisis
  analysisData.score = score;
  if (score >= 50) {
    analysisData.comment = "Well-structured CV with strong technical skills";
    analysisData.suggestions.push(
      "Consider highlighting quantifiable achievemnts"
    );
  } else {
    analysisData.comment = "CV shows potential but could be improved";
    analysisData.suggestions.push(
      "Add more technical skills like JavaScript or Phyton"
    );
  }

  return analysisData;
};

module.exports = { analyzeCV };
