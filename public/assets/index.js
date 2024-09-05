document.getElementById('uploadBtn').addEventListener('click', function(e) {
    const fileInput = document.getElementById('imageUpload');
    const resultDiv = document.getElementById('result');
    
    if (fileInput.files.length === 0) {
        // If no files were sent, return. 
        return;
    }else{
        // Set the loading SVG
        document.getElementById('loading').style.display = 'block';
    }


});




