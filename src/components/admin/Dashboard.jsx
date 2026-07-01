import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { DollarSign, ShoppingCart, Package, AlertTriangle, Users } from "lucide-react";
import { T, fmt } from "../../utils/helpers";
import { StatCard, Badge, TH, TD } from "../common/UIComponents";

const CLIENTS = [
  {
    id: 1,
    name: "Lucas Ferreira",
    email: "lucas@email.com",
    phone: "(92) 99234-5678",
    city: "Manaus",
    since: "Jan 2023",
    purchases: 12,
    total: 1840.5,
  },
  {
    id: 2,
    name: "Mariana Souza",
    email: "mariana@email.com",
    phone: "(92) 98765-4321",
    city: "Manaus",
    since: "Mai 2023",
    purchases: 5,
    total: 729.3,
  },
  {
    id: 3,
    name: "Carlos Andrade",
    email: "carlos@email.com",
    phone: "(92) 99111-2233",
    city: "Parintins",
    since: "Jan 2024",
    purchases: 3,
    total: 290.7,
  },
  {
    id: 4,
    name: "Ana Lima",
    email: "ana@email.com",
    phone: "(92) 99444-5566",
    city: "Manaus",
    since: "Ago 2022",
    purchases: 28,
    total: 5620.0,
  },
  {
    id: 5,
    name: "Pedro Costa",
    email: "pedro@email.com",
    phone: "(92) 99777-8899",
    city: "Itacoatiara",
    since: "Mar 2024",
    purchases: 2,
    total: 189.8,
  },
];

const SALES_MONTHLY = [
  { month: "Jan", vendas: 12400, pedidos: 38 },
  { month: "Fev", vendas: 9800, pedidos: 29 },
  { month: "Mar", vendas: 15600, pedidos: 47 },
  { month: "Abr", vendas: 13200, pedidos: 41 },
  { month: "Mai", vendas: 18900, pedidos: 56 },
  { month: "Jun", vendas: 16700, pedidos: 52 },
];

const TOP_PRODUCTS = [
  { name: "Jumpers Kit", qty: 98 },
  { name: "Arduino UNO", qty: 87 },
  { name: "ESP32 DevKit", qty: 64 },
  { name: "DHT22 Sensor", qty: 41 },
  { name: "OLED Display", qty: 35 },
];

const RECENT_SALES = [
  {
    id: "VND-001",
    client: "Lucas Ferreira",
    items: 3,
    total: 189.7,
    date: "14/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-002",
    client: "Ana Lima",
    items: 7,
    total: 842.3,
    date: "14/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-003",
    client: "Mariana Souza",
    items: 2,
    total: 62.8,
    date: "13/05/2025",
    status: "Concluída",
  },
  {
    id: "VND-004",
    client: "Carlos Andrade",
    items: 4,
    total: 290.7,
    date: "13/05/2025",
    status: "Pendente",
  },
  {
    id: "VND-005",
    client: "Pedro Costa",
    items: 1,
    total: 49.9,
    date: "12/05/2025",
    status: "Cancelada",
  },
];

const Dashboard = ({ products = [], sales = [], topProducts = [] }) => {
  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const hasSales = sales.length > 0;
  const revenue = hasSales
    ? sales.reduce((a, s) => a + parseFloat(s.valor_total || 0), 0)
    : SALES_MONTHLY.reduce((a, s) => a + s.vendas, 0);

  const totalOrders = hasSales ? sales.length : 213;

  // Gerar dados do gráfico mensal a partir das vendas reais do banco
  const getMonthlySales = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const grouped = {};

    // Inicializar os últimos 6 meses com faturamento 0 para manter o gráfico bonito
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mLabel = months[d.getMonth()];
      grouped[mLabel] = 0;
    }

    sales.forEach(s => {
      if (!s.data_emissao) return;
      const d = new Date(s.data_emissao);
      const mLabel = months[d.getMonth()];
      if (grouped[mLabel] !== undefined) {
        grouped[mLabel] += parseFloat(s.valor_total || 0);
      }
    });

    return Object.keys(grouped).map(month => ({
      month,
      vendas: grouped[month]
    }));
  };

  const salesMonthlyData = hasSales ? getMonthlySales() : SALES_MONTHLY;
  const topProductsData = topProducts.length > 0 ? topProducts : TOP_PRODUCTS;
  const recentSalesData = hasSales ? sales.slice(0, 5) : RECENT_SALES;

  return (
    <div
      className="fi"
      style={{
        padding: 22,
        overflowY: "auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))",
          gap: 14,
        }}
      >
        <StatCard
          icon={DollarSign}
          label="Faturamento Mensal"
          value={fmt(revenue)}
          sub={hasSales ? "Faturamento real do banco de dados" : "↑ 12% vs mês anterior"}
          color={T.success}
        />
        <StatCard
          icon={ShoppingCart}
          label="Pedidos no Mês"
          value={totalOrders}
          sub={hasSales ? "Pedidos reais cadastrados" : "38 concluídos hoje"}
          color={T.cyan}
        />
        <StatCard
          icon={Package}
          label="Produtos Ativos"
          value={products.length}
          sub={`${products.filter((p) => p.stock > 0).length} com estoque`}
          color={T.cyan}
        />
        <StatCard
          icon={AlertTriangle}
          label="Alertas Críticos"
          value={alertsCount}
          sub="Estoque abaixo do mínimo"
          color={T.danger}
        />
        <StatCard
          icon={Users}
          label="Clientes"
          value={CLIENTS.length}
          sub="2 novos este mês"
          color={T.purple}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
            Faturamento Mensal
          </p>
          <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
            Jan – Dez {new Date().getFullYear()}
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={salesMonthlyData}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8c52ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8c52ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(140,82,255,0.06)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: T.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: T.muted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  color: T.text,
                  fontSize: 13,
                }}
                formatter={(v) => [fmt(v), "Faturamento"]}
              />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#8c52ff"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVendas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
            Mais Vendidos
          </p>
          <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
            Por quantidade
          </p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={topProductsData} layout="vertical">
              <XAxis
                type="number"
                tick={{ fill: T.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: T.muted2, fontSize: 10 }}
                width={75}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  color: T.text,
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="qty"
                fill="#8c52ff"
                radius={[0, 4, 4, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          Últimas Vendas
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["ID", "Cliente", "Itens", "Total", "Data", "Status"].map(
                (h) => (
                  <TH key={h}>{h}</TH>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {recentSalesData.map((s) => (
              <tr key={s.id_venda || s.id} className="tr">
                <TD
                  style={{
                    fontSize: 12,
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.muted2,
                  }}
                >
                  {s.id_venda ? `VD-${s.id_venda}` : s.id}
                </TD>
                <TD style={{ fontSize: 14, fontWeight: 500 }}>{s.nome_cliente || s.client}</TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>
                  {s.total_itens !== undefined ? `${s.total_itens} itens` : `${s.items} itens`}
                </TD>
                <TD
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontWeight: 600,
                  }}
                >
                  {fmt(parseFloat(s.valor_total || s.total))}
                </TD>
                <TD style={{ fontSize: 13, color: T.muted2 }}>
                  {s.data_emissao ? new Date(s.data_emissao).toLocaleDateString("pt-BR") : s.date}
                </TD>
                <TD>
                  <Badge status={s.status_venda ? (s.status_venda === "CONCLUIDA" ? "Concluído" : s.status_venda) : s.status} />
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
