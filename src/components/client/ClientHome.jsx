import { Zap, Shield, Star, TrendingUp, Cpu, Warehouse, ArrowRight, Package, Plus } from "lucide-react";
import { T, fmt, useWindowSize } from "../../utils/helpers";

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

export default ClientHome;
