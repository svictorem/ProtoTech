import { AlertTriangle } from "lucide-react";
import { T, API_URL } from "../../utils/helpers";
import { Badge, TH, TD } from "../common/UIComponents";

const Estoque = ({ products = [], loadProducts }) => {
  const alertsCount = products.filter((p) => p.stock <= p.minStock).length;

  const handleRestock = (p) => {
    const qtyStr = prompt(`Digite a quantidade a ser adicionada ao estoque de ${p.name}:`, "10");
    if (qtyStr === null) return;
    const qty = parseInt(qtyStr);
    if (isNaN(qty) || qty <= 0) {
      alert("⚠️ Digite uma quantidade válida maior que zero.");
      return;
    }

    const payload = {
      name: p.name,
      sku: p.sku,
      category: p.category,
      description: p.description,
      cost: p.cost,
      price: p.price,
      minStock: p.minStock,
      stock: p.stock + qty,
      location: p.location,
      id_fornecedor: p.id_fornecedor
    };

    fetch(`${API_URL}/produtos/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de conexão com o servidor");
        return res.json();
      })
      .then(() => {
        loadProducts();
        alert(`✅ Estoque de ${p.name} reabastecido com sucesso!`);
      })
      .catch((err) => alert("❌ Erro ao repor estoque: " + err.message));
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      {alertsCount > 0 && (
        <div
          style={{
            background: "rgba(255,71,87,0.07)",
            border: "1px solid rgba(255,71,87,0.2)",
            borderRadius: 10,
            padding: "11px 16px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle size={15} style={{ color: T.danger }} className="pl" />
          <span style={{ fontSize: 13, color: "#ff8090" }}>
            <strong>{alertsCount} produtos</strong> com estoque crítico ou zerado
            requerem atenção imediata
          </span>
        </div>
      )}

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
                "Produto",
                "SKU",
                "Qtd Atual",
                "Mínimo",
                "Localização",
                "Status",
                "Ação",
              ].map((h) => (
                <TH key={h}>{h}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
                  Nenhum registro de estoque disponível.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const st =
                  p.stock === 0
                    ? "Zerado"
                    : p.stock <= p.minStock
                      ? "Crítico"
                      : "Normal";
                const sc =
                  p.stock === 0
                    ? T.danger
                    : p.stock <= p.minStock
                      ? T.warning
                      : T.success;
                return (
                  <tr
                    key={p.id}
                    className="tr"
                    style={{
                      background:
                        p.stock === 0
                          ? "rgba(255,71,87,0.03)"
                          : p.stock <= p.minStock
                            ? "rgba(255,184,0,0.03)"
                            : "",
                    }}
                  >
                    <TD>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          borderLeft: `2px solid ${sc}`,
                          paddingLeft: 10,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{ fontSize: 11, color: T.muted, paddingLeft: 10 }}
                      >
                        {p.category}
                      </div>
                    </TD>
                    <TD
                      style={{
                        fontSize: 11,
                        fontFamily: "JetBrains Mono, monospace",
                        color: T.muted2,
                      }}
                    >
                      {p.sku}
                    </TD>
                    <TD>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: sc,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {p.stock}
                      </span>
                    </TD>
                    <TD style={{ fontSize: 13, color: T.muted2 }}>{p.minStock}</TD>
                    <TD
                      style={{
                        fontSize: 12,
                        color: T.muted2,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.location || "Sem prateleira"}
                    </TD>
                    <TD>
                      <Badge status={st} />
                    </TD>
                    <TD>
                      <button
                        className="btn-g"
                        style={{ padding: "5px 12px", fontSize: 12 }}
                        onClick={() => handleRestock(p)}
                      >
                        Repor
                      </button>
                    </TD>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;
