import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import EquipmentMarketplace from './pages/EquipmentMarketplace';
import LabourConnect from './pages/LabourConnect';
import DairyMarketplace from './pages/DairyMarketplace';
import CropAdvisory from './pages/CropAdvisory';
import LearningHub from './pages/LearningHub';
import SchemeNotifier from './pages/SchemeNotifier';
import CommunityForum from './pages/CommunityForum';
import Login from './pages/Login';
import Register from './pages/Register';
import AIChatAssistant from './components/AIChatAssistant';
import { LogOut, User } from 'lucide-react';
import './index.css';

// Navbar Component
const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: 'var(--surface)', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>AGEZY</h2>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
          {isAuthenticated ? (
            <>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                <User size={18} />
                <span style={{ fontWeight: 'bold' }}>{user?.name}</span>
                <span style={{ fontSize: '0.8rem', background: 'var(--secondary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {user?.role}
                </span>
              </span>
              <button onClick={handleLogout} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', border: '1px solid var(--border)' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Home Component
const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Welcome to AGEZY</h1>
      <p>Empowering Farmers with Technology</p>

      {!isAuthenticated && (
        <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <Link to="/register" className="btn btn-primary">Join Now</Link>
        </div>
      )}

      {isAuthenticated && (
        <p style={{ marginBottom: '2rem', color: 'var(--primary)' }}>
          Logged in as: <strong>{user?.name}</strong> ({user?.role})
        </p>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/equipment" className="btn btn-primary">Find Equipment</Link>
        <Link to="/labour" className="btn" style={{ background: 'var(--secondary)', color: 'white' }}>Hire Labour</Link>
        <Link to="/dairy" className="btn" style={{ background: 'var(--accent)', color: 'white' }}>Buy Dairy</Link>
        <Link to="/advisory" className="btn" style={{ background: '#0288D1', color: 'white' }}>Smart Advisory</Link>
        <Link to="/guides" className="btn" style={{ background: '#7B1FA2', color: 'white' }}>Learning Hub</Link>
        <Link to="/schemes" className="btn" style={{ background: '#E64A19', color: 'white' }}>Govt Schemes</Link>
        <Link to="/community" className="btn" style={{ background: '#00695C', color: 'white' }}>Community</Link>
      </div>
    </div>
  );
};

// Main App Component with Layout
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/equipment" element={<EquipmentMarketplace />} />
              <Route path="/labour" element={<LabourConnect />} />
              <Route path="/dairy" element={<DairyMarketplace />} />
              <Route path="/advisory" element={<CropAdvisory />} />
              <Route path="/guides" element={<LearningHub />} />
              <Route path="/schemes" element={<SchemeNotifier />} />
              <Route path="/community" element={<CommunityForum />} />
            </Routes>
          </main>
          <AIChatAssistant />
          <footer style={{ textAlign: 'center', padding: '2rem', marginTop: 'auto', backgroundColor: '#333', color: 'white' }}>
            <p>&copy; 2026 AGEZY. Empowering Farmers.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
