import { useEffect, useState } from "react";
import api from "../../services/api";
import { Bell, RefreshCw, CheckCircle, AlertCircle, Info, XCircle, Mail, Clock } from "lucide-react";

const getCompanyId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.company_id || null;
};

const getNotificationIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'success':
      return <CheckCircle size={20} color="#10b981" />;
    case 'error':
      return <XCircle size={20} color="#ef4444" />;
    case 'warning':
      return <AlertCircle size={20} color="#f59e0b" />;
    default:
      return <Info size={20} color="#3b82f6" />;
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const markAllRead = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.post("/notifications/mark_all_read.php", {
        company_id: user.company_id,
      });
      if (window.refreshNotificationCount) {
        window.refreshNotificationCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const company_id = getCompanyId();
      if (!company_id) {
        setNotifications([]);
        return;
      }

      const res = await api.get(`/notifications/get_notifications.php?company_id=${company_id}`);
      if (res?.data?.status) {
        setNotifications(res.data.data || []);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    markAllRead();
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => n.is_read !== "1" && n.is_read !== 1).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 24
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto"
      }}>
        {/* Header Card */}
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: 12,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Bell size={28} color="white" />
              </div>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Notifications
                </h1>
                <p style={{
                  margin: "4px 0 0",
                  color: "#6b7280",
                  fontSize: 14
                }}>
                  Stay updated with your latest alerts
                </p>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {unreadCount > 0 && (
                <div style={{
                  background: "#ef4444",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <Mail size={14} />
                  {unreadCount} Unread
                </div>
              )}
              <button
                onClick={fetchNotifications}
                disabled={refreshing}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151",
                  transition: "all 0.2s",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <RefreshCw size={16} className={refreshing ? "spin" : ""} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{
          background: "white",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
        }}>
          {loading ? (
            <div style={{
              padding: 60,
              textAlign: "center"
            }}>
              <div style={{
                display: "inline-block",
                width: 40,
                height: 40,
                border: "3px solid #e5e7eb",
                borderTopColor: "#667eea",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
              <p style={{ marginTop: 16, color: "#6b7280" }}>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div style={{
              padding: 60,
              textAlign: "center"
            }}>
              <div style={{
                width: 80,
                height: 80,
                background: "#f3f4f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <Bell size={36} color="#9ca3af" />
              </div>
              <h3 style={{ margin: 0, fontSize: 18, color: "#374151" }}>No notifications yet</h3>
              <p style={{ color: "#6b7280", marginTop: 8 }}>When you receive notifications, they'll appear here</p>
            </div>
          ) : (
            <div>
              {notifications.map((n, index) => (
                <div
                  key={n.id}
                  style={{
                    padding: 20,
                    borderBottom: index !== notifications.length - 1 ? "1px solid #f0f0f0" : "none",
                    background: (n.is_read === "1" || n.is_read === 1) ? "white" : "linear-gradient(90deg, #f0f9ff 0%, white 100%)",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fafafa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = (n.is_read === "1" || n.is_read === 1) ? "white" : "linear-gradient(90deg, #f0f9ff 0%, white 100%)";
                  }}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    {/* Status Indicator */}
                    <div style={{ flexShrink: 0 }}>
                      {(n.is_read !== "1" && n.is_read !== 1) && (
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#3b82f6",
                          marginTop: 8,
                          animation: "pulse 2s infinite"
                        }} />
                      )}
                    </div>

                    {/* Icon */}
                    <div style={{ flexShrink: 0 }}>
                      {getNotificationIcon(n.type)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 8
                      }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#1f2937"
                        }}>
                          {n.title}
                        </h3>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          color: "#9ca3af"
                        }}>
                          <Clock size={12} />
                          {new Date(n.created_at).toLocaleString()}
                        </div>
                      </div>
                      {n.message && (
                        <p style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: 14,
                          lineHeight: 1.5
                        }}>
                          {n.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {!loading && notifications.length > 0 && (
          <div style={{
            marginTop: 16,
            textAlign: "center",
            padding: 12,
            color: "rgba(255,255,255,0.8)",
            fontSize: 13
          }}>
            Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            {unreadCount > 0 && ` • ${unreadCount} unread`}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}