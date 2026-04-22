import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={`st-drawer ${!isOpen ? 'collapsed' : ''}`}>
      <div className="st-drawer-header">
        <span>Para ti</span>
        <button 
          onClick={toggleSidebar} 
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}
        >
          {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
      </div>

      <nav>
        <Link 
          to="/history" 
          className={`st-drawer-link ${isActive('/history') ? 'active' : ''}`}
          style={{ backgroundColor: isActive('/history') ? 'var(--hover-highlight)' : 'transparent' }}
        >
          <div className="st-drawer-avatar">H</div>
          <div className="st-drawer-label">
            <span className="st-drawer-name">Historial</span>
            <span className="st-drawer-meta">Recientes</span>
          </div>
        </Link>
        <Link 
          to="/favorites" 
          className={`st-drawer-link ${isActive('/favorites') ? 'active' : ''}`}
          style={{ backgroundColor: isActive('/favorites') ? 'var(--hover-highlight)' : 'transparent' }}
        >
          <div className="st-drawer-avatar" style={{ backgroundColor: '#c2185b' }}>L</div>
          <div className="st-drawer-label">
            <span className="st-drawer-name">Favoritos</span>
            <span className="st-drawer-meta">Colecciones</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
};
