import { useState, useEffect } from "react";
import { Zap, ArrowRight, Cpu, ShoppingCart, LogOut, Menu, Sun, Moon } from "lucide-react";
import { useWindowSize } from "../../utils/helpers";

export default function HeroBanner({ setPage, cart = [], onLogout, theme, toggleTheme }) {
  const { isMobile } = useWindowSize();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Otimização do event listener de scroll (rAF + Throttling + State Guard)
  useEffect(() => {
    const container = document.getElementById("client-home-container");
    if (!container) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldScroll = container.scrollTop > 20;
          setScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to section helper
  const scrollToSection = (id) => {
    const container = document.getElementById("client-home-container");
    const el = document.getElementById(id);
    if (el && container) {
      const top = el.offsetTop - 58; // compensate for harmonized fixed nav height (58px)
      container.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Go to top of the page (HeroBanner) from anywhere
  const goHome = () => {
    setPage("home");
    // Use setTimeout to let the page switch render first if needed
    setTimeout(() => {
      const container = document.getElementById("client-home-container");
      if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <section className="w-full relative overflow-x-hidden flex flex-col bg-white text-slate-900 dark:bg-gradient-to-b dark:from-[#050714] dark:via-[#091326] dark:to-[#231a11] dark:text-white transition-colors duration-300">
      {/* Spacer that matches the fixed nav height so content doesn't hide behind it */}
      <div className="h-screen w-full relative flex flex-col">
      {/* Background Left-Side Circuit Board Tracks (faint schematic layout) */}
      <div className="absolute left-0 top-[18%] w-1/3 h-2/3 pointer-events-none opacity-20 dark:opacity-35 select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M -10 60 L 80 60 L 130 110 L 130 200 L 190 260 L 250 260 M -10 150 L 60 150 L 100 190 L 100 290 L 160 350 L 230 350 M -10 280 L 70 280 L 120 330 L 120 420 L 170 470" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="stroke-slate-300 dark:stroke-slate-800"
          />
          <circle cx="250" cy="260" r="3.5" className="fill-slate-300 dark:fill-slate-800" />
          <circle cx="230" cy="350" r="3.5" className="fill-slate-300 dark:fill-slate-800" />
        </svg>
      </div>

      {/* Light Overlay to enhance readability in dark theme only (removed bg-[#050714]/10 from light theme to keep it pure white) */}
      <div className="absolute inset-0 dark:bg-[#050714]/30 mix-blend-multiply pointer-events-none" />
      
      {/* Soft Base Fade to seamlessly blend with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none z-10" />

      {/* 1. Header (Navbar) - FIXED: stays visible when scrolling */}
      <nav
        className={[
          "w-full h-[58px] fixed top-0 left-0 right-0 z-[999] border-b transition-all duration-300",
          scrolled
            ? "border-[rgba(140,82,255,0.15)] bg-white/90 dark:bg-[#050714]/92"
            : "border-slate-200/50 bg-white/40 dark:bg-black/10"
        ].join(" ")}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-[1200px] mx-auto w-full h-full px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={goHome} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Cpu size={20} className="text-[#8c52ff]" />
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white"
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
              Proto<span className="text-[#8c52ff]">Tech</span>
            </span>
          </div>

          {/* Center Links (Desktop) — flex-1 keeps them centered */}
          {!isMobile && (
            <div className="flex-1 flex justify-center gap-6 text-sm font-semibold">
              <button 
                onClick={goHome} 
                className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap"
                style={{ color: '#8c52ff', background: 'none', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection("sobre-projeto")} 
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap !text-slate-600 dark:!text-slate-400"
                style={{ background: 'none', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
              >
                Sobre
              </button>
              <button 
                onClick={() => setPage("catalogo")} 
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap !text-slate-600 dark:!text-slate-400"
                style={{ background: 'none', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
              >
                Catálogo
              </button>
              <button 
                onClick={() => setPage("perfil")} 
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap !text-slate-600 dark:!text-slate-400"
                style={{ background: 'none', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
              >
                Meu Perfil
              </button>
            </div>
          )}

          {/* Right Action Icons — pinned to the right, all buttons share h-9 for perfect alignment */}
          <div className="ml-auto flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => setPage("carrinho")}
              className="relative h-9 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all cursor-pointer text-slate-700 dark:text-white text-sm font-medium whitespace-nowrap"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
            >
              <ShoppingCart size={15} />
              {!isMobile && <span>Carrinho</span>}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8c52ff] text-white dark:text-black rounded-full w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all cursor-pointer text-slate-600 dark:text-slate-400"
              title={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Logout — desktop only */}
            {!isMobile && (
              <button
                onClick={onLogout}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all cursor-pointer text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                title="Sair"
              >
                <LogOut size={15} />
              </button>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all cursor-pointer text-slate-800 dark:text-white"
              >
                <Menu size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to compensate for harmonized fixed navbar height (58px) */}
      <div className="h-[58px] shrink-0" />

      {/* Mobile Drawer Menu */}
      {isMobile && drawerOpen && (
        <div className="fixed top-[58px] left-0 w-full h-[calc(100vh-58px)] bg-white dark:bg-[#050714]/98 backdrop-blur-xl z-40 flex flex-col p-6 gap-4 animate-in fade-in duration-200 border-t border-slate-200 dark:border-white/5 text-slate-900 dark:text-white">
          <button 
            onClick={() => { setPage("home"); setDrawerOpen(false); }} 
            className="w-full py-4 px-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left font-semibold cursor-pointer"
            style={{ color: '#8c52ff', fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            Início
          </button>
          <button 
            onClick={() => { scrollToSection("sobre-projeto"); setDrawerOpen(false); }} 
            className="w-full py-4 px-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left font-semibold cursor-pointer text-slate-700 dark:text-gray-300"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            Sobre
          </button>
          <button 
            onClick={() => { setPage("catalogo"); setDrawerOpen(false); }} 
            className="w-full py-4 px-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left font-semibold cursor-pointer text-slate-700 dark:text-gray-300"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            Catálogo
          </button>
          <button 
            onClick={() => { setPage("perfil"); setDrawerOpen(false); }} 
            className="w-full py-4 px-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left font-semibold cursor-pointer text-slate-700 dark:text-gray-300"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            Meu Perfil
          </button>
          <button 
            onClick={() => { onLogout(); setDrawerOpen(false); }} 
            className="w-full py-4 px-5 bg-red-500/10 border border-red-500/20 rounded-xl text-left font-semibold mt-auto flex items-center gap-2 cursor-pointer text-red-500 dark:text-red-400"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
          >
            <LogOut size={16} /> Sair da Conta
          </button>
        </div>
      )}

      {/* 2. Main Content Grid (Aligned with Logo and limited to 1200px max-width) */}
      <div className="flex-1 w-full flex items-center justify-center relative z-20 py-8 lg:py-0">
        <div className="max-w-[1200px] mx-auto w-full px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8c52ff]/10 dark:bg-[#8c52ff]/15 border border-[#8c52ff]/30 text-[11px] font-bold tracking-wider uppercase mb-6 shadow-sm hover:scale-[1.02] transition-transform cursor-default !text-[#8c52ff] dark:!text-[#c4b5fd]"
                 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
              <Zap size={13} className="animate-pulse text-[#8c52ff] dark:text-[#c4b5fd]" />
              <span>Engenharia de Hardware & IoT</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight !text-slate-900 dark:!text-white leading-[1.08] mb-6 max-w-xl"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
              Prototipagem de Elite
              <br />
              <span className="bg-gradient-to-r from-[#8c52ff] via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                para o Amanhã
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg max-w-md leading-relaxed font-normal !text-slate-600 dark:!text-slate-300"
               style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
              Hardware customizado, firmware otimizado e integração IoT de nível industrial com máxima precisão e confiabilidade.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-row flex-wrap gap-4 items-center lg:justify-start justify-center w-full">

              {/* PRIMÁRIO: Solicitar Orçamento */}
              <button
                onClick={() => scrollToSection("quote-simulator")}
                className="group h-12 inline-flex items-center justify-center gap-2.5 px-7 whitespace-nowrap rounded-full font-bold text-sm text-white cursor-pointer border-none transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(140,82,255,0.38)] hover:shadow-[0_8px_30px_rgba(140,82,255,0.6)]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #7c3aed 0%, #8c52ff 50%, #6d28d9 100%)",
                }}
              >
                <span>Solicitar Orçamento</span>
                <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* SECUNDÁRIO: Ver Componentes */}
              <button
                onClick={() => setPage("catalogo")}
                className="h-12 inline-flex items-center justify-center gap-2 px-7 whitespace-nowrap rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 !text-slate-800 dark:!text-slate-100 border border-[#8c52ff]/40 hover:border-[#8c52ff] hover:bg-[#8c52ff]/10"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  background: "transparent",
                }}
              >
                <span>Ver Componentes</span>
              </button>

            </div>
          </div>

          {/* Right Column: Refined IoT HUD Diagram */}
          <div className="flex items-center justify-center lg:justify-end w-full">
            <div className="w-full aspect-square max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] relative transition-transform duration-500 hover:scale-[1.02]">
              
              {/* SVG HUD Diagram */}
              <svg
                className="w-full h-full animate-float"
                viewBox="0 0 520 520"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  {/* Radial Glow Wash: source of soft warm copper and green lighting */}
                  <radialGradient id="hero-warmLightWash" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.22" />
                    <stop offset="35%" stopColor="#10b981" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Light Wash Background Circle */}
                <circle cx="260" cy="260" r="240" fill="url(#hero-warmLightWash)" />

                {/* Technical Orthogonal Grid (Impressed in background) */}
                <g className="stroke-slate-200 dark:stroke-white/5" strokeWidth="0.5" opacity="0.4">
                  <circle cx="260" cy="260" r="200" fill="none" strokeDasharray="3 9" />
                  <circle cx="260" cy="260" r="225" fill="none" strokeDasharray="2 6" />
                  <line x1="50" y1="260" x2="470" y2="260" strokeDasharray="4 4" />
                  <line x1="260" y1="50" x2="260" y2="470" strokeDasharray="4 4" />
                </g>

                {/* Fine backplane copper paths connecting widgets */}
                <g className="stroke-slate-200 dark:stroke-white/10" strokeWidth="0.75" fill="none">
                  <path d="M 195 195 L 160 160 L 150 160 L 150 110" />
                  <path d="M 325 195 L 360 160 L 370 160 L 370 110" />
                  <path d="M 195 325 L 160 360 L 150 360 L 150 410" />
                  <path d="M 325 325 L 360 360 L 370 360 L 370 410" />
                </g>

                {/* Pulsing subtle green & copper flows */}
                <g strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <path d="M 195 195 L 160 160 L 150 160 L 150 110" stroke="#10b981" className="hud-dash-flow" />
                  <path d="M 325 195 L 360 160 L 370 160 L 370 110" stroke="#d97706" className="hud-dash-flow-fast" />
                  <path d="M 195 325 L 160 360 L 150 360 L 150 410" stroke="#d97706" className="hud-dash-flow-fast" />
                  <path d="M 325 325 L 360 360 L 370 360 L 370 410" stroke="#10b981" className="hud-dash-flow" />
                </g>

                {/* Orbiting HUD rings with copper and green */}
                <g>
                  {/* Slow inner ticks scale */}
                  <circle cx="260" cy="260" r="85" fill="none" stroke="#d97706" strokeWidth="0.75" strokeDasharray="2 4" className="hud-rotate-ccw-fast" opacity="0.4" />
                  
                  {/* Mid tech ring */}
                  <circle cx="260" cy="260" r="115" fill="none" stroke="url(#hero-glowGrad)" strokeWidth="1.5" strokeDasharray="30 20 5 5 15 40" className="hud-rotate-cw" opacity="0.6" />
                  
                  {/* Thin outer coordinate ring */}
                  <circle cx="260" cy="260" r="135" fill="none" stroke="#10b981" strokeWidth="0.75" strokeDasharray="4 15" className="hud-rotate-ccw" opacity="0.3" />
                  <circle cx="260" cy="260" r="142" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="120 50 80 40" className="hud-rotate-cw-fast" opacity="0.5" />
                </g>

                {/* Central Processor "PR" Badge */}
                <g>
                  {/* Outer Octagon */}
                  <path
                    d="M 315 260 L 299 299 L 260 315 L 221 299 L 205 260 L 221 221 L 260 205 L 299 221 Z"
                    stroke="url(#hero-glowGrad)"
                    className="fill-white dark:fill-[#080c18]"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 307 260 L 293 293 L 260 307 L 227 293 L 213 260 L 227 227 L 260 213 L 293 227 Z"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="0.75"
                    strokeDasharray="4 2"
                    opacity="0.4"
                  />

                  {/* Core Title and Label */}
                  <text
                    x="260"
                    y="233"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill="#10b981"
                    fontFamily="JetBrains Mono"
                    letterSpacing="1"
                    className="hud-text-scan"
                  >
                    CORE.SYS
                  </text>
                  
                  <text
                    x="260"
                    y="272"
                    textAnchor="middle"
                    fontSize="34"
                    fontWeight="900"
                    fill="url(#hero-glowGrad)"
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="1"
                    style={{ filter: "drop-shadow(0 0 5px rgba(217,119,6,0.5))" }}
                  >
                    PR
                  </text>

                  <text
                    x="260"
                    y="292"
                    textAnchor="middle"
                    fontSize="6.5"
                    className="fill-slate-400 dark:fill-slate-500"
                    opacity="0.75"
                    fontFamily="JetBrains Mono"
                    letterSpacing="0.5"
                  >
                    v2.5 // ACTV
                  </text>
                </g>

                {/* Data Widgets (Flat Glass Styling) */}
                
                {/* Widget 1: RF LINK (Top Left) */}
                <g opacity="0.9">
                  <rect x="20" y="55" width="130" height="55" rx="5" className="fill-white dark:fill-[#080c18] stroke-slate-200 dark:stroke-white/10" fillOpacity="0.8" strokeWidth="1" />
                  <line x1="20" y1="72" x2="150" y2="72" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="1" />
                  <text x="28" y="67" fontSize="8" fontWeight="bold" fill="#10b981" fontFamily="JetBrains Mono">RF_LINK // IoT</text>
                  <circle cx="138" cy="64" r="2.5" fill="#10b981" className="hud-led-blink" />
                  <text x="28" y="85" fontSize="7.5" className="fill-slate-500 dark:fill-slate-400" fontFamily="JetBrains Mono">FREQ: 915 MHz</text>
                  <text x="28" y="97" fontSize="7.5" fill="#10b981" fontFamily="JetBrains Mono">LINK: 100% (EXCELLENT)</text>
                </g>

                {/* Widget 2: SYS PWR (Top Right) */}
                <g opacity="0.9">
                  <rect x="370" y="55" width="130" height="55" rx="5" className="fill-white dark:fill-[#080c18] stroke-slate-200 dark:stroke-white/10" fillOpacity="0.8" strokeWidth="1" />
                  <line x1="370" y1="72" x2="500" y2="72" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="1" />
                  <text x="378" y="67" fontSize="8" fontWeight="bold" fill="#d97706" fontFamily="JetBrains Mono">SYS_PWR // MON</text>
                  <rect x="466" y="61" width="22" height="6" rx="1" fill="none" stroke="#d97706" strokeWidth="0.75" />
                  <rect x="468" y="63" width="14" height="2" fill="#10b981" />
                  <text x="378" y="85" fontSize="7.5" className="fill-slate-500 dark:fill-slate-400" fontFamily="JetBrains Mono">VOLT: 3.31 V (NOMINAL)</text>
                  <text x="378" y="97" fontSize="7.5" className="fill-slate-500 dark:fill-slate-400" fontFamily="JetBrains Mono">TEMP: 28.4°C // STABLE</text>
                </g>

                {/* Widget 3: PCB STACK (Bottom Left) */}
                <g opacity="0.9">
                  <rect x="20" y="410" width="130" height="55" rx="5" className="fill-white dark:fill-[#080c18] stroke-slate-200 dark:stroke-white/10" fillOpacity="0.8" strokeWidth="1" />
                  <line x1="20" y1="427" x2="150" y2="427" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="1" />
                  <text x="28" y="422" fontSize="8" fontWeight="bold" fill="#d97706" fontFamily="JetBrains Mono">PCB_STACK // 4-LYR</text>
                  
                  <rect x="28" y="434" width="40" height="1.5" fill="#10b981" />
                  <rect x="28" y="439" width="40" height="1.5" fill="#d97706" opacity="0.5" />
                  <rect x="28" y="444" width="40" height="1.5" fill="#d97706" opacity="0.5" />
                  <rect x="28" y="449" width="40" height="1.5" fill="#10b981" />
                  
                  <text x="74" y="439" fontSize="7.5" className="fill-slate-500 dark:fill-slate-400" fontFamily="JetBrains Mono">L1/L4: SIG</text>
                  <text x="74" y="449" fontSize="7.5" className="fill-slate-500 dark:fill-slate-400" fontFamily="JetBrains Mono">L2/L3: GND/PWR</text>
                </g>

                {/* Widget 4: OSC SIGNAL (Bottom Right) */}
                <g opacity="0.9">
                  <rect x="370" y="410" width="130" height="55" rx="5" className="fill-white dark:fill-[#080c18] stroke-slate-200 dark:stroke-white/10" fillOpacity="0.8" strokeWidth="1" />
                  <line x1="370" y1="427" x2="500" y2="427" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="1" />
                  <text x="378" y="422" fontSize="8" fontWeight="bold" fill="#10b981" fontFamily="JetBrains Mono">OSC_SIGNAL // RX</text>
                  <text x="468" y="422" fontSize="7.5" fill="#10b981" fontFamily="JetBrains Mono">160MHz</text>
                  
                  <rect x="378" y="432" width="114" height="26" fill="#04060c" fillOpacity="0.7" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="0.5" />
                  <line x1="378" y1="445" x2="492" y2="445" className="stroke-slate-200 dark:stroke-white/10" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path
                    d="M 378 445 Q 388 433, 398 445 T 418 445 T 438 445 T 458 445 T 478 445 T 492 445"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.25"
                    strokeDasharray="40 10 15 5"
                    className="hud-dash-flow"
                  />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative fine-lined coordinate values at the bottom corner edges (impressed detail) */}
      <div className="absolute bottom-4 left-8 hidden md:flex gap-4 text-[9px] font-mono text-slate-400 dark:text-white/20 select-none pointer-events-none">
        <span>LOC // RA: 260_DEC: 260</span>
        <span>LAT: -23.5505 // LNG: -46.6333</span>
      </div>
      <div className="absolute bottom-4 right-8 hidden md:flex gap-4 text-[9px] font-mono text-slate-400 dark:text-white/20 select-none pointer-events-none">
        <span>GRID: ACTIVE // 50Hz</span>
        <span>SYS.STATUS: 0x00FF (NOMINAL)</span>
      </div>
      </div>{/* end h-screen wrapper */}
    </section>
  );
}
