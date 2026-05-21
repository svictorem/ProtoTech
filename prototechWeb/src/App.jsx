import { useState, useEffect } from "react";
import "./global.css";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  UserCog,
  Bell,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Cpu,
  ArrowRight,
  X,
  Menu,
  Zap,
  Shield,
  Star,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  CreditCard,
  Lock,
  ChevronLeft,
  ChevronRight,
  Building2,
  QrCode,
  Barcode,
  PartyPopper,
} from "lucide-react";

import { ToastProvider } from "./components/ToastSystem";
import Checkout from "./components/Checkout";

// ─── UTILS ────────────────────────────────────────────────────────
const getProductImage = (name) => {
  if (!name) return null;
  const cleanName = name.trim();
  const nameToFile = {
    "Arduino Uno R3": "Arduino Uno R3.webp",
    "ESP32 WiFi+BT": "ESP32 WiFi+BT.webp",
    "Raspberry Pi Pico": "Raspberry Pi Pico.jpg",
    "Sensor Ultrassônico HC-SR04": "Sensor Ultrassônico HC-SR04.jpg",
    "Módulo Relé 1 Canal": "Módulo Relé 1 Canal.webp",
    "Sensor DHT11": "Sensor DHT11.webp",
    "Display LCD 16x2 I2C": "Display LCD 16x2 I2C.webp",
    "Jumpers Macho-Fêmea (40 un)": "Jumpers Macho-Fêmea (40 un.webp",
    "Protoboard 830 Pontos": "Protoboard 830 Pontos.webp",
    "Sensor PIR Movimento": "Sensor PIR Movimento (HC-SR501).jpg",
    "Módulo Lora 915MHz": "Módulo Lora 915MHz.webp",
    "Servo Motor SG90": "Servo Motor SG90.webp",
    "Bateria LiPo 3.7V": "Bateria LiPo 3.7V.webp",
    "Módulo MP3 DFPlayer": "Módulo MP3 DFPlayer.webp",
    "NFC PN532": "NFC PN532.webp",
    "Kit Resistores (100 un)": "Kit Resistores (100 un).webp",
    "Potenciômetro 10k": "Potenciômetro 10k.webp",
    "Ponte H L298N": "Ponte H L298N.webp",
    "Joystick KY-023": "Joystick KY-023.webp",
    "Sensor de Gás MQ-2": "Sensor de Gás MQ-2.webp",
    "Módulo Bluetooth HC-05": "Módulo Bluetooth HC-05.webp",
    "OLED 0.96 I2C": "OLED 0.96 I2C.webp",
    "Sensor Umidade Solo": "Sensor Umidade Solo.webp",
    "Cabo USB AB 1.5m": "Cabo USB AB 1.5m.webp",
    "ESP8266 NodeMCU": "ESP8266 NodeMCU V3.webp"
  };

  let fileName = nameToFile[cleanName];
  if (!fileName) {
    const lower = cleanName.toLowerCase();
    if (lower.includes("arduino")) fileName = "Arduino Uno R3.webp";
    else if (lower.includes("esp32")) fileName = "ESP32 WiFi+BT.webp";
    else if (lower.includes("pico") || lower.includes("raspberry pi pico")) fileName = "Raspberry Pi Pico.jpg";
    else if (lower.includes("ultrassônico") || lower.includes("hc-sr04")) fileName = "Sensor Ultrassônico HC-SR04.jpg";
    else if (lower.includes("relé") || lower.includes("rele")) fileName = "Módulo Relé 1 Canal.webp";
    else if (lower.includes("dht11") || lower.includes("dht22") || lower.includes("dht")) fileName = "Sensor DHT11.webp";
    else if (lower.includes("lcd")) fileName = "Display LCD 16x2 I2C.webp";
    else if (lower.includes("jumper")) fileName = "Jumpers Macho-Fêmea (40 un.webp";
    else if (lower.includes("protoboard")) fileName = "Protoboard 830 Pontos.webp";
    else if (lower.includes("pir") || lower.includes("movimento")) fileName = "Sensor PIR Movimento (HC-SR501).jpg";
    else if (lower.includes("lora")) fileName = "Módulo Lora 915MHz.webp";
    else if (lower.includes("servo") || lower.includes("sg90")) fileName = "Servo Motor SG90.webp";
    else if (lower.includes("lipo") || lower.includes("bateria")) fileName = "Bateria LiPo 3.7V.webp";
    else if (lower.includes("mp3") || lower.includes("dfplayer")) fileName = "Módulo MP3 DFPlayer.webp";
    else if (lower.includes("nfc") || lower.includes("pn532")) fileName = "NFC PN532.webp";
    else if (lower.includes("resistor")) fileName = "Kit Resistores (100 un).webp";
    else if (lower.includes("potenciômetro") || lower.includes("potenciometro")) fileName = "Potenciômetro 10k.webp";
    else if (lower.includes("ponte h") || lower.includes("l298n")) fileName = "Ponte H L298N.webp";
    else if (lower.includes("joystick")) fileName = "Joystick KY-023.webp";
    else if (lower.includes("gás") || lower.includes("gas") || lower.includes("mq-2")) fileName = "Sensor de Gás MQ-2.webp";
    else if (lower.includes("bluetooth") || lower.includes("hc-05")) fileName = "Módulo Bluetooth HC-05.webp";
    else if (lower.includes("oled")) fileName = "OLED 0.96 I2C.webp";
    else if (lower.includes("solo") || lower.includes("umidade")) fileName = "Sensor Umidade Solo.webp";
    else if (lower.includes("usb") || lower.includes("cabo")) fileName = "Cabo USB AB 1.5m.webp";
    else if (lower.includes("esp8266") || lower.includes("nodemcu")) fileName = "ESP8266 NodeMCU V3.webp";
  }

  if (!fileName) return null;
  return new URL(`./assets/${fileName}`, import.meta.url).href;
};

// ─── MOCK DATA ────────────────────────────────────────────────────
const CLIENTS = [
  {
    id: 1,
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    phone: "(92) 99234-5678",
    city: "Manaus",
    since: "Jan 2023",
    purchases: 12,
    total: 1840.5,
  },
  {
    id: 2,
    name: "Mariana Souza",
    email: "mariana@email.com",
    phone: "(92) 98765-4321",
    city: "Manaus",
    since: "Mai 2023",
    purchases: 5,
    total: 729.3,
  },
  {
    id: 3,
    name: "Carlos Andrade",
    email: "carlos@email.com",
    phone: "(92) 99111-2233",
    city: "Parintins",
    since: "Jan 2024",
    purchases: 3,
    total: 290.7,
  },
  {
    id: 4,
    name: "Ana Lima",
    email: "ana@email.com",
    phone: "(92) 99444-5566",
    city: "Manaus",
    since: "Ago 2022",
    purchases: 28,
    total: 5620.0,
  },
  {
    id: 5,
    name: "Pedro Costa",
    email: "pedro@email.com",
    phone: "(92) 99777-8899",
    city: "Itacoatiara",
    since: "Mar 2024",
    purchases: 2,
    total: 189.8,
  },
];

const SALES_MONTHLY = [
  { month: "Jan", vendas: 12400, pedidos: 38 },
  { month: "Fev", vendas: 9800, pedidos: 29 },
  { month: "Mar", vendas: 15600, pedidos: 47 },
  { month: "Abr", vendas: 13200, pedidos: 41 },
  { month: "Mai", vendas: 18900, pedidos: 56 },
  { month: "Jun", vendas: 16700, pedidos: 52 },
];

const TOP_PRODUCTS = [
  { name: "Jumpers Kit", qty: 98 },
  { name: "Arduino UNO", qty: 87 },
  { name: "ESP32 DevKit", qty: 64 },
  { name: "DHT22 Sensor", qty: 41 },
  { name: "OLED Display", qty: 35 },
];

const RECENT_SALES = [
  {
    id: "VND-001",
    client: "Lucas Ferreira",
    items: 3,
    total: 189.7,
    date: "14/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-002",
    client: "Ana Lima",
    items: 7,
    total: 842.3,
    date: "14/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-003",
    client: "Mariana Souza",
    items: 2,
    total: 62.8,
    date: "13/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-004",
    client: "Carlos Andrade",
    items: 4,
    total: 290.7,
    date: "13/05/2025",
    status: "Pendente",
  },
  {
    id: "VND-005",
    client: "Pedro Costa",
    items: 1,
    total: 49.9,
    date: "12/05/2025",
    status: "Cancelada",
  },
];

// ─── DESIGN TOKENS ────────────────────────────────────────────────
const T = {
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  surface2: "var(--color-surface2)",
  surface3: "var(--color-surface3)",
  border: "var(--color-border)",
  borderHover: "var(--color-borderHover)",
  cyan: "var(--color-cyan)",
  cyanBg: "var(--color-cyanBg)",
  text: "var(--color-text)",
  muted: "var(--color-muted)",
  muted2: "var(--color-muted2)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  purple: "var(--color-purple)",
};

const COLOR_RGB = {
  [T.cyan]: "var(--rgb-cyan)",
  [T.success]: "var(--rgb-success)",
  [T.warning]: "var(--rgb-warning)",
  [T.danger]: "var(--rgb-danger)",
  [T.purple]: "var(--rgb-purple)",
};



// ─── UTILS ────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    n,
  );
const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const useWindowSize = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};

