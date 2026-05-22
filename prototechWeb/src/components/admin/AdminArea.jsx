import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  UserCog,
  Bell,
  Cpu,
  Menu,
  LogOut,
  Zap,
} from "lucide-react";
import { T } from "../../utils/helpers";
import { ThemeToggle, Avatar } from "../common/UIComponents";

// Sub-components
import Dashboard from "./Dashboard";
import Produtos from "./Produtos";
import Estoque from "./Estoque";
import Vendas from "./Vendas";
import Clientes from "./Clientes";
import Funcionarios from "./Funcionarios";
import Alertas from "./Alertas";

const Sidebar = ({ page, setPage, onLogout, collapsed, toggle, alertsCount = 0 }) => {
  const NAV = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "produtos", icon: Package, label: "Produtos" },
    { id: "estoque", icon: Warehouse, label: "Estoque" },
    { id: "vendas", icon: ShoppingCart, label: "Vendas" },
    { id: "clientes", icon: Users, label: "Clientes" },
    { id: "funcs", icon: UserCog, label: "Funcionários" },
    { id: "alertas", icon: Bell, label: "Alertas", badge: alertsCount },
  ];
  return (
    <div
      style={{
        width: collapsed ? 58 : 218,
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width .2s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "18px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <Cpu size={20} style={{ color: T.cyan, flexShrink: 0 }} />
        {!collapsed && (
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
            }}
          >
            Proto<span style={{ color: T.cyan }}>Tech</span>
          </span>
        )}
        <button
          onClick={toggle}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.muted,
            display: "flex",
            flexShrink: 0,
          }}
        >
          <Menu size={15} />
        </button>
      </div>

      <nav style={{ padding: "10px 7px", flex: 1, overflowY: "auto" }}>
        {NAV.map(({ id, icon: Icon, label, badge }) => (
          <div
            key={id}
            className={`sb-item${page === id ? " active" : ""}`}
            onClick={() => setPage(id)}
            style={{
              justifyContent: collapsed ? "center" : "flex-start",
              marginBottom: 2,
            }}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
            {!collapsed && badge > 0 && (
              <span
                style={{
                  background: T.danger,
                  color: "#fff",
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
                {badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div style={{ padding: "10px 7px", borderTop: `1px solid ${T.border}` }}>
        <div className="sb-item" onClick={onLogout}>
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Sair</span>}
        </div>
      </div>
    </div>
  );
};

const PAGE_TITLES = {
  dashboard: "Dashboard",
  produtos: "Gestão de Produtos",
  estoque: "Controle de Estoque",
  vendas: "Gestão de Vendas",
  clientes: "Clientes",
  funcs: "Funcionários",
  alertas: "Alertas de Estoque",
};

const TopBar = ({ page, theme, toggleTheme, onRefresh }) => (
  <div
    style={{
      height: 54,
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      display: "flex",
      alignItems: "center",
      paddingInline: 22,
      gap: 14,
      flexShrink: 0,
    }}
  >
    <h1 style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>
      {PAGE_TITLES[page]}
    </h1>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="btn-g"
          style={{
            padding: "6px 10px",
            height: 32,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          title="Recarregar Dados"
        >
          <Zap size={14} />
          <span>Atualizar</span>
        </button>
      )}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <span
        style={{
          fontSize: 11,
          color: T.muted2,
          background: T.cyanBg,
          border: `1px solid ${T.border}`,
          borderRadius: 6,
          padding: "3px 10px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        admin@prototech.com
      </span>
      <Avatar name="Admin Sistema" size={32} />
    </div>
  </div>
);

const AdminArea = ({
  onLogout,
  theme,
  toggleTheme,
  products = [],
  loadProducts,
  sales = [],
  loadSales,
  topProducts = [],
  loadTopProducts,
}) => {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const PAGES = {
    dashboard: Dashboard,
    produtos: Produtos,
    estoque: Estoque,
    vendas: Vendas,
    clientes: Clientes,
    funcs: Funcionarios,
    alertas: Alertas,
  };
  const Page = PAGES[page];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={onLogout}
        collapsed={collapsed}
        toggle={() => setCollapsed((v) => !v)}
        alertsCount={alertsCount}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar
          page={page}
          theme={theme}
          toggleTheme={toggleTheme}
          onRefresh={() => {
            if (loadProducts) loadProducts();
            if (loadSales) loadSales();
            if (loadTopProducts) loadTopProducts();
          }}
        />
        <Page
          key={page}
          products={products}
          loadProducts={loadProducts}
          sales={sales}
          loadSales={loadSales}
          topProducts={topProducts}
          loadTopProducts={loadTopProducts}
        />
      </div>
    </div>
  );
};

export default AdminArea;
