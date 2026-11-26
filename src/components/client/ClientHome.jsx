import { useState } from "react";
import { 
  Zap, Shield, Star, TrendingUp, Cpu, 
  ArrowRight, Package, Plus, X, Send, Camera, 
  ExternalLink, Code, Layers, Sliders, CheckCircle 
} from "lucide-react";
import { T, fmt, useWindowSize } from "../../utils/helpers";
import HeroBanner from "./HeroBanner";



const renderProjectIllustration = (type) => {
  if (type === "telemetry") {
    return (
      <svg className="portfolio-graphic" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#080a16" />
        <g stroke="rgba(140,82,255,0.12)" strokeWidth="1">
          {[15, 30, 45, 60, 75, 90, 105, 120, 135].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} />)}
          {[24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => <line key={x} x1={x} y1="0" x2={x} y2={150} />)}
        </g>
        <circle cx="120" cy="75" r="50" fill="none" stroke="rgba(140,82,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="120" cy="75" r="30" fill="none" stroke="rgba(140,82,255,0.4)" strokeWidth="1" />
        <line x1="120" y1="10" x2="120" y2="140" stroke="rgba(140,82,255,0.2)" strokeWidth="1" />
        <line x1="10" y1="75" x2="230" y2="75" stroke="rgba(140,82,255,0.2)" strokeWidth="1" />
        <line x1="120" y1="75" x2="160" y2="40" stroke="#8c52ff" strokeWidth="2.5" />
        <path d="M 20 110 L 60 70 L 100 95 L 140 45 L 180 80 L 220 30" fill="none" stroke="#00bf63" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="140" cy="45" r="4.5" fill="#37f2eb" />
        <circle cx="220" cy="30" r="4.5" fill="#ffb800" />
        <text x="15" y="25" fill="#37f2eb" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">RX: ALTITUDE ACTIVE</text>
        <text x="15" y="38" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="JetBrains Mono">SYS.VER: 1.0.4b</text>
      </svg>
    );
  }
  if (type === "biogrow") {
    return (
      <svg className="portfolio-graphic" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#04120b" />
        <g stroke="rgba(0,191,99,0.12)" strokeWidth="1">
          {[15, 30, 45, 60, 75, 90, 105, 120, 135].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} />)}
          {[24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => <line key={x} x1={x} y1="0" x2={x} y2={150} />)}
        </g>
        <path d="M 120 130 C 90 90 90 40 120 20 C 150 40 150 90 120 130 Z" fill="rgba(0,191,99,0.15)" stroke="#00bf63" strokeWidth="2" />
        <line x1="120" y1="130" x2="120" y2="25" stroke="#00bf63" strokeWidth="1.5" />
        <path d="M 120 100 Q 105 85 98 88" fill="none" stroke="#00bf63" strokeWidth="1.5" />
        <path d="M 120 80 Q 135 65 142 68" fill="none" stroke="#00bf63" strokeWidth="1.5" />
        <path d="M 120 60 Q 105 45 98 48" fill="none" stroke="#00bf63" strokeWidth="1.5" />
        <circle cx="98" cy="88" r="6" fill="#070914" stroke="#ffb800" strokeWidth="1.5" />
        <circle cx="142" cy="68" r="6" fill="#070914" stroke="#37f2eb" strokeWidth="1.5" />
        <circle cx="98" cy="48" r="6" fill="#070914" stroke="#8c52ff" strokeWidth="1.5" />
        <text x="15" y="25" fill="#00bf63" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">PH: 6.4 | TEMP: 24.5°C</text>
        <text x="15" y="38" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="JetBrains Mono">SOIL_HUM: 72%</text>
      </svg>
    );
  }
  if (type === "cybercore") {
    return (
      <svg className="portfolio-graphic" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#140e05" />
        <g stroke="rgba(255,184,0,0.1)" strokeWidth="1">
          {[15, 30, 45, 60, 75, 90, 105, 120, 135].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} />)}
          {[24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => <line key={x} x1={x} y1="0" x2={x} y2={150} />)}
        </g>
        <circle cx="60" cy="90" r="24" fill="none" stroke="#ffb800" strokeWidth="2" strokeDasharray="6 3" />
        <circle cx="60" cy="90" r="14" fill="none" stroke="#ffb800" strokeWidth="1" />
        <circle cx="60" cy="90" r="4" fill="#ffb800" />
        <line x1="60" y1="90" x2="130" y2="50" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="130" y1="50" x2="180" y2="85" stroke="#8c52ff" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="50" r="6" fill="#ffb800" />
        <circle cx="180" cy="85" r="4.5" fill="#37f2eb" />
        <path d="M 180 85 Q 200 110 220 80" fill="none" stroke="#00bf63" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="15" y="25" fill="#ffb800" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">AXIS_X: 122.45mm</text>
        <text x="15" y="38" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="JetBrains Mono">TORQUE: NOMINAL</text>
      </svg>
    );
  }
  if (type === "quantum") {
    return (
      <svg className="portfolio-graphic" viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="150" fill="#090614" />
        <g stroke="rgba(124,58,237,0.12)" strokeWidth="1">
          {[15, 30, 45, 60, 75, 90, 105, 120, 135].map(y => <line key={y} x1="0" y1={y} x2="240" y2={y} />)}
          {[24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => <line key={x} x1={x} y1="0" x2={x} y2={150} />)}
        </g>
        <rect x="85" y="45" width="70" height="60" rx="4" fill="#15133c" stroke="#7c3aed" strokeWidth="2" />
        <rect x="105" y="60" width="30" height="30" fill="none" stroke="#37f2eb" strokeWidth="1" />
        {[50, 60, 70, 80, 90].map(y => (
          <g key={y}>
            <line x1="73" y1={y} x2="85" y2={y} stroke="#8a9bb5" strokeWidth="2.5" />
            <line x1="155" y1={y} x2="167" y2={y} stroke="#8a9bb5" strokeWidth="2.5" />
          </g>
        ))}
        <path d="M 73 50 L 50 50 L 40 35 L 15 35" fill="none" stroke="#ffb800" strokeWidth="1.5" />
        <path d="M 73 80 L 45 80 L 35 105 L 15 105" fill="none" stroke="#ffb800" strokeWidth="1.5" />
        <path d="M 167 60 L 190 60 L 205 75 L 225 75" fill="none" stroke="#ffb800" strokeWidth="1.5" />
        <path d="M 167 90 L 195 90 L 205 110 L 225 110" fill="none" stroke="#ffb800" strokeWidth="1.5" />
        <rect x="30" y="32" width="6" height="6" fill="#8c52ff" />
        <rect x="200" y="72" width="6" height="6" fill="#00bf63" />
        <text x="15" y="25" fill="#7c3aed" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">LAYER: 4_LAYER_SMD</text>
        <text x="15" y="38" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="JetBrains Mono">IMP_MATCHED: 50 OHM</text>
      </svg>
    );
  }
};

