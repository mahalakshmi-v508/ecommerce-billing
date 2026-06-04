const steps = [
  { title: "Select Products", icon: "🛍️" },
  { title: "Add to Cart", icon: "🛒" },
  { title: "Make Payment", icon: "💳" },
  { title: "Delivery", icon: "🚚" },
]

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="p-6 bg-white shadow rounded-xl">
            <div className="text-3xl">{s.icon}</div>
            <p className="mt-2 font-semibold">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}