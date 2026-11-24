import { useState, useEffect } from "react";
import { Edit2, ShoppingBag, RefreshCw, Phone, Mail, Calendar, CreditCard } from "lucide-react";
import { T, fmt, useWindowSize, API_URL } from "../../utils/helpers";
import { Avatar, Badge } from "../common/UIComponents";

// Formata data do banco para exibição legível
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

// Formata data da venda
const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

// Skeleton de carregamento
const Skeleton = ({ w = "100%", h = 16, radius = 6, mb = 0 }) => (
  <div
    className="pl"
    style={{
      width: w,
      height: h,
      borderRadius: radius,
      background: "var(--color-surface3)",
      marginBottom: mb,
    }}
  />
);

const InfoCard = ({ icon: Icon, label, value }) => (
  <div
    style={{
      background: "var(--color-surface2)",
      borderRadius: 10,
      padding: "14px 16px",
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "var(--color-cyanBg)",
        border: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={14} style={{ color: "var(--color-cyan)" }} />
    </div>
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 11,
          color: "var(--color-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "var(--color-text)",
          wordBreak: "break-word",
        }}
      >
        {value || <span style={{ color: "var(--color-muted)" }}>Não informado</span>}
      </div>
    </div>
  </div>
);

const Perfil = ({ loginEmail }) => {
  const { isMobile } = useWindowSize();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const login = loginEmail || localStorage.getItem("pt-login");

  const buscarPerfil = () => {
    if (!login) {
      setErro("Nenhum usuário logado encontrado. Saia e faça login novamente.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);

    fetch(`${API_URL}/usuarios/perfil?login=${encodeURIComponent(login)}`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error(`Servidor retornou resposta inesperada (HTTP ${res.status}). Reinicie a API.`);
        }
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        return data;
      })
      .then((data) => {
        setPerfil(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro(err.message || "Erro ao carregar perfil. Verifique a API.");
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarPerfil();
  }, [login]);

  if (loading) {
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
        <div className="card" style={{ padding: isMobile ? 18 : 28, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--color-surface3)" }} className="pl" />
            <div style={{ flex: 1 }}>
              <Skeleton w="60%" h={18} mb={8} />
              <Skeleton w="40%" h={13} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} h={64} radius={10} />)}
          </div>
        </div>
        <div className="card" style={{ padding: isMobile ? 18 : 22 }}>
          <Skeleton w="40%" h={16} mb={16} />
          {[0, 1, 2].map((i) => <Skeleton key={i} h={52} mb={8} radius={8} />)}
        </div>
      </div>
    );
  }

  if (erro) {
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
            padding: 32,
            textAlign: "center",
            background: "var(--color-surface)",
            border: "1px solid rgba(var(--rgb-danger),0.2)",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", marginBottom: 8 }}>
            Não foi possível carregar o perfil
          </div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 20 }}>{erro}</div>
          <button className="btn-g" onClick={buscarPerfil} style={{ display: "inline-flex", gap: 6 }}>
            <RefreshCw size={14} /> Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const p = perfil;

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
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.05)",
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
          <Avatar name={p.nome} size={isMobile ? 48 : 60} color={T.cyan} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                fontSize: isMobile ? 17 : 20,
                fontWeight: 700,
                color: "var(--color-text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {p.nome}
            </h2>
            <p style={{ color: "var(--color-muted)", fontSize: 12, marginTop: 2 }}>
              Cliente desde {formatDate(p.data_cadastro)}
            </p>
          </div>
          <button
            className="btn-g"
            style={{
              padding: isMobile ? "6px 10px" : "8px 12px",
              fontSize: isMobile ? 12 : 13,
              flexShrink: 0,
            }}
            title="Editar perfil (em breve)"
          >
            <Edit2 size={13} />
            {!isMobile && " Editar"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <InfoCard icon={Mail} label="E-mail" value={p.email} />
          <InfoCard icon={Phone} label="Telefone" value={p.telefone} />
          <InfoCard icon={CreditCard} label="CPF" value={p.cpf} />
          <InfoCard icon={Calendar} label="Membro desde" value={formatDate(p.data_cadastro)} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 10,
          }}
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
              {p.totalPedidos}
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
                fontSize: p.totalGasto >= 10000 ? 18 : 22,
                fontWeight: 700,
                color: "var(--color-cyan)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {fmt(p.totalGasto)}
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
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 16,
            color: "var(--color-text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Pedidos Recentes</span>
          {p.totalPedidos > 0 && (
            <span
              style={{
                fontSize: 11,
                color: "var(--color-muted)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {p.totalPedidos} pedido{p.totalPedidos !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {p.pedidos && p.pedidos.length > 0 ? (
          p.pedidos.map((s) => (
            <div
              key={s.id_venda}
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
                  flexShrink: 0,
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
                  {s.numero_nf}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                  {s.total_itens} iten{s.total_itens !== 1 ? "s" : ""} · {formatDateTime(s.data_emissao)}
                </div>
              </div>
              <Badge status={s.status_venda === "CONCLUIDA" ? "Concluída" : s.status_venda} />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 700,
                  color: "var(--color-cyan)",
                  minWidth: isMobile ? "auto" : 80,
                  textAlign: "right",
                  fontSize: isMobile ? 13 : 14,
                  flexShrink: 0,
                }}
              >
                {fmt(parseFloat(s.valor_total))}
              </span>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px",
              color: "var(--color-muted)",
            }}
          >
            <ShoppingBag size={32} style={{ marginBottom: 10, opacity: 0.3 }} />
            <div style={{ fontSize: 14 }}>Nenhum pedido realizado ainda.</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              Seus pedidos aparecerão aqui após a primeira compra.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
