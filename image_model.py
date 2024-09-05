from flask import Flask, request, jsonify
from PIL import Image
import io
import numpy as np
import tensorflow as tf
from model_download import names as bird_species

app = Flask(__name__)

# Load your pre-trained model (adjust the file path to your model)
MODEL_PATH = './525-OJ-Bird-Classifier(1).keras'
model = tf.keras.models.load_model(MODEL_PATH)

# Preprocessing function (adjust based on your model's input requirements)
def preprocess_image(image, target_size):
    image = image.resize(target_size)
    image = np.array(image)
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image = image / 255.0  # Normalize pixel values to [0, 1]
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    try:
        img = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(img, target_size=(150, 150))  # Adjust size if needed
        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions[0])  # Get the predicted class index

        # Convert the predicted class to a bird species name (create your own mapping)
        predicted_bird = bird_species[predicted_class]

        return jsonify({'predicted_bird': predicted_bird})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
