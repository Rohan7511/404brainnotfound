import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${process.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapCenter({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 10);
    }
  }, [center, map]);
  return null;
}

const MapBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

const getLevelColor = (level) => {
  const colors = {
    good: '#4CAF50',
    moderate: '#FFC107',
    unhealthy_sensitive: '#FF9800',
    unhealthy: '#F44336',
    very_unhealthy: '#9C27B0',
    hazardous: '#7D1919'
  };
  
  return colors[level] || colors.good;
};

const getLevelName = (level) => {
  const names = {
    good: 'Good',
    moderate: 'Moderate',
    unhealthy_sensitive: 'Unhealthy for Sensitive Groups',
    unhealthy: 'Unhealthy',
    very_unhealthy: 'Very Unhealthy',
    hazardous: 'Hazardous'
  };
  
  return names[level] || 'Unknown';
};

const getAqiLevel = (aqi) => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy_sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very_unhealthy';
  return 'hazardous';
};

function MapClickHandler({ onMapClick }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (!map) return;
    
    map.on('click', (e) => {
      onMapClick(e);
    });
    
    return () => {
      map.off('click');
    };
  }, [map, onMapClick]);
  
  return null;
}

export default function Hero() {
  const [city, setCity] = useState('');
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([20, 0]);
  
  const handleSubmit = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError('');
    setAirQualityData(null);
    
    try {
      const response = await axios.post('https://flask404brainnotfound.vercel.app/submit-city', { city });
      console.log(response.data);
      setAirQualityData(response.data);
      if (response.data.lat && response.data.lon) {
        setMapCenter([response.data.lat, response.data.lon]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      setError(error.response?.data?.error || 'Error connecting to server. Please try again.');
      setLoading(false);
    }
  };

  const handleMapClick = async (e) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://flask404brainnotfound.vercel.app/get-location-data', {
        lat: e.latlng.lat,
        lon: e.latlng.lng
      });
      setAirQualityData(response.data);
      setCity(response.data.city || '');
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError(error.response?.data?.error || 'Error fetching data for this location.');
      setLoading(false);
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 16 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '80%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(2.5rem, 8vw, 3rem)',
            }}
          >
            Air Quality&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Dashboard
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Track real-time air quality data and receive health alerts to protect yourself and your loved ones. 
            Stay informed with our advanced monitoring solutions.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '400px' } }}
          >
            <InputLabel htmlFor="city" sx={visuallyHidden}>
              City
            </InputLabel>
            <TextField
                id="city"
                hiddenLabel
                size="small"
                variant="outlined"
                placeholder="Enter your city name"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />

              <Button variant="contained" size="small" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
              </Button>
          </Stack>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          
          {airQualityData && (
            <Paper 
              elevation={3} 
              sx={{ 
                mt: 4, 
                width: '100%', 
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 2, bgcolor: 'primary.main' }}>
                <Typography variant="h6" color="white">
                  Air Quality in {airQualityData.station || airQualityData.city}
                </Typography>
                <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                  Last Updated: {airQualityData.time}
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Card sx={{ mb: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="overline">Air Quality Index</Typography>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              borderRadius: '50%',
                              width: 120,
                              height: 120,
                              bgcolor: getLevelColor(airQualityData.level),
                              color: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column',
                              my: 2
                            }}
                          >
                            <Typography variant="h3">{airQualityData.aqi}</Typography>
                            <Typography variant="caption">AQI</Typography>
                          </Box>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: getLevelColor(airQualityData.level) }}>
                            {getLevelName(airQualityData.level)}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={8}>
                        <Alert 
                          severity={
                            airQualityData.level === 'good' ? 'success' : 
                            airQualityData.level === 'moderate' ? 'info' :
                            airQualityData.level === 'unhealthy_sensitive' ? 'warning' : 'error'
                          }
                          sx={{ mb: 2 }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            Health Recommendation
                          </Typography>
                          <Typography variant="body2">
                            {airQualityData.recommendation}
                          </Typography>
                        </Alert>
                        
                        {airQualityData.level !== 'good' && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              {airQualityData.level === 'moderate' ? 
                                'You may continue outdoor activities. Sensitive individuals should consider limiting prolonged exertion.' :
                                airQualityData.level === 'unhealthy_sensitive' ?
                                'Consider wearing a mask if you have respiratory conditions. Limit outdoor exercise.' :
                                airQualityData.level === 'unhealthy' ?
                                'Wear a mask outdoors. Minimize outdoor activities, especially vigorous exercise.' :
                                'Stay indoors when possible. Use air purifiers. Wear N95 masks if you must go outside.'}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                <Typography variant="h6" gutterBottom>
                  Pollutant Breakdown
                </Typography>
                
                <Grid container spacing={2}>
                  {Object.entries(airQualityData.pollutants || {}).map(([code, data]) => (
                    <Grid item xs={12} sm={6} md={4} key={code}>
                      <Box 
                        sx={{ 
                          p: 2, 
                          border: '1px solid', 
                          borderColor: 'divider', 
                          borderRadius: 1,
                          borderLeft: '4px solid',
                          borderLeftColor: data.info ? getLevelColor(data.info.level) : '#999',
                          height: '100%',
                        }}
                      >
                        <Typography variant="subtitle2">
                          {data.name}
                        </Typography>
                        <Typography variant="h5" sx={{ my: 1 }}>
                          {data.value}
                        </Typography>
                        {data.info && (
                          <Chip 
                            size="small"
                            label={getLevelName(data.info.level)} 
                            sx={{ 
                              bgcolor: getLevelColor(data.info.level),
                              color: 'white',
                              fontSize: '0.7rem'
                            }} 
                          />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          )}
          
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            Data provided by WAQI.info (World Air Quality Index). By using this service, you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <MapBox>
          <MapContainer
            center={mapCenter}
            zoom={3}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {airQualityData && airQualityData.lat && airQualityData.lon && (
              <Marker position={[airQualityData.lat, airQualityData.lon]} />
            )}
            <MapCenter center={mapCenter} />
          </MapContainer>
        </MapBox>
      </Container>
    </Box>
  );
}
