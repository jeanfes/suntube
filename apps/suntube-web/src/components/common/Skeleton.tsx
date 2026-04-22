import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

const Circle: React.FC<SkeletonProps> = ({ width = '100%', height = '100%', className }) => (
  <div 
    className={`st-pulse ${className || ''}`} 
    style={{ width, height, borderRadius: '50%' }} 
  />
);

const Rect: React.FC<SkeletonProps> = ({ width = '100%', height = '100%', borderRadius = '4px', className }) => (
  <div 
    className={`st-pulse ${className || ''}`} 
    style={{ width, height, borderRadius }} 
  />
);

const Line: React.FC<SkeletonProps> = ({ width = '100%', height = '12px', className }) => (
  <div 
    className={`st-pulse ${className || ''}`} 
    style={{ width, height, borderRadius: '2px', marginBottom: '8px' }} 
  />
);

export const Skeleton: React.FC<SkeletonProps> & {
  Circle: typeof Circle;
  Rect: typeof Rect;
  Line: typeof Line;
} = (props) => <Rect {...props} />;

Skeleton.Circle = Circle;
Skeleton.Rect = Rect;
Skeleton.Line = Line;

export const SkeletonCard: React.FC = () => (
  <div className="st-video-card">
    <Skeleton.Rect width="100%" height="auto" className="st-card-preview" />
    <div className="st-card-body">
      <Skeleton.Circle width="36px" height="36px" />
      <div style={{ flex: 1 }}>
        <Skeleton.Line width="100%" />
        <Skeleton.Line width="60%" />
      </div>
    </div>
  </div>
);

export const SkeletonHero: React.FC = () => (
  <div className="st-spotlight-wrapper">
    <div className="st-spotlight-hero" style={{ border: 'none', animation: 'none' }}>
      <Skeleton.Rect width="62%" height="100%" borderRadius="0" />
      <div className="st-hero-info">
        <Skeleton.Line width="30%" />
        <div style={{ height: '20px' }} />
        <Skeleton.Line width="80%" height="24px" />
        <Skeleton.Line width="60%" height="24px" />
        <div style={{ marginTop: 'auto' }}>
          <Skeleton.Line width="20%" height="32px" />
          <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
            <Skeleton.Rect width="60px" height="20px" />
            <Skeleton.Rect width="60px" height="20px" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
