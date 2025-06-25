
import { useState, useEffect } from 'react';
import axios from 'axios'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './App.css';


function App() {
  const [page, setPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('home');
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <h1>Disability Connect</h1>
        <div className="nav-links">
          <button onClick={() => setPage(isLoggedIn ? 'services' : 'home')}>Home</button>
          <button onClick={() => setPage('about')}>About</button>
          <button onClick={() => setPage('contact')}>Contact</button>

          {isLoggedIn && (
            <>
              <button onClick={() => setPage('monitoring')}>Monitoring</button>
              <button onClick={() => setPage('resources')}>Resources</button>
              <button onClick={() => setPage('location')}>Location</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {page === 'home' && !isLoggedIn && (
          <Home
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showRegister={showRegister}
            setShowRegister={setShowRegister}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setPage('services');
              setShowLogin(false);
              setShowRegister(false);
            }}
          />
        )}
        {page === 'monitoring' && isLoggedIn && <Monitoring />}
        {page === 'resources' && isLoggedIn && <Resources />}
        {page === 'location' && isLoggedIn && <Location />}
        {page === 'services' && isLoggedIn && <Services />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Disability Connect | Designed by Ancho 28</p>
      </footer>
    </div>
  );
}

// --- Home Page ---
function Home({ showLogin, setShowLogin, showRegister, setShowRegister, onLoginSuccess }) {
  return (
    <section className="section">
      <h2>Welcome to Disability Connect</h2>
      <p>Your hub for tools, resources, and support for inclusive services and disability tracking.</p>
      <div className="form-toggle-buttons">
        <button onClick={() => {
          setShowLogin(!showLogin);
          setShowRegister(false);
        }}>
          {showLogin ? 'Hide Login' : 'Login'}
        </button>

        <button onClick={() => {
          setShowRegister(!showRegister);
          setShowLogin(false);
        }}>
          {showRegister ? 'Hide Register' : 'Create Account'}
        </button>
      </div>

      {showLogin && <Login onLoginSuccess={onLoginSuccess} />}
      {showRegister && <Register />}
    </section>
  );
}

// --- Login Form ---
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
    } else if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address.');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters.');
    } else {
      setError('');
      fetch('http://localhost:8000/api/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
.then(res => res.json())
.then(data => {
  if (data.message) {
    alert(data.message);
    onLoginSuccess(); // triggers services page load
  } else {
    setError(data.error || 'Login failed.');
  }
})


    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h3>Login</h3>
      {error && <div className="error">{error}</div>}
      <label>Email:</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

// --- Register Form ---
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          setError('');
        } else {
          setError(data.error || 'Registration failed.');
          setMessage('');
        }
      })
      .catch(() => {
        setError('Something went wrong.');
      });
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <h3>Create Account</h3>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <label>Full Name:</label>
      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}

// --- Monitoring Page ---
function Monitoring() {
  return (
    <section className="section">
      <h2>Monitoring & Evaluation</h2>
      <p>Build strong accountability and demonstrate impact using monitoring and evaluation tools.</p>
    </section>
  );
}

// --- Resources Page ---
function Resources() {
  return (
    <section className="section">
      <h2>Resources for DPOs</h2>
      <p>Explore guides and tools to support your organisation’s mission and growth.</p>
    </section>
  );
}

// --- Location Page ---


