import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { T, API_URL } from "../../utils/helpers";
import { SearchBar, Avatar } from "../common/UIComponents";

const Clientes = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Form
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const loadClients = () => {
    setLoading(true);
    fetch(`${API_URL}/clientes`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar clientes");
        return res.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleOpenModal = (c = null) => {
    if (c) {
      setEditingClient(c);
      setName(c.nome_cliente || "");
      setCpf(c.cpf || "");
      setEmail(c.email || "");
      setPhone(c.telefone || "");
    } else {
      setEditingClient(null);
      setName("");
      setCpf("");
      setEmail("");
      setPhone("");
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !cpf) {
      alert("⚠️ Nome e CPF são obrigatórios!");
      return;
    }

    const payload = { name, cpf, email, phone };
    const method = editingClient ? "PUT" : "POST";
    const url = editingClient
      ? `${API_URL}/clientes/${editingClient.id_cliente}`
      : `${API_URL}/clientes`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Erro ao salvar cliente");
          });
        }
        return res.json();
      })
      .then(() => {
        alert(editingClient ? "✅ Cliente atualizado!" : "✅ Cliente cadastrado!");
        setModalOpen(false);
        loadClients();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const handleDelete = (id, name) => {
    if (!confirm(`⚠️ Tem certeza de que deseja excluir o cliente ${name}?`)) return;

    fetch(`${API_URL}/clientes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir cliente");
        return res.json();
      })
      .then(() => {
        alert("✅ Cliente excluído!");
        loadClients();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const filtered = clients.filter(
    (c) =>
      c.nome_cliente?.toLowerCase().includes(search.toLowerCase()) ||
      c.cpf?.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, CPF ou e-mail..."
        />
        <button className="btn-p" onClick={() => handleOpenModal(null)}>
          <Plus size={14} /> Novo Cliente
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Carregando clientes do banco de dados...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Nenhum cliente cadastrado no momento.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(295px,1fr))",
            gap: 16,
          }}
        >
          {filtered.map((c) => (
            <div key={c.id_cliente} className="card card-h" style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <Avatar name={c.nome_cliente} size={42} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {c.nome_cliente}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted2 }}>
                    CPF: {c.cpf}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>
                📧 {c.email || "Sem e-mail cadastrado"}
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>
                📞 {c.telefone || "Sem telefone cadastrado"}
              </div>
              <div style={{ fontSize: 10, color: T.muted2, marginTop: 10, borderTop: `1px solid ${T.border}`, paddingTop: 8 }}>
                Cadastrado em: {new Date(c.data_cadastro).toLocaleDateString("pt-BR")}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button
                  className="btn-g"
                  style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                  onClick={() => alert(`Histórico de vendas indisponível para ${c.nome_cliente}.`)}
                >
                  Ver Histórico
                </button>
                <button className="btn-g" style={{ padding: "7px 10px" }} onClick={() => handleOpenModal(c)}>
                  <Edit2 size={13} />
                </button>
                <button
                  className="btn-d"
                  style={{ padding: "7px 10px", borderColor: "rgba(255,71,87,0.2)", color: T.danger }}
                  onClick={() => handleDelete(c.id_cliente, c.nome_cliente)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Cliente */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 24,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inp"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  CPF *
                </label>
                <input
                  type="text"
                  value={cpf}
                  placeholder="000.000.000-00"
                  onChange={(e) => setCpf(e.target.value)}
                  className="inp"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inp"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Telefone
                </label>
                <input
                  type="text"
                  value={phone}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="inp"
                  style={{ width: "100%", padding: "10px 12px", background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  className="btn-g"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-p"
                  style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
