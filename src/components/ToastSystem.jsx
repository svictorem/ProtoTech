/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

const Toast = ({ id, type = 'info', message, onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleAnimationEnd = () => {
    if (isExiting) {
      onClose(id);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} color="var(--color-success)" />;
      case 'error': return <AlertTriangle size={20} color="var(--color-danger)" />;
      case 'warning': return <AlertTriangle size={20} color="var(--color-warning)" />;
      default: return <Info size={20} color="var(--color-cyan)" />;
    }
  };

  return (
    <div
      className={`glass ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      onAnimationEnd={handleAnimationEnd}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        borderRadius: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <p style={{ flex: 1, margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--color-text)' }}>
        {message}
      </p>
      <button
        onClick={() => setIsExiting(true)}
        style={{
          background: 'none', border: 'none', color: 'var(--color-muted)',
          cursor: 'pointer', display: 'flex', padding: '4px',
          borderRadius: '4px', transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <X size={16} />
      </button>
      
      {duration > 0 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'var(--color-cyan)',
          animation: `progress ${duration}ms linear forwards`
        }} />
      )}
      <style>{`
        @keyframes progress { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type, duration }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