const Badge = ({ status }) => {
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

const Avatar = ({ name, size = 36, color = T.cyan }) => (
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

const ThemeToggle = ({ theme, toggleTheme }) => (
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

const StatCard = ({ icon: Icon, label, value, sub, color = T.cyan }) => {
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

const SectionHeader = ({ title, sub, action }) => (
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

const TH = ({ children }) => (
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
const TD = ({ children, style }) => (
  <td style={{ padding: "11px 16px", ...style }}>{children}</td>
);

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => (
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

const Modal = ({ title, onClose, children }) => (
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

// ─── LOGIN ────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [mode, setMode] = useState("admin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const go = () => {
    if (mode === "admin") {
      if (email === "admin@prototech.com" && pass === "admin123") {
        onLogin("admin");
      } else setErr("Use admin@prototech.com / admin123");
    } else {
      if (email && pass) {
        onLogin("client");
      } else setErr("Preencha e-mail e senha");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #cdffd8 0%, #94b9ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(140,82,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(140,82,255,0.05) 0%, transparent 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(140,82,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(140,82,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="fi"
        style={{
          width: 400,
          padding: "40px 36px",
          position: "relative",
          background: "#f8fafc",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: "rgba(124, 58, 237, 0.08)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <Cpu size={24} style={{ color: "#7c3aed" }} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0f172a",
              }}
            >
              Proto<span style={{ color: "#7c3aed" }}>Tech</span>
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            Sistema de Gestão Empresarial
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "#e2e8f0",
            borderRadius: 8,
            padding: 3,
            marginBottom: 24,
          }}
        >
          {["admin", "client"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErr("");
              }}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: 6,
                border: "none",
                background: mode === m ? "#7c3aed" : "transparent",
                color: mode === m ? "#ffffff" : "#475569",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {m === "admin" ? "Administrador" : "Cliente"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#475569",
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              E-mail
            </label>
            <input
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#0f172a",
                fontSize: 14,
                width: "100%",
                transition: "border-color .15s",
                outline: "none",
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              placeholder={
                mode === "admin" ? "admin@prototech.com" : "seu@email.com"
              }
              type="email"
            />
          </div>
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#475569",
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              Senha
            </label>
            <input
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#0f172a",
                fontSize: 14,
                width: "100%",
                transition: "border-color .15s",
                outline: "none",
              }}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setErr("");
              }}
              placeholder="••••••••"
              type="password"
              onKeyDown={(e) => e.key === "Enter" && go()}
            />
          </div>
          {mode === "admin" && (
            <p
              style={{
                fontSize: 11,
                color: "#64748b",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Demo:{" "}
              <span
                style={{
                  color: "#7c3aed",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                admin@prototech.com
              </span>{" "}
              /{" "}
              <span
                style={{
                  color: "#7c3aed",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                admin123
              </span>
            </p>
          )}
          {err && (
            <p style={{ fontSize: 12, color: "#ef4444", textAlign: "center" }}>
              {err}
            </p>
          )}
          <button
            onClick={go}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "11px",
              marginTop: 2,
              background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)"
            }}
          >
            {mode === "admin" ? <Shield size={14} /> : <User size={14} />}
            Entrar {mode === "admin" ? "como Admin" : "como Cliente"}
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Sem conta? </span>
          <span
            style={{
              fontSize: 12,
              color: "#7c3aed",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cadastre-se grátis
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────
const Sidebar = ({ page, setPage, onLogout, collapsed, toggle, alertsCount = 0 }) => {
  const NAV = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "produtos", icon: Package, label: "Produtos" },
    { id: "estoque", icon: Warehouse, label: "Estoque" },
    { id: "vendas", icon: ShoppingCart, label: "Vendas" },
    { id: "clientes", icon: Users, label: "Clientes" },
    { id: "funcs", icon: UserCog, label: "Funcionários" },
    { id: "alertas", icon: Bell, label: "Alertas", badge: alertsCount },
  ];
  return (
    <div
      style={{
        width: collapsed ? 58 : 218,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width .2s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "18px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <Cpu size={20} style={{ color: T.cyan, flexShrink: 0 }} />
        {!collapsed && (
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
            }}
          >
            Proto<span style={{ color: T.cyan }}>Tech</span>
          </span>
        )}
        <button
          onClick={toggle}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.muted,
            display: "flex",
            flexShrink: 0,
          }}
        >
          <Menu size={15} />
        </button>
      </div>

      <nav style={{ padding: "10px 7px", flex: 1, overflowY: "auto" }}>
        {NAV.map(({ id, icon: Icon, label, badge }) => (
          <div
            key={id}
            className={`sb-item${page === id ? " active" : ""}`}
            onClick={() => setPage(id)}
            style={{
              justifyContent: collapsed ? "center" : "flex-start",
              marginBottom: 2,
            }}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
            {!collapsed && badge > 0 && (
              <span
                style={{
                  background: T.danger,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div style={{ padding: "10px 7px", borderTop: `1px solid ${T.border}` }}>
        <div className="sb-item" onClick={onLogout}>
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Sair</span>}
        </div>
      </div>
    </div>
  );
};

// ─── TOPBAR ───────────────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: "Dashboard",
  produtos: "Gestão de Produtos",
  estoque: "Controle de Estoque",
  vendas: "Gestão de Vendas",
  clientes: "Clientes",
  funcs: "Funcionários",
  alertas: "Alertas de Estoque",
};

const TopBar = ({ page, theme, toggleTheme, onRefresh }) => (
  <div
    style={{
      height: 54,
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      display: "flex",
      alignItems: "center",
      paddingInline: 22,
      gap: 14,
      flexShrink: 0,
    }}
  >
    <h1 style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>
      {PAGE_TITLES[page]}
    </h1>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="btn-g"
          style={{
            padding: "6px 10px",
            height: 32,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          title="Recarregar Dados"
        >
          <Zap size={14} />
          <span>Atualizar</span>
        </button>
      )}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <span
        style={{
          fontSize: 11,
          color: T.muted2,
          background: T.cyanBg,
          border: `1px solid ${T.border}`,
          borderRadius: 6,
          padding: "3px 10px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        admin@prototech.com
      </span>
      <Avatar name="Admin Sistema" size={32} />
    </div>
  </div>
);

// ─── DASHBOARD ────────────────────────────────────────────────────
const Dashboard = ({ products = [], sales = [], topProducts = [] }) => {
  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const hasSales = sales.length > 0;
  const revenue = hasSales
    ? sales.reduce((a, s) => a + parseFloat(s.valor_total || 0), 0)
    : SALES_MONTHLY.reduce((a, s) => a + s.vendas, 0);

  const totalOrders = hasSales ? sales.length : 213;

  // Gerar dados do gráfico mensal a partir das vendas reais do banco
  const getMonthlySales = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const grouped = {};

    // Inicializar os últimos 6 meses com faturamento 0 para manter o gráfico bonito
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mLabel = months[d.getMonth()];
      grouped[mLabel] = 0;
    }

    sales.forEach(s => {
      if (!s.data_emissao) return;
      const d = new Date(s.data_emissao);
      const mLabel = months[d.getMonth()];
      if (grouped[mLabel] !== undefined) {
        grouped[mLabel] += parseFloat(s.valor_total || 0);
      }
    });

    return Object.keys(grouped).map(month => ({
      month,
      vendas: grouped[month]
    }));
  };

  const salesMonthlyData = hasSales ? getMonthlySales() : SALES_MONTHLY;
  const topProductsData = topProducts.length > 0 ? topProducts : TOP_PRODUCTS;
  const recentSalesData = hasSales ? sales.slice(0, 5) : RECENT_SALES;

  return (
    <div
      className="fi"
      style={{
        padding: 22,
        overflowY: "auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))",
          gap: 14,
        }}
      >
        <StatCard
          icon={DollarSign}
          label="Faturamento Mensal"
          value={fmt(revenue)}
          sub={hasSales ? "Faturamento real do banco de dados" : "↑ 12% vs mês anterior"}
          color={T.success}
        />
        <StatCard
          icon={ShoppingCart}
          label="Pedidos no Mês"
          value={totalOrders}
          sub={hasSales ? "Pedidos reais cadastrados" : "38 concluídos hoje"}
          color={T.cyan}
        />
        <StatCard
          icon={Package}
          label="Produtos Ativos"
          value={products.length}
          sub={`${products.filter((p) => p.stock > 0).length} com estoque`}
          color={T.cyan}
        />
        <StatCard
          icon={AlertTriangle}
          label="Alertas Críticos"
          value={alertsCount}
          sub="Estoque abaixo do mínimo"
          color={T.danger}
        />
        <StatCard
          icon={Users}
          label="Clientes"
          value={CLIENTS.length}
          sub="2 novos este mês"
          color={T.purple}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
            Faturamento Mensal
          </p>
          <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
            Jan – Dez {new Date().getFullYear()}
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={salesMonthlyData}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8c52ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8c52ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(140,82,255,0.06)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: T.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: T.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  color: T.text,
                  fontSize: 13,
                }}
                formatter={(v) => [fmt(v), "Faturamento"]}
              />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#8c52ff"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVendas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
            Mais Vendidos
          </p>
          <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
            Por quantidade
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={topProductsData} layout="vertical">
              <XAxis
                type="number"
                tick={{ fill: T.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: T.muted2, fontSize: 10 }}
                width={75}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  color: T.text,
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="qty"
                fill="#8c52ff"
                radius={[0, 4, 4, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          Últimas Vendas
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["ID", "Cliente", "Itens", "Total", "Data", "Status"].map(
                (h) => (
                  <TH key={h}>{h}</TH>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {recentSalesData.map((s) => (
              <tr key={s.id_venda || s.id} className="tr">
                <TD
                  style={{
                    fontSize: 12,
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.muted2,
                  }}
                >
                  {s.id_venda ? `VD-${s.id_venda}` : s.id}
                </TD>
                <TD style={{ fontSize: 14, fontWeight: 500 }}>{s.nome_cliente || s.client}</TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>
                  {s.total_itens !== undefined ? `${s.total_itens} itens` : `${s.items} itens`}
                </TD>
                <TD
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontWeight: 600,
                  }}
                >
                  {fmt(parseFloat(s.valor_total || s.total))}
                </TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>
                  {s.data_emissao ? new Date(s.data_emissao).toLocaleDateString("pt-BR") : s.date}
                </TD>
                <TD>
                  <Badge status={s.status_venda ? (s.status_venda === "CONCLUIDA" ? "Concluído" : s.status_venda) : s.status} />
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── PRODUTOS ─────────────────────────────────────────────────────
const API_URL = "http://localhost:3000/api";

const Produtos = ({ products = [], loadProducts }) => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  // Carrega (ou recarrega) fornecedores do banco — chamada sempre que o modal abre
  const loadSuppliers = () => {
    fetch(`${API_URL}/fornecedores`)
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Erro ao carregar fornecedores:", err));
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = () => {
    const name = document.getElementById("inp-name")?.value || "";
    const cost = parseFloat(document.getElementById("inp-cost")?.value) || 0;
    const price = parseFloat(document.getElementById("inp-price")?.value) || 0;

    if (!name.trim()) {
      alert("⚠️ O nome do produto é obrigatório.");
      return;
    }
    if (cost <= 0 || price <= 0) {
      alert("⚠️ Os preços de custo e venda devem ser maiores que zero.");
      return;
    }

    const payload = {
      name,
      sku: document.getElementById("inp-sku")?.value || "",
      category: document.getElementById("inp-category")?.value || "Geral",
      description: document.getElementById("inp-description")?.value || "",
      cost,
      price,
      minStock: parseInt(document.getElementById("inp-minStock")?.value) || 5,
      stock: parseInt(document.getElementById("inp-stock")?.value) || 0,
      location: document.getElementById("inp-location")?.value || "",
      id_fornecedor: parseInt(document.getElementById("inp-id_fornecedor")?.value) || null,
    };

    const url = edit ? `${API_URL}/produtos/${edit.id}` : `${API_URL}/produtos`;
    const method = edit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de processamento no servidor");
        return res.json();
      })
      .then(() => {
        loadProducts();
        setModal(false);
        alert(`✅ Produto ${edit ? "atualizado" : "cadastrado"} com sucesso!`);
      })
      .catch((err) => alert("❌ Erro ao salvar produto: " + err.message));
  };

  const handleDelete = (id) => {
    if (confirm("⚠️ Tem certeza absoluta que deseja excluir este produto?")) {
      fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Não foi possível excluir o produto");
          return res.json();
        })
        .then(() => {
          loadProducts();
          alert("✅ Produto excluído com sucesso!");
        })
        .catch((err) => alert("❌ Erro ao excluir produto: " + err.message));
    }
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, categoria ou SKU..."
        />
        <button
          className="btn-p"
          onClick={() => {
            setEdit(null);
            loadSuppliers();
            setModal(true);
          }}
        >
          <Plus size={14} /> Novo Produto
        </button>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${T.border}`,
                background: T.surface2,
              }}
            >
              {[
                "SKU",
                "Produto",
                "Categoria",
                "Preço Venda",
                "Estoque",
                "Fornecedor",
                "Ações",
              ].map((h) => (
                <TH key={h}>{h}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
                  Nenhum produto cadastrado no banco de dados.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="tr">
                  <TD
                    style={{
                      fontSize: 11,
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.muted2,
                    }}
                  >
                    {p.sku}
                  </TD>
                  <TD style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</TD>
                  <TD>
                    <span className="badge b-info">{p.category}</span>
                  </TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(p.price)}
                  </TD>
                  <TD>
                    <span
                      style={{
                        fontWeight: 700,
                        color:
                          p.stock === 0
                            ? T.danger
                            : p.stock <= p.minStock
                              ? T.warning
                              : T.success,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.stock}
                    </span>
                    <span style={{ color: T.muted, fontSize: 11 }}>
                      {" "}
                      min:{p.minStock}
                    </span>
                  </TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>{p.supplier}</TD>
                  <TD>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn-g"
                        style={{ padding: "5px 9px" }}
                        onClick={() => {
                          setEdit(p);
                          loadSuppliers();
                          setModal(true);
                        }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="btn-d"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={edit ? "Editar Produto" : "Cadastrar Produto"}
          onClose={() => setModal(false)}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {[
              { label: "Nome do Produto", col: "1/-1", key: "name", type: "text" },
              { label: "SKU", col: "", key: "sku", type: "text" },
              { label: "Categoria", col: "", key: "category", type: "text" },
              { label: "Descrição Detalhada", col: "1/-1", key: "description", type: "textarea" },
              { label: "Preço de Custo (R$)", col: "", key: "cost", type: "number", step: "0.01" },
              { label: "Preço de Venda (R$)", col: "", key: "price", type: "number", step: "0.01" },
              { label: "Estoque Mínimo", col: "", key: "minStock", type: "number", step: "1" },
              { label: "Estoque Atual", col: "", key: "stock", type: "number", step: "1" },
              { label: "Localização (Prateleira)", col: "1/-1", key: "location", type: "text" },
            ].map((f) => (
              <div key={f.key} style={f.col ? { gridColumn: f.col } : {}}>
                <label
                  style={{
                    fontSize: 12,
                    color: T.muted2,
                    marginBottom: 5,
                    display: "block",
                    fontWeight: 500,
                  }}
                >
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    className="inp"
                    id={`inp-${f.key}`}
                    defaultValue={edit ? edit[f.key] : ""}
                    placeholder={f.label}
                    style={{ minHeight: 60, resize: "vertical", fontFamily: "inherit" }}
                  />
                ) : (
                  <input
                    className="inp"
                    id={`inp-${f.key}`}
                    defaultValue={edit ? edit[f.key] : ""}
                    placeholder={f.label}
                    type={f.type}
                    step={f.step}
                  />
                )}
              </div>
            ))}

            <div style={{ gridColumn: "1/-1" }}>
              <label
                style={{
                  fontSize: 12,
                  color: T.muted2,
                  marginBottom: 5,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Fornecedor Associado
                {suppliers.length === 0 && (
                  <span style={{ fontSize: 10, color: T.warning, marginLeft: 8 }}>⚠ Nenhum fornecedor no banco</span>
                )}
              </label>
              <div className="select-scroll-wrapper">
                <select
                  className="inp"
                  id="inp-id_fornecedor"
                  defaultValue={edit ? edit.id_fornecedor || "" : ""}
                  size={suppliers.length > 4 ? 5 : undefined}
                  style={suppliers.length > 4 ? { height: "auto", appearance: "auto", WebkitAppearance: "auto", paddingRight: 12 } : {}}
                >
                  <option value="">— Sem Fornecedor —</option>
                  {suppliers.map((s) => (
                    <option key={s.id_fornecedor} value={s.id_fornecedor}>
                      {s.razao_social}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 22,
              justifyContent: "flex-end",
            }}
          >
            <button className="btn-g" onClick={() => setModal(false)}>
              Cancelar
            </button>
            <button className="btn-p" onClick={handleSave}>
              <CheckCircle size={14} /> Salvar Produto
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};


// ─── ESTOQUE ──────────────────────────────────────────────────────
const Estoque = ({ products = [], loadProducts }) => {
  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const handleRestock = (p) => {
    const qtyStr = prompt(`Digite a quantidade a ser adicionada ao estoque de ${p.name}:`, "10");
    if (qtyStr === null) return;
    const qty = parseInt(qtyStr);
    if (isNaN(qty) || qty <= 0) {
      alert("⚠️ Digite uma quantidade válida maior que zero.");
      return;
    }

    const payload = {
      name: p.name,
      sku: p.sku,
      category: p.category,
      description: p.description,
      cost: p.cost,
      price: p.price,
      minStock: p.minStock,
      stock: p.stock + qty,
      location: p.location,
      id_fornecedor: p.id_fornecedor
    };

    fetch(`${API_URL}/produtos/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de conexão com o servidor");
        return res.json();
      })
      .then(() => {
        loadProducts();
        alert(`✅ Estoque de ${p.name} reabastecido com sucesso!`);
      })
      .catch((err) => alert("❌ Erro ao repor estoque: " + err.message));
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      {alertsCount > 0 && (
        <div
          style={{
            background: "rgba(255,71,87,0.07)",
            border: "1px solid rgba(255,71,87,0.2)",
            borderRadius: 10,
            padding: "11px 16px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle size={15} style={{ color: T.danger }} className="pl" />
          <span style={{ fontSize: 13, color: "#ff8090" }}>
            <strong>{alertsCount} produtos</strong> com estoque crítico ou zerado
            requerem atenção imediata
          </span>
        </div>
      )}

      <div className="card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${T.border}`,
                background: T.surface2,
              }}
            >
              {[
                "Produto",
                "SKU",
                "Qtd Atual",
                "Mínimo",
                "Localização",
                "Status",
                "Ação",
              ].map((h) => (
                <TH key={h}>{h}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
                  Nenhum registro de estoque disponível.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const st =
                  p.stock === 0
                    ? "Zerado"
                    : p.stock <= p.minStock
                      ? "Crítico"
                      : "Normal";
                const sc =
                  p.stock === 0
                    ? T.danger
                    : p.stock <= p.minStock
                      ? T.warning
                      : T.success;
                return (
                  <tr
                    key={p.id}
                    className="tr"
                    style={{
                      background:
                        p.stock === 0
                          ? "rgba(255,71,87,0.03)"
                          : p.stock <= p.minStock
                            ? "rgba(255,184,0,0.03)"
                            : "",
                    }}
                  >
                    <TD>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          borderLeft: `2px solid ${sc}`,
                          paddingLeft: 10,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{ fontSize: 11, color: T.muted, paddingLeft: 10 }}
                      >
                        {p.category}
                      </div>
                    </TD>
                    <TD
                      style={{
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        color: T.muted2,
                      }}
                    >
                      {p.sku}
                    </TD>
                    <TD>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: sc,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {p.stock}
                      </span>
                    </TD>
                    <TD style={{ fontSize: 13, color: T.muted2 }}>{p.minStock}</TD>
                    <TD
                      style={{
                        fontSize: 12,
                        color: T.muted2,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.location || "Sem prateleira"}
                    </TD>
                    <TD>
                      <Badge status={st} />
                    </TD>
                    <TD>
                      <button
                        className="btn-g"
                        style={{ padding: "5px 12px", fontSize: 12 }}
                        onClick={() => handleRestock(p)}
                      >
                        Repor
                      </button>
                    </TD>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── VENDAS ───────────────────────────────────────────────────────
const Vendas = ({ products = [], sales = [], loadSales, loadProducts }) => {
  const [tab, setTab] = useState("lista");
  const [cartV, setCartV] = useState([]);
  const [clientId, setClientId] = useState("");
  const [dbClients, setDbClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/clientes")
      .then((res) => res.json())
      .then((data) => setDbClients(data))
      .catch((err) => console.error("Erro ao carregar clientes para vendas:", err));
  }, []);

  const addItem = (p) => {
    const itemNoCarrinho = cartV.find((i) => i.id === p.id);
    const qtdAtual = itemNoCarrinho ? itemNoCarrinho.qty : 0;
    if (qtdAtual >= p.stock) {
      alert(`⚠️ Estoque insuficiente! Apenas ${p.stock} unidades disponíveis.`);
      return;
    }

    setCartV((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });
  };

  const handleFinalize = () => {
    if (!clientId) {
      alert("⚠️ Por favor, selecione um cliente!");
      return;
    }
    if (cartV.length === 0) {
      alert("⚠️ O carrinho está vazio!");
      return;
    }

    const payload = {
      id_cliente: parseInt(clientId),
      items: cartV.map(item => ({
        id_produto: item.id,
        quantidade: item.qty,
        preco_unitario: item.price
      }))
    };

    fetch("http://localhost:3000/api/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de processamento no servidor de banco de dados");
        return res.json();
      })
      .then(() => {
        alert("✅ Venda registrada com sucesso no banco de dados MySQL!");
        setCartV([]);
        setClientId("");
        setTab("lista");
        if (loadSales) loadSales();
        if (loadProducts) loadProducts();
      })
      .catch((err) => {
        console.error("Erro ao processar venda:", err);
        alert(`❌ Erro ao finalizar venda: ${err.message}`);
      });
  };

  const total = cartV.reduce((s, i) => s + i.price * i.qty, 0);
  const activeProducts = products.filter((p) => p.stock > 0);

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {[
          { id: "lista", label: "Histórico de Vendas" },
          { id: "nova", label: "Nova Venda" },
        ].map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setTab(t.id)}
            style={{
              color: tab === t.id ? T.cyan : T.muted,
              fontWeight: tab === t.id ? 600 : 400,
              borderBottomColor: tab === t.id ? T.cyan : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "lista" ? (
        <div className="card" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  background: T.surface2,
                }}
              >
                {[
                  "ID Venda",
                  "Cliente",
                  "Itens",
                  "Total",
                  "Data",
                  "Status",
                ].map((h) => (
                  <TH key={h}>{h}</TH>
                ))}
              </tr>
            </thead>
            <tbody>
              {(sales.length > 0 ? sales : RECENT_SALES).map((s) => (
                <tr key={s.id_venda || s.id} className="tr">
                  <TD
                    style={{
                      fontSize: 12,
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.muted2,
                    }}
                  >
                    {s.id_venda ? `VD-${s.id_venda}` : s.id}
                  </TD>
                  <TD style={{ fontSize: 14, fontWeight: 500 }}>{s.nome_cliente || s.client}</TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>
                    {s.total_itens !== undefined ? `${s.total_itens} itens` : `${s.items} itens`}
                  </TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(parseFloat(s.valor_total || s.total))}
                  </TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>
                    {s.data_emissao ? new Date(s.data_emissao).toLocaleDateString("pt-BR") : s.date}
                  </TD>
                  <TD>
                    <Badge status={s.status_venda ? (s.status_venda === "CONCLUIDA" ? "Concluído" : s.status_venda) : s.status} />
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 12,
                  color: T.muted2,
                  marginBottom: 5,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Selecionar Cliente
              </label>
              <div className="select-scroll-wrapper">
                <select
                  className="inp"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  size={dbClients.length > 4 ? 5 : undefined}
                  style={dbClients.length > 4 ? { height: "auto", appearance: "auto", WebkitAppearance: "auto", paddingRight: 12 } : {}}
                >
                  <option value="">— Selecione o cliente —</option>
                  {dbClients.map((c) => (
                    <option key={c.id_cliente} value={c.id_cliente}>
                      {c.nome_cliente} – CPF: {c.cpf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  padding: "13px 16px",
                  borderBottom: `1px solid ${T.border}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.muted2,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Produtos Disponíveis
              </div>
              {activeProducts.map((p) => (
                <div
                  key={p.id}
                  className="tr"
                  style={{
                    padding: "11px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: T.surface2,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Package size={18} style={{ color: `${T.cyan}66` }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted2 }}>
                      {p.category} · Estoque: {p.stock}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {fmt(p.price)}
                  </span>
                  <button
                    className="btn-g"
                    style={{ padding: "5px 12px" }}
                    onClick={() => addItem(p)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShoppingCart size={16} style={{ color: T.cyan }} /> Carrinho de
              Venda
            </div>

            {cartV.length === 0 ? (
              <p
                style={{
                  color: T.muted,
                  fontSize: 13,
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Adicione produtos ao carrinho
              </p>
            ) : (
              cartV.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 500, maxWidth: 160 }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted2 }}>
                      Qtd: {item.qty} × {fmt(item.price)}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: T.cyan,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {fmt(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() =>
                        setCartV((c) => c.filter((i) => i.id !== item.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: T.muted,
                        display: "flex",
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {cartV.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0 10px",
                    borderTop: `1px solid ${T.border}`,
                    marginTop: 8,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {fmt(total)}
                  </span>
                </div>
                <button
                  className="btn-p"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                  onClick={handleFinalize}
                >
                  <CheckCircle size={14} /> Finalizar Venda
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── CLIENTES ─────────────────────────────────────────────────────
const Clientes = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Form
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const loadClients = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/clientes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar clientes");
        return res.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenModal = (c = null) => {
    if (c) {
      setEditingClient(c);
      setName(c.nome_cliente || "");
      setCpf(c.cpf || "");
      setEmail(c.email || "");
      setPhone(c.telefone || "");
    } else {
      setEditingClient(null);
      setName("");
      setCpf("");
      setEmail("");
      setPhone("");
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !cpf) {
      alert("⚠️ Nome e CPF são obrigatórios!");
      return;
    }

    const payload = { name, cpf, email, phone };
    const method = editingClient ? "PUT" : "POST";
    const url = editingClient
      ? `http://localhost:3000/api/clientes/${editingClient.id_cliente}`
      : "http://localhost:3000/api/clientes";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Erro ao salvar cliente");
          });
        }
        return res.json();
      })
      .then(() => {
        alert(editingClient ? "✅ Cliente atualizado!" : "✅ Cliente cadastrado!");
        setModalOpen(false);
        loadClients();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const handleDelete = (id, name) => {
    if (!confirm(`⚠️ Tem certeza de que deseja excluir o cliente ${name}?`)) return;

    fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir cliente");
        return res.json();
      })
      .then(() => {
        alert("✅ Cliente excluído!");
        loadClients();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const filtered = clients.filter(
    (c) =>
      c.nome_cliente?.toLowerCase().includes(search.toLowerCase()) ||
      c.cpf?.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, CPF ou e-mail..."
        />
        <button className="btn-p" onClick={() => handleOpenModal(null)}>
          <Plus size={14} /> Novo Cliente
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Carregando clientes do banco de dados...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Nenhum cliente cadastrado no momento.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(295px,1fr))",
            gap: 16,
          }}
        >
          {filtered.map((c) => (
            <div key={c.id_cliente} className="card card-h" style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <Avatar name={c.nome_cliente} size={42} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {c.nome_cliente}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted2 }}>
                    CPF: {c.cpf}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>
                📧 {c.email || "Sem e-mail cadastrado"}
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>
                📞 {c.telefone || "Sem telefone cadastrado"}
              </div>
              <div style={{ fontSize: 10, color: T.muted2, marginTop: 10, borderTop: `1px solid ${T.border}`, paddingTop: 8 }}>
                Cadastrado em: {new Date(c.data_cadastro).toLocaleDateString("pt-BR")}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button
                  className="btn-g"
                  style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                  onClick={() => alert(`Histórico de vendas indisponível para ${c.nome_cliente}.`)}
                >
                  Ver Histórico
                </button>
                <button className="btn-g" style={{ padding: "7px 10px" }} onClick={() => handleOpenModal(c)}>
                  <Edit2 size={13} />
                </button>
                <button
                  className="btn-d"
                  style={{ padding: "7px 10px", borderColor: "rgba(255,71,87,0.2)", color: T.danger }}
                  onClick={() => handleDelete(c.id_cliente, c.nome_cliente)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Cliente */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 24,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  CPF *
                </label>
                <input
                  type="text"
                  value={cpf}
                  placeholder="000.000.000-00"
                  onChange={(e) => setCpf(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Telefone
                </label>
                <input
                  type="text"
                  value={phone}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  className="btn-g"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-p"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── FUNCIONÁRIOS ─────────────────────────────────────────────────
const Funcionarios = () => {
  const [employees, setEmployees] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargoId, setCargoId] = useState("");
  const [hireDate, setHireDate] = useState("");

  // Recarrega apenas os cargos (usado ao abrir o modal para pegar novos cargos do banco)
  const loadCargos = async () => {
    try {
      const resCargos = await fetch("http://localhost:3000/api/cargos");
      const dataCargos = await resCargos.json();
      setCargos(dataCargos);
    } catch (err) {
      console.error("Erro ao carregar cargos:", err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Carrega funcionários e cargos em paralelo
      const [resEmp, resCargos] = await Promise.all([
        fetch("http://localhost:3000/api/funcionarios"),
        fetch("http://localhost:3000/api/cargos"),
      ]);
      const dataEmp = await resEmp.json();
      const dataCargos = await resCargos.json();
      setEmployees(dataEmp);
      setCargos(dataCargos);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados dos funcionários:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (e = null) => {
    // Sempre recarrega cargos do banco ao abrir o modal (garante que novos cargos apareçam)
    loadCargos();

    if (e) {
      setEditingEmployee(e);
      setName(e.nome_funcionario || "");
      setCpf(e.cpf || "");
      setCargoId(e.id_cargo || "");

      // Formata a data AAAA-MM-DD para o input do tipo date
      if (e.data_admissao) {
        const d = new Date(e.data_admissao);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        setHireDate(`${y}-${m}-${day}`);
      } else {
        setHireDate("");
      }
    } else {
      setEditingEmployee(null);
      setName("");
      setCpf("");
      setCargoId("");
      setHireDate("");
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !cpf || !cargoId) {
      alert("⚠️ Nome, CPF e Cargo são obrigatórios!");
      return;
    }

    const payload = { name, cpf, id_cargo: parseInt(cargoId), hire_date: hireDate || null };
    const method = editingEmployee ? "PUT" : "POST";
    const url = editingEmployee
      ? `http://localhost:3000/api/funcionarios/${editingEmployee.id_funcionario}`
      : "http://localhost:3000/api/funcionarios";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Erro ao salvar funcionário");
          });
        }
        return res.json();
      })
      .then(() => {
        alert(editingEmployee ? "✅ Funcionário atualizado com sucesso!" : "✅ Funcionário cadastrado com sucesso!");
        setModalOpen(false);
        loadData();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const handleDelete = (id, name) => {
    if (!confirm(`⚠️ Tem certeza de que deseja excluir o funcionário ${name}?`)) return;

    fetch(`http://localhost:3000/api/funcionarios/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir funcionário");
        return res.json();
      })
      .then(() => {
        alert("✅ Funcionário excluído!");
        loadData();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <button className="btn-p" onClick={() => handleOpenModal(null)}>
          <Plus size={14} /> Novo Funcionário
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Carregando dados dos funcionários...
        </div>
      ) : employees.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Nenhum funcionário cadastrado no momento.
        </div>
      ) : (
        <div className="card" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  background: T.surface2,
                }}
              >
                {[
                  "Funcionário",
                  "CPF",
                  "Cargo",
                  "Salário Base",
                  "Data de Admissão",
                  "Ações",
                ].map((h) => (
                  <TH key={h}>{h}</TH>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id_funcionario} className="tr">
                  <TD>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={e.nome_funcionario} size={34} />
                      <span style={{ fontWeight: 500, fontSize: 14 }}>
                        {e.nome_funcionario}
                      </span>
                    </div>
                  </TD>
                  <TD style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", color: T.muted2 }}>
                    {e.cpf}
                  </TD>
                  <TD style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 500 }}>{e.nome_cargo || "Sem cargo"}</div>
                    {e.descricao_atribuicoes && (
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 2, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={e.descricao_atribuicoes}>
                        {e.descricao_atribuicoes}
                      </div>
                    )}
                  </TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.success,
                      fontWeight: 600,
                    }}
                  >
                    {e.salario_base ? fmt(parseFloat(e.salario_base)) : "—"}
                  </TD>
                  <TD style={{ fontSize: 12, color: T.muted2 }}>
                    {e.data_admissao ? new Date(e.data_admissao).toLocaleDateString("pt-BR") : "—"}
                  </TD>
                  <TD>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-g" style={{ padding: "5px 9px" }} onClick={() => handleOpenModal(e)}>
                        <Edit2 size={13} />
                      </button>
                      <button className="btn-d" onClick={() => handleDelete(e.id_funcionario, e.nome_funcionario)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Funcionário */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 24,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
              {editingEmployee ? "Editar Funcionário" : "Novo Funcionário"}
            </h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Nome do Funcionário *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  CPF *
                </label>
                <input
                  type="text"
                  value={cpf}
                  placeholder="000.000.000-00"
                  onChange={(e) => setCpf(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Cargo *
                  {cargos.length === 0 && (
                    <span style={{ fontSize: 10, color: T.warning, marginLeft: 8, textTransform: "none" }}>⚠ Nenhum cargo encontrado no banco</span>
                  )}
                </label>
                <select
                  className="inp"
                  value={cargoId}
                  onChange={(e) => setCargoId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: T.surface2,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    color: T.text,
                    outline: "none",
                  }}
                  required
                >
                  <option value="" disabled>— Selecione um Cargo —</option>
                  {cargos.map((cargo) => (
                    <option key={cargo.id_cargo} value={cargo.id_cargo}>
                      {cargo.nome_cargo} — Salário: {fmt(parseFloat(cargo.salario_base))}
                    </option>
                  ))}
                </select>

                {/* Painel de descrição do cargo selecionado */}
                {(() => {
                  const cargoSelecionado = cargos.find((c) => String(c.id_cargo) === String(cargoId));
                  if (!cargoSelecionado || !cargoSelecionado.descricao_atribuicoes) return null;
                  return (
                    <div
                      style={{
                        marginTop: 8,
                        padding: "10px 12px",
                        background: `rgba(var(--rgb-cyan),0.06)`,
                        border: `1px solid rgba(var(--rgb-cyan),0.18)`,
                        borderRadius: 8,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>📋</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: T.cyan, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                          Atribuições do Cargo
                        </div>
                        <div style={{ fontSize: 12, color: T.muted2, lineHeight: 1.55 }}>
                          {cargoSelecionado.descricao_atribuicoes}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Data de Admissão
                </label>
                <input
                  type="date"
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                  className="modal-input"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  className="btn-g"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-p"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ALERTAS ──────────────────────────────────────────────────────
const Alertas = ({ products = [], loadProducts }) => {
  const [resolved, setResolved] = useState([]);
  const alerts = products.filter((p) => p.stock <= p.minStock);

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div
        style={{
          background: "rgba(255,71,87,0.07)",
          border: "1px solid rgba(255,71,87,0.2)",
          borderRadius: 10,
          padding: "12px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <AlertTriangle size={16} style={{ color: T.danger }} className="pl" />
        <div>
          <span style={{ fontSize: 14, color: "#ff8090", fontWeight: 600 }}>
            {alerts.length - resolved.length} alertas pendentes
          </span>
          <span style={{ fontSize: 13, color: T.muted2, marginLeft: 8 }}>
            · {resolved.length} resolvidos
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
          gap: 16,
        }}
      >
        {alerts.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }}>
            🎉 Todos os produtos estão com níveis de estoque saudáveis!
          </div>
        ) : (
          alerts.map((p) => {
            const isDone = resolved.includes(p.id);
            const isCrit = p.stock === 0;
            return (
              <div
                key={p.id}
                className="card"
                style={{
                  padding: 20,
                  borderColor: isDone
                    ? "rgba(0,191,99,0.3)"
                    : isCrit
                      ? "rgba(255,71,87,0.3)"
                      : "rgba(255,184,0,0.3)",
                  opacity: isDone ? 0.6 : 1,
                  transition: "opacity .3s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {isDone ? (
                    <CheckCircle size={15} style={{ color: T.success }} />
                  ) : (
                    <AlertTriangle
                      size={15}
                      style={{ color: isCrit ? T.danger : T.warning }}
                      className={isDone ? "" : "pl"}
                    />
                  )}
                  <span
                    className={`badge ${isDone ? "b-ok" : isCrit ? "b-err" : "b-warn"}`}
                  >
                    {isDone ? "Resolvido" : isCrit ? "Zerado" : "Crítico"}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      color: T.muted,
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {p.sku}
                  </span>
                </div>

                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: T.muted2, marginBottom: 14 }}>
                  {p.category} · {p.supplier}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      background: T.surface2,
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 3,
                      }}
                    >
                      Atual
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: isCrit ? T.danger : T.warning,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.stock}
                    </div>
                  </div>
                  <div
                    style={{
                      background: T.surface2,
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 3,
                      }}
                    >
                      Mínimo
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: T.muted2,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.minStock}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn-p"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "8px",
                      opacity: isDone ? 0.5 : 1,
                    }}
                    disabled={isDone}
                    onClick={() => alert(`Solicitado reabastecimento de ${p.name} ao fornecedor ${p.supplier}.`)}
                  >
                    Solicitar Reposição
                  </button>
                  <button
                    className="btn-g"
                    style={{ padding: "8px 12px" }}
                    onClick={() =>
                      setResolved((r) =>
                        isDone ? r.filter((x) => x !== p.id) : [...r, p.id]
                      )
                    }
                  >
                    {isDone ? <X size={13} /> : <CheckCircle size={13} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ─── ADMIN LAYOUT ─────────────────────────────────────────────────
const AdminArea = ({ onLogout, theme, toggleTheme, products = [], loadProducts, sales = [], loadSales, topProducts = [], loadTopProducts }) => {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const PAGES = {
    dashboard: Dashboard,
    produtos: Produtos,
    estoque: Estoque,
    vendas: Vendas,
    clientes: Clientes,
    funcs: Funcionarios,
    alertas: Alertas,
  };
  const Page = PAGES[page];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={onLogout}
        collapsed={collapsed}
        toggle={() => setCollapsed((v) => !v)}
        alertsCount={alertsCount}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar 
          page={page} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onRefresh={() => {
            loadProducts();
            loadSales();
            loadTopProducts();
          }} 
        />
        <Page
          key={page}
          products={products}
          loadProducts={loadProducts}
          sales={sales}
          loadSales={loadSales}
          topProducts={topProducts}
          loadTopProducts={loadTopProducts}
        />
      </div>
    </div>
  );
};

// ─── CLIENT NAV ───────────────────────────────────────────────────
const ClientNav = ({ page, setPage, cart, onLogout, theme, toggleTheme }) => {
  const { isMobile } = useWindowSize();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <nav
      style={{
        background: T.surface,
        borderBottom: `1px solid ${T.border}`,
        padding: isMobile ? "0 16px" : "0 28px",
        height: 58,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Centered bounds wrapper */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 12 : 24,
        }}
      >
        <div
          onClick={() => {
            if (page === "home") {
              document.getElementById("client-home-container")?.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            } else {
              setPage("home");
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Cpu size={18} style={{ color: T.cyan }} />
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.03em" }}>
            Proto<span style={{ color: T.cyan }}>Tech</span>
          </span>
        </div>

        {!isMobile ? (
          <>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={() => setPage("home")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: page === "home" ? T.cyan : T.muted2,
                  fontWeight: page === "home" ? 600 : 400,
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "all .15s",
                }}
              >
                Início
              </button>
              <button
                onClick={() => {
                  if (page !== "home") {
                    setPage("home");
                    setTimeout(() => {
                      document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  } else {
                    document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: T.muted2,
                  fontWeight: 400,
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "all .15s",
                }}
              >
                Sobre
              </button>
              <button
                onClick={() => setPage("catalogo")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: page === "catalogo" ? T.cyan : T.muted2,
                  fontWeight: page === "catalogo" ? 600 : 400,
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "all .15s",
                }}
              >
                Catálogo
              </button>
              <button
                onClick={() => setPage("perfil")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: page === "perfil" ? T.cyan : T.muted2,
                  fontWeight: page === "perfil" ? 600 : 400,
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "all .15s",
                }}
              >
                Meu Perfil
              </button>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <button
                className="btn-g"
                style={{ position: "relative" }}
                onClick={() => setPage("carrinho")}
              >
                <ShoppingCart size={15} /> Carrinho
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: T.cyan,
                      color: "#070914",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                className="btn-g"
                onClick={onLogout}
                style={{ padding: "8px 12px" }}
                title="Sair"
              >
                <LogOut size={14} />
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button
              className="btn-g"
              style={{
                position: "relative",
                padding: "8px 10px",
                minWidth: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setPage("carrinho")}
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: T.cyan,
                    color: "#070914",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              className="btn-g"
              style={{
                padding: "8px 10px",
                minWidth: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <Menu size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {isMobile && drawerOpen && (
        <div
          style={{
            position: "fixed",
            top: 58,
            left: 0,
            width: "100%",
            height: "calc(100vh - 58px)",
            background: "rgba(7, 9, 20, 0.96)",
            backdropFilter: "blur(12px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: 24,
            gap: 16,
            animation: "fi .25s ease-out forwards",
            borderTop: `1px solid ${T.border}`,
          }}
        >
          {[
            { id: "home", l: "Início", action: () => setPage("home") },
            {
              id: "sobre",
              l: "Sobre o Projeto",
              action: () => {
                if (page !== "home") {
                  setPage("home");
                  setTimeout(() => {
                    document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
                  }, 250);
                } else {
                  document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
                }
              },
            },
            { id: "catalogo", l: "Catálogo", action: () => setPage("catalogo") },
            { id: "perfil", l: "Meu Perfil", action: () => setPage("perfil") },
          ].map(({ id, l, action }) => (
            <button
              key={id}
              onClick={() => {
                action();
                setDrawerOpen(false);
              }}
              style={{
                background: page === id ? "rgba(140, 82, 255, 0.08)" : "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${page === id ? T.cyan : T.border}`,
                borderRadius: 12,
                color: page === id ? T.cyan : T.text,
                fontSize: 16,
                fontWeight: 600,
                padding: "16px 20px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .15s",
                display: "block",
                width: "100%",
              }}
            >
              {l}
            </button>
          ))}

          <button
            onClick={() => {
              onLogout();
              setDrawerOpen(false);
            }}
            style={{
              background: "rgba(255, 71, 87, 0.1)",
              border: `1px solid rgba(255, 71, 87, 0.25)`,
              borderRadius: 12,
              color: T.danger,
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 20px",
              cursor: "pointer",
              textAlign: "left",
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <LogOut size={16} /> Sair da Conta
          </button>
        </div>
      )}
    </nav>
  );
};

// ─── CLIENT HOME ──────────────────────────────────────────────────
const HERO_STYLE = "technical"; // 'technical' | 'minimal' | 'colorful'

const renderHeroIllustration = () => {
  if (HERO_STYLE === "minimal") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 1 50%",
          maxWidth: "480px",
          pointerEvents: "none",
        }}
      >
        <svg
          className="hero-illustration"
          viewBox="0 0 420 240"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "100%", height: "auto" }}
        >
          <rect
            x="40"
            y="50"
            width="340"
            height="140"
            rx="16"
            fill="#0f1724"
            stroke="rgba(255,255,255,0.06)"
          />
          <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2">
            <path d="M70 80 H350" />
            <path d="M70 120 H350" />
            <path d="M70 160 H350" />
          </g>
          <circle cx="120" cy="120" r="22" fill="#8c52ff" />
          <rect x="200" y="98" width="120" height="44" rx="6" fill="#00bf63" />
        </svg>
      </div>
    );
  }

  if (HERO_STYLE === "colorful") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 1 50%",
          maxWidth: "480px",
          pointerEvents: "none",
        }}
      >
        <svg
          className="hero-illustration"
          viewBox="0 0 420 240"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "100%", height: "auto" }}
        >
          <defs>
            <linearGradient id="gc1" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#00bf63" />
            </linearGradient>
          </defs>
          <rect
            x="8"
            y="20"
            width="404"
            height="200"
            rx="20"
            fill="url(#gc1)"
            opacity="0.95"
          />
          <g fill="rgba(255,255,255,0.18)">
            <circle cx="80" cy="70" r="10" />
            <circle cx="140" cy="50" r="6" />
            <circle cx="320" cy="90" r="12" />
          </g>
          <g fill="#070914" opacity="0.9">
            <rect x="150" y="86" width="120" height="68" rx="8" />
          </g>
        </svg>
      </div>
    );
  }

  // technical (default)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 60%",
        maxWidth: "none",
        pointerEvents: "none",
      }}
    >
      <svg
        className="hero-illustration"
        viewBox="75 45 490 350"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: "100%", height: "auto", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }}
      >
        <style>
          {`
            @keyframes wavePulse {
              0%, 100% { transform: scaleX(1); opacity: 0.6; }
              50% { transform: scaleX(1.15); opacity: 1; }
            }
          `}
        </style>
        <g transform="translate(320 220)">
          {/* Radial connector lines (dashed) and dots with Wave Animation */}
          <g stroke="#37f2eb" strokeWidth="2.5" strokeDasharray="6 8" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <g style={{ 
                  animation: `wavePulse 2.4s ease-in-out infinite`, 
                  animationDelay: `${i * 0.3}s`, 
                  transformOrigin: "85px 0" 
                }}>
                  <line x1="85" y1="0" x2="160" y2="0" />
                  <circle cx="160" cy="0" r="4.5" fill="#37f2eb" stroke="none" />
                </g>
              </g>
            ))}
          </g>

          {/* Minimalist 2D Gear Silhouette - Spinning */}
          <g className="gear-spin">
            <path
              fillRule="evenodd"
              d="M 72.1,-17.3 L 100.7,-16.0 L 100.7,16.0 L 72.1,17.3
                 A 74,74 0 0,1 63.2,38.7 L 82.5,59.9 L 59.9,82.5 L 38.7,63.2
                 A 74,74 0 0,1 17.3,72.1 L 16.0,100.7 L -16.0,100.7 L -17.3,72.1
                 A 74,74 0 0,1 -38.7,63.2 L -59.9,82.5 L -82.5,59.9 L -63.2,38.7
                 A 74,74 0 0,1 -72.1,17.3 L -100.7,16.0 L -100.7,-16.0 L -72.1,-17.3
                 A 74,74 0 0,1 -63.2,-38.7 L -82.5,-59.9 L -59.9,-82.5 L -38.7,-63.2
                 A 74,74 0 0,1 -17.3,-72.1 L -16.0,-100.7 L 16.0,-100.7 L 17.3,-72.1
                 A 74,74 0 0,1 38.7,-63.2 L 59.9,-82.5 L 82.5,-59.9 L 63.2,-38.7
                 A 74,74 0 0,1 72.1,-17.3 Z
                 M 0,-48 A 48,48 0 1,0 0,48 A 48,48 0 1,0 0,-48 Z"
              fill="#37f2eb"
            />
          </g>
          
          {/* Text 'PR' - Removed from gear-spin to stay static */}
          <text 
            x="0" 
            y="11" 
            textAnchor="middle" 
            fontSize="34" 
            fontWeight="900" 
            fill="#37f2eb" 
            fontFamily="Inter, sans-serif"
            letterSpacing="2"
          >
            PR
          </text>
        </g>
      </svg>
    </div>
  );
};

