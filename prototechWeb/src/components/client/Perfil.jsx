import { Edit2, ShoppingBag } from "lucide-react";
import { T, fmt, useWindowSize } from "../../utils/helpers";
import { Avatar, Badge } from "../common/UIComponents";

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
];

const Perfil = () => {
  const { isMobile } = useWindowSize();
  const c = CLIENTS[0];
  return (
    <div
      style={{
        padding: isMobile ? "16px 12px" : "28px 32px",
        overflowY: "auto",
        flex: 1,
        maxWidth: 680,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          padding: isMobile ? 18 : 28,
          marginBottom: 18,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 10 : 16,
            marginBottom: 24,
          }}
        >
          <Avatar name={c.name} size={isMobile ? 48 : 60} color={T.cyan} />
          <div>
            <h2 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 700, color: "var(--color-text)" }}>{c.name}</h2>
            <p style={{ color: "var(--color-muted)", fontSize: 12, marginTop: 2 }}>
              Cliente desde {c.since}
            </p>
          </div>
          <button className="btn-g" style={{ marginLeft: "auto", padding: isMobile ? "6px 10px" : "8px 12px", fontSize: isMobile ? 12 : 13 }}>
            <Edit2 size={13} /> {!isMobile && "Editar"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {[
            ["E-mail", c.email],
            ["Telefone", c.phone],
            ["Cidade", c.city],
            ["Membro desde", c.since],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: "var(--color-surface2)",
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-muted)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                {l}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{v}</div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}
        >
          <div
            style={{
              background: "var(--color-cyanBg)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "var(--color-cyan)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {c.purchases}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 3 }}>
              Pedidos Realizados
            </div>
          </div>
          <div
            style={{
              background: "var(--color-cyanBg)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--color-cyan)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {fmt(c.total)}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 3 }}>
              Total Investido
            </div>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          padding: isMobile ? 18 : 22,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "var(--color-text)" }}>
          Pedidos Recentes
        </div>
        {RECENT_SALES.slice(0, 4).map((s) => (
          <div
            key={s.id}
            className="tr"
            style={{
              padding: "12px 0",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "var(--color-surface2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBag size={16} style={{ color: "var(--color-cyan)" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--color-text)",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {s.id}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                {s.items} itens · {s.date}
              </div>
            </div>
            <Badge status={s.status} />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                color: "var(--color-cyan)",
                minWidth: isMobile ? "auto" : 80,
                textAlign: "right",
                fontSize: isMobile ? 13 : 14,
              }}
            >
              {fmt(s.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Perfil;
