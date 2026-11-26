import { useEffect } from "react";
import {
  Cpu,
  X,
  Home,
  Sparkles,
  Package,
  ShoppingCart,
  User,
  Sun,
  Moon,
  LogOut,
  LogIn,
  ChevronRight,
} from "lucide-react";
import { T, initials } from "../../utils/helpers";

export default function MobileDrawer({
  open,
  onClose,
  page,
  onGoHome,
  onGoAbout,
  onNavigate,
  cartCount = 0,
  theme,
  toggleTheme,
  isAuthenticated = false,
  onLogout,
  onGoLogin,
  clientProfile = null,
  clientLogin = null,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const isDark = theme !== "light";
  const displayName = isAuthenticated
    ? clientProfile?.nome || clientLogin?.split("@")[0] || "Cliente ProtoTech"
    : "Visitante";
  const displayEmail = isAuthenticated
    ? clientProfile?.email || clientLogin || "Área do Cliente"
    : "Entre para acessar seus pedidos";
  const avatarText = isAuthenticated ? initials(displayName).toUpperCase() || "PT" : "PT";

  const navItems = [
    {
      id: "home",
      label: "Início",
      desc: "Destaques, projetos e orçamento",
      icon: Home,
      active: page === "home",
      action: () => {
        onGoHome();
        onClose();
      },
    },
    {
      id: "sobre",
      label: "Sobre o Projeto",
      desc: "Nossa filosofia e engenharia",
      icon: Sparkles,
      active: false,
      action: () => {
        onGoAbout();
        onClose();
      },
    },
    {
      id: "catalogo",
      label: "Catálogo",
      desc: "Microcontroladores e sensores",
      icon: Package,
      active: page === "catalogo",
      action: () => {
        onNavigate("catalogo");
        onClose();
      },
    },
    {
      id: "carrinho",
      label: "Carrinho",
      desc: cartCount > 0 ? `${cartCount} ${cartCount === 1 ? "item adicionado" : "itens adicionados"}` : "Nenhum item no momento",
      icon: ShoppingCart,
      active: page === "carrinho" || page === "checkout",
      badge: cartCount,
      action: () => {
        onNavigate("carrinho");
        onClose();
      },
    },
    {
      id: "perfil",
      label: "Meu Perfil",
      desc: "Seus dados e histórico de pedidos",
      icon: User,
      active: page === "perfil",
      action: () => {
        onNavigate("perfil");
        onClose();
      },
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <style>{`
        @keyframes ptDrawerBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ptDrawerSlideIn {
          from { transform: translateX(100%); opacity: 0.7; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: isDark ? "rgba(3, 6, 18, 0.72)" : "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "ptDrawerBackdropIn 0.22s ease-out forwards",
        }}
      />

      {/* Slide-in Drawer Panel */}
      <aside
        style={{
          position: "relative",
          width: "min(86vw, 330px)",
          height: "100dvh",
          background: isDark
            ? "linear-gradient(180deg, #0b1122 0%, #070b17 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          borderLeft: `1px solid ${T.border}`,
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          animation: "ptDrawerSlideIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden",
        }}
      >
        {/* Top Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${T.border}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(140, 82, 255, 0.14)",
                border: "1px solid rgba(140, 82, 255, 0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cpu size={17} style={{ color: T.cyan }} />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: "-0.03em",
                color: T.text,
              }}
            >
              Proto<span style={{ color: T.cyan }}>Tech</span>
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar menu"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: T.surface2,
              border: `1px solid ${T.border}`,
              color: T.muted2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* User Profile Card */}
          <button
            onClick={() => {
              onNavigate("perfil");
              onClose();
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 14,
              background: isDark
                ? "linear-gradient(135deg, rgba(140, 82, 255, 0.14) 0%, rgba(0, 191, 99, 0.06) 100%)"
                : "linear-gradient(135deg, rgba(124, 58, 237, 0.09) 0%, rgba(5, 150, 105, 0.05) 100%)",
              border: `1px solid ${isDark ? "rgba(140, 82, 255, 0.25)" : "rgba(124, 58, 237, 0.2)"}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(135deg, #7c3aed, #8c52ff)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(140, 82, 255, 0.3)",
              }}
            >
              {avatarText}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: T.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {displayName}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: T.muted2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: 2,
                }}
              >
                {displayEmail}
              </div>
            </div>
            <ChevronRight size={15} style={{ color: T.muted2, flexShrink: 0 }} />
          </button>

          {/* Navigation Links */}
          <div>
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: T.muted,
                padding: "0 6px 8px",
                textAlign: "left",
              }}
            >
              Navegação
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.active;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: 12,
                      background: isActive
                        ? isDark
                          ? "rgba(140, 82, 255, 0.14)"
                          : "rgba(124, 58, 237, 0.09)"
                        : "transparent",
                      border: `1px solid ${
                        isActive
                          ? isDark
                            ? "rgba(140, 82, 255, 0.35)"
                            : "rgba(124, 58, 237, 0.28)"
                          : "transparent"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isActive
                          ? T.cyan
                          : isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(15, 23, 42, 0.05)",
                        color: isActive ? "#ffffff" : T.muted2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? T.cyan : T.text,
                          lineHeight: 1.25,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: T.muted2,
                          marginTop: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                    {item.badge > 0 ? (
                      <span
                        style={{
                          minWidth: 22,
                          height: 22,
                          padding: "0 6px",
                          borderRadius: 999,
                          background: T.cyan,
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight
                        size={15}
                        style={{
                          color: isActive ? T.cyan : T.muted,
                          opacity: isActive ? 1 : 0.6,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Switcher Row */}
          <div
            style={{
              marginTop: "auto",
              padding: "10px 12px",
              borderRadius: 12,
              background: T.surface2,
              border: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isDark ? (
                <Moon size={16} style={{ color: T.cyan }} />
              ) : (
                <Sun size={16} style={{ color: T.warning }} />
              )}
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                {isDark ? "Modo Escuro" : "Modo Claro"}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              style={{
                width: 44,
                height: 24,
                borderRadius: 999,
                border: "none",
                background: isDark ? T.cyan : "#cbd5e1",
                position: "relative",
                cursor: "pointer",
                padding: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#ffffff",
                  transform: isDark ? "translateX(20px)" : "translateX(0)",
                  transition: "transform 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                }}
              />
            </button>
          </div>
        </div>

        {/* Bottom Auth Action */}
        <div
          style={{
            padding: "12px 16px 20px",
            borderTop: `1px solid ${T.border}`,
            flexShrink: 0,
          }}
        >
          {isAuthenticated ? (
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(255, 71, 87, 0.1)",
                border: "1px solid rgba(255, 71, 87, 0.25)",
                color: T.danger,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <LogOut size={16} />
              Sair da Conta
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onGoLogin?.();
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                background: "linear-gradient(90deg, #7c3aed, #8c52ff)",
                border: "none",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)",
              }}
            >
              <LogIn size={16} />
              Fazer Login
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
