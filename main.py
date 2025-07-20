from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import base64
from datetime import datetime

app = Flask(__name__)
IMAGE_FOLDER = os.path.join(os.getcwd(), 'images')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    image_list = os.listdir(IMAGE_FOLDER)
    image_urls = ['/images/' + img for img in image_list]
    return render_template('gallery.html', images=image_urls)

@app.route('/save-image', methods=['POST'])
def save_image():
    data = request.get_json()
    image_data = data['image'].split(',')[1]  # remove "data:image/png;base64,"
    image_bytes = base64.b64decode(image_data)
    filename = datetime.now().strftime('%Y%m%d_%H%M%S') + '.png'
    filepath = os.path.join(IMAGE_FOLDER, filename)
    with open(filepath, 'wb') as f:
        f.write(image_bytes)
    return jsonify({'status': 'success', 'filename': filename})

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7860)