const renderInstagramPostIllustration = (type) => {
  if (type === "firmware") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <path d="M10 25 L50 25 L65 50 L110 50 L125 75 L190 75" fill="none" stroke="#8c52ff" strokeWidth="2" />
        <circle cx="65" cy="50" r="4.5" fill="#00bf63" />
        <circle cx="125" cy="75" r="4.5" fill="#37f2eb" />
        <text x="15" y="98" fill="#37f2eb" fontSize="8" fontFamily="JetBrains Mono">RF_LINK: CONNECTED</text>
      </svg>
    );
  }
  if (type === "greenhouse") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <path d="M 100 90 Q 80 50 100 20 Q 120 50 100 90 Z" fill="none" stroke="#00bf63" strokeWidth="2" />
        <line x1="100" y1="90" x2="100" y2="25" stroke="#00bf63" strokeWidth="1" />
        <circle cx="100" cy="50" r="4" fill="#ffb800" />
        <text x="15" y="98" fill="#00bf63" fontSize="8" fontFamily="JetBrains Mono">HUM: 72% | PH: 6.4</text>
      </svg>
    );
  }
  if (type === "soldering") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <rect x="60" y="30" width="80" height="50" rx="3" fill="#111827" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="40" y1="40" x2="60" y2="40" stroke="#ffb800" strokeWidth="1.5" />
        <line x1="40" y1="70" x2="60" y2="70" stroke="#ffb800" strokeWidth="1.5" />
        <line x1="140" y1="50" x2="160" y2="50" stroke="#ffb800" strokeWidth="1.5" />
        <text x="15" y="98" fill="#7c3aed" fontSize="8" fontFamily="JetBrains Mono">PCB_ALIGN: 100% OK</text>
      </svg>
    );
  }
  if (type === "robot") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <circle cx="50" cy="65" r="14" fill="none" stroke="#ffb800" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="50" y1="65" x2="110" y2="35" stroke="#ffffff" strokeWidth="3" />
        <line x1="110" y1="35" x2="150" y2="60" stroke="#8c52ff" strokeWidth="2" />
        <circle cx="110" cy="35" r="5" fill="#ffb800" />
        <text x="15" y="98" fill="#ffb800" fontSize="8" fontFamily="JetBrains Mono">CYBER_CORE: INVERSE_K</text>
      </svg>
    );
  }
  if (type === "lab") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <rect x="20" y="25" width="60" height="40" fill="none" stroke="#37f2eb" strokeWidth="1" />
        <path d="M 20 45 L 80 45 M 50 25 L 50 65" stroke="rgba(55,242,235,0.3)" strokeWidth="1" />
        <path d="M 100 45 L 120 25 L 150 55 L 180 35" fill="none" stroke="#00bf63" strokeWidth="2" />
        <text x="15" y="98" fill="#37f2eb" fontSize="8" fontFamily="JetBrains Mono">SYS_CHECK: OK [312/312]</text>
      </svg>
    );
  }
  if (type === "box") {
    return (
      <svg width="100%" height="110" viewBox="0 0 200 110">
        <rect width="200" height="110" fill="rgba(255,255,255,0.03)" />
        <path d="M 100 25 L 135 42 L 100 59 L 65 42 Z" fill="rgba(140,82,255,0.2)" stroke="#8c52ff" strokeWidth="1" />
        <path d="M 65 42 L 65 72 L 100 89 L 100 59 Z" fill="rgba(140,82,255,0.1)" stroke="#8c52ff" strokeWidth="1" />
        <path d="M 135 42 L 135 72 L 100 89 L 100 59 Z" fill="rgba(140,82,255,0.15)" stroke="#8c52ff" strokeWidth="1" />
        <text x="15" y="98" fill="#8c52ff" fontSize="8" fontFamily="JetBrains Mono">PACKAGE: DELIVERED</text>
      </svg>
    );
  }
};

