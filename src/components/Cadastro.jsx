import { useState } from "react";
import { Cpu, UserPlus, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { API_URL } from "../utils/helpers";

// Máscara de CPF: 000.000.000-00
const maskCPF = (v) => {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
};

// Máscara de telefone: (00) 00000-0000
const maskPhone = (v) => {
  v = v.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 2) return v.length ? `(${v}` : "";
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
};

const InputField = ({ label, required, children, hint }) => (
  <div>
    <label
      style={{
        fontSize: 12,
        color: "#475569",
        marginBottom: 5,
        display: "block",
        fontWeight: 600,
      }}
    >
      {label}
      {required && (
        <span style={{ color: "#7c3aed", marginLeft: 3 }}>*</span>
      )}
    </label>
    {children}
    {hint && (
      <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{hint}</p>
    )}
  </div>
);

const inputStyle = {
  background: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  padding: "9px 12px",
  color: "#0f172a",
  fontSize: 14,
  width: "100%",
  outline: "none",
  transition: "border-color .15s",
  fontFamily: "inherit",
};

const Cadastro = ({ onBack, onSuccess }) => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    confirmSenha: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (field, value) => {
    setErr("");
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.nome.trim()) return "Nome completo é obrigatório.";
    if (form.nome.trim().length < 3) return "Nome deve ter pelo menos 3 caracteres.";
    const cpfDigits = form.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) return "CPF deve conter 11 dígitos.";
    if (!form.email.trim()) return "E-mail é obrigatório.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "E-mail inválido.";
    if (!form.senha) return "Senha é obrigatória.";
    if (form.senha.length < 6) return "Senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmSenha) return "As senhas não coincidem.";
    return null;
  };

  // Helper: faz fetch e garante JSON na resposta, mesmo se a API retornar HTML de erro
  const fetchJSON = async (url, options) => {
    let res;
    try {
      res = await fetch(url, options);
    } catch {
      throw new Error("Não foi possível conectar à API. Verifique se o servidor está rodando (node api/index.js).");
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `Servidor retornou uma resposta inesperada (HTTP ${res.status}). ` +
        "Verifique se a API está rodando corretamente."
      );
    }

    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) { setErr(error); return; }

    setLoading(true);
    setErr("");

    try {
      // 1. Cria o cliente na tabela Cliente
      const { ok: okCliente, data: clienteData } = await fetchJSON(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nome.trim(),
          cpf: form.cpf,
          email: form.email.trim().toLowerCase(),
          phone: form.telefone || null,
        }),
      });

      if (!okCliente) {
        throw new Error(clienteData.error || "Erro ao cadastrar cliente.");
      }

      // 2. Cria o usuário na tabela Usuario vinculado ao cliente
      const { ok: okUsuario, data: usuarioData } = await fetchJSON(`${API_URL}/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: form.email.trim().toLowerCase(),
          senha: form.senha,
          id_cliente: clienteData.id,
        }),
      });

      if (!okUsuario) {
        // Tenta reverter o cliente criado para não deixar órfão no banco
        await fetch(`${API_URL}/clientes/${clienteData.id}`, { method: "DELETE" }).catch(() => {});
        throw new Error(usuarioData.error || "Erro ao criar usuário.");
      }

      setSuccess(true);
    } catch (e) {
      setErr(e.message || "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #cdffd8 0%, #94b9ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid de fundo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(140,82,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(140,82,255,0.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="fi"
          style={{
            width: 400,
            padding: "48px 36px",
            background: "#f8fafc",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 16,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.22)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(0,191,99,0.1)",
              border: "1px solid rgba(0,191,99,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <CheckCircle size={32} style={{ color: "#00bf63" }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>
            Cadastro realizado!
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 28 }}>
            Sua conta foi criada com sucesso. Agora você pode fazer login com seu e-mail e senha.
          </p>
          <button
            onClick={onSuccess}
            style={{
              width: "100%",
              padding: "11px",
              background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
              fontFamily: "inherit",
            }}
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #cdffd8 0%, #94b9ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px 16px",
      }}
    >
      {/* Overlay radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(140,82,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(140,82,255,0.05) 0%, transparent 55%)",
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(140,82,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(140,82,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="fi"
        style={{
          width: "100%",
          maxWidth: 460,
          padding: "36px 36px 32px",
          position: "relative",
          background: "#f8fafc",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.22), 0 0 1px 1px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.15)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <Cpu size={22} style={{ color: "#7c3aed" }} />
            </div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0f172a",
              }}
            >
              Proto<span style={{ color: "#7c3aed" }}>Tech</span>
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: 13 }}>Criar nova conta de cliente</p>
        </div>

        {/* Formulário */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Nome */}
          <InputField label="Nome completo" required>
            <input
              style={inputStyle}
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              placeholder="Seu nome completo"
              type="text"
            />
          </InputField>

          {/* CPF */}
          <InputField label="CPF" required hint="Formato: 000.000.000-00">
            <input
              style={inputStyle}
              value={form.cpf}
              onChange={(e) => set("cpf", maskCPF(e.target.value))}
              placeholder="000.000.000-00"
              type="text"
              inputMode="numeric"
            />
          </InputField>

          {/* E-mail / Login */}
          <InputField
            label="E-mail"
            required
            hint="Será usado como login de acesso"
          >
            <input
              style={inputStyle}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="seu@email.com"
              type="email"
            />
          </InputField>

          {/* Telefone */}
          <InputField label="Telefone" hint="Opcional — (00) 00000-0000">
            <input
              style={inputStyle}
              value={form.telefone}
              onChange={(e) => set("telefone", maskPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              type="tel"
              inputMode="numeric"
            />
          </InputField>

          {/* Senha */}
          <InputField label="Senha" required hint="Mínimo de 6 caracteres">
            <div style={{ position: "relative" }}>
              <input
                style={{ ...inputStyle, paddingRight: 40 }}
                value={form.senha}
                onChange={(e) => set("senha", e.target.value)}
                placeholder="••••••••"
                type={showPass ? "text" : "password"}
              />
              <button
                onClick={() => setShowPass((v) => !v)}
                type="button"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </InputField>

          {/* Confirmar Senha */}
          <InputField label="Confirmar senha" required>
            <div style={{ position: "relative" }}>
              <input
                style={{ ...inputStyle, paddingRight: 40 }}
                value={form.confirmSenha}
                onChange={(e) => set("confirmSenha", e.target.value)}
                placeholder="••••••••"
                type={showConfirm ? "text" : "password"}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={() => setShowConfirm((v) => !v)}
                type="button"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </InputField>

          {/* Campos obrigatórios */}
          <p style={{ fontSize: 11, color: "#94a3b8" }}>
            <span style={{ color: "#7c3aed" }}>*</span> Campos obrigatórios
          </p>

          {/* Erro */}
          {err && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
                color: "#ef4444",
              }}
            >
              {err}
            </div>
          )}

          {/* Botão Cadastrar */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: 2,
              background: loading
                ? "#a78bfa"
                : "linear-gradient(90deg, #7c3aed, #4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
              fontSize: 14,
              fontFamily: "inherit",
              transition: "opacity .15s",
            }}
          >
            <UserPlus size={15} />
            {loading ? "Cadastrando..." : "Criar Conta"}
          </button>

          {/* Voltar ao login */}
          <button
            onClick={onBack}
            style={{
              width: "100%",
              padding: "9px",
              background: "transparent",
              color: "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 13,
              fontFamily: "inherit",
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#7c3aed";
              e.currentTarget.style.color = "#7c3aed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            <ArrowLeft size={14} />
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;

