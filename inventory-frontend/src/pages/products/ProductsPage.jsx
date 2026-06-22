import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import {
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../api/productApi"
import { getAllCategories } from "../../api/categoryApi"
import toast from "react-hot-toast"

export default function ProductsPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const [categoryName, setCategoryName] = useState("")
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm]           = useState({ name: "", brand: "", price: "" })
  const [submitting, setSubmitting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => { fetchData() }, [categoryId])

  async function fetchData() {
    try {
      setLoading(true)
      const [prodRes, catRes] = await Promise.all([
        getProductsByCategory(categoryId),
        getAllCategories(),
      ])
      setProducts(prodRes.data)
      const cat = catRes.data.find(c => c.id === Number(categoryId))
      setCategoryName(cat ? cat.name : "Category")
    } catch (err) {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingId(null)
    setForm({ name: "", brand: "", price: "" })
    setShowModal(true)
  }

  function openEditModal(p) {
    setEditingId(p.id)
    setForm({ name: p.name, brand: p.brand || "", price: p.price })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error("Product name is required")
      return
    }
    if (!form.price || isNaN(form.price)) {
      toast.error("Enter a valid price")
      return
    }
    try {
      setSubmitting(true)
      const payload = { name: form.name, brand: form.brand, price: parseFloat(form.price) }
      if (editingId) {
        await updateProduct(editingId, payload)
        toast.success("Product updated")
      } else {
        await createProduct(categoryId, payload)
        toast.success("Product created")
      }
      setShowModal(false)
      fetchData()
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
      toast.success("Product deleted")
      setDeleteTarget(null)
      fetchData()
    } catch (err) {
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Products" subtitle={`Manage ${categoryName} products`} />
        <div className="flex-1 p-5">

          {/* Breadcrumb */}
          <button onClick={() => navigate("/categories")}
            className="flex items-center gap-1.5 text-xs text-gray-400
              hover:text-gray-600 mb-3 transition-all">
            <i className="ti ti-arrow-left text-sm" /> Back to categories
          </button>

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-base font-medium text-gray-800">{categoryName}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              Add Product
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Price</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12">
                      <i className="ti ti-package text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No products in this category yet</p>
                      <p className="text-xs text-gray-300 mt-1">Click "Add Product" to create one</p>
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-sm font-medium text-gray-800">{p.name}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {p.brand || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">
                        Rs. {Number(p.price).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditModal(p)}
                            className="w-7 h-7 rounded-lg border border-gray-200
                              text-gray-400 flex items-center justify-center hover:bg-gray-50">
                            <i className="ti ti-edit text-sm" />
                          </button>
                          <button onClick={() => setDeleteTarget(p)}
                            className="w-7 h-7 rounded-lg border border-red-100
                              text-red-400 flex items-center justify-center hover:bg-red-50">
                            <i className="ti ti-trash text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-gray-800">
                {editingId ? "Edit product" : "Add product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Product name</label>
              <input type="text" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Floral Blouse"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Brand</label>
              <input type="text" value={form.brand}
                onChange={e => setForm({ ...form, brand: e.target.value })}
                placeholder="e.g. Kelly Felder"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (Rs.)</label>
              <input type="number" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
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
            <h3 className="text-sm font-medium text-gray-800 mb-1">Delete product</h3>
            <p className="text-xs text-gray-400 mb-5">
              <span className="font-medium text-gray-700">{deleteTarget.name}</span> ({deleteTarget.brand}) will be permanently removed.
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