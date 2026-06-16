export default function Topbar({ title, subtitle }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  })

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3
      flex items-center justify-between">
      <div>
        <h1 className="text-sm font-medium text-gray-800">{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle || today}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 border border-gray-200 rounded-lg
          flex items-center justify-center text-gray-400 hover:bg-gray-50 relative">
          <i className="ti ti-bell text-base" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500
            rounded-full border-2 border-white" />
        </button>
        <button className="w-8 h-8 border border-gray-200 rounded-lg
          flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <i className="ti ti-settings text-base" />
        </button>
      </div>
    </div>
  )
}