const ClientHome = ({ setPage, addToCart, products = [] }) => {
  const { isMobile } = useWindowSize();

  return (
    <div id="client-home-container" style={{ overflowY: "auto", flex: 1 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #8c52ff 0%, #00bf63 50%, #8c52ff 100%)",
          backgroundSize: "400% 400%",
          backgroundRepeat: "no-repeat",
          animation: "gradientMove 12s ease infinite",
          position: "relative",
          overflow: "hidden",
          transform: "translateZ(0)",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(140,82,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(140,82,255,0.05) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        {/* Centered content wrapper */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: isMobile ? "36px 20px" : "56px 48px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 32 : 40,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ flex: "1 1 50%", maxWidth: isMobile ? "100%" : 580, textAlign: isMobile ? "center" : "left" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background:
                  "linear-gradient(90deg, rgba(124,58,237,0.22), rgba(0,191,99,0.18))",
                border: `1px solid rgba(255,255,255,0.06)`,
                borderRadius: 20,
                padding: "6px 16px",
                marginBottom: 20,
                boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
              }}
            >
              <Zap size={13} style={{ color: "#fff" }} />
              <span
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 700,
                  textShadow: "0 1px 2px rgba(0,0,0,0.45)",
                }}
              >
                ESP32 em promoção · até 30% off
              </span>
            </div>
            <h1
              style={{
                fontSize: isMobile ? 28 : 40,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 18,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
              }}
            >
              Tecnologia para
              <br />
              <span style={{ color: "#ffffff" }}>quem cria o futuro</span>
            </h1>
            <p
              style={{
                color: "#ffffff",
                fontSize: isMobile ? 14 : 16,
                marginBottom: 28,
                lineHeight: 1.6,
                opacity: 0.92,
              }}
            >
              Arduino, ESP32, sensores, IoT e tudo que você precisa para projetos de
              automação e robótica.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: isMobile ? "center" : "flex-start" }}>
              <button
                className="btn-p btn-shine"
                style={{ padding: isMobile ? "10px 20px" : "12px 24px", fontSize: isMobile ? 14 : 15 }}
                onClick={() => setPage("catalogo")}
              >
                Ver Catálogo <ArrowRight size={16} />
              </button>
              <button
                className="btn-g"
                style={{
                  padding: isMobile ? "10px 20px" : "12px 22px",
                  fontSize: isMobile ? 14 : 15,
                  color: "#ffffff",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                onClick={() => document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Sobre
              </button>
            </div>
          </div>
          {!isMobile && renderHeroIllustration()}
        </div>
      </div>

      {/* Chips */}
      <div
        style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            gap: 10,
            padding: isMobile ? "14px 16px" : "14px 36px",
            overflowX: "auto",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {[
            { i: Zap, l: "Envio Rápido" },
            { i: Shield, l: "Garantia Oficial" },
            { i: Star, l: "Top Vendidos" },
            { i: TrendingUp, l: "Melhores Preços" },
            { i: Cpu, l: "Componentes Originais" },
          ].map(({ i: Icon, l }) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
                fontSize: 12,
                color: T.muted2,
                padding: "6px 14px",
                background: T.cyanBg,
                border: `1px solid ${T.border}`,
                borderRadius: 20,
              }}
            >
              <Icon size={13} style={{ color: T.cyan }} />
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: isMobile ? "24px 16px" : "36px 36px",
          }}
        >
          <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, marginBottom: 4, textAlign: isMobile ? "center" : "left" }}>
            Produtos em Destaque
          </h2>
          <p style={{ color: T.muted2, fontSize: 13, marginBottom: 24, textAlign: isMobile ? "center" : "left" }}>
            Os mais procurados da semana
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(150px, 1fr))" : "repeat(auto-fill,minmax(230px,1fr))",
              gap: isMobile ? 12 : 18,
            }}
          >
            {products.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }}>
                Carregando produtos em destaque...
              </div>
            ) : (
              products.slice(0, 10).map((p) => (
                <div
                  key={p.id}
                  className="card card-h"
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: isMobile ? 130 : 180,
                      overflow: "hidden",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 12,
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    ) : (
                      <Package size={isMobile ? 36 : 48} style={{ color: `${T.cyan}33` }} />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.35) 100%)",
                      }}
                    />
                    <span
                      className={`badge ${p.stock > 0 ? "b-ok" : "b-err"}`}
                      style={{
                        position: "absolute",
                        top: isMobile ? 8 : 12,
                        right: isMobile ? 8 : 12,
                        zIndex: 2,
                        fontSize: isMobile ? "9px" : "11px",
                        padding: isMobile ? "3px 8px" : "4px 10px",
                        fontWeight: "800",
                        letterSpacing: "0.4px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      {p.stock > 0 ? "Em estoque" : "Esgotado"}
                    </span>
                  </div>
                  <div style={{ padding: isMobile ? 10 : 16 }}>
                    <span
                      style={{
                        fontSize: 9,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {p.category}
                    </span>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: isMobile ? 12.5 : 14,
                        marginTop: 4,
                        marginBottom: 10,
                        lineHeight: 1.3,
                        height: isMobile ? "34px" : "auto",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: isMobile ? 2 : "unset",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {p.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: isMobile ? 14.5 : 18,
                          fontWeight: 700,
                          color: T.cyan,
                        }}
                      >
                        {fmt(p.price)}
                      </span>
                      <button
                        className="btn-p"
                        style={{ padding: isMobile ? "4px 8px" : "6px 12px", fontSize: isMobile ? 11 : 12 }}
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                      >
                        <Plus size={isMobile ? 11 : 13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Seção Sobre o Projeto */}
      <div
        id="sobre-projeto"
        style={{
          background: T.surface,
          borderTop: `1px solid ${T.border}`,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: isMobile ? "40px 16px 36px 16px" : "64px 36px 48px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 650, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? 24 : 28,
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: 12,
                background: "linear-gradient(90deg, #8c52ff, #00bf63)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sobre o Projeto
            </h2>
            <p style={{ color: T.muted2, fontSize: 13.5, lineHeight: 1.6 }}>
              O <strong>ProtoTech</strong> é uma plataforma moderna desenvolvida para simplificar a gestão de estoque, controle de vendas e a aquisição de componentes eletrônicos. Unimos a robustez de um sistema de controle administrativo à facilidade de um e-commerce interativo para entusiastas e engenheiros.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
              marginTop: isMobile ? 8 : 20,
            }}
          >
            <div
              className="card card-neon"
              style={{
                padding: "28px 24px",
                background: T.surface2,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                "--neon-color": "var(--color-cyan)",
                "--neon-shadow": "rgba(140, 82, 255, 0.25)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="logo-animated"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(140, 82, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  "--glow-color": "rgba(140, 82, 255, 0.4)",
                }}
              >
                <Cpu size={24} style={{ color: T.cyan }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--color-text)" }}>
                E-commerce de Robótica
              </h3>
              <p style={{ color: "var(--color-muted2)", fontSize: 13.5, lineHeight: 1.55 }}>
                Acesso facilitado a microcontroladores, sensores e módulos eletrônicos de última geração com interface fluida e intuitiva.
              </p>
            </div>

            <div
              className="card card-neon"
              style={{
                padding: "28px 24px",
                background: T.surface2,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                "--neon-color": "var(--color-success)",
                "--neon-shadow": "rgba(0, 191, 99, 0.25)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="logo-animated"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(0, 191, 99, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  "--glow-color": "rgba(0, 191, 99, 0.4)",
                }}
              >
                <Warehouse size={24} style={{ color: T.success }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--color-text)" }}>
                Controle Integrado
              </h3>
              <p style={{ color: "var(--color-muted2)", fontSize: 13.5, lineHeight: 1.55 }}>
                Sincronização em tempo real entre o estoque físico e a disponibilidade da vitrine, prevenindo a venda de itens esgotados.
              </p>
            </div>

            <div
              className="card card-neon"
              style={{
                padding: "28px 24px",
                background: T.surface2,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                "--neon-color": "var(--color-purple)",
                "--neon-shadow": "rgba(124, 58, 237, 0.25)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="logo-animated"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(124, 58, 237, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  "--glow-color": "rgba(124, 58, 237, 0.4)",
                }}
              >
                <Shield size={24} style={{ color: T.purple }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--color-text)" }}>
                Tecnologias Utilizadas
              </h3>
              <p style={{ color: "var(--color-muted2)", fontSize: 13.5, lineHeight: 1.55 }}>
                Construído utilizando React para a interface responsiva e Express com banco de dados relacional MySQL no backend.
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid rgba(255,255,255,0.03)`,
              paddingTop: 32,
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 12, color: T.muted }}>
              &copy; {new Date().getFullYear()} ProtoTech. Todos os direitos reservados.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              <span style={{ fontSize: 12, color: T.muted2, cursor: "pointer" }} onClick={() => setPage("catalogo")}>Vitrine</span>
              <span style={{ fontSize: 12, color: T.muted2, cursor: "pointer" }} onClick={() => setPage("carrinho")}>Carrinho</span>
              <span style={{ fontSize: 12, color: T.muted2, cursor: "pointer" }} onClick={() => document.getElementById("client-home-container")?.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao topo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CATÁLOGO ─────────────────────────────────────────────────────
const Catalogo = ({ addToCart, products = [] }) => {
  const { isMobile } = useWindowSize();
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Page Centering Wrapper for Ultra Large Screens */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar produto..."
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(auto-fill,minmax(150px,1fr))" : "repeat(auto-fill,minmax(210px,1fr))",
            gap: isMobile ? 12 : 16,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }}>
              Nenhum produto encontrado.
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="card card-h"
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "relative",
                    height: isMobile ? 120 : 160,
                    overflow: "hidden",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Package size={isMobile ? 32 : 42} style={{ color: `${T.cyan}33` }} />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.34))",
                    }}
                  />
                </div>
                <div style={{ padding: isMobile ? 10 : 14 }}>
                  <span
                    style={{
                      fontSize: 9,
                      color: T.muted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.category}
                  </span>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: isMobile ? 12 : 13,
                      marginTop: 3,
                      marginBottom: 6,
                      lineHeight: 1.35,
                      height: isMobile ? "32px" : "auto",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : "unset",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: isMobile ? 13.5 : 16,
                        fontWeight: 700,
                        color: T.cyan,
                      }}
                    >
                      {fmt(p.price)}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color:
                          p.stock > 10
                            ? T.success
                            : p.stock > 0
                              ? T.warning
                              : T.danger,
                      }}
                    >
                      {p.stock > 0 ? `${p.stock} un.` : "Esgotado"}
                    </span>
                  </div>
                  <button
                    className="btn-p"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "6px",
                      fontSize: isMobile ? 11.5 : 13,
                      opacity: p.stock === 0 ? 0.45 : 1,
                    }}
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                  >
                    <ShoppingCart size={isMobile ? 12 : 13} /> {isMobile ? "Adicionar" : "Adicionar ao carrinho"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CARRINHO ─────────────────────────────────────────────────────
const Carrinho = ({ cart, setCart, setPage }) => {
  const { isMobile } = useWindowSize();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const upd = (id, qty) => {
    if (qty < 1) return setCart((c) => c.filter((i) => i.id !== id));
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  return (
    <div style={{ padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Page Centering Wrapper for Ultra Large Screens */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h2
          style={{
            fontSize: isMobile ? 20 : 22,
            fontWeight: 700,
            marginBottom: isMobile ? 16 : 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ShoppingCart size={isMobile ? 18 : 20} style={{ color: T.cyan }} /> Carrinho
          {cart.length > 0 && (
            <span style={{ fontSize: 13, color: T.muted2, fontWeight: 400 }}>
              ({cart.reduce((s, i) => s + i.qty, 0)} itens)
            </span>
          )}
        </h2>

        {cart.length === 0 ? (
          <div
            className="card"
            style={{ padding: isMobile ? "40px 20px" : "56px 32px", textAlign: "center" }}
          >
            <ShoppingBag
              size={isMobile ? 44 : 52}
              style={{ color: T.muted, margin: "0 auto 16px", display: "block" }}
            />
            <p style={{ color: T.muted, marginBottom: 18, fontSize: 14 }}>
              Seu carrinho está vazio
            </p>
            <button
              className="btn-p"
              style={{ margin: "0 auto" }}
              onClick={() => setPage("catalogo")}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div className="card" style={{ overflow: "hidden" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "center",
                    gap: isMobile ? 12 : 16,
                    padding: 16,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: isMobile ? 44 : 54,
                        height: isMobile ? 44 : 54,
                        background: T.surface2,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                      ) : (
                        <Package size={isMobile ? 20 : 24} style={{ color: `${T.cyan}55` }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: isMobile ? 13 : 14, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: T.muted2 }}>
                        {item.category}
                      </div>
                    </div>
                    {isMobile && (
                      <button
                        onClick={() =>
                          setCart((c) => c.filter((i) => i.id !== item.id))
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: T.muted,
                          display: "flex",
                          flexShrink: 0,
                          padding: 4,
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isMobile ? "space-between" : "flex-end",
                      gap: isMobile ? 0 : 24,
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={() => upd(item.id, item.qty - 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.surface2,
                          color: T.text,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: 28,
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 14,
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => upd(item.id, item.qty + 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.surface2,
                          color: T.text,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          color: T.cyan,
                          fontWeight: 700,
                          minWidth: isMobile ? "auto" : 90,
                          fontSize: isMobile ? 14 : 16,
                          textAlign: "right",
                        }}
                      >
                        {fmt(item.price * item.qty)}
                      </span>
                      {!isMobile && (
                        <button
                          onClick={() =>
                            setCart((c) => c.filter((i) => i.id !== item.id))
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: T.muted,
                            display: "flex",
                            flexShrink: 0,
                          }}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
                Resumo do Pedido
              </div>
              {[
                ["Subtotal", fmt(total)],
                ["Frete", "Grátis"],
                ["Desconto", "−"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: T.muted2 }}>{l}</span>
                  <span style={{ color: l === "Frete" ? T.success : T.text }}>
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: `1px solid ${T.border}`,
                  paddingTop: 14,
                  marginTop: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>Total</span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontSize: 20,
                  }}
                >
                  {fmt(total)}
                </span>
              </div>
              <button
                className="btn-p"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "12px",
                  marginTop: 18,
                }}
                onClick={() => setPage("checkout")}
              >
                Finalizar Pedido <ArrowRight size={15} />
              </button>
              <button
                className="btn-g"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "9px",
                  marginTop: 8,
                }}
                onClick={() => setPage("catalogo")}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── PERFIL ───────────────────────────────────────────────────────
const Perfil = () => {
  const { isMobile } = useWindowSize();
  const c = CLIENTS[0];
  return (
    <div
      style={{
        padding: isMobile ? "16px 12px" : "28px 32px",
        overflowY: "auto",
        flex: 1,
        maxWidth: 680,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          padding: isMobile ? 18 : 28,
          marginBottom: 18,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 10 : 16,
            marginBottom: 24,
          }}
        >
          <Avatar name={c.name} size={isMobile ? 48 : 60} color={T.cyan} />
          <div>
            <h2 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "var(--color-text)" }}>{c.name}</h2>
            <p style={{ color: "var(--color-muted)", fontSize: 12, marginTop: 2 }}>
              Cliente desde {c.since}
            </p>
          </div>
          <button className="btn-g" style={{ marginLeft: "auto", padding: isMobile ? "6px 10px" : "8px 12px", fontSize: isMobile ? 12 : 13 }}>
            <Edit2 size={13} /> {!isMobile && "Editar"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {[
            ["E-mail", c.email],
            ["Telefone", c.phone],
            ["Cidade", c.city],
            ["Membro desde", c.since],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: "var(--color-surface2)",
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-muted)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {l}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{v}</div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}
        >
          <div
            style={{
              background: "var(--color-cyanBg)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "var(--color-cyan)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {c.purchases}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 3 }}>
              Pedidos Realizados
            </div>
          </div>
          <div
            style={{
              background: "var(--color-cyanBg)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-cyan)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {fmt(c.total)}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 3 }}>
              Total Investido
            </div>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          padding: isMobile ? 18 : 22,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "var(--color-text)" }}>
          Pedidos Recentes
        </div>
        {RECENT_SALES.slice(0, 4).map((s) => (
          <div
            key={s.id}
            className="tr"
            style={{
              padding: "12px 0",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "var(--color-surface2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={16} style={{ color: "var(--color-cyan)" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--color-text)",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {s.id}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                {s.items} itens · {s.date}
              </div>
            </div>
            <Badge status={s.status} />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                color: "var(--color-cyan)",
                minWidth: isMobile ? "auto" : 80,
                textAlign: "right",
                fontSize: isMobile ? 13 : 14,
              }}
            >
              {fmt(s.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CLIENT AREA ──────────────────────────────────────────────────
const ClientArea = ({ onLogout, theme, toggleTheme, products = [], loadProducts }) => {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (p) =>
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: theme === "light"
          ? "linear-gradient(135deg, #cdffd8 0%, #94b9ff 100%)"
          : "var(--color-bg)"
      }}
    >
      <ClientNav
        page={page}
        setPage={setPage}
        cart={cart}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {page === "home" && <ClientHome setPage={setPage} addToCart={addToCart} products={products} />}
        {page === "catalogo" && <Catalogo addToCart={addToCart} products={products} />}
        {page === "carrinho" && <Carrinho cart={cart} setCart={setCart} setPage={setPage} />}
        {page === "perfil" && <Perfil />}
        {page === "checkout" && <Checkout cart={cart} setCart={setCart} setPage={setPage} />}
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("pt-theme") || "dark");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const loadProducts = () => {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => {
        if (!res.ok) throw new Error("Status HTTP inválido");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((p) => ({
          ...p,
          image: getProductImage(p.name),
        }));
        setProducts(mapped);
      })
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  };

  const loadSales = () => {
    fetch("http://localhost:3000/api/vendas")
      .then((res) => {
        if (!res.ok) throw new Error("Status HTTP inválido");
        return res.json();
      })
      .then((data) => setSales(data))
      .catch((err) => console.error("Erro ao carregar vendas:", err));
  };

  const loadTopProducts = () => {
    fetch("http://localhost:3000/api/dashboard/top-produtos")
      .then((res) => {
        if (!res.ok) throw new Error("Status HTTP inválido");
        return res.json();
      })
      .then((data) => setTopProducts(data))
      .catch((err) => console.error("Erro ao carregar top produtos:", err));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pt-theme", theme);
  }, [theme]);

  // Carrega produtos, vendas e top produtos inicialmente e ao focar/retornar à aba do navegador
  useEffect(() => {
    const loadAll = () => {
      loadProducts();
      loadSales();
      loadTopProducts();
    };

    loadAll();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadAll();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <ToastProvider>
      <div className="pt-root">
        {!session && <Login onLogin={setSession} />}
        {session === "admin" && (
          <AdminArea
            onLogout={() => setSession(null)}
            theme={theme}
            toggleTheme={toggleTheme}
            products={products}
            loadProducts={loadProducts}
            sales={sales}
            loadSales={loadSales}
            topProducts={topProducts}
            loadTopProducts={loadTopProducts}
          />
        )}
        {session === "client" && (
          <ClientArea
            onLogout={() => setSession(null)}
            theme={theme}
            toggleTheme={toggleTheme}
            products={products}
            loadProducts={loadProducts}
          />
        )}
      </div>
    </ToastProvider>
  );
}
