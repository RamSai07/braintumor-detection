from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from PIL import Image
import tensorflow as tf

app = Flask(__name__)

CORS(app)

# Load your trained model (assuming it's a Keras model saved as a .h5 or .keras file)
model = tf.keras.models.load_model('trainedbrainmodel.keras')

# Endpoint to handle image uploads and return prediction result
@app.route('/brainimage', methods=['POST'])
def brainimage():
    # Check if an image file is uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    # Read the image in PIL format
    img = Image.open(file.stream)

    # Preprocess the image for your model (resize, normalize, etc.)
    img = img.resize((150, 150))  # Assuming the model expects 150x150 images
    img_array = np.array(img) / 255.0  # Normalize the image to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Predict using the trained model
    prediction = model.predict(img_array)

    # Get the result (Assuming binary classification for brain tumor: 0 for no tumor, 1 for tumor)
    result = 'Tumor detected' if prediction[0][0] < 0.5 else 'No tumor detected'

    # Return the result as a JSON response
    return jsonify({'prediction': result})


if __name__ == '__main__':
    app.run(debug=True, port=8000)
