import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api, { apiBaseURL } from "../services/api.js"

function DesignOriginal({ invoice, company, color }) {
  const today = new Date().toLocaleDateString("en-IN")

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", color: "#1a1a1a", fontSize: "14px", width: "100%" }}>
      {/* கம்பெனி மற்றும் லோகோ விவரங்கள் */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #ccc", paddingBottom: "15px" }}>
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "20px", margin: "0 0 5px 0" }}>{company?.company_name}</h1>
          <p style={{ margin: "2px 0", fontSize: "13px" }}>{company?.company_address}</p>
          <p style={{ margin: "2px 0", fontSize: "13px" }}>Phone: {company?.phone}</p>
          <p style={{ margin: "2px 0", fontSize: "13px" }}>GSTIN: {company?.gstin}</p>
          <p style={{ margin: "2px 0", fontSize: "13px" }}>GST: {company?.gst_type}</p>
        </div>
        {company?.logo && (
          <img
            src={`${apiBaseURL}/${company.logo}`}
            alt="logo"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        )}
      </div>

      <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px", marginTop: "20px", color: color, textTransform: "uppercase", letterSpacing: "1px" }}>
        Tax Invoice
      </h2>

      {/* பில் விவரங்கள் */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "14px", lineHeight: "1.5" }}>
        <div>
          <p style={{ fontWeight: "bold", margin: "0 0 4px 0", fontSize: "15px" }}>Bill To</p>
          <p style={{ margin: "2px 0" }}>{invoice.customer_name}</p>
          <p style={{ margin: "2px 0" }}>{invoice.customer_phone}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontWeight: "bold", margin: "0 0 4px 0", fontSize: "15px" }}>Invoice Details</p>
          <p style={{ margin: "2px 0" }}>Invoice No.: <strong>{invoice.invoice_no}</strong></p>
          <p style={{ margin: "2px 0" }}>Date: {today}</p>
        </div>
      </div>

      {/* மெயின் டேபிள் */}
      <table style={{ width: "100%", marginTop: "25px", borderCollapse: "collapse", border: "1px solid #1a1a1a" }}>
        <thead style={{ backgroundColor: color, color: "#fff" }}>
          <tr>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 6px", textAlign: "center", width: "5%" }}>#</th>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "left", width: "45%" }}>Item Name</th>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 6px", textAlign: "center", width: "10%" }}>Qty</th>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right", width: "12%" }}>Price</th>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right", width: "13%" }}>GST</th>
            <th style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right", width: "15%" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const amount = p.price * p.qty
            const gstAmount = (amount * p.gst) / 100
            return (
              <tr key={i}>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 6px", textAlign: "center" }}>{i + 1}</td>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 8px" }}>{p.display_name || p.name}</td>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 6px", textAlign: "center" }}>{p.qty}</td>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 8px", textAlign: "right" }}>₹{Number(p.price).toFixed(2)}</td>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 8px", textAlign: "right", fontSize: "12px" }}>
                  ₹{gstAmount.toFixed(2)}
                  <br />
                  <span style={{ color: "#666", fontSize: "11px" }}>({p.gst}%)</span>
                </td>
                <td style={{ border: "1px solid #1a1a1a", padding: "8px 8px", textAlign: "right" }}>₹{(amount + gstAmount).toFixed(2)}</td>
              </tr>
            )
          })}
          {/* டோட்டல் ரோ */}
          <tr style={{ fontWeight: "bold", backgroundColor: "#f9fafb" }}>
            <td colSpan={2} style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right" }}>Total</td>
            <td style={{ border: "1px solid #1a1a1a", padding: "10px 6px", textAlign: "center" }}>
              {invoice.products.reduce((sum, p) => sum + Number(p.qty), 0)}
            </td>
            <td style={{ border: "1px solid #1a1a1a" }}></td>
            <td style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right" }}>₹{Number(invoice.gst_total).toFixed(2)}</td>
            <td style={{ border: "1px solid #1a1a1a", padding: "10px 8px", textAlign: "right" }}>₹{Number(invoice.total_amount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* கீழே உள்ள கணக்கு விபரங்கள் */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "25px" }}>
        <div style={{ width: "300px", fontSize: "14px", lineHeight: "1.8" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Sub Total</span>
            <span>₹{Number(invoice.sub_total).toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>GST</span>
            <span>₹{Number(invoice.gst_total).toFixed(2)}</span>
          </div>
          <div
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              marginTop: "8px", 
              padding: "6px 8px", 
              fontWeight: "bold", 
              backgroundColor: color, 
              color: "#fff"
            }}
          >
            <span>Total</span>
            <span>₹{Number(invoice.total_amount).toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span>Payment</span>
            <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{invoice.payment_method}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", padding: "4px 8px", fontWeight: "bold", fontSize: "18px", color: color }}>
            <span>Paid</span>
            <span>₹{Number(invoice.paid_amount).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvoicePreview() {
  const { invoiceNo } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [company, setCompany] = useState(null)
  const color = "#2563eb"

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

  const downloadPDF = async () => {
    const element = document.getElementById("invoice-print-area")
    if (!element) return

    try {
      const html2pdfModule = (await import("html2pdf.js")).default
      html2pdfModule()
        .set({
          margin: 12,
          filename: `invoice-${invoice.invoice_no}.pdf`,
          html2canvas: { scale: 3, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI',Arial,sans-serif", padding: "24px 16px 40px" }}>
      {/* பட்டன் இருக்கும் ஏரியா - (வலது கார்னருக்கு மாற்றப்பட்டுள்ளது) */}
      <div style={{ maxWidth: 800, margin: "0 auto 20px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={downloadPDF}
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* மெயின் இன்வாய்ஸ் ஏரியா */}
      <div
        id="invoice-print-area"
        style={{
          background: "#fff",
          maxWidth: 800,
          margin: "0 auto",
          padding: "40px 45px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
        }}
      >
        <DesignOriginal invoice={invoice} company={company} color={color} />
      </div>
    </div>
  )
}