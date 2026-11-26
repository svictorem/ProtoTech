import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./global.css";
import { ToastProvider } from "./components/ToastSystem";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import AdminArea from "./components/admin/AdminArea";
import ClientArea from "./components/client/ClientArea";
import { getProductImage, API_URL } from "./utils/helpers";

const mergeGuestCartIntoClient = (email) => {
  if (typeof window === "undefined" || !email) return;
  try {
    const guestRaw = localStorage.getItem("pt-cart-guest");
    if (!guestRaw) return;
    const guestItems = JSON.parse(guestRaw);
    if (!Array.isArray(guestItems) || guestItems.length === 0) {
      localStorage.removeItem("pt-cart-guest");
      return;
    }
    const clientKey = `pt-cart-${email}`;
    const clientRaw = localStorage.getItem(clientKey);
    const clientItems = clientRaw ? JSON.parse(clientRaw) : [];
    const merged = [...(Array.isArray(clientItems) ? clientItems : [])];

    for (const gItem of guestItems) {
      const existing = merged.find((i) => i.id === gItem.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + (gItem.qty || 1);
      } else {
        merged.push(gItem);
      }
    }

    localStorage.setItem(clientKey, JSON.stringify(merged));
    localStorage.removeItem("pt-cart-guest");
  } catch {
    // ignora erros de storage/JSON
  }
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState(() => localStorage.getItem("pt-session") || null);
  const [clientLogin, setClientLogin] = useState(() => localStorage.getItem("pt-login") || null);
  const [theme, setTheme] = useState(() => localStorage.getItem("pt-theme") || "dark");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const loadProducts = () => {
    fetch(`${API_URL}/produtos`)
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
    fetch(`${API_URL}/vendas`)
      .then((res) => {
        if (!res.ok) throw new Error("Status HTTP inválido");
        return res.json();
      })
      .then((data) => setSales(data))
      .catch((err) => console.error("Erro ao carregar vendas:", err));
  };

  const loadTopProducts = () => {
    fetch(`${API_URL}/dashboard/top-produtos`)
      .then((res) => {
        if (!res.ok) throw new Error("Status HTTP inválido");
        return res.json();
      })
      .then((data) => setTopProducts(data))
      .catch((err) => console.error("Erro ao carregar top produtos:", err));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("pt-theme", theme);
  }, [theme]);

  // Persiste a sessão no localStorage para sobreviver recarregamentos e fechamento do navegador
  useEffect(() => {
    if (session) {
      localStorage.setItem("pt-session", session);
    } else {
      localStorage.removeItem("pt-session");
      localStorage.removeItem("pt-login");
    }
  }, [session]);

  // Carrega produtos, vendas e top produtos ao iniciar a aplicação
  useEffect(() => {
    loadProducts();
    loadSales();
    loadTopProducts();
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const clearStoredSession = () => {
    localStorage.removeItem("pt-session");
    localStorage.removeItem("pt-login");
    localStorage.removeItem("pt-client-page");
    setClientLogin(null);
    setSession(null);
  };

  const handleLogin = (role, email) => {
    const normalizedEmail = email ? email.trim().toLowerCase() : null;
    localStorage.removeItem("pt-client-page");

    if (role === "admin") {
      localStorage.setItem("pt-session", "admin");
      if (normalizedEmail) {
        localStorage.setItem("pt-login", normalizedEmail);
        setClientLogin(normalizedEmail);
      }
      setSession("admin");
      navigate("/admin", { replace: true });
      return;
    }

    if (normalizedEmail) {
      mergeGuestCartIntoClient(normalizedEmail);
      localStorage.setItem("pt-login", normalizedEmail);
      setClientLogin(normalizedEmail);
    }
    localStorage.setItem("pt-session", "client");
    setSession("client");

    const from = location.state?.from;
    const safeTarget =
      typeof from === "string" &&
      from.startsWith("/") &&
      from !== "/login" &&
      from !== "/cadastro" &&
      !from.startsWith("/admin")
        ? from
        : "/";
    navigate(safeTarget, { replace: true });
  };

  const handleClientLogout = () => {
    clearStoredSession();
    if (location.pathname.startsWith("/checkout")) {
      navigate("/carrinho", { replace: true });
    }
  };

  const handleAdminLogout = () => {
    clearStoredSession();
    navigate("/login", { replace: true });
  };

  const goToLogin = (fromPath) => {
    navigate("/login", {
      state: fromPath ? { from: fromPath } : undefined,
    });
  };

  return (
    <ToastProvider>
      <div className="pt-root">
        <Routes>
          <Route
            path="/login"
            element={
              session === "admin" ? (
                <Navigate to="/admin" replace />
              ) : session === "client" ? (
                <Navigate to={location.state?.from || "/"} replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  onCadastro={() => navigate("/cadastro", { state: location.state })}
                  onBackToStore={() => navigate("/")}
                />
              )
            }
          />
          <Route
            path="/cadastro"
            element={
              session === "admin" ? (
                <Navigate to="/admin" replace />
              ) : session === "client" ? (
                <Navigate to="/" replace />
              ) : (
                <Cadastro
                  onBack={() => navigate("/login", { state: location.state })}
                  onSuccess={() => navigate("/login", { state: location.state })}
                  onBackToStore={() => navigate("/")}
                />
              )
            }
          />
          <Route
            path="/admin/*"
            element={
              !session ? (
                <Navigate to="/login" replace state={{ from: location.pathname }} />
              ) : session !== "admin" ? (
                <Navigate to="/" replace />
              ) : (
                <AdminArea
                  onLogout={handleAdminLogout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  products={products}
                  loadProducts={loadProducts}
                  sales={sales}
                  loadSales={loadSales}
                  topProducts={topProducts}
                  loadTopProducts={loadTopProducts}
                />
              )
            }
          />
          <Route
            path="/*"
            element={
              <ClientArea
                session={session}
                onLogout={handleClientLogout}
                onGoLogin={goToLogin}
                onGoAdmin={() => navigate("/admin")}
                theme={theme}
                toggleTheme={toggleTheme}
                products={products}
                loadProducts={loadProducts}
                clientLogin={clientLogin}
              />
            }
          />
        </Routes>
      </div>
    </ToastProvider>
  );
}
