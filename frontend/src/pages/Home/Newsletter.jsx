export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-2xl font-bold">Newsletter</h2>

      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        <input
          className="px-4 py-3 border rounded-full w-72"
          placeholder="Enter email"
        />
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full">
          Subscribe
        </button>
      </div>
    </section>
  )
}