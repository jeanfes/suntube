import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="st-app-bar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="st-brand">SunTube</Link>
        <nav className="st-top-nav">
          <Link to="/" className="st-nav-item">Inicio</Link>
        </nav>
      </div>

      <div className="st-search-bar">
        <input type="text" placeholder="Buscar en la cartelera..." />
        <button type="button">
          <Search size={16} />
        </button>
      </div>

      <div className="st-avatar-md" style={{ cursor: 'pointer', backgroundColor: 'var(--accent)', color: '#000' }}>
        U
      </div>
    </header>
  );
};
