import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api, { apiBaseURL } from "../services/api.js"

const DESIGNS = [
  { id: "original", label: "Original" },
  { id: "pos", label: "POS Receipt" },
]

const COLORS = [
  "#7c3aed",
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ea580c",
  "#0891b2",
  "#db2777",
  "#4b5563",
  "#9333ea",
  "#059669",
  "#e11d48",
  "#0284c7",
]

const PRINT_CSS = `
  @media print {
    body * { visibility: hidden !important; }
    #invoice, #invoice * { visibility: visible !important; }
    #invoice { position: fixed; top:0; left:0; width:100%; }
    .no-print { display:none !important; }
  }
`

function DesignOriginal({ invoice, company, color }) {
  const today = new Date().toLocaleDateString("en-IN")
  const { id } = useParams()

  return (
    <div style={{ fontFamily: "'Times New Roman',serif", color: "#1a1a1a", fontSize: 13 }}>
      <div id="invoice">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="font-bold text-lg">{company?.company_name}</h1>
            <p className="text-sm">{company?.company_address}</p>
            <p className="text-sm">Phone: {company?.phone}</p>
            <p className="text-sm">GSTIN: {company?.gstin}</p>
            <p className="text-sm">GST: {company?.gst_type}</p>
          </div>
          {company?.logo && (
            <img
              src={`${apiBaseURL}/${company.logo}`}
              alt="logo"
              className="w-20 h-20 object-cover"
            />
          )}
        </div>

        <h2 className="text-center font-semibold text-lg mt-4" style={{ color }}>
          Tax Invoice
        </h2>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>{invoice.customer_name}</p>
            <p>{invoice.customer_phone}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Invoice Details</p>
            <p>Invoice No.: {invoice.invoice_no}</p>
            <p>Date: {today}</p>
          </div>
        </div>

        <table className="w-full mt-4 border text-sm">
          <thead style={{ backgroundColor: color, color: "#fff" }}>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((p, i) => {
              const amount = p.price * p.qty
              const gstAmount = (amount * p.gst) / 100
              return (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{p.display_name || p.name}</td>
                  <td className="border p-2 text-center">{p.qty}</td>
                  <td className="border p-2 text-right">₹{p.price}</td>
                  <td className="border p-2 text-right">
                    ₹{gstAmount.toFixed(2)}
                    <br />
                    <span className="text-xs">({p.gst}%)</span>
                  </td>
                  <td className="border p-2 text-right">₹{(amount + gstAmount).toFixed(2)}</td>
                </tr>
              )
            })}
            <tr className="font-semibold">
              <td colSpan={2} className="border p-2 text-right">Total</td>
              <td className="border p-2 text-center">
                {invoice.products.reduce((sum, p) => sum + p.qty, 0)}
              </td>
              <td></td>
              <td className="border p-2 text-right">₹{invoice.gst_total}</td>
              <td className="border p-2 text-right">₹{invoice.total_amount}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6 text-sm">
          <div className="w-1/3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{invoice.sub_total}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{invoice.gst_total}</span>
            </div>
            <div
              className="flex justify-between mt-4 px-2 py-1 font-semibold"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              <span className="pb-2">Total</span>
              <span className="pb-2">₹{invoice.total_amount}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Payment</span>
              <span className="font-semibold uppercase">{invoice.payment_method}</span>
            </div>
            <div
              className="flex justify-between px-2 py-2 font-bold text-xl mb-2"
              style={{ color }}
            >
              <span>Paid</span>
              <span>₹{invoice.paid_amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DesignPOS({ invoice, company, color }) {
  const date = new Date().toLocaleDateString("en-IN")
  const time = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const balance = invoice.paid_amount - invoice.total_amount

  const S = {
    wrap: {
      fontFamily: "'Courier New', monospace",
      fontSize: 12,
      lineHeight: "18px",
      maxWidth: 320,
      margin: "0 auto",
      color: "#000",
    },
    center: { textAlign: "center" },
    divider: { borderTop: "1px dashed #000", margin: "8px 0" },
    row: {
      display: "flex",
      justifyContent: "space-between",
      margin: "4px 0",
    },
    tableRow: {
      display: "flex",
      margin: "3px 0",
    },
  }

  return (
    <div style={S.wrap}>
      {company?.logo && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
          <img
            src={`${apiBaseURL}/${company.logo}`}
            alt="logo"
            style={{ height: 60, objectFit: "contain", display: "block" }}
          />
        </div>
      )}

      <div style={S.center}>
        <div style={{ fontSize: 16, fontWeight: "bold", color }}>{company?.company_name}</div>
        <div>{company?.company_address}</div>
        <div>Ph: {company?.phone}</div>
        <div>GSTIN: {company?.gstin}</div>
      </div>

      <div style={S.divider} />

      <div style={S.row}>
        <span>Bill {invoice.invoice_no}</span>
        <span>{date} {time}</span>
      </div>

      <div style={{ marginTop: 4 }}>Customer: {invoice.customer_name || "---"}</div>
      <div>Phone: {invoice.customer_phone}</div>

      <div style={S.divider} />

      <div style={{ ...S.tableRow, fontWeight: "bold" }}>
        <div style={{ flex: 2 }}>Item</div>
        <div style={{ flex: 1, textAlign: "right" }}>Rate</div>
        <div style={{ flex: 1, textAlign: "right" }}>Qty</div>
        <div style={{ flex: 1, textAlign: "right" }}>Amt</div>
      </div>

      <div style={S.divider} />

      {invoice.products.map((p, i) => {
        const amount = p.price * p.qty
        const gst = (amount * p.gst) / 100
        return (
          <div key={i} style={{ marginBottom: 4 }}>
            <div style={S.tableRow}>
              <div style={{ flex: 2 }}>{p.name}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{p.price}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{p.qty}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{amount}</div>
            </div>
            <div style={{ fontSize: 10, marginLeft: 4 }}>GST @{p.gst}% : ₹{gst.toFixed(2)}</div>
          </div>
        )
      })}

      <div style={S.divider} />

      <div style={S.row}>
        <span>Total Items</span>
        <span>{invoice.products.length}</span>
      </div>

      <div style={S.row}>
        <span>Subtotal</span>
        <span>₹{invoice.sub_total}</span>
      </div>

      <div style={S.row}>
        <span>Tax</span>
        <span>₹{invoice.gst_total}</span>
      </div>

      <div style={S.divider} />

      <div style={{ ...S.row, fontWeight: "bold", fontSize: 16 }}>
        <span>Total Amount</span>
        <span>₹{invoice.total_amount}</span>
      </div>

      <div style={S.divider} />

      <div style={S.row}>
        <span>Payment Method</span>
        <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{invoice.payment_method}</span>
      </div>

      <div style={S.row}>
        <span>Paid</span>
        <span>₹{invoice.paid_amount}</span>
      </div>

      <div style={S.row}>
        <span>Balance</span>
        <span>₹{Math.abs(balance).toFixed(2)}</span>
      </div>

      <div style={S.divider} />

      <div style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}>
        PLEASE NOTE - EXCHANGES ALLOWED ONLY WITHIN 3 DAYS
      </div>
    </div>
  )
}

