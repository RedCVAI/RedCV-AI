from base_model import RedCV
from flask import Flask, jsonify, request
from flask_cors import CORS
import pdfplumber
import os 
import tempfile 
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    resp = {
        "message": "All service working normally.",
    }
    return jsonify(resp)

@app.route('/api/v1/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    if 'desc' not in data or 'degree' not in data or 'profesion' not in data:
      return jsonify({'error': 'degree, profesion and desc is required.'}), 400

    redcv = RedCV()
    result = redcv.analyze(data["desc"], data["degree"], data["profesion"])
    resp = {
        "status": "success",
        "data": {
            "cv_content": data["desc"],
            "degree": data["degree"],
            "for_profesion": data["profesion"],
            "metric": {
                "precission_score": result,
            }
        }
    }
    return jsonify(resp)

@app.route('/api/v1/analyze-file', methods=['POST'])
def analyze_file():
    print("Flask: Menerima permintaan ke /api/v1/analyze-file")

    if 'cv' not in request.files:
        print("Flask: Error - 'cv' tidak ada di request.files")
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['cv']
    degree = request.form.get('degree')
    profesion = request.form.get('profesion')

    if not degree or not profesion:
        print(f"Flask: Error - Degree ({degree}) atau Profesion ({profesion}) tidak ada")
        return jsonify({'error': 'Degree and profesion must be provided'}), 400

    filename = secure_filename(file.filename)
    temp_file_path = None # Inisialisasi
    try:
        temp_fd, temp_file_path = tempfile.mkstemp(suffix=".pdf")
        os.close(temp_fd)

        file.save(temp_file_path)
        print(f"Flask: File sementara berhasil disimpan di: {temp_file_path}")

        with pdfplumber.open(temp_file_path) as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        text = "\n".join(pages).strip()
        print(f"Flask: Teks berhasil diekstrak, panjang: {len(text)} karakter")

    except Exception as e:
        print(f"Flask: Error saat memproses PDF: {e}")
        return jsonify({'error': f'Failed to extract text from PDF: {str(e)}'}), 500
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            print(f"Flask: File sementara dihapus: {temp_file_path}")

    if not text:
        print("Flask: Error - Tidak ada teks ditemukan di PDF")
        return jsonify({'error': 'No text found in PDF'}), 400

    redcv = RedCV()
    result = redcv.analyze(text, degree, profesion)

    resp = {
        "status": "success",
        "data": {
            "cv_content": text,
            "degree": degree,
            "for_profesion": profesion,
            "metric": {
                "precission_score": result
            }
        }
    }
    print("Flask: Analisis CV berhasil")
    return jsonify(resp)

@app.errorhandler(500)
def internal_server_error(error):
    print(f"Flask: Kesalahan Server Internal - {error}")
    return jsonify({
        "status": "error",
        "message": "Internal Server Error, please try again later."
    }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=True)