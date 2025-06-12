import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np

class RedCV:
    def __init__(self, max_len: int = 200):
        current_dir = os.path.dirname(os.path.abspath(__file__))

        model_path = os.path.join(current_dir, "model", "base_model.h5")
        print(f"Mencoba memuat model dari: {model_path}")
        if not os.path.exists(model_path):
            print(f"ERROR: File model tidak ditemukan di: {model_path}")
            raise FileNotFoundError(f"File model tidak ditemukan di: {model_path}")
        self.model = load_model(model_path)
        print("Model berhasil dimuat.")

        tokenizer_path = os.path.join(current_dir, "tokenizer", "tokenizer.pkl")
        print(f"Mencoba memuat tokenizer dari: {tokenizer_path}")
        if not os.path.exists(tokenizer_path):
            print(f"ERROR: File tokenizer tidak ditemukan di: {tokenizer_path}")
            raise FileNotFoundError(f"File tokenizer tidak ditemukan di: {tokenizer_path}")
        with open(tokenizer_path, "rb") as f:
            self.tokenizer = pickle.load(f)
        print("Tokenizer berhasil dimuat.")

        self.max_len = max_len

    def analyze(self, text: str, program_study: str, target_role: str) -> float:
        try:
            text_sequences = self.tokenizer.texts_to_sequences([text])
            
            print(f"DEBUG (RedCV.analyze): Original text: {text[:50]}...") 
            print(f"DEBUG (RedCV.analyze): Text sequences: {text_sequences}")
            if not text_sequences or not text_sequences[0]: 
                print("WARNING (RedCV.analyze): Tokenizer menghasilkan sequence kosong. CV mungkin tidak memiliki kata yang dikenal.")
                return 0.0 
            padded_text = pad_sequences(text_sequences, maxlen=self.max_len, padding='post', truncating='post')
            
            print(f"DEBUG (RedCV.analyze): Padded text shape: {padded_text.shape}")
            print(f"DEBUG (RedCV.analyze): Padded text sample (first 10 tokens): {padded_text[0][:10]}")

            raw_prediction_output = self.model.predict(padded_text)
            
            print(f"DEBUG (RedCV.analyze): Output mentah dari model.predict(): {raw_prediction_output}")
            print(f"DEBUG (RedCV.analyze): Tipe output: {type(raw_prediction_output)}")
            if isinstance(raw_prediction_output, np.ndarray):
                print(f"DEBUG (RedCV.analyze): Shape output NumPy: {raw_prediction_output.shape}")
            else:
                print("WARNING (RedCV.analyze): Output model bukan NumPy array.")

            prediction = raw_prediction_output[0][0]
            
            print(f"DEBUG (RedCV.analyze): Prediksi mentah dari model (setelah indexing): {prediction}")

            precission_score = float(prediction)

            precission_score_scaled = precission_score * 10 
            
            precission_score_final = np.clip(precission_score_scaled, 0.0, 10.0)

            print(f"DEBUG (RedCV.analyze): Precission Score (akhir, setelah scaling): {precission_score_final}")
            return precission_score_final

        except Exception as e:
            print(f"ERROR (RedCV.analyze): Gagal melakukan analisis CV: {e}")
            return None