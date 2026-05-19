import React from 'react';

const HeroGradient = () => {
  return (
    <div className="gradient-mesh" style={{
      position: 'relative',
      width: '100%',
      minHeight: '80vh',
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      {/* Glass Overlay for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(2px)',
        zIndex: 1
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Text Content */}
        <div style={{ flex: '1 1 400px', color: 'white' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px', color: 'white' }}>
            O Futuro da <br/>
            <span style={{ color: '#fff', textShadow: '0 4px 20px rgba(255,255,255,0.4)' }}>Automação</span>
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px', maxWidth: '480px', lineHeight: 1.6, color: 'white' }}>
            Transforme suas ideias em realidade com a nossa plataforma premium de componentes IoT e soluções de ponta.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              background: 'white', color: '#1a1a1a', padding: '16px 32px', borderRadius: '12px',
              fontWeight: 700, fontSize: '16px', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Começar Agora
            </button>
            <button className="glass" style={{
              color: 'white', padding: '16px 32px', borderRadius: '12px',
              fontWeight: 600, fontSize: '16px', cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              Ver Catálogo
            </button>
          </div>
        </div>

        {/* SVG Illustration (Animated) */}
        <div className="animate-float" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="160" fill="white" fillOpacity="0.1" />
            <circle cx="200" cy="200" r="120" fill="white" fillOpacity="0.1" />
            <circle cx="200" cy="200" r="80" fill="white" fillOpacity="0.1" />
            <rect x="140" y="140" width="120" height="120" rx="24" fill="url(#paint0_linear)" />
            <path d="M200 170L230 215H170L200 170Z" fill="white" fillOpacity="0.9" />
            <defs>
              <linearGradient id="paint0_linear" x1="140" y1="140" x2="260" y2="260" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroGradient;
