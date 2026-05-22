import { ShoppingCart, ShoppingBag, Package, X, ArrowRight } from "lucide-react";
import { T, fmt, useWindowSize } from "../../utils/helpers";

const Carrinho = ({ cart, setCart, setPage }) => {
  const { isMobile } = useWindowSize();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const upd = (id, qty) => {
    if (qty < 1) return setCart((c) => c.filter((i) => i.id !== id));
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  return (
    <div style={{ padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Page Centering Wrapper for Ultra Large Screens */}
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h2
          style={{
            fontSize: isMobile ? 20 : 22,
            fontWeight: 700,
            marginBottom: isMobile ? 16 : 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ShoppingCart size={isMobile ? 18 : 20} style={{ color: T.cyan }} /> Carrinho
          {cart.length > 0 && (
            <span style={{ fontSize: 13, color: T.muted2, fontWeight: 400 }}>
              ({cart.reduce((s, i) => s + i.qty, 0)} itens)
            </span>
          )}
        </h2>

        {cart.length === 0 ? (
          <div
            className="card"
            style={{ padding: isMobile ? "40px 20px" : "56px 32px", textAlign: "center" }}
          >
            <ShoppingBag
              size={isMobile ? 44 : 52}
              style={{ color: T.muted, margin: "0 auto 16px", display: "block" }}
            />
            <p style={{ color: T.muted, marginBottom: 18, fontSize: 14 }}>
              Seu carrinho está vazio
            </p>
            <button
              className="btn-p"
              style={{ margin: "0 auto" }}
              onClick={() => setPage("catalogo")}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div className="card" style={{ overflow: "hidden" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "center",
                    gap: isMobile ? 12 : 16,
                    padding: 16,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: isMobile ? 44 : 54,
                        height: isMobile ? 44 : 54,
                        background: T.surface2,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                      ) : (
                        <Package size={isMobile ? 20 : 24} style={{ color: `${T.cyan}55` }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: isMobile ? 13 : 14, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: T.muted2 }}>
                        {item.category}
                      </div>
                    </div>
                    {isMobile && (
                      <button
                        onClick={() =>
                          setCart((c) => c.filter((i) => i.id !== item.id))
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: T.muted,
                          display: "flex",
                          flexShrink: 0,
                          padding: 4,
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isMobile ? "space-between" : "flex-end",
                      gap: isMobile ? 0 : 24,
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexShrink: 0,
                      }}
                    >
                      <button
                        onClick={() => upd(item.id, item.qty - 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.surface2,
                          color: T.text,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          width: 28,
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 14,
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => upd(item.id, item.qty + 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.surface2,
                          color: T.text,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          color: T.cyan,
                          fontWeight: 700,
                          minWidth: isMobile ? "auto" : 90,
                          fontSize: isMobile ? 14 : 16,
                          textAlign: "right",
                        }}
                      >
                        {fmt(item.price * item.qty)}
                      </span>
                      {!isMobile && (
                        <button
                          onClick={() =>
                            setCart((c) => c.filter((i) => i.id !== item.id))
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: T.muted,
                            display: "flex",
                            flexShrink: 0,
                          }}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
                Resumo do Pedido
              </div>
              {[
                ["Subtotal", fmt(total)],
                ["Frete", "Grátis"],
                ["Desconto", "−"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: T.muted2 }}>{l}</span>
                  <span style={{ color: l === "Frete" ? T.success : T.text }}>
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: `1px solid ${T.border}`,
                  paddingTop: 14,
                  marginTop: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>Total</span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: T.cyan,
                    fontSize: 20,
                  }}
                >
                  {fmt(total)}
                </span>
              </div>
              <button
                className="btn-p"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "12px",
                  marginTop: 18,
                }}
                onClick={() => setPage("checkout")}
              >
                Finalizar Pedido <ArrowRight size={15} />
              </button>
              <button
                className="btn-g"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "9px",
                  marginTop: 8,
                }}
                onClick={() => setPage("catalogo")}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrinho;
