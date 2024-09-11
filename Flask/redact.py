import cv2
import easyocr
import matplotlib.pyplot as plt

# Define the image path
image_path = r"C:\Users\soniy\Pictures\aadhar.jpg"

# Load the image using OpenCV
image = cv2.imread(image_path)

# Initialize the EasyOCR reader
reader = easyocr.Reader(['en'])

# Perform OCR on the image
results = reader.readtext(image_path)

# Ask the user to input the keywords/entities they want to redact (e.g., Aadhar Number, Name, DOB, etc.)
entities = input("Enter the entities for redaction (Aadhar Number, Name, DOB, etc., comma-separated): ").split(',')
entities = [entity.strip().lower() for entity in entities]  # Convert to lowercase and strip whitespace

# Define patterns to match values for specific entities
# Adjust patterns based on expected formats for better accuracy
redaction_patterns = {

    "aadhar number": r"\d{12}",  # Assuming Aadhar numbers are 12 digits
    "dob": r"\d{2}/\d{2}/\d{4}",  # Assuming DOB is in the format DD/MM/YYYY
    "name": r".+"  # This pattern can be refined further based on specific needs
	
}

# Function to check if text matches an entity pattern
import re
def is_value_match(text, entity):
    pattern = redaction_patterns.get(entity, r".*")
    return bool(re.match(pattern, text))

# Track heading positions to avoid redacting them
heading_boxes = set()

# Loop over the OCR results to detect headings
for (bbox, text, prob) in results:
    if prob > 0.75:
        if any(entity in text.lower() for entity in entities):
            # Record bounding boxes of headings
            heading_boxes.add(tuple(map(tuple, bbox)))

# Redact values while avoiding headings
for (bbox, text, prob) in results:
    if prob > 0.75:
        # Check if the text is not a heading
        if not any(box in heading_boxes for box in [tuple(map(tuple, bbox))]):
            for entity in entities:
                if is_value_match(text, entity):
                    print(f"Redacting value for {entity}: '{text}' with confidence: {prob:.2f}")
                    
                    # Get the bounding box coordinates
                    top_left = tuple([int(coord) for coord in bbox[0]])
                    bottom_right = tuple([int(coord) for coord in bbox[2]])
                    
                    # Draw a black rectangle over the text (redacting it)
                    cv2.rectangle(image, top_left, bottom_right, (0, 0, 0), -1)

# Save the redacted image
redacted_image_path = r"C:\xampp\htdocs\Re-Dact\Flask\uploads\redacted_aadhar.jpeg"
cv2.imwrite(redacted_image_path, image)

# Display the redacted image using Matplotlib
redacted_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR (OpenCV) to RGB (Matplotlib)
plt.figure(figsize=(10, 8))
plt.imshow(redacted_image)
plt.title("Redacted Image Preview")
plt.axis("off")  # Hide axis
plt.show()

print(f"Redaction complete. Image saved at {redacted_image_path}")