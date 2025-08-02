# Plastic Waste Detection 

 This application detects plastic objects from roadside and near residence. User can capture those objects with real-time location tagging and timestamp watermarks on images to identify location.
 
 Features:
 Detects objects from a webcam feed using a pre-trained model.
 Draws bounding boxes and labels on detected objects.
 Allows users to capture the frame with timestamp and geolocation watermarks.
 Saves the annotated image on the server.
 Displays saved images in a gallery.

Technologies used:
Backend: Python, Flask
Machine-Learning: COCO-SSD model (via TensorFlow.js)
Algorithm: Single Shot MultiBox Detector (SSD) trained on the COCO 
dataset
Frontend: Html, CSS, JS
API: Geolocation API in javascript
 
