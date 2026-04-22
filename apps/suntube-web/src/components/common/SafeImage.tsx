import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackText = 'SunTube', 
  style, 
  className,
  ...props 
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div 
        className={className}
        style={{ 
          ...style, 
          backgroundColor: 'var(--bg-light)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          width: '100%',
          height: '100%'
        }}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  );
};
