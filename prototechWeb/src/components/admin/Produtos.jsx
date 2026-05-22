import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CheckCircle } from "lucide-react";
import { T, fmt, API_URL } from "../../utils/helpers";
import { SearchBar, TH, TD, Modal } from "../common/UIComponents";

const Produtos = ({ products = [], loadProducts }) => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  // Carrega (ou recarrega) fornecedores do banco — chamada sempre que o modal abre
  const loadSuppliers = () => {
    fetch(`${API_URL}/fornecedores`)
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Erro ao carregar fornecedores:", err));
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = () => {
    const name = document.getElementById("inp-name")?.value || "";
    const cost = parseFloat(document.getElementById("inp-cost")?.value) || 0;
    const price = parseFloat(document.getElementById("inp-price")?.value) || 0;

    if (!name.trim()) {
      alert("⚠️ O nome do produto é obrigatório.");
      return;
    }
    if (cost <= 0 || price <= 0) {
      alert("⚠️ Os preços de custo e venda devem ser maiores que zero.");
      return;
    }

    const payload = {
      name,
      sku: document.getElementById("inp-sku")?.value || "",
      category: document.getElementById("inp-category")?.value || "Geral",
      description: document.getElementById("inp-description")?.value || "",
      cost,
      price,
      minStock: parseInt(document.getElementById("inp-minStock")?.value) || 5,
      stock: parseInt(document.getElementById("inp-stock")?.value) || 0,
      location: document.getElementById("inp-location")?.value || "",
      id_fornecedor: parseInt(document.getElementById("inp-id_fornecedor")?.value) || null,
    };

    const url = edit ? `${API_URL}/produtos/${edit.id}` : `${API_URL}/produtos`;
    const method = edit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro de processamento no servidor");
        return res.json();
      })
      .then(() => {
        loadProducts();
        setModal(false);
        alert(`✅ Produto ${edit ? "atualizado" : "cadastrado"} com sucesso!`);
      })
      .catch((err) => alert("❌ Erro ao salvar produto: " + err.message));
  };

  const handleDelete = (id) => {
    if (confirm("⚠️ Tem certeza absoluta que deseja excluir este produto?")) {
      fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Não foi possível excluir o produto");
          return res.json();
        })
        .then(() => {
          loadProducts();
          alert("✅ Produto excluído com sucesso!");
        })
        .catch((err) => alert("❌ Erro ao excluir produto: " + err.message));
    }
  };

  return (
    <div className="fi" style={{ padding: 22, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, categoria ou SKU..."
        />
        <button
          className="btn-p"
          onClick={() => {
            setEdit(null);
            loadSuppliers();
            setModal(true);
          }}
        >
          <Plus size={14} /> Novo Produto
        </button>
      </div>

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
                "SKU",
                "Produto",
                "Categoria",
                "Preço Venda",
                "Estoque",
                "Fornecedor",
                "Ações",
              ].map((h) => (
                <TH key={h}>{h}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: T.muted2 }}>
                  Nenhum produto cadastrado no banco de dados.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="tr">
                  <TD
                    style={{
                      fontSize: 11,
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.muted2,
                    }}
                  >
                    {p.sku}
                  </TD>
                  <TD style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</TD>
                  <TD>
                    <span className="badge b-info">{p.category}</span>
                  </TD>
                  <TD
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: T.cyan,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(p.price)}
                  </TD>
                  <TD>
                    <span
                      style={{
                        fontWeight: 700,
                        color:
                          p.stock === 0
                            ? T.danger
                            : p.stock <= p.minStock
                              ? T.warning
                              : T.success,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {p.stock}
                    </span>
                    <span style={{ color: T.muted, fontSize: 11 }}>
                      {" "}
                      min:{p.minStock}
                    </span>
                  </TD>
                  <TD style={{ fontSize: 13, color: T.muted2 }}>{p.supplier}</TD>
                  <TD>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn-g"
                        style={{ padding: "5px 9px" }}
                        onClick={() => {
                          setEdit(p);
                          loadSuppliers();
                          setModal(true);
                        }}
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="btn-d"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={edit ? "Editar Produto" : "Cadastrar Produto"}
          onClose={() => setModal(false)}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {[
              { label: "Nome do Produto", col: "1/-1", key: "name", type: "text" },
              { label: "SKU", col: "", key: "sku", type: "text" },
              { label: "Categoria", col: "", key: "category", type: "text" },
              { label: "Descrição Detalhada", col: "1/-1", key: "description", type: "textarea" },
              { label: "Preço de Custo (R$)", col: "", key: "cost", type: "number", step: "0.01" },
              { label: "Preço de Venda (R$)", col: "", key: "price", type: "number", step: "0.01" },
              { label: "Estoque Mínimo", col: "", key: "minStock", type: "number", step: "1" },
              { label: "Estoque Atual", col: "", key: "stock", type: "number", step: "1" },
              { label: "Localização (Prateleira)", col: "1/-1", key: "location", type: "text" },
            ].map((f) => (
              <div key={f.key} style={f.col ? { gridColumn: f.col } : {}}>
                <label
                  style={{
                    fontSize: 12,
                    color: T.muted2,
                    marginBottom: 5,
                    display: "block",
                    fontWeight: 500,
                  }}
                >
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    className="inp"
                    id={`inp-${f.key}`}
                    defaultValue={edit ? edit[f.key] : ""}
                    placeholder={f.label}
                    style={{ minHeight: 60, resize: "vertical", fontFamily: "inherit" }}
                  />
                ) : (
                  <input
                    className="inp"
                    id={`inp-${f.key}`}
                    defaultValue={edit ? edit[f.key] : ""}
                    placeholder={f.label}
                    type={f.type}
                    step={f.step}
                  />
                )}
              </div>
            ))}

            <div style={{ gridColumn: "1/-1" }}>
              <label
                style={{
                  fontSize: 12,
                  color: T.muted2,
                  marginBottom: 5,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                Fornecedor Associado
                {suppliers.length === 0 && (
                  <span style={{ fontSize: 10, color: T.warning, marginLeft: 8 }}>⚠ Nenhum fornecedor no banco</span>
                )}
              </label>
              <div className="select-scroll-wrapper">
                <select
                  className="inp"
                  id="inp-id_fornecedor"
                  defaultValue={edit ? edit.id_fornecedor || "" : ""}
                  size={suppliers.length > 4 ? 5 : undefined}
                  style={suppliers.length > 4 ? { height: "auto", appearance: "auto", WebkitAppearance: "auto", paddingRight: 12 } : {}}
                >
                  <option value="">— Sem Fornecedor —</option>
                  {suppliers.map((s) => (
                    <option key={s.id_fornecedor} value={s.id_fornecedor}>
                      {s.razao_social}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 22,
              justifyContent: "flex-end",
            }}
          >
            <button className="btn-g" onClick={() => setModal(false)}>
              Cancelar
            </button>
            <button className="btn-p" onClick={handleSave}>
              <CheckCircle size={14} /> Salvar Produto
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Produtos;
