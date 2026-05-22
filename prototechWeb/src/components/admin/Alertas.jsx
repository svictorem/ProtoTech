import { useState } from "react";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { T } from "../../utils/helpers";

const Alertas = ({ products = [] }) => {
  const [resolved, setResolved] = useState([]);
  const alerts = products.filter((p) => p.stock <= p.minStock);

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div
        style={{
          background: "rgba(255,71,87,0.07)",
          border: "1px solid rgba(255,71,87,0.2)",
          borderRadius: 10,
          padding: "12px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <AlertTriangle size={16} style={{ color: T.danger }} className="pl" />
        <div>
          <span style={{ fontSize: 14, color: "#ff8090", fontWeight: 600 }}>
            {alerts.length - resolved.length} alertas pendentes
          </span>
          <span style={{ fontSize: 13, color: T.muted2, marginLeft: 8 }}>
            · {resolved.length} resolvidos
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
          gap: 16,
        }}
      >
        {alerts.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }}>
            🎉 Todos os produtos estão com níveis de estoque saudáveis!
          </div>
        ) : (
          alerts.map((p) => {
            const isDone = resolved.includes(p.id);
            const isCrit = p.stock === 0;
            return (
              <div
                key={p.id}
                className="card"
                style={{
                  padding: 20,
                  borderColor: isDone
                    ? "rgba(0,191,99,0.3)"
                    : isCrit
                      ? "rgba(255,71,87,0.3)"
                      : "rgba(255,184,0,0.3)",
                  opacity: isDone ? 0.6 : 1,
                  transition: "opacity .3s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {isDone ? (
                    <CheckCircle size={15} style={{ color: T.success }} />
                  ) : (
                    <AlertTriangle
                      size={15}
                      style={{ color: isCrit ? T.danger : T.warning }}
                      className={isDone ? "" : "pl"}
                    />
                  )}
                  <span
                    className={`badge ${isDone ? "b-ok" : isCrit ? "b-err" : "b-warn"}`}
                  >
                    {isDone ? "Resolvido" : isCrit ? "Zerado" : "Crítico"}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      color: T.muted,
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {p.sku}
                  </span>
                </div>

                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: T.muted2, marginBottom: 14 }}>
                  {p.category} · {p.supplier}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      background: T.surface2,
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 3,
                      }}
                    >
                      Atual
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: isCrit ? T.danger : T.warning,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.stock}
                    </div>
                  </div>
                  <div
                    style={{
                      background: T.surface2,
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: T.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 3,
                      }}
                    >
                      Mínimo
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: T.muted2,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.minStock}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn-p"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: "8px",
                      opacity: isDone ? 0.5 : 1,
                    }}
                    disabled={isDone}
                    onClick={() => alert(`Solicitado reabastecimento de ${p.name} ao fornecedor ${p.supplier}.`)}
                  >
                    Solicitar Reposição
                  </button>
                  <button
                    className="btn-g"
                    style={{ padding: "8px 12px" }}
                    onClick={() =>
                      setResolved((r) =>
                        isDone ? r.filter((x) => x !== p.id) : [...r, p.id]
                      )
                    }
                  >
                    {isDone ? <X size={13} /> : <CheckCircle size={13} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alertas;
