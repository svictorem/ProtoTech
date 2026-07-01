import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { T, fmt, API_URL } from "../../utils/helpers";
import { Avatar, TH, TD } from "../common/UIComponents";

const Funcionarios = () => {
  const [employees, setEmployees] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargoId, setCargoId] = useState("");
  const [hireDate, setHireDate] = useState("");

  // Recarrega apenas os cargos (usado ao abrir o modal para pegar novos cargos do banco)
  const loadCargos = async () => {
    try {
      const resCargos = await fetch(`${API_URL}/cargos`);
      const dataCargos = await resCargos.json();
      setCargos(dataCargos);
    } catch (err) {
      console.error("Erro ao carregar cargos:", err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Carrega funcionários e cargos em paralelo
      const [resEmp, resCargos] = await Promise.all([
        fetch(`${API_URL}/funcionarios`),
        fetch(`${API_URL}/cargos`),
      ]);
      const dataEmp = await resEmp.json();
      const dataCargos = await resCargos.json();
      setEmployees(dataEmp);
      setCargos(dataCargos);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados dos funcionários:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (e = null) => {
    // Sempre recarrega cargos do banco ao abrir o modal (garante que novos cargos apareçam)
    loadCargos();

    if (e) {
      setEditingEmployee(e);
      setName(e.nome_funcionario || "");
      setCpf(e.cpf || "");
      setCargoId(e.id_cargo || "");

      // Formata a data AAAA-MM-DD para o input do tipo date
      if (e.data_admissao) {
        const d = new Date(e.data_admissao);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        setHireDate(`${y}-${m}-${day}`);
      } else {
        setHireDate("");
      }
    } else {
      setEditingEmployee(null);
      setName("");
      setCpf("");
      setCargoId("");
      setHireDate("");
    }
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !cpf || !cargoId) {
      alert("⚠️ Nome, CPF e Cargo são obrigatórios!");
      return;
    }

    const payload = { name, cpf, id_cargo: parseInt(cargoId), hire_date: hireDate || null };
    const method = editingEmployee ? "PUT" : "POST";
    const url = editingEmployee
      ? `${API_URL}/funcionarios/${editingEmployee.id_funcionario}`
      : `${API_URL}/funcionarios`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Erro ao salvar funcionário");
          });
        }
        return res.json();
      })
      .then(() => {
        alert(editingEmployee ? "✅ Funcionário atualizado com sucesso!" : "✅ Funcionário cadastrado com sucesso!");
        setModalOpen(false);
        loadData();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  const handleDelete = (id, name) => {
    if (!confirm(`⚠️ Tem certeza de que deseja excluir o funcionário ${name}?`)) return;

    fetch(`${API_URL}/funcionarios/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir funcionário");
        return res.json();
      })
      .then(() => {
        alert("✅ Funcionário excluído!");
        loadData();
      })
      .catch((err) => alert(`❌ Erro: ${err.message}`));
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <button className="btn-p" onClick={() => handleOpenModal(null)}>
          <Plus size={14} /> Novo Funcionário
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Carregando dados dos funcionários...
        </div>
      ) : employees.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
          Nenhum funcionário cadastrado no momento.
        </div>
      ) : (
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
                  "Funcionário",
                  "CPF",
                  "Cargo",
                  "Salário Base",
                  "Data de Admissão",
                  "Ações",
                ].map((h) => (
                  <TH key={h}>{h}</TH>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id_funcionario} className="tr">
                  <TD>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={e.nome_funcionario} size={34} />
                      <span style={{ fontWeight: 500, fontSize: 14 }}>
                        {e.nome_funcionario}
                      </span>
                    </div>
                  </TD>
                  <TD style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", color: T.muted2 }}>
                    {e.cpf}
                  </TD>
                  <TD style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 500 }}>{e.nome_cargo || "Sem cargo"}</div>
                    {e.descricao_atribuicoes && (
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 2, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={e.descricao_atribuicoes}>
                        {e.descricao_atribuicoes}
                      </div>
                    )}
                  </TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.success,
                      fontWeight: 600,
                    }}
                  >
                    {e.salario_base ? fmt(parseFloat(e.salario_base)) : "—"}
                  </TD>
                  <TD style={{ fontSize: 12, color: T.muted2 }}>
                    {e.data_admissao ? new Date(e.data_admissao).toLocaleDateString("pt-BR") : "—"}
                  </TD>
                  <TD>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn-g" style={{ padding: "5px 9px" }} onClick={() => handleOpenModal(e)}>
                        <Edit2 size={13} />
                      </button>
                      <button className="btn-d" onClick={() => handleDelete(e.id_funcionario, e.nome_funcionario)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Funcionário */}
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
              {editingEmployee ? "Editar Funcionário" : "Novo Funcionário"}
            </h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Nome do Funcionário *
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
                  Cargo *
                  {cargos.length === 0 && (
                    <span style={{ fontSize: 10, color: T.warning, marginLeft: 8, textTransform: "none" }}>⚠ Nenhum cargo encontrado no banco</span>
                  )}
                </label>
                <select
                  className="inp"
                  value={cargoId}
                  onChange={(e) => setCargoId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: T.surface2,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    color: T.text,
                    outline: "none",
                  }}
                  required
                >
                  <option value="" disabled>— Selecione um Cargo —</option>
                  {cargos.map((cargo) => (
                    <option key={cargo.id_cargo} value={cargo.id_cargo}>
                      {cargo.nome_cargo} — Salário: {fmt(parseFloat(cargo.salario_base))}
                    </option>
                  ))}
                </select>

                {/* Painel de descrição do cargo selecionado */}
                {(() => {
                  const cargoSelecionado = cargos.find((c) => String(c.id_cargo) === String(cargoId));
                  if (!cargoSelecionado || !cargoSelecionado.descricao_atribuicoes) return null;
                  return (
                    <div
                      style={{
                        marginTop: 8,
                        padding: "10px 12px",
                        background: `rgba(var(--rgb-cyan),0.06)`,
                        border: `1px solid rgba(var(--rgb-cyan),0.18)`,
                        borderRadius: 8,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>📋</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: T.cyan, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                          Atribuições do Cargo
                        </div>
                        <div style={{ fontSize: 12, color: T.muted2, lineHeight: 1.55 }}>
                          {cargoSelecionado.descricao_atribuicoes}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, color: T.muted2, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Data de Admissão
                </label>
                <input
                  type="date"
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
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

export default Funcionarios;
