import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Cpu, ShoppingCart, LogOut, LogIn, Menu, Sun, Moon } from "lucide-react";
import { T, useWindowSize, API_URL } from "../../utils/helpers";

// Sub-components
import ClientHome from "./ClientHome";
import Catalogo from "./Catalogo";
import Carrinho from "./Carrinho";
import Perfil from "./Perfil";
import Checkout from "../Checkout";
import MobileDrawer from "./MobileDrawer";

const PAGE_TO_PATH = {
  home: "/",
  catalogo: "/catalogo",
  carrinho: "/carrinho",
  perfil: "/perfil",
  checkout: "/checkout",
};

const getPageFromPath = (pathname) => {
  if (pathname === "/catalogo") return "catalogo";
  if (pathname === "/carrinho") return "carrinho";
  if (pathname === "/perfil") return "perfil";
  if (pathname.startsWith("/checkout")) return "checkout";
  return "home";
};

const readStoredCart = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const ClientNav = ({
  page,
  setPage,
  cart,
  isAuthenticated,
  onLogout,
  onGoLogin,
  theme,
  toggleTheme,
  clientProfile,
  clientLogin,
}) => {
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

  const goAbout = () => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById("sobre-projeto")?.scrollIntoView({ behavior: "smooth" });
    }
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
                onClick={goAbout}
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
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-borderHover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <ShoppingCart size={15} />
                <span>Carrinho</span>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      background: T.cyan,
                      color: "#ffffff",
                      borderRadius: "50%",
                      minWidth: 18,
                      height: 18,
                      padding: "0 4px",
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

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                title={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
                style={{
                  height: 36,
                  width: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  background: "var(--color-surface2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted2)",
                  cursor: "pointer",
                  transition: "all .15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-borderHover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </button>

              {/* Auth action */}
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  title="Sair"
                  style={{
                    height: 36,
                    width: 36,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: "var(--color-surface2)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-muted2)",
                    cursor: "pointer",
                    transition: "all .15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-danger)";
                    e.currentTarget.style.borderColor = "rgba(var(--rgb-danger),0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-muted2)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                >
                  <LogOut size={15} />
                </button>
              ) : (
                <button
                  onClick={() => onGoLogin?.()}
                  title="Fazer Login"
                  style={{
                    height: 36,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "0 12px",
                    borderRadius: 8,
                    background: "var(--color-cyanBg)",
                    border: "1px solid rgba(var(--rgb-cyan),0.3)",
                    color: "var(--color-cyan)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all .15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(var(--rgb-cyan),0.3)")}
                >
                  <LogIn size={15} />
                  <span>Entrar</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* Mobile right actions — uniform 36x36 buttons */
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            {/* Cart icon */}
            <button
              onClick={() => setPage("carrinho")}
              aria-label="Carrinho"
              style={{
                position: "relative",
                height: 36,
                width: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: T.cyan,
                    color: "#ffffff",
                    borderRadius: "50%",
                    minWidth: 18,
                    height: 18,
                    padding: "0 4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
              title={theme === "light" ? "Mudar para escuro" : "Mudar para claro"}
              style={{
                height: 36,
                width: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: "var(--color-surface2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted2)",
                cursor: "pointer",
                transition: "all .15s",
                flexShrink: 0,
              }}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu"
              style={{
                height: 36,
                width: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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

      {/* Modern Mobile Slide-Over Drawer */}
      {isMobile && (
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          page={page}
          onGoHome={goHome}
          onGoAbout={goAbout}
          onNavigate={setPage}
          cartCount={cartCount}
          theme={theme}
          toggleTheme={toggleTheme}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          onGoLogin={onGoLogin}
          clientProfile={clientProfile}
          clientLogin={clientLogin}
        />
      )}
    </nav>
  );
};

const ClientAreaInner = ({
  cartStorageKey,
  session,
  onLogout,
  onGoLogin,
  onGoAdmin,
  theme,
  toggleTheme,
  products = [],
  loadProducts,
  effectiveLogin = null,
}) => {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const page = getPageFromPath(location.pathname);

  const isAuthenticated = Boolean(session);
  const isClientAuthenticated = session === "client" && Boolean(effectiveLogin);

  const [cart, setCart] = useState(() => readStoredCart(cartStorageKey));
  const [clientProfile, setClientProfile] = useState(null);

  // Persiste o carrinho no localStorage para sobreviver recarregamentos
  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    } catch {
      // ignora erro de quota
    }
  }, [cart, cartStorageKey]);

  // Carrega dados do cliente somente quando estiver logado como cliente
  useEffect(() => {
    if (!isClientAuthenticated) return;
    let cancelled = false;
    fetch(`${API_URL}/usuarios/perfil?login=${encodeURIComponent(effectiveLogin)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && !data.error) {
          setClientProfile(data);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isClientAuthenticated, effectiveLogin]);

  const activeProfile = isClientAuthenticated ? clientProfile : null;

  const navigate = useCallback(
    (nextPage) => {
      const targetPath = PAGE_TO_PATH[nextPage];
      if (!targetPath) return;
      if (location.pathname === targetPath) return;
      routerNavigate(targetPath);
    },
    [location.pathname, routerNavigate]
  );

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
        height: "100dvh",
        background: "var(--color-bg)",
      }}
    >
      {page !== "home" && (
        <ClientNav
          page={page}
          setPage={navigate}
          cart={cart}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          onGoLogin={() => onGoLogin?.(location.pathname)}
          theme={theme}
          toggleTheme={toggleTheme}
          clientProfile={activeProfile}
          clientLogin={isClientAuthenticated ? effectiveLogin : null}
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
        <Routes>
          <Route
            index
            element={
              <ClientHome
                setPage={navigate}
                addToCart={addToCart}
                products={products}
                cart={cart}
                isAuthenticated={isAuthenticated}
                onLogout={onLogout}
                onGoLogin={() => onGoLogin?.("/")}
                theme={theme}
                toggleTheme={toggleTheme}
                clientProfile={activeProfile}
                clientLogin={isClientAuthenticated ? effectiveLogin : null}
              />
            }
          />
          <Route
            path="catalogo"
            element={<Catalogo addToCart={addToCart} products={products} />}
          />
          <Route
            path="carrinho"
            element={
              <Carrinho
                cart={cart}
                setCart={setCart}
                setPage={navigate}
                isClientAuthenticated={isClientAuthenticated}
                onRequireLogin={() => onGoLogin?.("/checkout")}
              />
            }
          />
          <Route
            path="perfil"
            element={
              <Perfil
                loginEmail={isClientAuthenticated ? effectiveLogin : null}
                session={session}
                onGoLogin={() => onGoLogin?.("/perfil")}
                onGoCadastro={() => routerNavigate("/cadastro")}
                onLogout={onLogout}
                onGoAdmin={onGoAdmin}
              />
            }
          />
          <Route
            path="checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
                setPage={navigate}
                clientProfile={activeProfile}
                clientLogin={isClientAuthenticated ? effectiveLogin : null}
                isClientAuthenticated={isClientAuthenticated}
                onRequireLogin={() => onGoLogin?.("/checkout")}
                loadProducts={loadProducts}
              />
            }
          />
          <Route
            path="checkout/:etapa"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
                setPage={navigate}
                clientProfile={activeProfile}
                clientLogin={isClientAuthenticated ? effectiveLogin : null}
                isClientAuthenticated={isClientAuthenticated}
                onRequireLogin={() => onGoLogin?.("/checkout")}
                loadProducts={loadProducts}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const ClientArea = ({
  session = null,
  onLogout,
  onGoLogin,
  onGoAdmin,
  theme,
  toggleTheme,
  products = [],
  loadProducts,
  clientLogin = null,
}) => {
  const effectiveLogin =
    clientLogin || (typeof window !== "undefined" ? localStorage.getItem("pt-login") : null);
  const isClientAuthenticated = session === "client" && Boolean(effectiveLogin);
  const cartStorageKey = `pt-cart-${isClientAuthenticated ? effectiveLogin : "guest"}`;

  return (
    <ClientAreaInner
      key={cartStorageKey}
      cartStorageKey={cartStorageKey}
      session={session}
      onLogout={onLogout}
      onGoLogin={onGoLogin}
      onGoAdmin={onGoAdmin}
      theme={theme}
      toggleTheme={toggleTheme}
      products={products}
      loadProducts={loadProducts}
      effectiveLogin={effectiveLogin}
    />
  );
};

export default ClientArea;
