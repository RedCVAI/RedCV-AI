class DashboardView {
  constructor() {
    this.app = document.createElement('div');
    this.app.className = 'dashboard-view';
    this.app.innerHTML = `
      <section class="upload-banner">
        <div>
          <h2>Ready to analyze your CV?</h2>
          <p>Get instant AI-powered feedback and improve your chances</p>
        </div>
        <button id="uploadCVBtn" class="btn-primary">Upload CV</button>
      </section>

      <section class="recent-analysis">
        <div class="analysis-header">
          <h3>Recent Analysis</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date</th>
                <th>Content Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="recentAnalysisTableBody">
              <tr><td colspan="4" class="text-center">Loading recent analyses...</td></tr>
            </tbody>
          </table>
        </div>
        <div class="pagination d-flex justify-content-center mt-3">
          </div>
      </section>
    `;
  }

  getElement() {
    return this.app;
  }

  renderRecentAnalyses(analyses) {
    const tableBody = this.app.querySelector('#recentAnalysisTableBody');
    tableBody.innerHTML = '';

    if (!analyses || analyses.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No recent analyses found. Upload your first CV!</td></tr>';
      return;
    }

    analyses.forEach(analysis => {
      const row = document.createElement('tr');
      const scoreClass = analysis.contentScore >= 8 ? 'score-green' : (analysis.contentScore >= 5 ? 'score-orange' : 'score-red');

      row.innerHTML = `
        <td>${analysis.fileName}</td>
        <td>${analysis.date}</td>
        <td class="${scoreClass}">${analysis.contentScore}%</td>
        <td class="status">${analysis.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  showLoading() {
    const tableBody = this.app.querySelector('#recentAnalysisTableBody');
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center">Loading recent analyses...</td></tr>';
  }

  showError(message) {
    const tableBody = this.app.querySelector('#recentAnalysisTableBody');
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error: ${message}</td></tr>`;
  }

  bindUploadCV(handler) {
    const btn = this.app.querySelector('#uploadCVBtn');
    if (btn) btn.addEventListener('click', handler);
  }
}

export default DashboardView;