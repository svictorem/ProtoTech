import { useState } from "react";
import arduinoUnoImage from "./assets/Arduino UNO R3.png";
import esp32Image from "./assets/ESP32 DevKit V1.png";
import sensorHcsr04Image from "./assets/Sensor Ultrassônico HC-SR04.png";
import moduloReleImage from "./assets/Módulo Relé 4 Canais.png";
import raspberryPiImage from "./assets/Raspberry Pi 4 Model B 4GB.png";
import servoSg90Image from "./assets/Servo Motor SG90.png";
import sensorDht22Image from "./assets/Sensor DHT22 TempUmidade.png";
import oledImage from "./assets/Display OLED 0.96 I2C.png";
import protoboardImage from "./assets/Protoboard 830 Pontos.png";
import jumperKitImage from "./assets/Kit Jumpers Macho-Fêmea 40pcs.png";
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
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    image: arduinoUnoImage,
    name: "Arduino UNO R3",
    category: "Microcontroladores",
    price: 89.9,
    cost: 45.0,
    stock: 32,
    minStock: 10,
    supplier: "TechParts BR",
    sku: "ARD-UNO-R3",
  },
  {
    id: 2,
    image: esp32Image,
    name: "ESP32 DevKit V1",
    category: "IoT/WiFi",
    price: 49.9,
    cost: 22.0,
    stock: 5,
    minStock: 8,
    supplier: "MicroElec",
    sku: "ESP-32-DK1",
  },
  {
    id: 3,
    image: sensorHcsr04Image,
    name: "Sensor Ultrassônico HC-SR04",
    category: "Sensores",
    price: 12.9,
    cost: 5.5,
    stock: 78,
    minStock: 20,
    supplier: "SensorTech",
    sku: "SEN-ULT-HC",
  },
  {
    id: 4,
    image: moduloReleImage,
    name: "Módulo Relé 4 Canais",
    category: "Automação",
    price: 24.9,
    cost: 11.0,
    stock: 3,
    minStock: 10,
    supplier: "AutoParts",
    sku: "MOD-REL-4C",
  },
  {
    id: 5,
    image: raspberryPiImage,
    name: "Raspberry Pi 4 Model B 4GB",
    category: "SBC",
    price: 459.9,
    cost: 320.0,
    stock: 12,
    minStock: 5,
    supplier: "RPi Brasil",
    sku: "RPI-4-4GB",
  },
  {
    id: 6,
    image: servoSg90Image,
    name: "Servo Motor SG90",
    category: "Robótica",
    price: 18.9,
    cost: 8.0,
    stock: 45,
    minStock: 15,
    supplier: "RoboTech",
    sku: "SRV-SG90",
  },
  {
    id: 7,
    image: sensorDht22Image,
    name: "Sensor DHT22 Temp/Umidade",
    category: "Sensores",
    price: 19.9,
    cost: 8.5,
    stock: 0,
    minStock: 10,
    supplier: "SensorTech",
    sku: "SEN-DHT22",
  },
  {
    id: 8,
    image: oledImage,
    name: 'Display OLED 0.96" I2C',
    category: "Displays",
    price: 29.9,
    cost: 13.0,
    stock: 22,
    minStock: 8,
    supplier: "DisplayBR",
    sku: "DIS-OL-096",
  },
  {
    id: 9,
    image: protoboardImage,
    name: "Protoboard 830 Pontos",
    category: "Ferramentas",
    price: 22.9,
    cost: 10.0,
    stock: 60,
    minStock: 20,
    supplier: "ElecTools",
    sku: "PRO-830P",
  },
  {
    id: 10,
    image: jumperKitImage,
    name: "Kit Jumpers Macho-Fêmea 40pcs",
    category: "Cabos",
    price: 14.9,
    cost: 5.0,
    stock: 120,
    minStock: 30,
    supplier: "CableParts",
    sku: "JMP-MF-40",
  },
];

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