const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -6.7924, // Default center (Dar es Salaam, Tanzania)
  lng: 39.2083,
};

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData({ ...locationData, [name]: value });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocationData({ ...locationData, latitude: lat, longitude: lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationData.fullName || !locationData.country || !locationData.city || !locationData.street || !locationData.latitude || !locationData.longitude) {
      alert('Please fill in all fields and click on the map to select a location.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/location/', locationData);
      alert('Location saved!');
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
      console.error('Error saving location:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/location/');
      setLocations(res.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/location/${id}/`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <section className="section">
      <h2>Location Information</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={locationData.fullName} onChange={handleChange} required />

        <label>Country:</label>
        <input type="text" name="country" value={locationData.country} onChange={handleChange} required />

        <label>City:</label>
        <input type="text" name="city" value={locationData.city} onChange={handleChange} required />

        <label>Street:</label>
        <input type="text" name="street" value={locationData.street} onChange={handleChange} required />

        <label>Click on the map to select location:</label>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={6}
            onClick={handleMapClick}
          >
            {locationData.latitude && locationData.longitude && (
              <Marker position={{ lat: locationData.latitude, lng: locationData.longitude }} />
            )}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}

        <p>Selected Coordinates: {locationData.latitude}, {locationData.longitude}</p>

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
              <th>City</th>
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


function Services() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    disabilityType: '',
    customDisability: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/register-disabled/');
      if (response.ok) {
        const data = await response.json();
        setPeople(data);
      } else {
        console.error('Failed to fetch people');
      }
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalDisability =
      person.disabilityType === 'Other' ? person.customDisability : person.disabilityType;

    if (!finalDisability) {
      alert('Please specify the disability type.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register-disabled/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...person, disabilityType: finalDisability }),
      });

      if (response.ok) {
        alert('Disabled person registered successfully!');
        setShowRegisterForm(false);
        setPerson({
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          gender: '',
          disabilityType: '',
          customDisability: '',
          contact: '',
        });
        fetchPeople();
      } else {
        alert('Failed to register person');
      }
    } catch (error) {
      console.error('Error registering person:', error);
    }
  };

  const handleShowTable = () => {
    fetchPeople();
    setShowTable(!showTable);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/register-disabled/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPeople(people.filter(p => p.id !== id)); // Remove from UI
          alert('Person deleted successfully!');
        } else {
          alert('Failed to delete person');
        }
      } catch (error) {
        console.error('Error deleting person:', error);
      }
    }
  };

  return (
    <section className="section">
      <h2>Our Services</h2>

      {!showRegisterForm && (
        <>
          <p>Please select a service:</p>
          <button onClick={() => setShowRegisterForm(true)}>Register Disabled Person</button>
          <button onClick={handleShowTable}>
            {showTable ? 'Hide Disability Data' : 'Show Disability Data'}
          </button>
        </>
      )}

      {showRegisterForm && (
        <form className="form" onSubmit={handleSubmit}>
          <h3>Register Disabled Person</h3>
          <label>First Name:</label>
          <input type="text" name="firstName" value={person.firstName} onChange={handleChange} required />
          <label>Middle Name:</label>
          <input type="text" name="middleName" value={person.middleName} onChange={handleChange} required />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={person.lastName} onChange={handleChange} required />
          <label>Age:</label>
          <input type="number" name="age" value={person.age} onChange={handleChange} required />
          <label>Gender:</label>
          <select name="gender" value={person.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label>Type of Disability:</label>
          <select name="disabilityType" value={person.disabilityType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Vision">Vision</option>
            <option value="Hearing">Hearing</option>
            <option value="Down Syndrome">Down Syndrome</option>
            <option value="Body Disability">Body Disability</option>
            <option value="Other">Other</option>
          </select>
          {person.disabilityType === 'Other' && (
            <>
              <label>Specify Disability:</label>
              <input
                type="text"
                name="customDisability"
                value={person.customDisability}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label>Contact Info:</label>
          <input type="text" name="contact" value={person.contact} onChange={handleChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowRegisterForm(false)}>Cancel</button>
        </form>
      )}

      {showTable && (
        <div>
          <h3>Registered Disabled Persons</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>First</th>
                <th>Middle</th>
                <th>Last</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disability</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>{p.first_name}</td>
                  <td>{p.middle_name}</td>
                  <td>{p.last_name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.disability_type}</td>
                  <td>{p.contact}</td>
                  <td>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}



// --- About Page ---
function About() {
  return (
    <section className="section">
      <h2>About Us</h2>
      <p>Disability Connect empowers DPOs and service providers with digital tools and a supportive community.</p>
    </section>
  );
}

// --- Contact Page ---
function Contact() {
  return (
    <section className="section">
      <h2>Contact Us</h2>
      <p>Email: francgod693@gmail.com</p>
      <p>Phone: +255656306692</p>
    </section>
  );
}

export default App;
