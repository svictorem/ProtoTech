import { useState, useEffect } from "react";
import "./global.css";
import { ToastProvider } from "./components/ToastSystem";
import Login from "./components/Login";
import AdminArea from "./components/admin/AdminArea";
import ClientArea from "./components/client/ClientArea";
import { getProductImage, API_URL } from "./utils/helpers";

export default function App() {
  const [session, setSession] = useState(() => localStorage.getItem("pt-session") || null);
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
    localStorage.setItem("pt-theme", theme);
  }, [theme]);

  // Persiste a sessão no localStorage para sobreviver recarregamentos de página
  useEffect(() => {
    if (session) {
      localStorage.setItem("pt-session", session);
    } else {
      localStorage.removeItem("pt-session");
    }
  }, [session]);

  // Carrega produtos, vendas e top produtos inicialmente e ao focar/retornar à aba do navegador
  useEffect(() => {
    const loadAll = () => {
      loadProducts();
      loadSales();
      loadTopProducts();
    };

    loadAll();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadAll();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <ToastProvider>
      <div className="pt-root">
        {!session && <Login onLogin={setSession} />}
        {session === "admin" && (
          <AdminArea
            onLogout={() => { localStorage.removeItem("pt-session"); setSession(null); }}
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
            onLogout={() => { localStorage.removeItem("pt-session"); setSession(null); }}
            theme={theme}
            toggleTheme={toggleTheme}
            products={products}
            loadProducts={loadProducts}
          />
        )}
      </div>
    </ToastProvider>
  );
}
