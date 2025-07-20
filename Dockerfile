# Use the official Python base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install necessary system packages
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt if you have it
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Ensure the images directory exists
RUN mkdir -p /app/images

# Set the port Hugging Face Spaces expects
ENV PORT 7860

# Expose the port
EXPOSE 7860

# Run the Flask app
CMD ["python", "main.py"]