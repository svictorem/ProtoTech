import { useState } from "react";
import { Package, ShoppingCart } from "lucide-react";
import { T, fmt, useWindowSize } from "../../utils/helpers";
import { SearchBar } from "../common/UIComponents";

const Catalogo = ({ addToCart, products = [] }) => {
  const { isMobile } = useWindowSize();
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Page Centering Wrapper for Ultra Large Screens */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar produto..."
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(auto-fill,minmax(150px,1fr))" : "repeat(auto-fill,minmax(210px,1fr))",
            gap: isMobile ? 12 : 16,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: T.muted2 }}>
              Nenhum produto encontrado.
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="card card-h"
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "relative",
                    height: isMobile ? 120 : 160,
                    overflow: "hidden",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Package size={isMobile ? 32 : 42} style={{ color: `${T.cyan}33` }} />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.34))",
                    }}
                  />
                </div>
                <div style={{ padding: isMobile ? 10 : 14 }}>
                  <span
                    style={{
                      fontSize: 9,
                      color: T.muted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.category}
                  </span>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: isMobile ? 12 : 13,
                      marginTop: 3,
                      marginBottom: 6,
                      lineHeight: 1.35,
                      height: isMobile ? "32px" : "auto",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : "unset",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: isMobile ? 13.5 : 16,
                        fontWeight: 700,
                        color: T.cyan,
                      }}
                    >
                      {fmt(p.price)}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color:
                          p.stock > 10
                            ? T.success
                            : p.stock > 0
                              ? T.warning
                              : T.danger,
                      }}
                    >
                      {p.stock > 0 ? `${p.stock} un.` : "Esgotado"}
                    </span>
                  </div>
                  <button
                    className="btn-p"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "6px",
                      fontSize: isMobile ? 11.5 : 13,
                      opacity: p.stock === 0 ? 0.45 : 1,
                    }}
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                  >
                    <ShoppingCart size={isMobile ? 12 : 13} /> {isMobile ? "Adicionar" : "Adicionar ao carrinho"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
