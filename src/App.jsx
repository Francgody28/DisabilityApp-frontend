import { useState } from 'react';
import './App.css';
import Location from './components/Location';
import Services from './components/Services';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

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
      <nav className="navbar">
        <h1>Disability Connect</h1>
        <div className="nav-links">
          <button onClick={() => setPage(isLoggedIn ? 'services' : 'home')}>Home</button>
          <button onClick={() => setPage('about')}>About</button>
          <button onClick={() => setPage('contact')}>Contact</button>

          {isLoggedIn && (
            <>
              <button onClick={() => setPage('location')}>Location</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

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
        {page === 'location' && isLoggedIn && <Location />}
        {page === 'services' && isLoggedIn && <Services />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </main>

      <footer className="footer">
        <p>© 2025 Disability Connect | Designed by Ancho 28</p>
      </footer>
    </div>
  );
}

export default App;