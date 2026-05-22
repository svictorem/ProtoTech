import { useState, useEffect } from "react";
import { Package, ShoppingCart, Plus, X, CheckCircle } from "lucide-react";
import { T, fmt, API_URL } from "../../utils/helpers";
import { Badge, TH, TD } from "../common/UIComponents";

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

const Vendas = ({ products = [], sales = [], loadSales, loadProducts }) => {
  const [tab, setTab] = useState("lista");
  const [cartV, setCartV] = useState([]);
  const [clientId, setClientId] = useState("");
  const [dbClients, setDbClients] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/clientes`)
      .then((res) => res.json())
      .then((data) => setDbClients(data))
      .catch((err) => console.error("Erro ao carregar clientes para vendas:", err));
  }, []);

  const addItem = (p) => {
    const itemNoCarrinho = cartV.find((i) => i.id === p.id);
    const qtdAtual = itemNoCarrinho ? itemNoCarrinho.qty : 0;
    if (qtdAtual >= p.stock) {
      alert(`⚠️ Estoque insuficiente! Apenas ${p.stock} unidades disponíveis.`);
      return;
    }

    setCartV((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });
  };

  const handleFinalize = () => {
    if (!clientId) {
      alert("⚠️ Por favor, selecione um cliente!");
      return;
    }
    if (cartV.length === 0) {
      alert("⚠️ O carrinho está vazio!");
      return;
    }

    const payload = {
      id_cliente: parseInt(clientId),
      items: cartV.map(item => ({
        id_produto: item.id,
        quantidade: item.qty,
        preco_unitario: item.price
      }))
    };

    fetch(`${API_URL}/vendas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de processamento no servidor de banco de dados");
        return res.json();
      })
      .then(() => {
        alert("✅ Venda registrada com sucesso no banco de dados MySQL!");
        setCartV([]);
        setClientId("");
        setTab("lista");
        if (loadSales) loadSales();
        if (loadProducts) loadProducts();
      })
      .catch((err) => {
        console.error("Erro ao processar venda:", err);
        alert(`❌ Erro ao finalizar venda: ${err.message}`);
      });
  };

  const total = cartV.reduce((s, i) => s + i.price * i.qty, 0);
  const activeProducts = products.filter((p) => p.stock > 0);

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {[
          { id: "lista", label: "Histórico de Vendas" },
          { id: "nova", label: "Nova Venda" },
        ].map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setTab(t.id)}
            style={{
              color: tab === t.id ? T.cyan : T.muted,
              fontWeight: tab === t.id ? 600 : 400,
              borderBottomColor: tab === t.id ? T.cyan : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "lista" ? (
        <div className="card" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${T.border}`,
                  background: T.surface2,
                }}
              >
                {[
                  "ID Venda",
                  "Cliente",
                  "Itens",
                  "Total",
                  "Data",
                  "Status",
                ].map((h) => (
                  <TH key={h}>{h}</TH>
                ))}
              </tr>
            </thead>
            <tbody>
              {(sales.length > 0 ? sales : RECENT_SALES).map((s) => (
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 12,
                  color: T.muted2,
                  marginBottom: 5,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Selecionar Cliente
              </label>
              <div className="select-scroll-wrapper">
                <select
                  className="inp"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  size={dbClients.length > 4 ? 5 : undefined}
                  style={dbClients.length > 4 ? { height: "auto", appearance: "auto", WebkitAppearance: "auto", paddingRight: 12 } : {}}
                >
                  <option value="">— Selecione o cliente —</option>
                  {dbClients.map((c) => (
                    <option key={c.id_cliente} value={c.id_cliente}>
                      {c.nome_cliente} – CPF: {c.cpf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  padding: "13px 16px",
                  borderBottom: `1px solid ${T.border}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.muted2,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Produtos Disponíveis
              </div>
              {activeProducts.map((p) => (
                <div
                  key={p.id}
                  className="tr"
                  style={{
                    padding: "11px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: T.surface2,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Package size={18} style={{ color: `${T.cyan}66` }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted2 }}>
                      {p.category} · Estoque: {p.stock}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {fmt(p.price)}
                  </span>
                  <button
                    className="btn-g"
                    style={{ padding: "5px 12px" }}
                    onClick={() => addItem(p)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShoppingCart size={16} style={{ color: T.cyan }} /> Carrinho de
              Venda
            </div>

            {cartV.length === 0 ? (
              <p
                style={{
                  color: T.muted,
                  fontSize: 13,
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Adicione produtos ao carrinho
              </p>
            ) : (
              cartV.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 500, maxWidth: 160 }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted2 }}>
                      Qtd: {item.qty} × {fmt(item.price)}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: T.cyan,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {fmt(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() =>
                        setCartV((c) => c.filter((i) => i.id !== item.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: T.muted,
                        display: "flex",
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}

            {cartV.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0 10px",
                    borderTop: `1px solid ${T.border}`,
                    marginTop: 8,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {fmt(total)}
                  </span>
                </div>
                <button
                  className="btn-p"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                  onClick={handleFinalize}
                >
                  <CheckCircle size={14} /> Finalizar Venda
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendas;
