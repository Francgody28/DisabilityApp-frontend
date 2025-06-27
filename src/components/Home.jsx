// src/components/Home.jsx
import Login from './Login';
import Register from './Register';

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

export default Home;
