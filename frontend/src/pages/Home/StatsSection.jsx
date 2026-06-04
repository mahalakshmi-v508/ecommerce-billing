export default function StatsSection() {
  return (
    <section className="bg-indigo-600 text-white py-16 text-center">
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div>
          <h3 className="text-3xl font-bold">10,000+</h3>
          <p>Customers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">5,000+</h3>
          <p>Products</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">2,500+</h3>
          <p>Orders</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">99%</h3>
          <p>Happy Clients</p>
        </div>
      </div>
    </section>
  )
}