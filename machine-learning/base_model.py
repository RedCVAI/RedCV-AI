from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle


class RedCV:
   def __init__(self, max_len: int = 200):
      # Update ini jika ingin menganti model
      self.model = load_model("./model/base_model.h5")

      # Update ini jika ingin menganti model
      with open("./tokenizer/tokenizer.pkl", "rb") as f:
         self.tokenizer = pickle.load(f)
      
      self.max_len = max_len
   
   def analyze(self, text: str, program_study: str, target_role: str) -> float:
        combined_text = f"{program_study} {target_role} {text}"
        sequence = self.tokenizer.texts_to_sequences([combined_text])

        padded = pad_sequences(sequence, maxlen=self.max_len, truncating='post')
        prediction = self.model.predict(padded)

        return float(prediction[0][0])