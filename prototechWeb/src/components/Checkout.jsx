import { useState } from "react";
import {
  User, MapPin, CreditCard, CheckCircle,
  ChevronLeft, ChevronRight, ShoppingBag,
  QrCode, Barcode, Lock, ArrowRight,
} from "lucide-react";
import { useToast } from "./ToastSystem";

const T = {
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  surface2: "var(--color-surface2)",
  surface3: "var(--color-surface3)",
  border: "var(--color-border)",
  borderHover: "var(--color-borderHover)",
  cyan: "var(--color-cyan)",
  cyanBg: "var(--color-cyanBg)",
  text: "var(--color-text)",
  muted: "var(--color-muted)",
  muted2: "var(--color-muted2)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  purple: "var(--color-purple)",
};

const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const STEPS = [
  { id: 1, label: "Dados Pessoais", icon: User },
  { id: 2, label: "Endereço",       icon: MapPin },
  { id: 3, label: "Pagamento",      icon: CreditCard },
  { id: 4, label: "Confirmação",    icon: CheckCircle },
];

// ── Barra de Progresso ──────────────────────────────────────────────
function StepBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32, position: "relative" }}>
      {STEPS.map((s, idx) => {
        const done = current > s.id;
        const active = current === s.id;
        const Icon = s.icon;
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: idx < STEPS.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done ? T.success : active ? T.cyan : T.surface2,
                  border: `2px solid ${done ? T.success : active ? T.cyan : T.border}`,
                  boxShadow: active ? `0 0 0 4px rgba(140,82,255,0.15)` : "none",
                  transition: "all 0.3s ease",
                  animation: active ? "stepPulse 2s ease-in-out infinite" : "none",
                }}
              >
                {done
                  ? <CheckCircle size={18} color="#fff" />
                  : <Icon size={18} color={active ? "#fff" : T.muted} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? T.cyan : done ? T.success : T.muted, whiteSpace: "nowrap" }}>
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: "0 8px", marginBottom: 20,
                background: done ? T.success : T.border,
                transition: "background 0.4s ease",
              }} />
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes stepPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(140,82,255,0.15); }
          50%      { box-shadow: 0 0 0 8px rgba(140,82,255,0.25); }
        }
      `}</style>
    </div>
  );
}

// ── Campo de Input ──────────────────────────────────────────────────
function Field({ label, id, value, onChange, placeholder, type = "text", required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: T.muted2, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}{required && <span style={{ color: T.danger }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="inp"
        style={{ fontSize: 14 }}
      />
    </div>
  );
}

// ── Etapa 1: Dados Pessoais ─────────────────────────────────────────
function Step1({ data, setData }) {
  return (
    <div className="fi" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Nome Completo" id="nome" required value={data.nome} onChange={v => setData(p => ({ ...p, nome: v }))} placeholder="Ex: Lucas Ferreira" />
      </div>
      <Field label="E-mail" id="email" type="email" required value={data.email} onChange={v => setData(p => ({ ...p, email: v }))} placeholder="email@exemplo.com" />
      <Field label="Telefone" id="tel" value={data.tel} onChange={v => setData(p => ({ ...p, tel: v }))} placeholder="(92) 99234-5678" />
      <Field label="CPF" id="cpf" required value={data.cpf} onChange={v => setData(p => ({ ...p, cpf: v }))} placeholder="000.000.000-00" />
      <Field label="Data de Nascimento" id="nasc" type="date" value={data.nasc} onChange={v => setData(p => ({ ...p, nasc: v }))} />
    </div>
  );
}

// ── Etapa 2: Endereço ───────────────────────────────────────────────
function Step2({ data, setData }) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const fetchCep = () => {
    const cep = data.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      addToast({ type: "warning", message: "CEP deve conter 8 dígitos!", duration: 3000 });
      return;
    }
    setLoading(true);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((res) => {
        if (res.erro) {
          addToast({ type: "error", message: "CEP não encontrado!", duration: 3000 });
        } else {
          setData((p) => ({
            ...p,
            rua: res.logradouro || "",
            bairro: res.bairro || "",
            cidade: res.localidade || "",
            estado: res.uf || "",
          }));
          addToast({ type: "success", message: "Endereço localizado com sucesso!", duration: 2000 });
        }
      })
      .catch(() => {
        addToast({ type: "error", message: "Erro ao buscar CEP!", duration: 3000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="fi" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ gridColumn: "1/-1", display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Field label="CEP" id="cep" required value={data.cep} onChange={v => setData(p => ({ ...p, cep: v }))} placeholder="69000-000" />
        </div>
        <button
          onClick={fetchCep}
          className="btn-g"
          style={{ alignSelf: "flex-end", padding: "8px 16px", fontSize: 13, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <Field label="Logradouro" id="rua" required value={data.rua} onChange={v => setData(p => ({ ...p, rua: v }))} placeholder="Rua, Av, Travessa..." />
      </div>
      <Field label="Número" id="num" required value={data.num} onChange={v => setData(p => ({ ...p, num: v }))} placeholder="123" />
      <Field label="Complemento" id="comp" value={data.comp} onChange={v => setData(p => ({ ...p, comp: v }))} placeholder="Apto, Sala..." />
      <Field label="Bairro" id="bairro" required value={data.bairro} onChange={v => setData(p => ({ ...p, bairro: v }))} placeholder="Bairro" />
      <Field label="Cidade" id="cidade" required value={data.cidade} onChange={v => setData(p => ({ ...p, cidade: v }))} placeholder="Cidade" />
      <Field label="Estado" id="estado" value={data.estado} onChange={v => setData(p => ({ ...p, estado: v }))} placeholder="AM" />
    </div>
  );
}

// ── Card de Crédito Visual ──────────────────────────────────────────
function CreditCardVisual({ num, nome, validade, cvv, flipped }) {
  const displayNum = (num.padEnd(16, "•")).replace(/(.{4})/g, "$1 ").trim();
  return (
    <div style={{ perspective: 600, width: 300, height: 175, margin: "0 auto 24px" }}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.6s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        {/* Frente */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          borderRadius: 16, padding: "20px 24px",
          background: "linear-gradient(135deg, #4c1d95, #7c3aed, #8c52ff)",
          boxShadow: "0 20px 48px rgba(140,82,255,0.35)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 36, height: 26, background: "linear-gradient(135deg,#ffd700,#ffa500)", borderRadius: 4 }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600 }}>PROTOTECH</span>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", color: "#fff", fontSize: 17, letterSpacing: 2 }}>
            {displayNum}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>TITULAR</div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{nome || "SEU NOME"}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>VALIDADE</div>
              <div style={{ color: "#fff", fontSize: 13 }}>{validade || "MM/AA"}</div>
            </div>
          </div>
        </div>
        {/* Verso */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)", borderRadius: 16,
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          boxShadow: "0 20px 48px rgba(140,82,255,0.35)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{ height: 40, background: "#000", margin: "0 -1px 16px" }} />
          <div style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <div style={{
              background: "#fff", borderRadius: 4, padding: "6px 14px",
              fontFamily: "JetBrains Mono, monospace", fontSize: 16, color: "#1e1b4b", fontWeight: 700,
            }}>
              {cvv || "CVV"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Etapa 3: Pagamento ──────────────────────────────────────────────
function Step3({ data, setData }) {
  const [method, setMethod] = useState(data.method || "credit");
  const [flipped, setFlipped] = useState(false);

  const sel = (m) => {
    setMethod(m);
    setData(p => ({ ...p, method: m }));
  };

  const methods = [
    { id: "credit", label: "Cartão de Crédito", icon: CreditCard },
    { id: "pix",    label: "Pix",               icon: QrCode },
    { id: "boleto", label: "Boleto",             icon: Barcode },
  ];

  return (
    <div className="fi">
      {/* Seletores */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {methods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => sel(id)}
            style={{
              flex: 1, padding: "12px 8px", borderRadius: 10, cursor: "pointer",
              border: `2px solid ${method === id ? T.cyan : T.border}`,
              background: method === id ? T.cyanBg : T.surface2,
              color: method === id ? T.cyan : T.muted,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              fontWeight: 600, fontSize: 12, transition: "all .2s",
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>

      {/* Cartão de Crédito */}
      {method === "credit" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <CreditCardVisual
              num={data.cardNum || ""}
              nome={data.cardNome || ""}
              validade={data.cardVal || ""}
              cvv={data.cardCvv || ""}
              flipped={flipped}
            />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Número do Cartão" id="cardNum" required value={data.cardNum || ""}
              onChange={v => setData(p => ({ ...p, cardNum: v.replace(/\D/g,"").slice(0,16) }))}
              placeholder="0000 0000 0000 0000" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Nome no Cartão" id="cardNome" required value={data.cardNome || ""}
              onChange={v => setData(p => ({ ...p, cardNome: v.toUpperCase() }))}
              placeholder="NOME COMPLETO" />
          </div>
          <Field label="Validade" id="cardVal" required value={data.cardVal || ""}
            onChange={v => setData(p => ({ ...p, cardVal: v }))} placeholder="MM/AA" />
          <div
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
          >
            <Field label="CVV" id="cardCvv" required value={data.cardCvv || ""}
              onChange={v => setData(p => ({ ...p, cardCvv: v.slice(0,4) }))} placeholder="•••" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Parcelas" id="parcelas" value={data.parcelas || ""}
              onChange={v => setData(p => ({ ...p, parcelas: v }))} placeholder="1x sem juros" />
          </div>
        </div>
      )}

      {/* Pix */}
      {method === "pix" && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{
            display: "inline-block", padding: 16, background: "#fff", borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)", marginBottom: 16,
          }}>
            <svg width={160} height={160} viewBox="0 0 160 160">
              {Array.from({ length: 10 }).map((_, r) =>
                Array.from({ length: 10 }).map((_, c) => (
                  Math.random() > 0.4 ? (
                    <rect key={`${r}-${c}`} x={c * 16} y={r * 16} width={14} height={14} rx={2} fill="#1e1b4b" />
                  ) : null
                ))
              )}
              <rect x={60} y={60} width={40} height={40} rx={4} fill="#7c3aed" />
              <text x={80} y={83} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">PR</text>
            </svg>
          </div>
          <p style={{ fontWeight: 600, marginBottom: 8, color: T.text }}>Escaneie o QR Code no seu banco</p>
          <div style={{
            background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8,
            padding: "10px 16px", fontSize: 12, fontFamily: "JetBrains Mono, monospace",
            color: T.cyan, wordBreak: "break-all", marginTop: 8,
          }}>
            prototech@pix.com.br
          </div>
          <p style={{ fontSize: 12, color: T.muted, marginTop: 10 }}>
            Após o pagamento, você receberá a confirmação por e-mail.
          </p>
        </div>
      )}

      {/* Boleto */}
      {method === "boleto" && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{
            background: "#fff", borderRadius: 10, padding: "18px 20px", marginBottom: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}>
            <svg width="100%" height={60} viewBox="0 0 280 60">
              {Array.from({ length: 60 }).map((_, i) => {
                const w = 1 + Math.floor(Math.random() * 3);
                const x = i * 4.5;
                return <rect key={i} x={x} y={0} width={w} height={60} fill="#111" />;
              })}
            </svg>
          </div>
          <p style={{ fontWeight: 600, marginBottom: 8, color: T.text }}>Código do Boleto</p>
          <div style={{
            background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8,
            padding: "10px 16px", fontSize: 11, fontFamily: "JetBrains Mono, monospace",
            color: T.muted2, wordBreak: "break-all",
          }}>
            34191.09008 63521.020002 60960.073010 8 10000012340
          </div>
          <button className="btn-g" style={{ margin: "14px auto 0", fontSize: 12 }}>
            Copiar Código
          </button>
          <p style={{ fontSize: 12, color: T.muted, marginTop: 10 }}>
            Vencimento em <strong style={{ color: T.warning }}>3 dias úteis</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Etapa 4: Confirmação ────────────────────────────────────────────
function Step4({ cart, personal, address, payment }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const methodLabels = { credit: "Cartão de Crédito", pix: "Pix", boleto: "Boleto Bancário" };

  return (
    <div className="fi" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Itens */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: T.cyan }}>
          🛒 Itens do Pedido
        </div>
        {cart.map(item => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{item.name} <span style={{ color: T.muted }}>×{item.qty}</span></div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", color: T.cyan, fontSize: 13 }}>{fmt(item.price * item.qty)}</div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 700, fontSize: 15 }}>
          <span>Total</span>
          <span style={{ color: T.cyan, fontFamily: "JetBrains Mono, monospace" }}>{fmt(total)}</span>
        </div>
      </div>

      {/* Dados */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: T.cyan }}>📦 Entrega</div>
        <p style={{ fontSize: 13, color: T.text }}>{personal.nome}</p>
        <p style={{ fontSize: 12, color: T.muted2 }}>{address.rua}, {address.num} — {address.bairro}</p>
        <p style={{ fontSize: 12, color: T.muted2 }}>{address.cidade} / {address.estado} — CEP: {address.cep}</p>
      </div>

      {/* Pagamento */}
      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: T.cyan }}>💳 Pagamento</div>
        <p style={{ fontSize: 13, color: T.text }}>{methodLabels[payment.method] || "—"}</p>
        {payment.method === "credit" && payment.cardNum && (
          <p style={{ fontSize: 12, color: T.muted2, fontFamily: "JetBrains Mono, monospace" }}>
            •••• •••• •••• {payment.cardNum.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Checkout Principal ──────────────────────────────────────────────
export default function Checkout({ cart, setCart, setPage }) {
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [personal, setPersonal] = useState({
    nome: "Lucas Ferreira", email: "lucas@email.com",
    tel: "(92) 99234-5678", cpf: "000.000.000-00", nasc: "",
  });
  const [address, setAddress] = useState({
    cep: "", rua: "", num: "", comp: "", bairro: "", cidade: "", estado: "",
  });
  const [payment, setPayment] = useState({ method: "credit", cardNum: "", cardNome: "", cardVal: "", cardCvv: "", parcelas: "1x sem juros" });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const validateStep = () => {
    if (step === 1) return personal.nome && personal.email && personal.cpf;
    if (step === 2) return address.rua && address.num && address.cidade;
    if (step === 3) return true;
    return true;
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      // 1. Busca todos os clientes cadastrados no banco de dados para verificar duplicidade por CPF
      const clientsRes = await fetch("http://localhost:3000/api/clientes");
      if (!clientsRes.ok) throw new Error("Erro ao buscar base de clientes no servidor");
      const clientsList = await clientsRes.json();
      
      const cleanCpf = personal.cpf.replace(/\D/g, "");
      let targetClient = clientsList.find(c => c.cpf && c.cpf.replace(/\D/g, "") === cleanCpf);
      let id_cliente = targetClient ? targetClient.id_cliente : null;
      
      // 2. Se o cliente não existir no banco de dados, cadastra um novo de forma automática
      if (!id_cliente) {
        const createRes = await fetch("http://localhost:3000/api/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: personal.nome,
            cpf: personal.cpf,
            email: personal.email,
            phone: personal.tel
          })
        });
        if (!createRes.ok) {
          const errData = await createRes.json();
          throw new Error(errData.error || "Erro ao cadastrar cliente no banco");
        }
        const createData = await createRes.json();
        id_cliente = createData.id;
      }
      
      // 3. Mapeia os itens do carrinho para o formato esperado pelo endpoint de Vendas da API
      const apiItems = cart.map(item => ({
        id_produto: item.id,
        quantidade: item.qty,
        preco_unitario: item.price
      }));
      
      // 4. Registra a Venda no banco (transacional com baixa automática e geração de Nota Fiscal)
      const saleRes = await fetch("http://localhost:3000/api/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_cliente: id_cliente,
          items: apiItems
        })
      });
      
      if (!saleRes.ok) {
        const errData = await saleRes.json();
        throw new Error(errData.error || "Erro ao registrar venda");
      }
      
      const saleData = await saleRes.json();
      addToast({ 
        type: "success", 
        message: `🎉 Pedido confirmado com sucesso! Nota Fiscal gerada: ${saleData.numero_nf || ""}`, 
        duration: 6000 
      });
      setCart([]);
      setPage("home");
    } catch (err) {
      console.error("Erro no checkout:", err);
      addToast({ 
        type: "error", 
        message: err.message || "Erro de conexão ao processar compra!", 
        duration: 5000 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", flex: 1 }}>
      <style>{`
        @keyframes stepPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(140,82,255,0.15); }
          50%      { box-shadow: 0 0 0 8px rgba(140,82,255,0.25); }
        }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>

        {/* Cabeçalho */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <button
            className="btn-g"
            style={{ padding: "8px 10px", display: "flex" }}
            onClick={() => step === 1 ? setPage("carrinho") : setStep(s => s - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <div>
            <h2 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700 }}>Checkout</h2>
            <p style={{ fontSize: 12, color: "var(--color-muted2)", marginTop: 2 }}>
              Etapa {step} de {STEPS.length}
            </p>
          </div>
          <div style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", color: "var(--color-cyan)", fontWeight: 700, fontSize: isMobile ? 16 : 20 }}>
            {fmt(total)}
          </div>
        </div>

        {/* Progress */}
        <StepBar current={step} />

        {/* Card do formulário */}
        <div className="card" style={{ padding: isMobile ? 18 : 28, marginBottom: 20 }}>
          {step === 1 && <Step1 data={personal} setData={setPersonal} />}
          {step === 2 && <Step2 data={address}  setData={setAddress} />}
          {step === 3 && <Step3 data={payment}  setData={setPayment} />}
          {step === 4 && <Step4 cart={cart} personal={personal} address={address} payment={payment} />}
        </div>

        {/* Aviso de segurança */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--color-muted)", marginBottom: 20 }}>
          <Lock size={12} />
          Ambiente seguro — seus dados são protegidos com criptografia SSL
        </div>

        {/* Botões de navegação */}
        <div style={{ display: "flex", gap: 10 }}>
          {step < 4 ? (
            <button
              className="btn-p"
              style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: 14, opacity: validateStep() ? 1 : 0.5 }}
              disabled={!validateStep()}
              onClick={() => setStep(s => s + 1)}
            >
              Próxima Etapa <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className="btn-p"
              style={{ flex: 1, justifyContent: "center", padding: "13px", fontSize: 14, opacity: submitting ? 0.6 : 1 }}
              disabled={submitting}
              onClick={handleConfirm}
            >
              {submitting ? "Processando..." : "Confirmar Pedido"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
