export default function AboutSection() {
  return (
    <section className="py-16 text-center px-6">
      <h2 className="text-3xl font-bold mb-6">About Us</h2>

      <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="p-4 shadow rounded-xl">🛒 Inventory</div>
        <div className="p-4 shadow rounded-xl">📦 Orders</div>
        <div className="p-4 shadow rounded-xl">💳 Payments</div>
        <div className="p-4 shadow rounded-xl">👥 Support</div>
      </div>

      <p className="mt-6 text-gray-600">
        SmartCommerce helps users manage shopping easily.
      </p>
    </section>
  )
}