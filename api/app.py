from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from geopy.geocoders import Nominatim

app = Flask(__name__)
CORS(app)

WAQI_API_KEY = '0670b766a01a0832dbc15b29fe8b64d1a86a470c'
geolocator = Nominatim(user_agent="air_quality_app")

def get_air_quality(city):
    url = f"https://api.waqi.info/feed/{city}/"
    params = {"token": WAQI_API_KEY}
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        
        if response.status_code == 200 and data.get('status') == 'ok':
            return data.get('data'), None
        else:
            error_message = data.get('data') if data.get('status') == 'error' else "No air quality data found for this city"
            return None, f"Error: {error_message}. Try another city name or check spelling."
    except Exception as e:
        print(f"Error fetching data: {str(e)}")
        return None, f"Error connecting to air quality service: {str(e)}"

def get_health_recommendations(aqi_value):
    if aqi_value <= 50:
        level = "good"
        recommendation = "Air quality is good. No health precautions needed."
    elif aqi_value <= 100:
        level = "moderate"
        recommendation = "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion."
    elif aqi_value <= 150:
        level = "unhealthy_sensitive"
        recommendation = "Members of sensitive groups may experience health effects. People with respiratory or heart conditions, elderly and children should limit prolonged outdoor exertion."
    elif aqi_value <= 200:
        level = "unhealthy"
        recommendation = "Everyone may begin to experience health effects. Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion. Consider wearing a mask outdoors."
    elif aqi_value <= 300:
        level = "very_unhealthy"
        recommendation = "Health alert: everyone may experience more serious health effects. Avoid outdoor activities. Wear masks if going outside is necessary."
    else:
        level = "hazardous"
        recommendation = "Health warnings of emergency conditions. Stay indoors, keep windows closed. Use air purifiers if available."
    
    return {"level": level, "recommendation": recommendation}

@app.route('/submit-city', methods=['POST'])
def submit_city():
    try:
        city = request.json.get('city')
        if not city:
            return jsonify({'error': 'City name is required'}), 400

        location = geolocator.geocode(city)
        if not location:
            return jsonify({'error': 'City not found'}), 404

        url = f'https://api.waqi.info/feed/geo:{location.latitude};{location.longitude}/?token={WAQI_API_KEY}'
        response = requests.get(url)
        data = response.json()

        if data.get('status') != 'ok':
            return jsonify({'error': 'Unable to fetch air quality data'}), 400

        aqi_data = data['data']
        
        return format_response(aqi_data, location.latitude, location.longitude, city)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get-location-data', methods=['POST'])
def get_location_data():
    try:
        data = request.get_json()
        lat = data.get('lat')
        lon = data.get('lon')
        
        if lat is None or lon is None:
            return jsonify({'error': 'Latitude and longitude are required'}), 400

        lat = round(float(lat), 6)
        lon = round(float(lon), 6)
        
        location = geolocator.reverse(f"{lat}, {lon}", exactly_one=True, language='en')
        if not location:
            return jsonify({'error': 'Location not found'}), 404

        address = location.raw.get('address', {})
        city = (address.get('city') or 
                address.get('town') or 
                address.get('village') or 
                address.get('suburb') or 
                address.get('county') or
                address.get('state'))

        if not city:
            return jsonify({'error': 'Could not determine location name'}), 404

        url = f'https://api.waqi.info/feed/geo:{lat};{lon}/?token={WAQI_API_KEY}'
        response = requests.get(url)
        data = response.json()

        if data.get('status') != 'ok':
            return jsonify({'error': 'Unable to fetch air quality data for this location'}), 400

        aqi_data = data['data']
        
        return jsonify(format_response(aqi_data, lat, lon, city))
    except Exception as e:
        print(f"Error in get_location_data: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

def format_response(aqi_data, lat, lon, city):
    return {
        'aqi': aqi_data['aqi'],
        'city': city,
        'station': aqi_data.get('city', {}).get('name'),
        'time': aqi_data.get('time', {}).get('s'),
        'lat': lat,
        'lon': lon,
        'level': get_health_recommendations(aqi_data['aqi'])['level'],
        'recommendation': get_health_recommendations(aqi_data['aqi'])['recommendation'],
        'pollutants': format_pollutants(aqi_data.get('iaqi', {}))
    }

def format_pollutants(iaqi):
    pollutants = {}
    pollutant_names = {
        'pm25': 'PM2.5 (Fine Particles)',
        'pm10': 'PM10 (Inhalable Particles)',
        'no2': 'NO₂ (Nitrogen Dioxide)',
        'o3': 'O₃ (Ozone)',
        'co': 'CO (Carbon Monoxide)',
        'so2': 'SO₂ (Sulfur Dioxide)'
    }
    
    for pollutant_code, pollutant_data in iaqi.items():
        if pollutant_code in pollutant_names:
            value = pollutant_data.get('v')
            pollutants[pollutant_code] = {
                'name': pollutant_names.get(pollutant_code, pollutant_code),
                'value': value,
                'info': get_health_recommendations(value) if isinstance(value, (int, float)) else None
            }
    
    return pollutants