const ClientHome = ({
  setPage,
  addToCart,
  products = [],
  cart = [],
  isAuthenticated = false,
  onLogout,
  onGoLogin,
  theme,
  toggleTheme,
  clientProfile = null,
  clientLogin = null,
}) => {
  const { isMobile, isTablet } = useWindowSize();
  const [selectedProject, setSelectedProject] = useState(null);
  
  // State for the Quote Calculator
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    service: "prototipagem",
    complexity: "media",
    quantity: 1,
    urgency: "padrao",
    message: ""
  });

  // Services definitions for calculations
  const servicesData = {
    prototipagem: { label: "Prototipagem Rápida IoT", basePrice: 2500 },
    pcb: { label: "Design de PCBs de Alta Densidade", basePrice: 1800 },
    firmware: { label: "Integração de Sistemas Embarcados", basePrice: 3000 },
    consultoria: { label: "Consultoria em Automação Industrial", basePrice: 1200 }
  };

  const complexitiesData = {
    basica: { label: "Básica (1 camada, sensores padrão)", factor: 1.0 },
    media: { label: "Média (Multi-camada, IoT)", factor: 1.5 },
    alta: { label: "Alta (Aeroespacial, Industrial)", factor: 2.2 }
  };

  const urgenciesData = {
    padrao: { label: "Padrão (15-30 dias)", factor: 1.0 },
    urgente: { label: "Urgente (7-14 dias, +30%)", factor: 1.3 },
    critico: { label: "Crítico (3-6 dias, +60%)", factor: 1.6 }
  };

  const calculateTotal = () => {
    const s = servicesData[quoteForm.service];
    const c = complexitiesData[quoteForm.complexity];
    const u = urgenciesData[quoteForm.urgency];
    
    if (!s || !c || !u) return 0;
    
    const baseVal = s.basePrice * c.factor * u.factor;
    // Quantity scaling: base covers development + first prototype. Extra units cost materials & setup assembly.
    const extraVal = Math.max(0, quoteForm.quantity - 1) * 350 * c.factor;
    return baseVal + extraVal;
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email) {
      alert("Por favor, preencha seu Nome e E-mail.");
      return;
    }

    const serviceLabel = servicesData[quoteForm.service].label;
    const complexityLabel = complexitiesData[quoteForm.complexity].label;
    const urgencyLabel = urgenciesData[quoteForm.urgency].label;
    const totalEst = fmt(calculateTotal());

    const messageText = `Olá ProtoTech! Gostaria de solicitar um orçamento corporativo para o meu projeto.

*DADOS DO PROJETO:*
*Nome:* ${quoteForm.name}
*E-mail:* ${quoteForm.email}
*Serviço:* ${serviceLabel}
*Complexidade:* ${complexityLabel}
*Quantidade de Unidades:* ${quoteForm.quantity}
*Prazo Solicitado:* ${urgencyLabel}
*Estimativa de Investimento:* ${totalEst}

*MENSAGEM ADICIONAL:*
${quoteForm.message || "Sem comentários adicionais."}

Gostaria de validar a viabilidade técnica e agendar uma reunião técnica para alinhamento.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511999999999&text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  // Luxury Case Studies Portfolio
  const portfolioProjects = [
    {
      id: 1,
      title: "AeroTelemetry Pro",
      category: "Aeroespacial & IoT",
      client: "AeroEspacial Br",
      year: "2025",
      description: "Sistema de telemetria autônomo para foguetes experimentais suborbitais. Coleta de aceleração tridimensional, altitude barométrica e GPS. Transmissão em tempo real de longo alcance via rádio-frequência integrada com interface de controle no solo.",
      tech: "ESP32, LoRa RFM95W, MPU6050, GPS Neo-6M",
      illustration: "telemetry"
    },
    {
      id: 2,
      title: "BioGrow Autonomous",
      category: "Agrotech & Automação",
      client: "AgroSmart IoT",
      year: "2025",
      description: "Estufa automatizada com controle adaptativo de microclima e dosagem de nutrientes. Monitoramento contínuo de pH da água, condutividade elétrica, humidade do solo e temperatura atmosférica com acionamentos inteligentes baseados em regras.",
      tech: "Arduino Mega, DHT22, Sensores Industriais de pH, Válvulas Solenoide",
      illustration: "biogrow"
    },
    {
      id: 3,
      title: "CyberCore CNC Controller",
      category: "Robótica Industrial",
      client: "Indústrias Metalúrgicas Alfa",
      year: "2026",
      description: "Controladora central de cinemática para braços mecânicos industriais com suporte a micro-passos estáveis e interface de barramento RS485. Permite o posicionamento com repetibilidade inferior a 0.05mm.",
      tech: "STM32F4, Drivers TMC2209, Redes Industriais RS485",
      illustration: "cybercore"
    },
    {
      id: 4,
      title: "QuantumNode PCB",
      category: "Hardware Design",
      client: "Startup Quantum Systems",
      year: "2026",
      description: "Projeto de hardware com impedância casada para sensores vestíveis compactos com conectividade BLE. Placa projetada em 4 camadas com plano de terra sólido visando imunidade eletromagnética e altíssima eficiência energética.",
      tech: "Altium Designer, PCB 4 Camadas, Componentes SMD 0402",
      illustration: "quantum"
    }
  ];

  // Instagram simulated feed items
  const instagramFeed = [
    {
      id: 1,
      avatar: "PT",
      username: "prototech_eng",
      imageBg: "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)",
      caption: "Ajustando o firmware do AeroTelemetry Pro. Telemetria via LoRa bombando a 915MHz! 🚀🛸 #IoT #Robótica",
      likes: 142,
      comments: 18,
      illustration: "firmware"
    },
    {
      id: 2,
      avatar: "RF",
      username: "roberto_smart",
      imageBg: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
      caption: "Minha estufa hidropônica operando 100% autônoma graças aos componentes da @prototech_eng. 🌱🔋 #Agrotech",
      likes: 95,
      comments: 8,
      illustration: "greenhouse"
    },
    {
      id: 3,
      avatar: "PT",
      username: "prototech_eng",
      imageBg: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
      caption: "Soldagem manual de protótipo de PCB de 4 camadas concluída com sucesso. Zero curtos! 🔍🔬 #HardwareDesign",
      likes: 210,
      comments: 31,
      illustration: "soldering"
    },
    {
      id: 4,
      avatar: "LD",
      username: "lucas_robolab",
      imageBg: "linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)",
      caption: "Robô CyberCore respondendo à cinemática inversa com precisão sub-milimétrica. Valeu ProtoTech! 🤖🦾 #STEM",
      likes: 188,
      comments: 22,
      illustration: "robot"
    },
    {
      id: 5,
      avatar: "PT",
      username: "prototech_eng",
      imageBg: "linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)",
      caption: "Nova bancada de laboratório pronta para homologação de novos sensores e microcontroladores. 🛠️⚡ #Engineers",
      likes: 312,
      comments: 45,
      illustration: "lab"
    },
    {
      id: 6,
      avatar: "SA",
      username: "sara_agro",
      imageBg: "linear-gradient(135deg, #4c1d95 0%, #581c87 100%)",
      caption: "Recebi meu kit de sensores ProtoTech hoje. Envio super rápido e embalagem antiestática premium. Recomendo! 📦✨",
      likes: 77,
      comments: 5,
      illustration: "box"
    }
  ];

  return (
    <div id="client-home-container" style={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}>
      
      {/* Styles Injected for Ticker & Portfolio Zoom */}
      <style>
        {`
          :root {
            --hero-bg: linear-gradient(135deg, #070914 0%, #0c1526 50%, #070914 100%);
            --hero-glow-1: rgba(140, 82, 255, 0.08);
            --hero-glow-2: rgba(0, 191, 99, 0.05);
            --hero-blur: rgba(140, 82, 255, 0.15);
            --hero-title-color: #ffffff;
            --hero-text-color: #8a9bb5;
            --hero-border: rgba(140, 82, 255, 0.15);
            --secondary-cta-bg: rgba(255, 255, 255, 0.05);
            --secondary-cta-color: #ffffff;
          }
          
          [data-theme="light"] {
            --hero-bg: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%);
            --hero-glow-1: rgba(124, 58, 237, 0.04);
            --hero-glow-2: rgba(5, 150, 105, 0.02);
            --hero-blur: rgba(124, 58, 237, 0.06);
            --hero-title-color: #0f172a;
            --hero-text-color: #475569;
            --hero-border: rgba(124, 58, 237, 0.15);
            --secondary-cta-bg: rgba(124, 58, 237, 0.06);
            --secondary-cta-color: #7c3aed;
          }

          .instagram-ticker-container {
            overflow: hidden;
            width: 100%;
            padding: 28px 0;
            position: relative;
            background: var(--color-surface2);
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
          }
          .instagram-ticker-track {
            display: flex;
            width: max-content;
            animation: instagramTickerScroll 36s linear infinite;
          }
          .instagram-ticker-track:hover {
            animation-play-state: paused;
          }
          @keyframes instagramTickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .portfolio-card {
            cursor: pointer;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .portfolio-card:hover {
            border-color: var(--color-borderHover);
            transform: translateY(-4px);
          }
          .portfolio-img-container {
            overflow: hidden;
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 10;
            background: #080a16;
            border-bottom: 1px solid var(--color-border);
          }
          .portfolio-graphic {
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            width: 100%;
            height: 100%;
            display: block;
          }
          .portfolio-card:hover .portfolio-graphic {
            transform: scale(1.08);
          }

          /* Smooth global transitions for key interactive elements */
          .btn-p, .btn-g, .card, .inp, select, input, button {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
        `}
      </style>

      {/* 1. Hero Section */}
      <HeroBanner 
        setPage={setPage} 
        cart={cart} 
        isAuthenticated={isAuthenticated}
        onLogout={onLogout} 
        onGoLogin={onGoLogin}
        theme={theme} 
        toggleTheme={toggleTheme}
        clientProfile={clientProfile}
        clientLogin={clientLogin}
      />

      {/* Chips Banner */}
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
            gap: 12,
            padding: isMobile ? "14px 16px" : "16px 36px",
            overflowX: "auto",
            flexWrap: isMobile ? "nowrap" : "wrap",
            justifyContent: isMobile ? "flex-start" : "center",
            scrollbarWidth: "none"
          }}
        >
          {[
            { i: Zap, l: "Envio Rápido Nacional" },
            { i: Shield, l: "Garantia Integral de Originalidade" },
            { i: Star, l: "Engenharia Premium" },
            { i: TrendingUp, l: "Hardware Homologado" },
            { i: Cpu, l: "Componentes Certificados" },
          ].map(({ i: Icon, l }) => (
            <div
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                fontSize: 12,
                color: T.muted2,
                padding: "8px 16px",
                background: T.cyanBg,
                border: `1px solid ${T.border}`,
                borderRadius: 30,
              }}
            >
              <Icon size={13} style={{ color: T.cyan }} className="chip-core" />
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ width: "100%", background: T.bg, padding: isMobile ? "40px 16px" : "64px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, margin: 0, textAlign: "left", fontFamily: "'Space Grotesk', sans-serif" }}>
                Produtos em Destaque
              </h2>
              <p style={{ color: T.muted2, fontSize: 14, marginTop: 6, margin: 0, textAlign: "left" }}>
                Componentes selecionados para seus projetos de missão crítica
              </p>
            </div>
            <button 
              className="btn-g" 
              onClick={() => setPage("catalogo")}
              style={{ fontSize: 13, padding: "8px 16px" }}
            >
              Ver Tudo <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile 
                ? "repeat(auto-fill, minmax(140px, 1fr))" 
                : isTablet 
                  ? "repeat(auto-fill, minmax(200px, 1fr))" 
                  : "repeat(5, 1fr)",
              gap: isMobile ? 12 : 20,
            }}
          >
            {products.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }} className="shimmer-bg">
                Carregando produtos em destaque...
              </div>
            ) : (
              products.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="card card-h"
                  style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: isMobile ? 120 : 150,
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
                          "linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0.2) 100%)",
                      }}
                    />
                    <span
                      className={`badge ${p.stock > 0 ? "b-ok" : "b-err"}`}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        fontSize: "9px",
                        padding: "2px 6px",
                      }}
                    >
                      {p.stock > 0 ? "Em estoque" : "Esgotado"}
                    </span>
                  </div>
                  
                  <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontSize: 8,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        textAlign: "left",
                        display: "block"
                      }}
                    >
                      {p.category}
                    </span>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: isMobile ? 12 : 13.5,
                        marginTop: 4,
                        marginBottom: 12,
                        lineHeight: 1.3,
                        height: "36px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textAlign: "left",
                        color: "var(--color-text)"
                      }}
                    >
                      {p.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto"
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: isMobile ? 13 : 15,
                          fontWeight: 700,
                          color: T.cyan,
                        }}
                      >
                        {fmt(p.price)}
                      </span>
                      <button
                        className="btn-p"
                        style={{ padding: "4px 8px", fontSize: 11, borderRadius: 6 }}
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. Sobre (Nossa Filosofia) */}
      <div
        id="sobre-projeto"
        style={{
          background: T.surface,
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
          width: "100%",
          padding: isMobile ? "48px 20px" : "80px 48px"
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 24 : 64,
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <span
              style={{
                fontSize: 11,
                color: T.cyan,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12
              }}
            >
              Nossa Filosofia
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 36,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--color-text)",
                margin: 0,
                background: "linear-gradient(90deg, #8c52ff, #00bf63)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A precisão matemática encontra a arte da automação.
            </h2>
            <div 
              style={{ 
                marginTop: 24, 
                width: 60, 
                height: 3, 
                background: "linear-gradient(90deg, var(--color-cyan), var(--color-success))",
                margin: isMobile ? "24px auto 0 auto" : "24px 0 0 0"
              }} 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p 
              style={{ 
                color: T.muted2, 
                fontSize: 14.5, 
                lineHeight: 1.7, 
                textAlign: "justify",
                margin: 0 
              }}
            >
              Na ProtoTech, entendemos que o hardware do futuro é construído sobre precisão micrométrica, componentes confiáveis e design elegante. Nossa filosofia visa preencher o abismo entre ideias complexas e protótipos físicos robustos, fornecendo soluções integradas de placas, códigos e assessoria técnica.
            </p>
            <p 
              style={{ 
                color: T.muted2, 
                fontSize: 14.5, 
                lineHeight: 1.7, 
                textAlign: "justify",
                margin: 0 
              }}
            >
              Acreditamos em um ecossistema aberto e confiável. Todos os microcontroladores, sensores e módulos que oferecemos passam por testes rigorosos de integridade de sinal e tolerância elétrica, para que você possa focar no que realmente importa: inovar.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Serviços Exclusivos */}
      <div 
        style={{ 
          background: T.bg, 
          width: "100%", 
          padding: isMobile ? "48px 20px" : "80px 48px"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 11,
                color: T.cyan,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12
              }}
            >
              Engenharia sob Medida
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 32,
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0
              }}
            >
              Serviços Exclusivos de Engenharia
            </h2>
            <p style={{ color: T.muted2, fontSize: 14, marginTop: 8, margin: 0 }}>
              Soluções integradas de ponta a ponta desenvolvidas por nossos especialistas
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {[
              {
                icon: Cpu,
                color: "var(--color-cyan)",
                shadow: "rgba(140, 82, 255, 0.25)",
                title: "Prototipagem Rápida IoT",
                desc: "Estruturação rápida de circuitos para validação de conceito (PoC). Desenvolvimento de hardware conectado com menor time-to-market."
              },
              {
                icon: Layers,
                color: "var(--color-success)",
                shadow: "rgba(0, 191, 99, 0.25)",
                title: "Design de PCBs Customizadas",
                desc: "Desenho e roteamento de PCBs multicamadas estáveis (4 a 6 camadas), com foco em integridade de sinal e casamento de impedâncias."
              },
              {
                icon: Code,
                color: "var(--color-purple)",
                shadow: "rgba(124, 58, 237, 0.25)",
                title: "Sistemas Embarcados",
                desc: "Firmware otimizado de baixo consumo de energia para ESP32, STM32 e plataformas Arduino. Protocolos LoRa, WiFi e Bluetooth LE."
              },
              {
                icon: Sliders,
                color: "var(--color-warning)",
                shadow: "rgba(255, 184, 0, 0.25)",
                title: "Consultoria Industrial",
                desc: "Diagnósticos de viabilidade técnica, escolha de componentes ideais para escalabilidade e arquitetura de rede de sensores."
              }
            ].map((srv, index) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={index}
                  className="card card-neon"
                  style={{
                    padding: "32px 24px",
                    background: T.surface,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                    "--neon-color": srv.color,
                    "--neon-shadow": srv.shadow,
                  }}
                >
                  <div
                    className="logo-animated"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${srv.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      "--glow-color": srv.color
                    }}
                  >
                    <IconComp size={22} style={{ color: srv.color }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--color-text)", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: T.muted2, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Portfólio (Galeria) */}
      <div 
        style={{ 
          background: T.surface, 
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
          width: "100%", 
          padding: isMobile ? "48px 20px" : "80px 48px"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 11,
                color: T.cyan,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12
              }}
            >
              Nossos Cases
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 32,
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0
              }}
            >
              Portfólio de Alta Engenharia
            </h2>
            <p style={{ color: T.muted2, fontSize: 14, marginTop: 8, margin: 0 }}>
              Explore nossos laboratórios de projeto e simulações técnicas
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 24,
            }}
          >
            {portfolioProjects.map((proj) => (
              <div
                key={proj.id}
                className="portfolio-card"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="portfolio-img-container">
                  {renderProjectIllustration(proj.illustration)}
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.cyan, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {proj.category}
                    </span>
                    <span style={{ fontSize: 11, color: T.muted }}>
                      {proj.year}
                    </span>
                  </div>
                  <h3 style={{ 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    fontSize: 18, 
                    fontWeight: 700, 
                    color: "var(--color-text)", 
                    margin: "0 0 8px 0",
                    textAlign: "left"
                  }}>
                    {proj.title}
                  </h3>
                  <p style={{ 
                    color: T.muted2, 
                    fontSize: 13, 
                    lineHeight: 1.6, 
                    textAlign: "justify",
                    margin: 0,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}>
                    {proj.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, color: T.cyan, fontSize: 12, fontWeight: 600 }}>
                    Explorar Detalhes <ExternalLink size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Carrossel do Instagram (Ticker) */}
      <div className="instagram-ticker-container">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 12px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Camera size={14} style={{ color: T.cyan }} />
            <span style={{ fontSize: 11, color: T.cyan, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ProtoTech no Instagram
            </span>
          </div>
          <p style={{ fontSize: 13, color: T.muted, margin: 0, textAlign: "left" }}>
            Acompanhe os bastidores de nossa bancada de desenvolvimento
          </p>
        </div>

        {/* Endless marquee ticker */}
        <div className="instagram-ticker-track">
          {/* Render array twice to maintain endless scrolling effect */}
          {[...instagramFeed, ...instagramFeed].map((post, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                width: 250,
                margin: "0 12px",
                flexShrink: 0,
                overflow: "hidden",
                background: T.surface,
                border: `1px solid ${T.border}`
              }}
            >
              {/* Post Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, borderBottom: `1px solid ${T.border}` }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-purple), var(--color-success))",
                  color: "#ffffff",
                  fontSize: 9,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {post.avatar}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text)" }}>@{post.username}</span>
              </div>
              
              {/* Post Media box */}
              <div style={{ height: 110, background: post.imageBg, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {renderInstagramPostIllustration(post.illustration)}
              </div>
              
              {/* Post details */}
              <div style={{ padding: 10 }}>
                <p style={{
                  fontSize: 10.5,
                  color: T.muted2,
                  lineHeight: 1.4,
                  height: 42,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                  margin: "0 0 8px 0"
                }}>
                  {post.caption}
                </p>
                <div style={{ display: "flex", gap: 10, fontSize: 10, color: T.muted, fontWeight: 600 }}>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Depoimentos (Testimonials) */}
      <div 
        style={{ 
          background: T.bg, 
          width: "100%", 
          padding: isMobile ? "48px 20px" : "80px 48px"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 11,
                color: T.cyan,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12
              }}
            >
              Feedback
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 32,
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0
              }}
            >
              O que dizem os Engenheiros
            </h2>
            <p style={{ color: T.muted2, fontSize: 14, marginTop: 8, margin: 0 }}>
              Confiança validada por líderes de tecnologia de ponta
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                initials: "HR",
                name: "Dra. Helena Ramos",
                role: "Diretora de P&D na AeroEspacial Br",
                text: "A ProtoTech elevou o patamar de nossos protótipos de telemetria orbital. O fornecimento sob demanda e o rigor nos testes de hardware foram determinantes para o sucesso de nossa missão técnica.",
                gradient: "linear-gradient(135deg, #7c3aed, #aa3bff)"
              },
              {
                initials: "RF",
                name: "Eng. Roberto Fonseca",
                role: "CTO da AgroSmart IoT",
                text: "A autenticidade de sensores integrados sempre foi um calcanhar de Aquiles em nossa fabricação. Com a ProtoTech, garantimos chips robustos e prazos de entrega que otimizaram nossa produção.",
                gradient: "linear-gradient(135deg, #059669, #00bf63)"
              },
              {
                initials: "LD",
                name: "Lucas Diniz",
                role: "Fundador da RoboLab Acadêmica",
                text: "O simulador de orçamentos e a velocidade de faturamento nos permitiram reconfigurar a eletrônica de nosso robô móvel em menos de uma semana. Um nível de eficiência inédito no Brasil.",
                gradient: "linear-gradient(135deg, #0284c7, #37f2eb)"
              }
            ].map((dep, index) => (
              <div
                key={index}
                className="glass"
                style={{
                  padding: "32px",
                  borderRadius: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: dep.gradient,
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                  }}>
                    {dep.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", margin: 0 }}>
                      {dep.name}
                    </h4>
                    <span style={{ fontSize: 11, color: T.muted, display: "block", marginTop: 2 }}>
                      {dep.role}
                    </span>
                  </div>
                </div>
                <p style={{ color: T.muted2, fontSize: 13.5, lineHeight: 1.6, margin: 0, fontStyle: "italic", textAlign: "justify" }}>
                  "{dep.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Formulário de Orçamento (Simulador) */}
      <div 
        id="quote-simulator"
        style={{ 
          background: T.surface, 
          borderTop: `1px solid ${T.border}`,
          width: "100%", 
          padding: isMobile ? "48px 20px" : "80px 48px"
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: 11,
                color: T.cyan,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12
              }}
            >
              Simulação de Custos
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 32,
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0
              }}
            >
              Calculadora Instantânea de Projeto
            </h2>
            <p style={{ color: T.muted2, fontSize: 14, marginTop: 8, margin: 0 }}>
              Simule o investimento de engenharia e envie os parâmetros para validação técnica
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
              gap: isMobile ? 20 : 32,
              alignItems: "stretch"
            }}
          >
            {/* Form Card */}
            <div 
              className="card"
              style={{
                padding: isMobile ? "20px 16px" : "32px",
                background: T.bg,
                border: `1px solid ${T.border}`,
                textAlign: "left",
                minWidth: 0
              }}
            >
              <form onSubmit={handleQuoteSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      Seu Nome Completo
                    </label>
                    <input 
                      type="text" 
                      className="inp"
                      placeholder="Ex: Helena Ramos"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      E-mail Corporativo
                    </label>
                    <input 
                      type="email" 
                      className="inp"
                      placeholder="Ex: helena@empresa.com"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      Tipo de Serviço de Engenharia
                    </label>
                    <select 
                      className="inp"
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
                    >
                      <option value="prototipagem">Prototipagem IoT</option>
                      <option value="pcb">Design de PCB Customizada</option>
                      <option value="firmware">Firmware & Sistemas Embarcados</option>
                      <option value="consultoria">Consultoria Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      Complexidade Técnica
                    </label>
                    <select 
                      className="inp"
                      value={quoteForm.complexity}
                      onChange={(e) => setQuoteForm({...quoteForm, complexity: e.target.value})}
                    >
                      <option value="basica">Básica (1 camada, sensores padrão)</option>
                      <option value="media">Média (Multi-camada, microcontroladores)</option>
                      <option value="alta">Alta (Aeroespacial, telemetria complexa)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      Unidades de Protótipo
                    </label>
                    <input 
                      type="number" 
                      className="inp"
                      min="1"
                      max="100"
                      value={quoteForm.quantity}
                      onChange={(e) => setQuoteForm({...quoteForm, quantity: Math.max(1, parseInt(e.target.value) || 1)})}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                      Prazo Crítico
                    </label>
                    <select 
                      className="inp"
                      value={quoteForm.urgency}
                      onChange={(e) => setQuoteForm({...quoteForm, urgency: e.target.value})}
                    >
                      <option value="padrao">Padrão (15-30 dias de fabricação)</option>
                      <option value="urgente">Urgente (7-14 dias, +30% taxa)</option>
                      <option value="critico">Crítico (3-6 dias, +60% taxa)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.muted2, marginBottom: 6 }}>
                    Mensagem de Contexto / Requisitos Especiais
                  </label>
                  <textarea 
                    className="inp"
                    placeholder="Descreva detalhes específicos do seu hardware, sensores necessários ou prazo..."
                    rows="3"
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                    style={{ resize: "none", width: "100%" }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-p btn-shine"
                  style={{ justifyContent: "center", padding: "12px 18px", borderRadius: 8, marginTop: 8 }}
                >
                  <Send size={15} /> Solicitar via WhatsApp
                </button>
              </form>
            </div>

            {/* Calculations details display */}
            <div 
              className="card"
              style={{
                padding: isMobile ? "24px" : "32px",
                background: T.surface2,
                border: `1px solid ${T.border}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "left"
              }}
            >
              <div>
                <h3 style={{ 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: "var(--color-text)", 
                  margin: "0 0 16px 0"
                }}>
                  Demonstrativo Financeiro
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${T.border}`, paddingBottom: 8 }}>
                    <span style={{ color: T.muted2 }}>Serviço Base:</span>
                    <span className="mono" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                      {fmt(servicesData[quoteForm.service].basePrice)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${T.border}`, paddingBottom: 8 }}>
                    <span style={{ color: T.muted2 }}>Ajuste de Complexidade:</span>
                    <span className="mono" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                      x {complexitiesData[quoteForm.complexity].factor.toFixed(1)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${T.border}`, paddingBottom: 8 }}>
                    <span style={{ color: T.muted2 }}>Taxa de Urgência:</span>
                    <span className="mono" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                      x {urgenciesData[quoteForm.urgency].factor.toFixed(1)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${T.border}`, paddingBottom: 8 }}>
                    <span style={{ color: T.muted2 }}>Adicional de Unidades ({quoteForm.quantity} un):</span>
                    <span className="mono" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                      + {fmt(Math.max(0, quoteForm.quantity - 1) * 350 * complexitiesData[quoteForm.complexity].factor)}
                    </span>
                  </div>
                </div>

                <div style={{ background: "rgba(140, 82, 255, 0.05)", border: `1px dashed ${T.cyan}`, padding: 14, borderRadius: 8, marginTop: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <CheckCircle size={14} style={{ color: T.success }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.success }}>Análise Preliminar Inclusa</span>
                  </div>
                  <p style={{ fontSize: 11, color: T.muted2, margin: 0, lineHeight: 1.4 }}>
                    O orçamento gerado é uma estimativa. Nossa equipe técnica analisará a compatibilidade elétrica dos esquemas informados sem custo inicial.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1.5px solid ${T.border}` }}>
                <span style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 }}>
                  Investimento Estimado Total
                </span>
                <span className="mono" style={{ fontSize: isMobile ? 26 : 32, fontWeight: 800, color: T.cyan }}>
                  {fmt(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
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
            padding: isMobile ? "40px 20px" : "64px 36px 40px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: 32 }}>
            <div style={{ textAlign: "left", maxWidth: 500 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Cpu size={20} style={{ color: T.cyan }} />
                <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.03em", color: "var(--color-text)" }}>
                  Proto<span style={{ color: T.cyan }}>Tech</span>
                </span>
              </div>
              <p style={{ color: T.muted2, fontSize: 13.5, lineHeight: 1.6, textAlign: "justify" }}>
                A plataforma definitiva para gerenciamento de inventário de componentes eletrônicos corporativos e desenvolvimento acelerado de projetos sob demanda para equipes de engenharia.
              </p>
            </div>
            
            <div style={{ display: "flex", gap: isMobile ? 24 : 48, justifyContent: isMobile ? "flex-start" : "flex-end", flexWrap: "wrap" }}>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text)", marginBottom: 12 }}>
                  Links Rápidos
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5 }}>
                  <span style={{ color: T.muted2, cursor: "pointer" }} onClick={() => setPage("catalogo")}>Componentes</span>
                  <span style={{ color: T.muted2, cursor: "pointer" }} onClick={() => setPage("carrinho")}>Carrinho</span>
                  <span style={{ color: T.muted2, cursor: "pointer" }} onClick={() => document.getElementById("quote-simulator")?.scrollIntoView({ behavior: "smooth" })}>Simulador</span>
                </div>
              </div>
              
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text)", marginBottom: 12 }}>
                  Suporte
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5 }}>
                  <span style={{ color: T.muted2, cursor: "pointer" }}>Documentação</span>
                  <span style={{ color: T.muted2, cursor: "pointer" }}>Termos de Uso</span>
                  <span style={{ color: T.muted2, cursor: "pointer" }} onClick={() => document.getElementById("client-home-container")?.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao Topo</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid rgba(255,255,255,0.03)`,
              paddingTop: 24,
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
            <span style={{ fontSize: 11, color: T.muted }}>
              Desenvolvido por Victor Emanuel &bull; ProtoTech
            </span>
          </div>
        </div>
      </div>

      {/* 8. Lightbox Modal for Portfolio */}
      {selectedProject !== null && (
        <div
          className="glass"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "rgba(7, 9, 20, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            animation: "fi 0.3s ease-out"
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: 720,
              maxHeight: "90dvh",
              overflowY: "auto",
              background: T.bg,
              border: `1px solid ${T.border}`,
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              animation: "fi 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)"
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal graphic display */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#080a16" }}>
              {renderProjectIllustration(selectedProject.illustration)}
              
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal details text */}
            <div style={{ padding: isMobile ? 20 : 32, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.cyan, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {selectedProject.category}
                </span>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.muted2 }}>
                  <span><strong>Cliente:</strong> {selectedProject.client}</span>
                  <span><strong>Ano:</strong> {selectedProject.year}</span>
                </div>
              </div>

              <h3 style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                fontSize: isMobile ? 20 : 24, 
                fontWeight: 700, 
                color: "var(--color-text)", 
                margin: "0 0 16px 0" 
              }}>
                {selectedProject.title}
              </h3>
              
              <p style={{ color: T.muted2, fontSize: 14, lineHeight: 1.6, textAlign: "justify", marginBottom: 24, margin: "0 0 24px 0" }}>
                {selectedProject.description}
              </p>

              <div style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--color-text)", margin: "0 0 6px 0" }}>
                  Arquitetura Tecnológica
                </h4>
                <span className="mono" style={{ fontSize: 12, color: T.cyan }}>
                  {selectedProject.tech}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientHome;
