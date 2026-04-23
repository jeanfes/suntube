import React, { useState } from 'react';
import { Search, User, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="st-app-bar" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="st-brand">SunTube</Link>
        <nav className="st-top-nav">
          <Link to="/" className="st-nav-item">Inicio</Link>
        </nav>
      </div>

      <form className="st-search-bar" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Buscar en la cartelera..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <Search size={16} />
        </button>
      </form>

      <div style={{ position: 'relative' }}>
        <div 
          className="st-avatar-md" 
          style={{ cursor: 'pointer', backgroundColor: 'var(--accent)', color: '#000' }}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          U
        </div>

        {isProfileOpen && (
          <div style={{
            position: 'absolute',
            top: '120%',
            right: 0,
            backgroundColor: 'var(--bg-dark)',
            border: '1px solid var(--border-main)',
            borderRadius: '8px',
            width: '200px',
            padding: '8px 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-main)', marginBottom: '4px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Usuario</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>usuario@hype.com</div>
            </div>
            
            <button style={{ background: 'none', border: 'none', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>
              <User size={16} /> Mi Canal
            </button>
            <button style={{ background: 'none', border: 'none', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>
              <Settings size={16} /> Configuración
            </button>
            <div style={{ height: '1px', backgroundColor: 'var(--border-main)', margin: '4px 0' }}></div>
            <button style={{ background: 'none', border: 'none', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--status-critical)', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
