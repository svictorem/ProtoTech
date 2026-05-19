import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const ResponsiveHeader = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 24px' : '20px 32px',
          background: scrolled 
            ? (theme === 'dark' ? 'rgba(10, 10, 10, 0.7)' : 'rgba(255, 255, 255, 0.7)') 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : '1px solid transparent',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--color-cyan), var(--color-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold'
          }}>P</div>
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>ProtoTech</span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          <a href="#" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Dashboard</a>
          <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Catálogo</a>
          <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Configurações</a>
          
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--color-surface2)',
              border: `1px solid var(--color-border)`,
              color: 'var(--color-muted)',
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <style>{`
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
          @media (max-width: 767px) {
            .mobile-toggle { display: block !important; }
          }
        `}</style>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, bottom: 0,
          background: 'var(--color-bg)', zIndex: 999,
          padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px'
        }}>
          <a href="#" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '18px', fontWeight: 500 }}>Dashboard</a>
          <a href="#" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '18px', fontWeight: 500 }}>Catálogo</a>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px' }}>Tema</span>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--color-surface2)',
                border: `1px solid var(--color-border)`,
                color: 'var(--color-text)',
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveHeader;
