import { useEffect, useState } from "react"
import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"
import { getAllCategories } from "../../api/categoryApi"

export default function CategoryViewPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [query, setQuery]           = useState("")

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    try {
      const res = await getAllCategories()
      setCategories(res.data)
    } catch (err) {
      console.error("Failed to load categories", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Categories" subtitle="View product categories" />
        <div className="flex-1 p-5">

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2
            mb-5 flex items-center gap-2">
            <i className="ti ti-info-circle text-blue-500 text-base" />
            <p className="text-xs text-blue-600">
              You can view categories. Only admin can add, edit or remove categories.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">
              <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <i className="ti ti-tags text-3xl text-gray-200 block mb-2" />
              <p className="text-sm text-gray-400">No categories found</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">{categories.filter(c => c.name?.toLowerCase().includes(query.toLowerCase())).length} categor{categories.length !== 1 ? "ies" : "y"}</p>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search categories..."
                    className="w-60 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <i className="ti ti-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
              </div>

                        <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
                <div key={cat.id}
                onClick={() => navigate(`/categories/${cat.id}/products`)}
                className="bg-white border border-gray-100 rounded-xl p-4 cursor-pointer
                    hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i className="ti ti-tag text-blue-700 text-base" />
                    </div>
                    <div className="flex gap-1.5">
                    <button onClick={(e) => { e.stopPropagation(); openEditModal(cat) }}
                        className="w-7 h-7 border border-gray-200 rounded-md
                        flex items-center justify-center text-gray-400 hover:bg-gray-50">
                        <i className="ti ti-edit text-xs" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(cat) }}
                        className="w-7 h-7 border border-gray-200 rounded-md
                        flex items-center justify-center text-gray-400
                        hover:text-red-500 hover:border-red-200 hover:bg-red-50">
                        <i className="ti ti-trash text-xs" />
                    </button>
                    </div>
                </div>
      <p className="text-sm font-medium text-gray-800 mb-1">{cat.name}</p>
      <p className="text-xs text-gray-400 leading-relaxed mb-2.5 min-h-[32px]">
        {cat.description || "No description"}
      </p>
      <span className="text-xs text-blue-500">View products →</span>
    </div>
  ))}
</div>
           
            </>
          )}
        </div>
      </div>
    </div>
  )
}