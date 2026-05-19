import React from 'react';

const SkeletonLoader = ({ count = 1 }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="shimmer-bg" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="shimmer-bg" style={{ height: '16px', width: '60%', borderRadius: '4px' }} />
              <div className="shimmer-bg" style={{ height: '12px', width: '40%', borderRadius: '4px' }} />
            </div>
          </div>
          
          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <div className="shimmer-bg" style={{ height: '12px', width: '100%', borderRadius: '4px' }} />
            <div className="shimmer-bg" style={{ height: '12px', width: '85%', borderRadius: '4px' }} />
            <div className="shimmer-bg" style={{ height: '12px', width: '40%', borderRadius: '4px' }} />
          </div>
          
          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <div className="shimmer-bg" style={{ height: '36px', width: '100px', borderRadius: '8px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
