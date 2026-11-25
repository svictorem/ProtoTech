import { useState, useEffect } from "react";
import "./global.css";
import { ToastProvider } from "./components/ToastSystem";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import AdminArea from "./components/admin/AdminArea";
import ClientArea from "./components/client/ClientArea";
import { getProductImage, API_URL } from "./utils/helpers";

export default function App() {
  const [session, setSession] = useState(() => localStorage.getItem("pt-session") || null);
  const [clientLogin, setClientLogin] = useState(() => localStorage.getItem("pt-login") || null);
  const [theme, setTheme] = useState(() => localStorage.getItem("pt-theme") || "dark");
  const [view, setViewState] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash === "#cadastro") return "cadastro";
    return "login";
  }); // "login" | "cadastro"
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

  // Persiste a sessão no localStorage para sobreviver recarregamentos de página
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

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const navigateAuthView = (nextView) => {
    setViewState(nextView);
    if (!session && typeof window !== "undefined") {
      window.history.pushState({ view: nextView }, "", `#${nextView}`);
    }
  };

  useEffect(() => {
    if (session) return;
    const onPopAuth = (e) => {
      const target = e?.state?.view || (window.location.hash === "#cadastro" ? "cadastro" : "login");
      setViewState(target === "cadastro" ? "cadastro" : "login");
    };
    if (!window.location.hash || (window.location.hash !== "#login" && window.location.hash !== "#cadastro")) {
      window.history.replaceState({ view }, "", `#${view}`);
    }
    window.addEventListener("popstate", onPopAuth);
    return () => window.removeEventListener("popstate", onPopAuth);
  }, [session, view]);

  const handleLogout = () => {
    localStorage.removeItem("pt-session");
    localStorage.removeItem("pt-login");
    localStorage.removeItem("pt-client-page");
    setClientLogin(null);
    setSession(null);
    setViewState("login");
    window.history.replaceState({ view: "login" }, "", "#login");
  };

  return (
    <ToastProvider>
      <div className="pt-root">
        {!session && view === "login" && (
          <Login
            onLogin={(role, email) => {
              localStorage.removeItem("pt-client-page");
              setSession(role);
              if (role === "client" && email) {
                setClientLogin(email);
                localStorage.setItem("pt-login", email);
                window.history.replaceState({ page: "home" }, "", "#home");
              }
              setViewState("login");
            }}
            onCadastro={() => navigateAuthView("cadastro")}
          />
        )}
        {!session && view === "cadastro" && (
          <Cadastro
            onBack={() => navigateAuthView("login")}
            onSuccess={() => navigateAuthView("login")}
          />
        )}
        {session === "admin" && (
          <AdminArea
            onLogout={handleLogout}
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
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            products={products}
            loadProducts={loadProducts}
            clientLogin={clientLogin}
          />
        )}
      </div>
    </ToastProvider>
  );
}
