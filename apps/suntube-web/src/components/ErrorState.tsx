import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
  retry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ retry }) => {
  return (
    <div 
      className="st-null" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        minHeight: 'calc(100vh - 200px)',
        width: '100%',
        textAlign: 'center'
      }}
    >
      <AlertCircle size={48} color="var(--status-critical)" strokeWidth={1} style={{ marginBottom: '15px' }} />
      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>Error de Conexión</h2>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>No pudimos obtener los datos de la cartelera.</p>
      <button onClick={retry} className="st-btn st-btn-ghost" style={{ marginTop: '20px' }}>
        <RefreshCcw size={16} /> Reintentar
      </button>
    </div>
  );
};
