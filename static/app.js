let model, video, canvas, ctx, isScanning = false;

async function setupCamera() {
    video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
    });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
}

async function loadModel() {
    model = await cocoSsd.load();
}

async function detectFrame() {
    if (!isScanning) return;
    const predictions = await model.detect(video);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    predictions.forEach(pred => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(...pred.bbox);
        ctx.fillStyle = 'red';
        ctx.fillText(pred.class, pred.bbox[0], pred.bbox[1] > 10 ? pred.bbox[1] - 5 : 10);
    });
    requestAnimationFrame(detectFrame);
}

document.getElementById('startBtn').addEventListener('click', async () => {
    await setupCamera();
    canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx = canvas.getContext('2d');
    await loadModel();
    isScanning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'inline';
    document.getElementById('captureBtn').style.display = 'inline';
    detectFrame();
});

document.getElementById('stopBtn').addEventListener('click', () => {
    isScanning = false;
    document.getElementById('startBtn').style.display = 'inline';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('captureBtn').style.display = 'none';
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
});