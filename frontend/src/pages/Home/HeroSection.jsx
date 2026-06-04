export default function HeroSection({ navigate }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
      <h1 className="text-5xl font-bold">SmartCommerce Platform</h1>
      <p className="mt-4 text-lg">
        Manage Products, Orders & Shopping Easily
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => navigate('/categories')}
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold"
        >
          Shop Now
        </button>

        <button
          onClick={() => navigate('/products')}
          className="border border-white px-6 py-3 rounded-full"
        >
          Explore Products
        </button>
      </div>
    </section>
  )
}