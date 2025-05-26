from base_model import RedCV
from flask import Flask, jsonify, request
from flask_cors import CORS
import pdfplumber 

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    resp = {
        "message": "All service working normally.",
    }
    
    return jsonify(resp)

@app.route('/api/v1/analyze-cv', methods=['POST'])
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
    if 'cv' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['cv']
    degree = request.form.get('degree')
    profesion = request.form.get('profesion')

    if not degree or not profesion:
        return jsonify({'error': 'Degree and profesion must be provided'}), 400

    try:
        with pdfplumber.open(file) as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        text = "\n".join(pages).strip()
    except Exception as e:
        return jsonify({'error': f'Failed to extract text from PDF: {str(e)}'}), 500

    if not text:
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
    return jsonify(resp)

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal Server Error, please try again later."
    }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=True)
