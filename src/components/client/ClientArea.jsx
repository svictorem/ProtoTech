import { useState } from "react";
import { Cpu, ShoppingCart, LogOut, Menu } from "lucide-react";
import { T, useWindowSize } from "../../utils/helpers";

// Sub-components
import ClientHome from "./ClientHome";
import Catalogo from "./Catalogo";
import Carrinho from "./Carrinho";
import Perfil from "./Perfil";
import Checkout from "../Checkout";

const ClientNav = ({ page, setPage, cart, onLogout, theme, toggleTheme }) => {
  const { isMobile } = useWindowSize();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Always navigate to home page and scroll to the very top (HeroBanner)
  const goHome = () => {
    setPage("home");
    setDrawerOpen(false);
    setTimeout(() => {
      const container = document.getElementById("client-home-container");
      if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

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
          onClick={goHome}
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
                onClick={goHome}
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
            {/* Right actions — desktop: h-9 uniform buttons */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              {/* Cart */}
              <button
                onClick={() => setPage("carrinho")}
                style={{
                  position: "relative",
                  height: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "0 12px",
                  borderRadius: 8,
                  background: "var(--color-surface2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-borderHover)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border)"}
              >
                <ShoppingCart size={15} />
                <span>Carrinho</span>
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute", top: -5, right: -5,
                    background: T.cyan, color: "#070914",
                    borderRadius: "50%", width: 17, height: 17,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700,
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
                style={{
                  height: 36, width: 36,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8,
                  background: "var(--color-surface2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted2)",
                  cursor: "pointer",
                  transition: "all .15s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-borderHover)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border)"}
              >
                {theme === "light"
                  ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                }
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                title="Sair"
                style={{
                  height: 36, width: 36,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8,
                  background: "var(--color-surface2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted2)",
                  cursor: "pointer",
                  transition: "all .15s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--color-danger)"; e.currentTarget.style.borderColor = "rgba(var(--rgb-danger),0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--color-muted2)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
              >
                <LogOut size={15} />
              </button>
            </div>
          </>
        ) : (
          /* Mobile right actions */
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            {/* Cart icon */}
            <button
              onClick={() => setPage("carrinho")}
              style={{
                position: "relative",
                height: 36, width: 36,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8,
                background: "var(--color-surface2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                cursor: "pointer",
                transition: "all .15s",
                flexShrink: 0,
              }}
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  background: T.cyan, color: "#070914",
                  borderRadius: "50%", width: 15, height: 15,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700,
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
              style={{
                height: 36, width: 36,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8,
                background: "var(--color-surface2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted2)",
                cursor: "pointer",
                transition: "all .15s",
                flexShrink: 0,
              }}
            >
              {theme === "light"
                ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              }
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              style={{
                height: 36, width: 36,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8,
                background: "var(--color-surface2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                cursor: "pointer",
                transition: "all .15s",
                flexShrink: 0,
              }}
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
            { id: "home", l: "Início", action: goHome },
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

const ClientArea = ({ onLogout, theme, toggleTheme, products = [] }) => {
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
        background: "var(--color-bg)",
      }}
    >
      {page !== "home" && (
        <ClientNav
          page={page}
          setPage={setPage}
          cart={cart}
          onLogout={onLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {page === "home" && (
          <ClientHome
            setPage={setPage}
            addToCart={addToCart}
            products={products}
            cart={cart}
            onLogout={onLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
        {page === "catalogo" && <Catalogo addToCart={addToCart} products={products} />}
        {page === "carrinho" && <Carrinho cart={cart} setCart={setCart} setPage={setPage} />}
        {page === "perfil" && <Perfil />}
        {page === "checkout" && <Checkout cart={cart} setCart={setCart} setPage={setPage} />}
      </div>
    </div>
  );
};

export default ClientArea;
