# 🌿 Real-Time Air Quality & Health Alert Dashboard

## 📌 Project Overview

**Real-Time Air Quality & Health Alert Dashboard** is a web application designed to monitor real-time air quality data and provide instant health alerts. The platform empowers users to stay informed about air pollution levels in their vicinity and take timely protective measures.

## 🧠 Team Name & Members

**Team Name:** 404 Brain Not Found

- [@GubbaRohan](https://github.com/Rohan7511)
- [MuthuRupesh](https://github.com/MR7star)
- [SiddharthaReddy](https://github.com/saisidd07amrita)
- [NikhilJonesA](https://github.com/Nikhil-Jones)  

## 🚨 Problem Statement

Air pollution is a growing public health concern, especially in urban areas. Pollutants like **PM2.5**, **PM10**, and **NO₂** can cause severe health issues. However, people often lack real-time information about air quality, leaving them unaware of potential risks and unable to take necessary precautions.

## ✅ Proposed Solution

Our project aims to develop a **responsive web app** that:

- 📍 **Displays real-time pollutant levels** (PM2.5, PM10, NO₂, etc.) on an **interactive map** using public APIs like **WAQI**.  
- 📲 **Ensures mobile responsiveness** for easy access, allowing users to check air quality on the go.  

The goal is to **bridge the gap between raw data and public action**, helping people make informed health decisions.

## 🛠️ Technologies Used

### Frontend
- **React.js**
- **React Leaflet** for map integration
- **MUI**

### Backend
- **Python** with **Flask** to handle API requests and proxy data
- **Flask-CORS** for cross-origin support
- **Geopy** for geolocation processing

### Data & APIs
- **WAQI** for providing free air quality data.
- **OpenStreetMap** and **Leaflet** for interactive mapping.

## 🚀 Innovation & Impact

Our app stands out by merging **real-time air quality data** with **personalized health recommendations**. Unlike static dashboards, our platform actively:

- ⚠️ **Notifies users of health risks** base on location entered or selected and pollutant thresholds. 
- 📊 **Empowers individuals** — especially those with respiratory issues — to make safer, smarter choices.  

## ⚙️ Installation

### Frontend Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd <project-folder>
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Install React Leaflet for map integration:**
   ```bash
   npm install react-leaflet
   ```
5. **Start the frontend server:**
   ```bash
   npm start
   ```

### Backend Setup
1. **Install required Python packages:**
   ```bash
   pip install flask flask-cors geopy
   ```
2. **Start the backend server:**
   ```bash
   python app.py
   ```

Once both frontend and backend servers are running, open your browser and go to:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

## 📚 Usage

1. **View Real-Time Air Quality:**  
   Open the Website and check the interactive map to view pollutant levels like PM2.5, PM10, and NO₂.

2. **Receive Health Alerts:**  
   Get instant Health Alerts based on the pollution levels

3. **Multiple Views:**  
   Toggle between the map view and a detailed pollutant data dashboard.

4. **Mobile Access:**  
   The website is fully responsive — check air quality anywhere, anytime.

## 🌟 Acknowledgements

- **WAQI** for providing free air quality data.
- **React.js** and **Flask** for powering our frontend and backend.
- **OpenStreetMap** and **Leaflet** for interactive mapping.
- **Our Team — 404 Brain Not Found** — for the collaborative effort!

---

Made with ❤️ by **404 Brain Not Found**.  
Stay safe. Breathe clean. 🌿