const DESIGN_COMPONENTS = {
  original: DesignOriginal,
  pos: DesignPOS,
}

export default function InvoicePreview() {
  const { invoiceNo } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [company, setCompany] = useState(null)
  const [color, setColor] = useState("#2563eb")
const [design, setDesign] = useState("original")
  useEffect(() => {
    const s = document.createElement("style")
    s.innerHTML = PRINT_CSS
    document.head.appendChild(s)
    return () => document.head.removeChild(s)
  }, [])

useEffect(() => {
  api.get(`/invoice/get_invoice_by_id.php?id=${invoiceNo}`).then((res) => {
    if (res.data.status) {
      setInvoice(res.data.data)

      setCompany({
        company_name: res.data.data.company_name,
        company_address: res.data.data.company_address,
        phone: res.data.data.phone,
        gstin: res.data.data.gstin,
        logo: res.data.data.logo,
      })
    }
  })
}, [invoiceNo])

  if (!invoice) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", fontFamily: "sans-serif", color: "#94a3b8", fontSize: 14 }}>
        Loading invoice…
      </div>
    )
  }

  const isPOS = design === "pos"
const ActiveDesign = DesignOriginal
 const downloadPDF = async () => {
  const oldDesign = design

  setDesign("pos")

  setTimeout(async () => {
    const element = document.getElementById("invoice")
    if (!element) return

    try {
      const html2pdfModule = (await import("html2pdf.js")).default

      html2pdfModule()
        .set({
          margin: 5,
          filename: `invoice-${invoice.invoice_no}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: [80, 200] },
        })
        .from(element)
        .save()

      setDesign(oldDesign)
    } catch (error) {
      console.error(error)
      setDesign(oldDesign)
    }
  }, 300)
}

  const shareWhatsApp = () => {
    const msg = `Invoice No: ${invoice.invoice_no}\nAmount: ₹${invoice.total_amount}\nFrom: ${company?.company_name}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI',Arial,sans-serif", padding: "24px 16px 40px" }}>
      <div className="no-print" style={{ maxWidth: 800, margin: "0 auto 20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {[
            { label: "Print", onClick: () => window.print(), bg: "#1d4ed8" },
            { label: "PDF", onClick: downloadPDF, bg: "#16a34a" },
            { label: "WhatsApp", onClick: shareWhatsApp, bg: "#15803d" },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.onClick}
              style={{
                background: b.bg,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "9px 22px",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Segoe UI',Arial,sans-serif",
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>
            Choose Design
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {DESIGNS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesign(d.id)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontFamily: "'Segoe UI',Arial,sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  border: design === d.id ? `2px solid ${color}` : "1.5px solid #e2e8f0",
                  background: design === d.id ? color : "#fff",
                  color: design === d.id ? "#fff" : "#475569",
                  transition: "all .15s",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>
            Choose Color
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: c,
                  cursor: "pointer",
                  border: color === c ? "3px solid #1e293b" : "2px solid transparent",
                  outline: color === c ? `2px solid ${c}` : "none",
                  outlineOffset: 2,
                  transition: "transform .1s",
                  transform: color === c ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        id="invoice"
        style={{
          background: "#fff",
          maxWidth: isPOS ? 360 : 800,
          margin: "0 auto",
          padding: isPOS ? "20px 18px" : "30px 32px",
          border: isPOS ? "1px dashed #bbb" : "1px solid #e2e8f0",
        }}
      >
        <ActiveDesign invoice={invoice} company={company} color={color} />
      </div>
    </div>
  )
}
