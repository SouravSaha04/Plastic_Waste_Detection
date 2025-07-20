document.getElementById('captureBtn').addEventListener('click', async () => {
    if (!canvas) return;
    const ctx2 = canvas.getContext('2d');
    const date = new Date();
    const dateTime = date.toLocaleString();

    navigator.geolocation.getCurrentPosition(position => {
        const locationText = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
        ctx2.fillStyle = 'white';
        ctx2.font = '20px Arial';
        ctx2.fillText(dateTime, 10, canvas.height - 30);
        ctx2.fillText(locationText, 10, canvas.height - 10);

        const imgData = canvas.toDataURL('image/png');

        fetch('/save-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imgData })
        }).then(res => {
            if (res.ok) alert("Image saved successfully!");
            else alert("Error saving image");
        });

    }, error => {
        alert('Location access denied. Cannot add watermark.');
    });
});