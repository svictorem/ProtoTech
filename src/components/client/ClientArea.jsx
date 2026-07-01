import { useState } from "react";
import { Cpu, ShoppingCart, LogOut, Menu } from "lucide-react";
import { T, useWindowSize } from "../../utils/helpers";
import { ThemeToggle } from "../common/UIComponents";

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

export default ClientArea;
