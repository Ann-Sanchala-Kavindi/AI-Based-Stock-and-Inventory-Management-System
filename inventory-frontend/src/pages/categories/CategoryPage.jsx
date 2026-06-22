import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../api/categoryApi"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [query, setQuery]           = useState("")
  const [showModal, setShowModal]   = useState(false)
  const [editingId, setEditingId]   = useState(null)
  const [form, setForm]             = useState({ name: "", description: "" })
  const [submitting, setSubmitting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const navigate = useNavigate();

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    try {
      setLoading(true)
      const res = await getAllCategories()
      setCategories(res.data)
    } catch (err) {
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingId(null)
    setForm({ name: "", description: "" })
    setShowModal(true)
  }

  function openEditModal(cat) {
    setEditingId(cat.id)
    setForm({ name: cat.name, description: cat.description })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error("Category name is required")
      return
    }
    try {
      setSubmitting(true)
      if (editingId) {
        await updateCategory(editingId, form)
        toast.success("Category updated")
      } else {
        await createCategory(form)
        toast.success("Category created")
      }
      setShowModal(false)
      fetchCategories()
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCategory(id)
      toast.success("Category deleted")
      setDeleteTarget(null)
      fetchCategories()
    } catch (err) {
      toast.error("Failed to delete category")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Categories" subtitle="Manage product categories" />
        <div className="flex-1 p-5">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                {categories.filter(c => c.name?.toLowerCase().includes(query.toLowerCase())).length} categor{categories.length !== 1 ? "ies" : "y"}
              </p>
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
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              Add Category
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">
              <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <i className="ti ti-tags text-3xl text-gray-200 block mb-2" />
              <p className="text-sm text-gray-400">No categories yet</p>
              <p className="text-xs text-gray-300 mt-1">Click "Add Category" to create one</p>
            </div>
            ) : (
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
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-gray-800">
                {editingId ? "Edit category" : "Add category"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Beverages"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Short description..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5
                  rounded-lg text-sm hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button onClick={handleSave} disabled={submitting}
                className="flex-1 bg-[#0B1120] text-white py-2.5 rounded-lg
                  text-sm font-medium hover:opacity-80 transition-all disabled:opacity-50">
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs mx-4 p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center
              justify-center mx-auto mb-4">
              <i className="ti ti-trash text-red-500 text-xl" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Delete category</h3>
            <p className="text-xs text-gray-400 mb-5">
              <span className="font-medium text-gray-700">{deleteTarget.name}</span> will be permanently removed.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2
                  rounded-lg text-sm hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg
                  text-sm font-medium hover:opacity-80 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}