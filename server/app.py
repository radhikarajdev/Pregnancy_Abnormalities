from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
import os


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path='/Users/radhikarajdev/vscode/se/server/model.tflite')

# Allocate tensors for the interpreter
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Process image and make predictions
def process_image(image):
    try:
        # Preprocess the image
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        image = cv2.resize(image, (256, 256))
        image = np.expand_dims(image, axis=(0, -1)) / 255.0  # Normalize to [0, 1]

        print("Processed image shape:", image.shape)

        # Set the input tensor
        interpreter.set_tensor(input_details[0]['index'], image.astype(np.float32))

        # Run inference
        interpreter.invoke()

        # Get the output tensor
        prediction = interpreter.get_tensor(output_details[0]['index'])

        print("Prediction shape:", prediction.shape)
        print("Prediction sample:", prediction)

        # Analyze thickness
        row_of_interest = 100
        binary_mask = (prediction[0, :, :, 0] > 0.05).astype(np.uint8)
        print("Binary mask shape:", binary_mask.shape)

        column_of_interest = 100
        column_below_row = binary_mask[row_of_interest:, column_of_interest]

        white_pixel_positions = np.where(column_below_row > 0)[0]

        if len(white_pixel_positions) > 0:
            max_position = np.max(white_pixel_positions) + row_of_interest
            min_position = np.min(white_pixel_positions) + row_of_interest
            thickness = max_position - min_position
            thickness_in_mm = 0.156 * thickness
            print(f"Calculated thickness in mm: {thickness_in_mm}")
            return thickness_in_mm
        else:
            print("No white pixels detected.")
            return 0
    except Exception as e:
        print(f"Error in process_image: {e}")
        raise


@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Request Headers:", request.headers)
        # Ensure the 'temp' directory exists
        temp_dir = "temp"
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)

        if 'image' not in request.files:
            return jsonify({"message": "No image uploaded"}), 400

        file = request.files['image']
        file_path = os.path.join(temp_dir, file.filename)
        file.save(file_path)

        # Read and process the image
        image = cv2.imread(file_path)
        if image is None:
            return jsonify({"message": "Error reading the image"}), 400

        thickness_in_mm = process_image(image)
        os.remove(file_path)

        if thickness_in_mm > 3.5:
            message = "High Probability of Abnormalities"
        else:
            message = "Low Probability of Abnormalities"

        return jsonify({"message": message}), 200
    except Exception as e:
        return jsonify({"message": f"Error processing the image: {str(e)}"}), 500
    
@app.route('/predict', methods=['OPTIONS'])
def handle_options():
    return '', 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
