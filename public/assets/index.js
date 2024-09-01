document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('imageUpload');
    const resultDiv = document.getElementById('result');
    
    if (fileInput.files.length === 0) {
        resultDiv.innerHTML = '<p>Please upload an image first.</p>';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = 'Uploaded bird image';
        imgElement.style.maxWidth = '300px';
        resultDiv.innerHTML = '';
        resultDiv.appendChild(imgElement);

        // Simulate prediction result
        const prediction = document.createElement('p');
        prediction.textContent = "Predicted Bird Species: Scarlet Macaw";
        resultDiv.appendChild(prediction);
    };

    reader.readAsDataURL(file);
});
