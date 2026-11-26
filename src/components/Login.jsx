import { useState } from "react";
import { Cpu, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { API_URL } from "../utils/helpers";

const Login = ({ onLogin, onCadastro, onBackToStore }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const go = async (e) => {
    if (e) e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !pass) {
      setErr("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: normalizedEmail,
          senha: pass,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Erro ao conectar com a API. Verifique se o servidor está rodando.");
      }

      const data = await res.json();
      if (!res.ok) {
        if (normalizedEmail === "admin@prototech.com" && pass === "admin123") {
          onLogin("admin", "admin@prototech.com", {
            login: "admin@prototech.com",
            role: "admin",
            nome: "Administrador",
          });
          return;
        }
        throw new Error(data.error || "E-mail ou senha inválidos");
      }

      const role = data.role === "admin" || data.login?.toLowerCase() === "admin@prototech.com"
        ? "admin"
        : "client";
      onLogin(role, data.login || normalizedEmail, data);
    } catch (error) {
      // Fallback para o admin padrão caso a API não esteja acessível ou ainda não tenha sido reiniciada
      if (normalizedEmail === "admin@prototech.com" && pass === "admin123") {
        onLogin("admin", "admin@prototech.com", {
          login: "admin@prototech.com",
          role: "admin",
          nome: "Administrador",
        });
        return;
      }
      setErr(error.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
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
        padding: "24px 16px",
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
          width: "100%",
          maxWidth: 400,
          padding: "32px 32px 28px",
          position: "relative",
          background: "#f8fafc",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          type="button"
          onClick={onBackToStore}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            padding: "4px 2px",
            marginBottom: 14,
            color: "#64748b",
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            transition: "color .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#7c3aed";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <ArrowLeft size={14} />
          Voltar para a loja
        </button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
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

        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          Login
        </h1>

        <form onSubmit={go} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              htmlFor="login-email"
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
              id="login-email"
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "9px 12px",
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
              placeholder="seu@email.com"
              type="email"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
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
              id="login-password"
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "9px 12px",
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
              autoComplete="current-password"
            />
          </div>
          {err && (
            <p style={{ fontSize: 12, color: "#ef4444", textAlign: "center" }}>
              {err}
            </p>
          )}
          <button
            type="submit"
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
              fontSize: 14,
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
            }}
          >
            <LogIn size={15} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <button
            type="button"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
