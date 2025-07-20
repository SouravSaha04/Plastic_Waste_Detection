window.addEventListener('DOMContentLoaded', () => {
    const galleryDiv = document.getElementById('gallery');
    const savedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
    savedImages.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData;
        galleryDiv.appendChild(img);
    });
});