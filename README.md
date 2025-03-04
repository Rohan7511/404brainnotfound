# 🌿 Real-Time Air Quality & Health Alert Dashboard

## 📌 Project Overview

**Real-Time Air Quality & Health Alert Dashboard** is a web application designed to monitor real-time air quality data and provide instant health alerts. The platform empowers users to stay informed about air pollution levels in their vicinity and take timely protective measures.

## 🧠 Team Name & Members

**Team Name:** 404 Brain Not Found

- **Gubba Rohan** - [+91 94406 87446](tel:+919440687446)  
- **Muthu Rupesh M J** - [+91 90435 02286](tel:+919043502286)  
- **K Sai Siddhartha Reddy** - [+91 63690 97359](tel:+916369097359)  
- **Nikhil Jones A** - [+91 96554 35746](tel:+919655435746)  

## 🚨 Problem Statement

Air pollution is a growing public health concern, especially in urban areas. Pollutants like **PM2.5**, **PM10**, and **NO₂** can cause severe health issues. However, people often lack real-time information about air quality, leaving them unaware of potential risks and unable to take necessary precautions.

## ✅ Proposed Solution

Our project aims to develop a **responsive web app** that:

- 📍 **Displays real-time pollutant levels** (PM2.5, PM10, NO₂, etc.) on an **interactive map** using public APIs like **OpenAQ** or **AirVisual**.  
- 🚨 **Triggers instant health alerts** when pollutant levels exceed safe thresholds, offering tailored health advice — such as wearing masks or avoiding outdoor activities.  
- 📲 **Ensures mobile responsiveness** for easy access, allowing users to check air quality on the go.  

The goal is to **bridge the gap between raw data and public action**, helping people make informed health decisions.

## 🛠️ Technologies Used

### Frontend
- **React.js** (or plain HTML/CSS/JavaScript for simplicity)
- **React Leaflet** for map integration

### Backend
- **Python** with **Flask** or **FastAPI** to handle API requests and proxy data
- **Flask-CORS** for cross-origin support
- **Geopy** for geolocation processing

### Data & APIs
- **OpenAQ** or **AirVisual** for real-time air quality data
- **Google Maps API** or **Leaflet** for mapping and visual representation

## 🚀 Innovation & Impact

Our app stands out by merging **real-time air quality data** with **personalized health recommendations**. Unlike static dashboards, our platform actively:

- 📡 **Pushes live updates** as pollution levels fluctuate.  
- ⚠️ **Notifies users of health risks** based on their current location and pollutant thresholds.  
- 📊 **Empowers individuals** — especially those with respiratory issues — to make safer, smarter choices.  

**Future Enhancements:**  
We envision adding **predictive analytics** to forecast short-term air quality changes and integrating with **local health authorities** to display official advisories directly in the app.

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
1. **Navigate to the backend directory (if separate):**
   ```bash
   cd backend
   ```
2. **Install required Python packages:**
   ```bash
   pip install flask flask-cors geopy
   ```
3. **Start the backend server:**
   ```bash
   python app.py
   ```

Once both frontend and backend servers are running, open your browser and go to:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`

## 📚 Usage

1. **View Real-Time Air Quality:**  
   Open the app and check the interactive map to view pollutant levels like PM2.5, PM10, and NO₂.

2. **Receive Health Alerts:**  
   Get instant notifications when pollution levels exceed safe thresholds, along with practical advice (wear masks, stay indoors, etc.).

3. **Switch Between Views:**  
   Toggle between the map view and a detailed pollutant data dashboard.

4. **Mobile Access:**  
   The app is fully responsive — check air quality anywhere, anytime.

## 🤝 Contributing

We welcome contributions!  
If you'd like to add new features or fix bugs:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

## 🌟 Acknowledgements

- **OpenAQ** and **AirVisual** for providing free air quality data.
- **React.js** and **Flask** for powering our frontend and backend.
- **Google Maps API** and **Leaflet** for interactive mapping.
- **Our Team — 404 Brain Not Found** — for the collaborative effort!

---

Made with ❤️ by **404 Brain Not Found**.  
Stay safe. Breathe clean. 🌿
