import { Sun, Moon, Search, X } from "lucide-react";
import { T, COLOR_RGB, initials } from "../../utils/helpers";

export const Badge = ({ status }) => {
  const map = {
    Concluída: "b-ok",
    Pendente: "b-warn",
    Cancelada: "b-err",
    Normal: "b-ok",
    Crítico: "b-warn",
    Zerado: "b-err",
    Admin: "b-err",
    Supervisor: "b-warn",
    Operacional: "b-info",
  };
  return <span className={`badge ${map[status] || "b-dim"}`}>{status}</span>;
};

export const Avatar = ({ name, size = 36, color = T.cyan }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: `rgba(${COLOR_RGB[color] || "0,200,255"},0.15)`,
      border: `1px solid rgba(${COLOR_RGB[color] || "0,200,255"},0.3)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: size * 0.35,
      color,
      flexShrink: 0,
    }}
  >
    {initials(name)}
  </div>
);

export const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    style={{
      background: T.surface2,
      border: `1px solid ${T.border}`,
      color: T.muted,
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      padding: 0,
      flexShrink: 0,
    }}
    title={`Mudar para ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
  >
    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
  </button>
);

export const StatCard = ({ icon: Icon, label, value, sub, color = T.cyan }) => {
  const rgb = COLOR_RGB[color] || "0,200,255";
  return (
    <div
      className="card card-neon fi"
      style={{
        "--neon-color": `rgba(${rgb},0.5)`,
        "--neon-shadow": `rgba(${rgb},0.25)`,
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            color: T.muted,
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            marginBottom: 6,
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.1,
            color: T.text,
            wordBreak: "break-word",
          }}
        >
          {value}
        </p>
        {sub && (
          <p
            style={{
              fontSize: 11,
              color: T.muted2,
              marginTop: 6,
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            {sub}
          </p>
        )}
      </div>
      <div
        style={{
          background: `rgba(${rgb},0.1)`,
          borderRadius: 12,
          minWidth: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  );
};

export const SectionHeader = ({ title, sub, action }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 20,
    }}
  >
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 600 }}>{title}</h2>
      {sub && (
        <p style={{ fontSize: 12, color: T.muted2, marginTop: 2 }}>{sub}</p>
      )}
    </div>
    {action}
  </div>
);

export const TH = ({ children }) => (
  <th
    style={{
      textAlign: "left",
      padding: "12px 16px",
      fontSize: 11,
      fontWeight: 600,
      color: T.muted,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </th>
);

export const TD = ({ children, style }) => (
  <td style={{ padding: "11px 16px", ...style }}>{children}</td>
);

export const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => (
  <div style={{ flex: 1, position: "relative" }}>
    <Search
      size={14}
      style={{
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: T.muted,
      }}
    />
    <input
      className="inp"
      style={{ paddingLeft: 32 }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const Modal = ({ title, onClose, children }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(7,9,20,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    }}
    onClick={onClose}
  >
    <div
      className="card fi"
      style={{ width: 500, padding: 28, maxHeight: "90vh", overflowY: "auto" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.muted,
            display: "flex",
          }}
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);