const EMPLOYEES = [
  {
    id: 1,
    name: "Rafael Torres",
    role: "Vendedor",
    salary: 2200,
    level: "Operacional",
    email: "rafael@prototech.com",
    since: "Jun 2022",
  },
  {
    id: 2,
    name: "Juliana Reis",
    role: "Gerente de Estoque",
    salary: 3500,
    level: "Supervisor",
    email: "juliana@prototech.com",
    since: "Mar 2021",
  },
  {
    id: 3,
    name: "Marcos Lima",
    role: "Técnico Eletrônico",
    salary: 2800,
    level: "Operacional",
    email: "marcos@prototech.com",
    since: "Jan 2023",
  },
  {
    id: 4,
    name: "Admin Sistema",
    role: "Administrador",
    salary: 6000,
    level: "Admin",
    email: "admin@prototech.com",
    since: "Jan 2020",
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
  bg: "#07091466",
  surface: "#0c1526",
  surface2: "#111d33",
  surface3: "#162240",
  border: "rgba(140,82,255,0.1)",
  borderHover: "rgba(140,82,255,0.3)",
  cyan: "#8c52ff",
  cyanBg: "rgba(140,82,255,0.08)",
  text: "#dde8f5",
  muted: "#5a7090",
  muted2: "#8a9bb5",
  success: "#00bf63",
  warning: "#ffb800",
  danger: "#ff4757",
  purple: "#7c3aed",
};

const COLOR_RGB = {
  [T.cyan]: "140,82,255",
  [T.success]: "0,191,99",
  [T.warning]: "255,184,0",
  [T.danger]: "255,71,87",
  [T.purple]: "124,58,237",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#070914}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:#0c1526}
  ::-webkit-scrollbar-thumb{background:rgba(140,82,255,0.2);border-radius:2px}
  .pt-root{font-family:'Space Grotesk',system-ui,sans-serif;color:#dde8f5;background:#070914;min-height:100vh}
  .mono{font-family:'JetBrains Mono',monospace}
  input,select,textarea,button{font-family:inherit}
  
  .sb-item{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;cursor:pointer;transition:all .15s;color:#5a7090;font-size:14px;font-weight:500;border-left:2px solid transparent}
  .sb-item:hover{background:rgba(140,82,255,0.06);color:#dde8f5}
  .sb-item.active{background:rgba(140,82,255,0.1);color:#8c52ff;border-left-color:#8c52ff}
  
  .card{background:#0c1526;border:1px solid rgba(140,82,255,0.1);border-radius:12px}
  .card-h{transition:border-color .2s,transform .15s}
  .card-h:hover{border-color:rgba(140,82,255,0.3);transform:translateY(-2px)}
  
  .btn-p{background:#8c52ff;color:#070914;border:none;padding:8px 16px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:6px;transition:opacity .15s;white-space:nowrap}
  .btn-p:hover{opacity:.85}
  .btn-p:disabled{opacity:.4;cursor:not-allowed}
  .btn-g{background:rgba(140,82,255,0.08);color:#8c52ff;border:1px solid rgba(140,82,255,0.2);padding:8px 14px;border-radius:8px;font-weight:500;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:6px;transition:all .15s;white-space:nowrap}
  .btn-g:hover{background:rgba(140,82,255,0.15);border-color:rgba(140,82,255,0.4)}

  /* Contraste maior para botões sobre gradientes fortes */
  .btn-p{color:#ffffff;background:linear-gradient(90deg,#7c3aed,#00bf63);box-shadow:0 10px 30px rgba(0,0,0,0.35);border:none}
  .btn-p:hover{filter:brightness(1.03);transform:translateY(-1px)}
  .btn-g{background:rgba(255,255,255,0.06);color:#dde8f5;border:1px solid rgba(255,255,255,0.08)}
  .btn-g:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.12)}

  /* Ilustração do hero (SVG desenhado e animado) */
  .hero-illustration{display:block;max-width:56vw;width:520px;filter:drop-shadow(0 10px 38px rgba(0,0,0,0.35));opacity:0.98;pointer-events:none;transform-origin:center;animation:float 6s ease-in-out infinite}
  .hero-illustration:hover{filter:drop-shadow(0 16px 65px rgba(0,0,0,0.45));}
  @keyframes float{0%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}100%{transform:translateY(0) rotate(-1deg)}}
  .btn-d{background:rgba(255,71,87,0.1);color:#ff4757;border:1px solid rgba(255,71,87,0.2);padding:6px 10px;border-radius:6px;cursor:pointer;transition:all .15s;display:flex;align-items:center}
  .btn-d:hover{background:rgba(255,71,87,0.2)}
  
  .badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600}
  .b-ok{background:rgba(0,191,99,0.15);color:#00bf63}
  .b-warn{background:rgba(255,184,0,0.15);color:#ffb800}
  .b-err{background:rgba(255,71,87,0.15);color:#ff4757}
  .b-info{background:rgba(140,82,255,0.12);color:#8c52ff}
  .b-dim{background:rgba(90,112,144,0.2);color:#8a9bb5}
  
  .tr{border-bottom:1px solid rgba(140,82,255,0.06);transition:background .1s}
  .tr:hover{background:rgba(140,82,255,0.04)}
  
  .inp{background:rgba(255,255,255,0.04);border:1px solid rgba(140,82,255,0.15);border-radius:8px;padding:8px 12px;color:#dde8f5;font-size:14px;width:100%;transition:border-color .15s}
  .inp:focus{outline:none;border-color:#8c52ff}
  .inp::placeholder{color:#5a7090}
  
  .tab-btn{padding:10px 16px;background:none;border:none;cursor:pointer;font-size:14px;transition:all .15s;border-bottom:2px solid transparent;margin-bottom:-1px}
  
  @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .fi{animation:fi .25s ease}
  @keyframes pl{0%,100%{opacity:1}50%{opacity:.4}}
  .pl{animation:pl 2s infinite}
`;

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

const StatCard = ({ icon: Icon, label, value, sub, color = T.cyan }) => {
  const rgb = COLOR_RGB[color] || "0,200,255";
  return (
    <div className="card card-h fi" style={{ padding: "20px 22px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              color: T.muted,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              marginBottom: 8,
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1,
              color: T.text,
            }}
          >
            {value}
          </p>
          {sub && (
            <p style={{ fontSize: 12, color: T.muted2, marginTop: 6 }}>{sub}</p>
          )}
        </div>
        <div
          style={{
            background: `rgba(${rgb},0.1)`,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>
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
        background: "#070914",
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
        className="card fi"
        style={{ width: 400, padding: "40px 36px", position: "relative" }}
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
                background: T.cyanBg,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: 8,
              }}
            >
              <Cpu size={24} style={{ color: T.cyan }} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Proto<span style={{ color: T.cyan }}>Tech</span>
            </span>
          </div>
          <p style={{ color: T.muted, fontSize: 13 }}>
            Sistema de Gestão Empresarial
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: T.surface2,
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
                background: mode === m ? T.cyan : "transparent",
                color: mode === m ? "#070914" : T.muted,
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
                color: T.muted2,
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              E-mail
            </label>
            <input
              className="inp"
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
                color: T.muted2,
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              Senha
            </label>
            <input
              className="inp"
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
                color: T.muted,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Demo:{" "}
              <span
                style={{
                  color: T.cyan,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                admin@prototech.com
              </span>{" "}
              /{" "}
              <span
                style={{
                  color: T.cyan,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                admin123
              </span>
            </p>
          )}
          {err && (
            <p style={{ fontSize: 12, color: T.danger, textAlign: "center" }}>
              {err}
            </p>
          )}
          <button
            className="btn-p"
            onClick={go}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "11px",
              marginTop: 2,
            }}
          >
            {mode === "admin" ? <Shield size={14} /> : <User size={14} />}
            Entrar {mode === "admin" ? "como Admin" : "como Cliente"}
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontSize: 12, color: T.muted }}>Sem conta? </span>
          <span
            style={{
              fontSize: 12,
              color: T.cyan,
              cursor: "pointer",
              fontWeight: 500,
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
const ALERTS_COUNT = PRODUCTS.filter((p) => p.stock <= p.minStock).length;

const Sidebar = ({ page, setPage, onLogout, collapsed, toggle }) => {
  const NAV = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "produtos", icon: Package, label: "Produtos" },
    { id: "estoque", icon: Warehouse, label: "Estoque" },
    { id: "vendas", icon: ShoppingCart, label: "Vendas" },
    { id: "clientes", icon: Users, label: "Clientes" },
    { id: "funcs", icon: UserCog, label: "Funcionários" },
    { id: "alertas", icon: Bell, label: "Alertas", badge: ALERTS_COUNT },
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

const TopBar = ({ page }) => (
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
const Dashboard = () => {
  const revenue = SALES_MONTHLY.reduce((a, s) => a + s.vendas, 0);
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
          sub="↑ 12% vs mês anterior"
          color={T.success}
        />
        <StatCard
          icon={ShoppingCart}
          label="Pedidos no Mês"
          value="213"
          sub="38 concluídos hoje"
          color={T.cyan}
        />
        <StatCard
          icon={Package}
          label="Produtos Ativos"
          value={PRODUCTS.length}
          sub={`${PRODUCTS.filter((p) => p.stock > 0).length} com estoque`}
          color={T.cyan}
        />
        <StatCard
          icon={AlertTriangle}
          label="Alertas Críticos"
          value={ALERTS_COUNT}
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
            Jan – Jun 2025
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={SALES_MONTHLY}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8c52ff" stopOpacity={0.18} />
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
                strokeWidth={2}
                fill="url(#g1)"
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
            <BarChart data={TOP_PRODUCTS} layout="vertical">
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
            {RECENT_SALES.map((s) => (
              <tr key={s.id} className="tr">
                <TD
                  style={{
                    fontSize: 12,
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.muted2,
                  }}
                >
                  {s.id}
                </TD>
                <TD style={{ fontSize: 14, fontWeight: 500 }}>{s.client}</TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>
                  {s.items} itens
                </TD>
                <TD
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontWeight: 600,
                  }}
                >
                  {fmt(s.total)}
                </TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>{s.date}</TD>
                <TD>
                  <Badge status={s.status} />
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
const Produtos = () => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [list, setList] = useState(PRODUCTS);

  const filtered = list.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome ou categoria..."
        />
        <button
          className="btn-p"
          onClick={() => {
            setEdit(null);
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
            {filtered.map((p) => (
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
                        setModal(true);
                      }}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      className="btn-d"
                      onClick={() =>
                        setList((l) => l.filter((x) => x.id !== p.id))
                      }
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </TD>
              </tr>
            ))}
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
              { label: "Nome do Produto", col: "1/-1", key: "name" },
              { label: "SKU", col: "", key: "sku" },
              { label: "Categoria", col: "", key: "category" },
              { label: "Fornecedor", col: "1/-1", key: "supplier" },
              { label: "Preço de Custo (R$)", col: "", key: "cost" },
              { label: "Preço de Venda (R$)", col: "", key: "price" },
              { label: "Estoque Mínimo", col: "", key: "minStock" },
              { label: "Estoque Atual", col: "", key: "stock" },
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
                <input
                  className="inp"
                  defaultValue={edit ? edit[f.key] : ""}
                  placeholder={f.label}
                />
              </div>
            ))}
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
            <button className="btn-p" onClick={() => setModal(false)}>
              <CheckCircle size={14} /> Salvar Produto
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── ESTOQUE ──────────────────────────────────────────────────────
const Estoque = () => (
  <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
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
        <strong>{ALERTS_COUNT} produtos</strong> com estoque crítico ou zerado
        requerem atenção imediata
      </span>
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
          {PRODUCTS.map((p) => {
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
                  A-{(p.id % 5) + 1}/{p.id.toString().padStart(3, "0")}
                </TD>
                <TD>
                  <Badge status={st} />
                </TD>
                <TD>
                  <button
                    className="btn-g"
                    style={{ padding: "5px 12px", fontSize: 12 }}
                  >
                    Repor
                  </button>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── VENDAS ───────────────────────────────────────────────────────
const Vendas = () => {
  const [tab, setTab] = useState("lista");
  const [cartV, setCartV] = useState([]);
  const [client, setClient] = useState("");

  const addItem = (p) =>
    setCartV((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });

  const total = cartV.reduce((s, i) => s + i.price * i.qty, 0);
  const activeProducts = PRODUCTS.filter((p) => p.stock > 0);

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
              {RECENT_SALES.map((s) => (
                <tr key={s.id} className="tr">
                  <TD
                    style={{
                      fontSize: 12,
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.muted2,
                    }}
                  >
                    {s.id}
                  </TD>
                  <TD style={{ fontSize: 14, fontWeight: 500 }}>{s.client}</TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>{s.items}</TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(s.total)}
                  </TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>{s.date}</TD>
                  <TD>
                    <Badge status={s.status} />
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
              <select
                className="inp"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              >
                <option value="">— Selecione o cliente —</option>
                {CLIENTS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} – {c.city}
                  </option>
                ))}
              </select>
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
                  onClick={() => {
                    alert("✅ Venda registrada com sucesso!");
                    setCartV([]);
                    setTab("lista");
                  }}
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
  const [search, setSearch] = useState("");
  const filtered = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar cliente..."
        />
        <button className="btn-p">
          <Plus size={14} /> Novo Cliente
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((c) => (
          <div key={c.id} className="card card-h" style={{ padding: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <Avatar name={c.name} size={42} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: T.muted2 }}>
                  {c.city} · desde {c.since}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  background: T.surface2,
                  borderRadius: 8,
                  padding: "9px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Pedidos
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color: T.cyan,
                    fontSize: 18,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {c.purchases}
                </div>
              </div>
              <div
                style={{
                  background: T.surface2,
                  borderRadius: 8,
                  padding: "9px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    marginBottom: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Total
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color: T.cyan,
                    fontSize: 13,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {fmt(c.total)}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: T.muted2, marginBottom: 4 }}>
              {c.email}
            </div>
            <div style={{ fontSize: 12, color: T.muted2 }}>{c.phone}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                className="btn-g"
                style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
              >
                Ver Histórico
              </button>
              <button className="btn-g" style={{ padding: "7px 10px" }}>
                <Edit2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FUNCIONÁRIOS ─────────────────────────────────────────────────
const Funcionarios = () => (
  <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
    <div
      style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}
    >
      <button className="btn-p">
        <Plus size={14} /> Novo Funcionário
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
              "Funcionário",
              "Cargo",
              "Nível",
              "Salário",
              "E-mail",
              "Desde",
              "Ações",
            ].map((h) => (
              <TH key={h}>{h}</TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {EMPLOYEES.map((e) => (
            <tr key={e.id} className="tr">
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={e.name} size={34} />
                  <span style={{ fontWeight: 500, fontSize: 14 }}>
                    {e.name}
                  </span>
                </div>
              </TD>
              <TD style={{ fontSize: 13 }}>{e.role}</TD>
              <TD>
                <Badge status={e.level} />
              </TD>
              <TD
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: T.success,
                  fontWeight: 600,
                }}
              >
                {fmt(e.salary)}
              </TD>
              <TD style={{ fontSize: 12, color: T.muted2 }}>{e.email}</TD>
              <TD style={{ fontSize: 12, color: T.muted2 }}>{e.since}</TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-g" style={{ padding: "5px 9px" }}>
                    <Edit2 size={13} />
                  </button>
                  <button className="btn-d">
                    <Trash2 size={13} />
                  </button>
                </div>
              </TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── ALERTAS ──────────────────────────────────────────────────────
const Alertas = () => {
  const [resolved, setResolved] = useState([]);
  const alerts = PRODUCTS.filter((p) => p.stock <= p.minStock);

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
        {alerts.map((p) => {
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
                >
                  Solicitar Reposição
                </button>
                <button
                  className="btn-g"
                  style={{ padding: "8px 12px" }}
                  onClick={() =>
                    setResolved((r) =>
                      isDone ? r.filter((x) => x !== p.id) : [...r, p.id],
                    )
                  }
                >
                  {isDone ? <X size={13} /> : <CheckCircle size={13} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── ADMIN LAYOUT ─────────────────────────────────────────────────
const AdminArea = ({ onLogout }) => {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
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
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar page={page} />
        <Page key={page} />
      </div>
    </div>
  );
};

// ─── CLIENT NAV ───────────────────────────────────────────────────
const ClientNav = ({ page, setPage, cart, onLogout }) => (
  <nav
    style={{
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      padding: "0 28px",
      height: 58,
      display: "flex",
      alignItems: "center",
      gap: 24,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Cpu size={18} style={{ color: T.cyan }} />
      <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.03em" }}>
        Proto<span style={{ color: T.cyan }}>Tech</span>
      </span>
    </div>
    <div style={{ display: "flex", gap: 4 }}>
      {[
        { id: "home", l: "Início" },
        { id: "catalogo", l: "Catálogo" },
        { id: "perfil", l: "Meu Perfil" },
      ].map(({ id, l }) => (
        <button
          key={id}
          onClick={() => setPage(id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: page === id ? T.cyan : T.muted2,
            fontWeight: page === id ? 600 : 400,
            fontSize: 14,
            padding: "6px 12px",
            borderRadius: 8,
            transition: "all .15s",
          }}
        >
          {l}
        </button>
      ))}
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
        {cart.length > 0 && (
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
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
        )}
      </button>
      <button
        className="btn-g"
        onClick={onLogout}
        style={{ padding: "8px 12px" }}
        title="Sair"
      >
        <LogOut size={14} />
      </button>
    </div>
  </nav>
);

// ─── CLIENT HOME ──────────────────────────────────────────────────
const HERO_STYLE = "technical"; // 'technical' | 'minimal' | 'colorful'

const renderHeroIllustration = () => {
  if (HERO_STYLE === "minimal") {
    return (
      <div
        style={{
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <svg
          className="hero-illustration"
          viewBox="0 0 420 240"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <svg
          className="hero-illustration"
          viewBox="0 0 420 240"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
        position: "absolute",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 1,
        pointerEvents: "none",
      }}
    >
      <svg
        className="hero-illustration"
        viewBox="0 0 520 340"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="logoGlow" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#37f2eb" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#37f2eb" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gearFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#26c7cc" />
            <stop offset="100%" stopColor="#0b1b2c" />
          </linearGradient>
        </defs>
        <rect width="520" height="340" fill="transparent" />
        <circle cx="260" cy="170" r="110" fill="url(#logoGlow)" />
        <g transform="translate(260 170)">
          <circle
            cx="0"
            cy="0"
            r="96"
            fill="none"
            stroke="#2bf2e3"
            strokeWidth="4"
            opacity="0.16"
          />
          <g>
            <path
              d="M-90,-14 h18 l8,-24 h24 l8,24 h18 l12,12 v24 l-12,12 h-18 l-8,24 h-24 l-8,-24 h-18 l-12,-12 v-24z"
              fill="url(#gearFill)"
              stroke="#18a7b2"
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="58" fill="#070914" opacity="0.96" />
            <circle cx="0" cy="0" r="50" fill="#0f1724" />
            <rect
              x="-28"
              y="-28"
              width="56"
              height="56"
              rx="12"
              fill="#37f2eb"
              opacity="0.9"
            />
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fontSize="28"
              fontWeight="700"
              fill="#070914"
              fontFamily="Inter, sans-serif"
            >
              PR
            </text>
          </g>
          <g stroke="#37f2eb" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M-58,-40 H-84" />
            <path d="M58,-40 H84" />
            <path d="M-58,40 H-84" />
            <path d="M58,40 H84" />
            <path d="M-20,-56 V-84" />
            <path d="M20,-56 V-84" />
            <path d="M-20,56 V84" />
            <path d="M20,56 V84" />
          </g>
          <g fill="#37f2eb">
            <circle cx="-84" cy="-40" r="5" />
            <circle cx="84" cy="-40" r="5" />
            <circle cx="-84" cy="40" r="5" />
            <circle cx="84" cy="40" r="5" />
          </g>
        </g>
      </svg>
    </div>
  );
};
const ClientHome = ({ setPage, addToCart }) => (
  <div style={{ overflowY: "auto", flex: 1 }}>
    {/* Hero */}
    <div
      style={{
        padding: "56px 48px",
        background: "linear-gradient(135deg, #8c52ff 0%, #00bf63 60%)",
        position: "relative",
        overflow: "hidden",
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
      {renderHeroIllustration()}
      <div style={{ position: "relative", maxWidth: 520 }}>
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
              fontSize: 13,
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
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 18,
            letterSpacing: "-0.025em",
            color: T.text,
            textShadow: "0 2px 10px rgba(0,0,0,0.35)",
          }}
        >
          Tecnologia para
          <br />
          <span style={{ color: T.text }}>quem cria o futuro</span>
        </h1>
        <p
          style={{
            color: T.text,
            fontSize: 16,
            marginBottom: 28,
            lineHeight: 1.65,
            opacity: 0.92,
          }}
        >
          Arduino, ESP32, sensores, IoT e tudo que você precisa para projetos de
          automação e robótica.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="btn-p"
            style={{ padding: "12px 24px", fontSize: 15 }}
            onClick={() => setPage("catalogo")}
          >
            Ver Catálogo <ArrowRight size={16} />
          </button>
          <button
            className="btn-g"
            style={{ padding: "12px 22px", fontSize: 15 }}
          >
            Sobre a Loja
          </button>
        </div>
      </div>
    </div>

    {/* Chips */}
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "14px 36px",
        background: T.surface,
        borderBottom: `1px solid ${T.border}`,
        overflowX: "auto",
        flexWrap: "wrap",
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

    {/* Featured */}
    <div style={{ padding: "36px 36px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        Produtos em Destaque
      </h2>
      <p style={{ color: T.muted2, fontSize: 13, marginBottom: 24 }}>
        Os mais procurados da semana
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
          gap: 18,
        }}
      >
        {PRODUCTS.slice(0, 6).map((p) => (
          <div
            key={p.id}
            className="card card-h"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                position: "relative",
                height: 150,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${T.surface2}, ${T.surface3})`,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
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
                style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
              >
                {p.stock > 0 ? "Em estoque" : "Esgotado"}
              </span>
            </div>
            <div style={{ padding: 16 }}>
              <span
                style={{
                  fontSize: 10,
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
                  fontSize: 14,
                  marginTop: 4,
                  marginBottom: 10,
                  lineHeight: 1.3,
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
                    fontSize: 18,
                    fontWeight: 700,
                    color: T.cyan,
                  }}
                >
                  {fmt(p.price)}
                </span>
                <button
                  className="btn-p"
                  style={{ padding: "6px 12px", fontSize: 12 }}
                  onClick={() => addToCart(p)}
                  disabled={p.stock === 0}
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── CATÁLOGO ─────────────────────────────────────────────────────
const Catalogo = ({ addToCart }) => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");
  const cats = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
  const filtered = PRODUCTS.filter(
    (p) =>
      (cat === "Todos" || p.category === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
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
        style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}
      >
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${cat === c ? T.cyan : T.border}`,
              background: cat === c ? T.cyanBg : "transparent",
              color: cat === c ? T.cyan : T.muted2,
              fontSize: 12,
              fontWeight: cat === c ? 600 : 400,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
            className="card card-h"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                position: "relative",
                height: 130,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${T.surface2}, ${T.surface3})`,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.34))",
                }}
              />
            </div>
            <div style={{ padding: 14 }}>
              <span
                style={{
                  fontSize: 10,
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
                  fontSize: 13,
                  marginTop: 3,
                  marginBottom: 6,
                  lineHeight: 1.35,
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
                    fontSize: 16,
                    fontWeight: 700,
                    color: T.cyan,
                  }}
                >
                  {fmt(p.price)}
                </span>
                <span
                  style={{
                    fontSize: 11,
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
                  padding: "7px",
                  opacity: p.stock === 0 ? 0.45 : 1,
                }}
                onClick={() => addToCart(p)}
                disabled={p.stock === 0}
              >
                <ShoppingCart size={13} /> Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CARRINHO ─────────────────────────────────────────────────────
const Carrinho = ({ cart, setCart, setPage }) => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const upd = (id, qty) => {
    if (qty < 1) return setCart((c) => c.filter((i) => i.id !== id));
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <ShoppingCart size={20} style={{ color: T.cyan }} /> Carrinho
        {cart.length > 0 && (
          <span style={{ fontSize: 13, color: T.muted2, fontWeight: 400 }}>
            ({cart.reduce((s, i) => s + i.qty, 0)} itens)
          </span>
        )}
      </h2>

      {cart.length === 0 ? (
        <div
          className="card"
          style={{ padding: "56px 32px", textAlign: "center" }}
        >
          <ShoppingBag
            size={52}
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
            gridTemplateColumns: "1fr 300px",
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
                  alignItems: "center",
                  gap: 16,
                  padding: 16,
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    background: T.surface2,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Package size={24} style={{ color: `${T.cyan}55` }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: T.muted2 }}>
                    {item.category}
                  </div>
                </div>
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
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontWeight: 700,
                    minWidth: 90,
                    textAlign: "right",
                  }}
                >
                  {fmt(item.price * item.qty)}
                </span>
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
              onClick={() => {
                alert("🎉 Pedido realizado com sucesso!");
                setCart([]);
                setPage("home");
              }}
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
  );
};

// ─── PERFIL ───────────────────────────────────────────────────────
const Perfil = () => {
  const c = CLIENTS[0];
  return (
    <div
      style={{
        padding: "28px 32px",
        overflowY: "auto",
        flex: 1,
        maxWidth: 680,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div className="card" style={{ padding: 28, marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Avatar name={c.name} size={60} color={T.cyan} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{c.name}</h2>
            <p style={{ color: T.muted2, fontSize: 13, marginTop: 2 }}>
              Cliente desde {c.since}
            </p>
          </div>
          <button className="btn-g" style={{ marginLeft: "auto" }}>
            <Edit2 size={13} /> Editar
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
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
                background: T.surface2,
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: T.muted,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {l}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div
            style={{
              background: T.cyanBg,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: T.cyan,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {c.purchases}
            </div>
            <div style={{ fontSize: 12, color: T.muted2, marginTop: 3 }}>
              Pedidos Realizados
            </div>
          </div>
          <div
            style={{
              background: T.cyanBg,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: T.cyan,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {fmt(c.total)}
            </div>
            <div style={{ fontSize: 12, color: T.muted2, marginTop: 3 }}>
              Total Investido
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
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
                background: T.surface2,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={16} style={{ color: `${T.cyan}77` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "JetBrains Mono, monospace",
                  color: T.muted2,
                }}
              >
                {s.id}
              </div>
              <div style={{ fontSize: 12, color: T.muted2 }}>
                {s.items} itens · {s.date}
              </div>
            </div>
            <Badge status={s.status} />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                color: T.cyan,
                minWidth: 80,
                textAlign: "right",
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
const ClientArea = ({ onLogout }) => {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (p) =>
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });

  const PAGES = {
    home: () => <ClientHome setPage={setPage} addToCart={addToCart} />,
    catalogo: () => <Catalogo addToCart={addToCart} />,
    carrinho: () => (
      <Carrinho cart={cart} setCart={setCart} setPage={setPage} />
    ),
    perfil: () => <Perfil />,
  };
  const Page = PAGES[page] || PAGES.home;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <ClientNav
        page={page}
        setPage={setPage}
        cart={cart}
        onLogout={onLogout}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Page key={page} />
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="pt-root">
        {!session && <Login onLogin={setSession} />}
        {session === "admin" && <AdminArea onLogout={() => setSession(null)} />}
        {session === "client" && (
          <ClientArea onLogout={() => setSession(null)} />
        )}
      </div>
    </>
  );
}
