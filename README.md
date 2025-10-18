###🌼 Iris Flower Classification using Google Gemini AI
🧠 Overview

This project demonstrates how Google’s Gemini AI model can be used to classify Iris flower species based on their sepal and petal measurements.
It’s a modern reimplementation of the classic Iris Dataset problem using Generative AI and multimodal capabilities.

The application predicts whether a given flower is:

Iris Setosa

Iris Versicolor

Iris Virginica

In addition, it integrates the Imagen model via the Gemini API to generate AI-based images of each species, showcasing Gemini’s text-to-image generation feature.

⚙️ Features

🌸 Classifies Iris species based on user-input measurements

🧮 Uses Google Gemini model for intelligent predictions

🖼️ Generates realistic flower images using Imagen via Gemini API

💡 Demonstrates a fusion of machine learning and generative AI

🌐 Simple, interactive web interface for easy experimentation

🧩 How to Use

Enter sepal length, sepal width, petal length, and petal width (in cm).

Click on “Classify Flower” to send data to the Gemini model.

The predicted species and its generated image will appear below.

Try the example buttons to auto-fill typical values for each species.

🧰 Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Flask (Python)

AI Model: Google Gemini (for prediction)

Image Generation: Imagen via Gemini API

Dataset: Classic Iris Dataset

🚀 Purpose

This project explores how Generative AI can enhance traditional machine learning applications — merging data-driven classification with creative AI visualization.

📦 Setup
# Clone the repository
git clone https://github.com/hrranger5/iris-flower-classification-ai.git

# Navigate into the folder
cd iris-flower-classification-ai

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py

👩‍💻 Author

Developed by Hafsa Raja — AI enthusiast exploring the intersection of Machine Learning, Generative AI, and Web Development.
