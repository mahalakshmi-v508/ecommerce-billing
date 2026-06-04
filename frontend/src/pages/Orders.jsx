import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

const statusColors = {
  paid: { bg: "#e6f9f0", color: "#0a7a47", border: "#34d399" },
  pending: { bg: "#fff7e6", color: "#b45309", border: "#fbbf24" },
  failed: { bg: "#fef2f2", color: "#b91c1c", border: "#f87171" },
  default: { bg: "#eff6ff", color: "#1d4ed8", border: "#60a5fa" },
};

const methodIcons = {
  cash: "💵",
  upi: "📱",
  card: "💳",
  online: "🌐",
  default: "💰",
};

function getStatusStyle(status = "") {
  const key = status.toLowerCase();
  return statusColors[key] || statusColors.default;
}

function getMethodIcon(method = "") {
  const key = method.toLowerCase();
  return methodIcons[key] || methodIcons.default;
}

const avatarColors = [
  ["#6366f1", "#ede9fe"],
  ["#0ea5e9", "#e0f2fe"],
  ["#10b981", "#d1fae5"],
  ["#f59e0b", "#fef3c7"],
  ["#ec4899", "#fce7f3"],
];

function getAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth_user") || "{}");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(user.id);
        if (res.status) setOrders(res.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  const toggleExpand = (id) =>
    setExpandedOrder((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .orders-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #fdf2fb 50%, #f0fdf9 100%);
          padding: 2rem 1rem 4rem;
        }

        .orders-header {
          max-width: 720px;
          margin: 0 auto 2rem;
        }

        .orders-title {
          font-family: 'Sora', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(90deg, #6366f1, #ec4899, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.25rem;
        }

        .orders-subtitle {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0;
        }

        .orders-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .order-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.08);
          overflow: hidden;
          border: 1px solid rgba(99,102,241,0.08);
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .order-card:hover {
          box-shadow: 0 8px 32px rgba(99,102,241,0.15);
          transform: translateY(-2px);
        }

        .order-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem 0;
        }

        .order-avatar {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .order-meta {
          flex: 1;
          min-width: 0;
        }

        .order-invoice {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-date {
          font-size: 0.78rem;
          color: #94a3b8;
          margin: 0;
        }

        .order-status-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1.5px solid;
          letter-spacing: 0.03em;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .order-amounts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
        }

        .amount-box {
          background: #f8faff;
          border-radius: 14px;
          padding: 0.85rem 0.75rem;
          text-align: center;
          border: 1px solid #e8edff;
        }

        .amount-label {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 4px;
        }

        .amount-value {
          font-family: 'Sora', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .amount-value.total { color: #6366f1; }
        .amount-value.paid { color: #10b981; }
        .amount-value.balance { color: #f59e0b; }

        .order-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem 1.25rem;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .payment-method-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 500;
        }

        .expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.15s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .expand-btn:hover {
          opacity: 0.88;
          transform: scale(1.03);
        }

        .expand-btn .arrow {
          display: inline-block;
          transition: transform 0.25s;
        }

        .expand-btn.open .arrow {
          transform: rotate(180deg);
        }

        .products-section {
          padding: 0 1.5rem 1.5rem;
          border-top: 1px solid #f1f5f9;
          animation: slideDown 0.22s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .products-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 1rem 0 0.75rem;
        }

        .product-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 14px;
          background: #fafbff;
          border: 1px solid #e8edff;
          margin-bottom: 0.5rem;
          transition: background 0.15s;
        }

        .product-row:hover {
          background: #f0f4ff;
        }

        .product-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e0e7ff, #ede9fe);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .product-info {
          flex: 1;
          min-width: 0;
        }

        .product-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-qty {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0;
        }

        .product-price {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #6366f1;
          white-space: nowrap;
        }

        .empty-state {
          max-width: 720px;
          margin: 4rem auto;
          text-align: center;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          display: block;
        }

        .empty-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }

        .empty-desc {
          color: #94a3b8;
          font-size: 0.9rem;
          margin: 0;
        }

        .skeleton-card {
          background: #fff;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 24px rgba(99,102,241,0.06);
        }

        .skeleton-line {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .divider {
          height: 1px;
          background: #f1f5f9;
          margin: 0 1.5rem;
        }

        @media (max-width: 480px) {
          .order-amounts { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
          .amount-box { padding: 0.65rem 0.4rem; }
          .amount-value { font-size: 0.92rem; }
          .orders-title { font-size: 1.5rem; }
        }
      `}</style>

      <div className="orders-root">
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">
            {loading
              ? "Loading your orders..."
              : `${orders.length} order${orders.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div className="orders-list">
            {[1, 2, 3].map((i) => (
              <div className="skeleton-card" key={i}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div className="skeleton-line" style={{ width: 48, height: 48, borderRadius: 14 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton-line" style={{ height: 16, width: "55%", marginBottom: 8 }} />
                    <div className="skeleton-line" style={{ height: 12, width: "30%" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
                  {[1, 2, 3].map((j) => (
                    <div className="skeleton-line" key={j} style={{ height: 60, borderRadius: 14 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🛍️</span>
            <h2 className="empty-title">No Orders Yet</h2>
            <p className="empty-desc">Your orders will appear here once you make a purchase.</p>
          </div>
        )}

        {/* Order Cards */}
        {!loading && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, idx) => {
              const [avatarFg, avatarBg] = getAvatarColor(idx);
              const statusStyle = getStatusStyle(order.payment_status);
              const isOpen = expandedOrder === order.id;
              const initials = (order.invoice_no || "OR")
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div className="order-card" key={order.id}>
                  {/* Top: Avatar + Invoice + Status */}
                  <div className="order-card-top">
                    <div
                      className="order-avatar"
                      style={{ background: avatarBg, color: avatarFg }}
                    >
                      {initials}
                    </div>
                    <div className="order-meta">
                      <p className="order-invoice">{order.invoice_no}</p>
                      <p className="order-date">
                        🗓 {formatDate(order.created_at)}
                      </p>
                    </div>
                    <span
                      className="order-status-badge"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        borderColor: statusStyle.border,
                      }}
                    >
                      {order.payment_status}
                    </span>
                  </div>

                  {/* Amount Boxes */}
                  <div className="order-amounts">
                    <div className="amount-box">
                      <p className="amount-label">Total</p>
                      <p className="amount-value total">₹{order.total_amount}</p>
                    </div>
                    <div className="amount-box">
                      <p className="amount-label">Paid</p>
                      <p className="amount-value paid">₹{order.paid_amount}</p>
                    </div>
                    <div className="amount-box">
                      <p className="amount-label">Balance</p>
                      <p className="amount-value balance">₹{order.balance_amount}</p>
                    </div>
                  </div>

                  {/* Footer: method + expand */}
                  <div className="order-footer">
                    <span className="payment-method-pill">
                      {getMethodIcon(order.payment_method)}{" "}
                      {order.payment_method || "N/A"}
                    </span>
                    <button
                      className="expand-btn"
                      onClick={() => navigate(`/invoice/${order.invoice_no}`)}
                      style={{ background: "#0f172a" }}
                    >
                      View Invoice
                    </button>
                    {order.products?.length > 0 && (
                      <button
                        className={`expand-btn ${isOpen ? "open" : ""}`}
onClick={() => navigate(`/invoice/${order.invoice_id}`)}
                      >
                        {isOpen ? "Hide" : "Products"} ({order.products.length})
                        <span className="arrow">▾</span>
                      </button>
                    )}
                  </div>

                  {/* Products Section */}
                  {isOpen && (
                    <>
                      <div className="divider" />
                      <div className="products-section">
                        <p className="products-title">Products</p>
                        {order.products.map((item, i) => (
                          <div className="product-row" key={i}>
                            <div className="product-icon">🛒</div>
                            <div className="product-info">
                              <p className="product-name">{item.product_name}</p>
                              <p className="product-qty">Qty: {item.qty}</p>
                            </div>
                            <span className="product-price">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;