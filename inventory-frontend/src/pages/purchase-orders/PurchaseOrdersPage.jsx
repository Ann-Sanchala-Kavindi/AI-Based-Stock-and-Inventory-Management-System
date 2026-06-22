import { useEffect, useState } from "react"
import {
  getAllOrders,
  createOrder,
  updateOrderStatus
} from "../../api/purchaseOrderApi"
import { getAllProducts } from "../../api/productApi"
import { getAllSuppliers } from "../../api/supplierApi"
import toast from "react-hot-toast"

const statusStyles = {
  PENDING:   "bg-amber-50 text-amber-700",
  RECEIVED:  "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-600",
}

export default function PurchaseOrdersPage() {
  const [orders, setOrders]       = useState([])
  const [products, setProducts]   = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [filter, setFilter]       = useState("ALL")
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ productId: "", supplierId: "", quantityOrdered: "" })

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    try {
      setLoading(true)
      const [orderRes, prodRes, supRes] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllSuppliers(),
      ])
      setOrders(orderRes.data)
      setProducts(prodRes.data)
      setSuppliers(supRes.data)
    } catch (err) {
      toast.error("Failed to load purchase orders")
    } finally {
      setLoading(false)
    }
  }

  function openModal() {
    setForm({ productId: "", supplierId: "", quantityOrdered: "" })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.productId || !form.supplierId) {
      toast.error("Select a product and supplier")
      return
    }
    if (!form.quantityOrdered || Number(form.quantityOrdered) <= 0) {
      toast.error("Enter a valid quantity")
      return
    }
    try {
      setSubmitting(true)
      await createOrder({
        productId: Number(form.productId),
        supplierId: Number(form.supplierId),
        quantityOrdered: Number(form.quantityOrdered),
      })
      toast.success("Purchase order placed")
      setShowModal(false)
      fetchAll()
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to place order"
      toast.error(typeof msg === "string" ? msg : "Failed to place order")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateOrderStatus(id, status)
      toast.success(status === "RECEIVED" ? "Marked as received — stock updated" : "Order cancelled")
      fetchAll()
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update status"
      toast.error(typeof msg === "string" ? msg : "Failed to update status")
    }
  }

  const filtered = filter === "ALL" ? orders : orders.filter(o => o.status === filter)
  const tabs = ["ALL", "PENDING", "RECEIVED", "CANCELLED"]

  return (
    <div className="flex-1 p-5">

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {tabs.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 text-xs rounded-lg border transition-all
                ${filter === t
                  ? "bg-[#0B1120] text-white border-[#0B1120]"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <button onClick={openModal}
          className="flex items-center gap-2 bg-[#0B1120] text-white
            px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
          <i className="ti ti-plus text-base" />
          New Order
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Product</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Supplier</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Qty</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Ordered by</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                  <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                  Loading orders...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <i className="ti ti-truck text-3xl text-gray-200 block mb-2" />
                  <p className="text-sm text-gray-400">No purchase orders found</p>
                </td>
              </tr>
            ) : (
              filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">{o.productName}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{o.supplierName}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{o.quantityOrdered}</td>
                  <td className="px-5 py-3 text-xs text-gray-500">{o.orderedByUsername}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {o.status === "PENDING" ? (
                      <div className="flex gap-1.5">
                        <button onClick={() => handleStatusChange(o.id, "RECEIVED")}
                          className="text-xs px-2.5 py-1 rounded-md border border-gray-200
                            text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all">
                          Mark received
                        </button>
                        <button onClick={() => handleStatusChange(o.id, "CANCELLED")}
                          className="text-xs px-2.5 py-1 rounded-md border border-gray-200
                            text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-gray-800">New purchase order</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Product</label>
              <select value={form.productId}
                onChange={e => setForm({ ...form, productId: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="">Select a product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} {p.brand ? `(${p.brand})` : ""}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Supplier</label>
              <select value={form.supplierId}
                onChange={e => setForm({ ...form, supplierId: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="">Select a supplier</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name} — {s.companyName}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Quantity ordered</label>
              <input type="number" value={form.quantityOrdered}
                onChange={e => setForm({ ...form, quantityOrdered: e.target.value })}
                placeholder="e.g. 100"
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
                {submitting ? "Placing..." : "Place order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}