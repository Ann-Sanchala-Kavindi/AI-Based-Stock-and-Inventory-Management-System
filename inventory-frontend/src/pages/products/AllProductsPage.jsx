import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { getAllProducts, deleteProduct } from "../../api/productApi"
import toast from "react-hot-toast"

export default function AllProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await getAllProducts()
      setProducts(res.data)
    } catch (err) {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
      toast.success("Product deleted")
      setDeleteTarget(null)
      fetchProducts()
    } catch (err) {
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Products" subtitle="All products across categories" />
        <div className="flex-1 p-5">

          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? "s" : ""} total
            </p>
            <button onClick={() => navigate("/categories")}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              Add via Category
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Price</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <i className="ti ti-package text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No products yet</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Go to a category to add your first product
                      </p>
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
                      <td className="px-5 py-3">
                        {p.categoryId ? (
                          <button
                            onClick={() => navigate(`/categories/${p.categoryId}/products`)}
                            className="text-xs text-blue-600 hover:underline">
                            {p.categoryName || "View"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">
                        Rs. {Number(p.price).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => setDeleteTarget(p)}
                          className="w-7 h-7 rounded-lg border border-red-100
                            text-red-400 flex items-center justify-center hover:bg-red-50">
                          <i className="ti ti-trash text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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