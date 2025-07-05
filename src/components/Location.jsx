import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

function Location() {
  const [locationData, setLocationData] = useState({
    fullName: '',
    country: '',
    city: '',
    street: '',
    latitude: null,
    longitude: null,
  });

  const [locations, setLocations] = useState([]);

  const countries = ['Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'South Africa'];
  const tanzaniaRegions = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kigoma',
    'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza',
    'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Tabora',
    'Tanga', 'Songwe'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset city if country is changed from Tanzania to something else
    if (name === 'country' && value !== 'Tanzania') {
      setLocationData((prev) => ({ ...prev, country: value, city: '' }));
    } else {
      setLocationData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    setLocationData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/location/');
      setLocations(res.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      full_name: locationData.fullName,
      country: locationData.country,
      city: locationData.city,
      street: locationData.street,
      latitude: parseFloat(locationData.latitude),
      longitude: parseFloat(locationData.longitude),
    };

    if (
      !postData.full_name ||
      !postData.country ||
      !postData.city ||
      !postData.street ||
      isNaN(postData.latitude) ||
      isNaN(postData.longitude)
    ) {
      alert('Please fill all fields and select a location on the map.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/location/', postData);
      console.log('Saved successfully:', response.data);
      fetchLocations();

      setLocationData({
        fullName: '',
        country: '',
        city: '',
        street: '',
        latitude: null,
        longitude: null,
      });
    } catch (error) {
      console.error('Error saving location:', error.response?.data || error.message);
      alert('Failed to save location. Check console for details.');
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/location/${id}/`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location.');
    }
  };

  return (
    <section className="section">
      <h2>Location Information</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={locationData.fullName}
          onChange={handleChange}
          required
        />

        <label>Country:</label>
        <select
          name="country"
          value={locationData.country}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {locationData.country === 'Tanzania' ? (
          <>
            <label>Region:</label>
            <select
              name="city"
              value={locationData.city}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Region --</option>
              {tanzaniaRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={locationData.city}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={locationData.street}
          onChange={handleChange}
          required
        />

        <label>Click on the map to select location:</label>
        <MapContainer center={[-6.8, 39.2]} zoom={6} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker onSelect={handleMapClick} />
          {locationData.latitude && locationData.longitude && (
            <Marker position={[locationData.latitude, locationData.longitude]} />
          )}
        </MapContainer>

        <p>
          Selected Coordinates: {locationData.latitude}, {locationData.longitude}
        </p>

        <button type="submit">Save Location</button>
      </form>

      <h3>Saved Locations</h3>
      {locations.length === 0 ? (
        <p>No location data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Country</th>
              <th>City/Region</th>
              <th>Street</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.full_name}</td>
                <td>{loc.country}</td>
                <td>{loc.city}</td>
                <td>{loc.street}</td>
                <td>{loc.latitude}</td>
                <td>{loc.longitude}</td>
                <td>
                  <button onClick={() => deleteLocation(loc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Location;
