import React from 'react';

export const History: React.FC = () => {
  return (
    <div className="st-interior">
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Historial</h1>
      <div className="st-null" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '0' }}>
        <p style={{ color: 'var(--text-muted)' }}>No has visto ningún video aún.</p>
      </div>
    </div>
  );
};
