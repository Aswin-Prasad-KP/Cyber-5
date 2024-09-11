import os
from flask import Flask, request, jsonify
import cv2
import easyocr
import numpy as np
import re
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow Cross-Origin requests (for interaction with the frontend)

# Initialize the EasyOCR reader
reader = easyocr.Reader(['en'])

# Redaction function wrapped in an API
@app.route('/redact', methods=['POST'])
def redact_image():
    # Get the file and entities from the request
    image_file = request.files['image']
    entities = request.form.get('entities').split(',')
    entities = [entity.strip().lower() for entity in entities]  # Convert to lowercase and strip whitespace

    # Define redaction patterns
    redaction_patterns = {
        "aadhar number": r"\d{12}",
        "dob": r"\d{2}/\d{2}/\d{4}",
        "name": r".+"
    }

    def is_value_match(text, entity):
        pattern = redaction_patterns.get(entity, r".*")
        return bool(re.match(pattern, text))

    # Convert the uploaded file to an OpenCV image
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Perform OCR on the image
    results = reader.readtext(image)

    # Track heading positions to avoid redacting them
    heading_boxes = set()

    # Loop over the OCR results to detect headings
    for (bbox, text, prob) in results:
        if prob > 0.75:
            if any(entity in text.lower() for entity in entities):
                heading_boxes.add(tuple(map(tuple, bbox)))

    # Redact values while avoiding headings
    for (bbox, text, prob) in results:
        if prob > 0.75:
            if not any(box in heading_boxes for box in [tuple(map(tuple, bbox))]):
                for entity in entities:
                    if is_value_match(text, entity):
                        top_left = tuple([int(coord) for coord in bbox[0]])
                        bottom_right = tuple([int(coord) for coord in bbox[2]])
                        cv2.rectangle(image, top_left, bottom_right, (0, 0, 0), -1)

    # Generate a unique file name (with timestamp or unique ID)
    unique_file_name = f"redacted_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpeg"
    
    # Save the redacted image with the unique name
    output_path = os.path.join(r'C:\xampp\htdocs\Re-Dact\Flask\uploads', unique_file_name)
    cv2.imwrite(output_path, image)

    # Return the unique file name in the response
    return jsonify({"message": "Redaction complete", "redacted_image": unique_file_name})

if __name__ == '__main__':
    app.run(debug=True)
