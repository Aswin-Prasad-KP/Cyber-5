<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redact Image</title>
    <script>
        function submitForm(event) {
            event.preventDefault();  // Prevent the form from submitting the traditional way

            // Create a FormData object
            var formData = new FormData();
            formData.append("image", document.getElementById("image").files[0]);
            formData.append("entities", document.getElementById("entities").value);

            // Create an AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:5000/redact", true);  // Flask endpoint
            
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);

                    // Display the redacted image
                    var imagePath = response.redacted_image;
                    document.getElementById("result").innerHTML = "<img src='./uploads/redacted_aadhar.jpeg' alt='Redacted Image' />";
                } else {
                    alert("Something went wrong, please try again.");
                }
            };

            // Send the form data
            xhr.send(formData);
        }
    </script>
</head>
<body>
    <h1>Redact Sensitive Information from Image</h1>
    
    <form onsubmit="submitForm(event)" enctype="multipart/form-data">
        <label for="entities">Entities to Redact (comma-separated):</label><br>
        <input type="text" id="entities" name="entities" placeholder="Aadhar Number, Name, DOB" required><br><br>
        
        <label for="image">Upload Image:</label><br>
        <input type="file" id="image" name="image" accept="image/*" required><br><br>
        
        <button type="submit">Redact Image</button>
    </form>

    <div id="result">
        <!-- The redacted image will be displayed here -->
    </div>
</body>
</html>
