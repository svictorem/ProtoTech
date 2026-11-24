import { useState } from "react";
import { Cpu, Shield, User, UserPlus } from "lucide-react";
import { API_URL } from "../utils/helpers";

const Login = ({ onLogin, onCadastro }) => {
  const [mode, setMode] = useState("admin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const go = async () => {
    if (mode === "admin") {
      if (email === "admin@prototech.com" && pass === "admin123") {
        onLogin("admin", "admin@prototech.com");
      } else setErr("Credenciais inválidas. Tente novamente.");
    } else {
      if (!email || !pass) {
        setErr("Preencha e-mail e senha");
        return;
      }
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_URL}/usuarios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login: email.trim().toLowerCase(),
            senha: pass,
          }),
        });
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Erro ao conectar com a API. Verifique se o servidor está rodando.");
        }
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "E-mail ou senha inválidos");
        }
        onLogin("client", data.login);
      } catch (e) {
        setErr(e.message || "Erro ao fazer login.");
      } finally {
        setLoading(false);
      }
    }
  };

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
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(140,82,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(140,82,255,0.05) 0%, transparent 55%)",
        }}
      />
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
          padding: "40px 36px",
          position: "relative",
          background: "#f8fafc",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: "rgba(124, 58, 237, 0.08)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <Cpu size={24} style={{ color: "#7c3aed" }} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0f172a",
              }}
            >
              Proto<span style={{ color: "#7c3aed" }}>Tech</span>
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            Sistema de Gestão Empresarial
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "#e2e8f0",
            borderRadius: 8,
            padding: 3,
            marginBottom: 24,
          }}
        >
          {["admin", "client"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErr("");
              }}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: 6,
                border: "none",
                background: mode === m ? "#7c3aed" : "transparent",
                color: mode === m ? "#ffffff" : "#475569",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {m === "admin" ? "Administrador" : "Cliente"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#475569",
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              E-mail
            </label>
            <input
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#0f172a",
                fontSize: 14,
                width: "100%",
                transition: "border-color .15s",
                outline: "none",
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              placeholder={
                mode === "admin" ? "admin@prototech.com" : "seu@email.com"
              }
              type="email"
            />
          </div>
          <div>
            <label
              style={{
                fontSize: 12,
                color: "#475569",
                marginBottom: 5,
                display: "block",
                fontWeight: 500,
              }}
            >
              Senha
            </label>
            <input
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#0f172a",
                fontSize: 14,
                width: "100%",
                transition: "border-color .15s",
                outline: "none",
              }}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setErr("");
              }}
              placeholder="••••••••"
              type="password"
              onKeyDown={(e) => e.key === "Enter" && go()}
            />
          </div>
          {err && (
            <p style={{ fontSize: 12, color: "#ef4444", textAlign: "center" }}>
              {err}
            </p>
          )}
          <button
            onClick={go}
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: 2,
              background: loading ? "#a78bfa" : "linear-gradient(90deg, #7c3aed, #4f46e5)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)"
            }}
          >
            {mode === "admin" ? <Shield size={14} /> : <User size={14} />}
            {loading ? "Entrando..." : `Entrar ${mode === "admin" ? "como Admin" : "como Cliente"}`}
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          {mode === "client" ? (
            <button
              onClick={onCadastro}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                color: "#7c3aed",
                border: "1px solid rgba(124,58,237,0.35)",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                fontSize: 13,
                fontFamily: "inherit",
                transition: "all .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <UserPlus size={14} />
              Não tem conta? Cadastre-se agora
            </button>
          ) : (
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              Acesso restrito a administradores
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
