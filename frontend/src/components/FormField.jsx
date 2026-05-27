export default function FormField({ label, id, type = 'text', value, onChange, placeholder, ...props }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
      <span className="flex items-center justify-between text-slate-900">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        {...props}
      />
    </label>
  )
}
