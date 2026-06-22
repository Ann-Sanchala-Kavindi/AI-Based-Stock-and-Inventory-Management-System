import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { getAllSales, deleteSale } from "../../api/saleApi"
import toast from "react-hot-toast"

const paymentColors = {
  CASH:   "bg-green-50 text-green-700",
  CARD:   "bg-blue-50 text-blue-700",
  ONLINE: "bg-purple-50 text-purple-700",
}

export default function SalesHistoryPage({ SidebarComponent = Sidebar, isAdmin = true, newSalePath = "/sales/new" }) {
  const navigate = useNavigate()
  const [sales, setSales]   = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => { fetchSales() }, [])

  async function fetchSales() {
    try {
      setLoading(true)
      const res = await getAllSales()
      setSales(res.data)
    } catch (err) {
      toast.error("Failed to load sales")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSale(id)
      toast.success("Sale deleted")
      setDeleteTarget(null)
      fetchSales()
    } catch (err) {
      toast.error("Failed to delete sale")
    }
  }

  const SidebarComp = SidebarComponent

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComp />
      <div className="flex-1 flex flex-col">
        <Topbar title="Sales" subtitle="Sales history" />
        <div className="flex-1 p-5">

          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              {sales.length} sale{sales.length !== 1 ? "s" : ""} recorded
            </p>
            <button onClick={() => navigate(newSalePath)}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              New Sale
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Manager</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Items</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Payment</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Total</th>
                  {isAdmin && <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading sales...
                    </td>
                  </tr>
                ) : sales.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="text-center py-12">
                      <i className="ti ti-receipt text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No sales recorded yet</p>
                    </td>
                  </tr>
                ) : (
                  sales.map((s) => (
                    <tr key={s.saleId} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-xs text-gray-600">
                        {new Date(s.saleDate).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-800">{s.managerName}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">
                        {s.items?.length || 0} item{s.items?.length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${paymentColors[s.paymentMethod] || "bg-gray-100 text-gray-600"}`}>
                          {s.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-800">
                        Rs. {Number(s.totalAmount).toLocaleString()}
                      </td>
                      {isAdmin && (
                        <td className="px-5 py-3">
                          <button onClick={() => setDeleteTarget(s)}
                            className="w-7 h-7 rounded-lg border border-red-100
                              text-red-400 flex items-center justify-center hover:bg-red-50">
                            <i className="ti ti-trash text-sm" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs mx-4 p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ti ti-trash text-red-500 text-xl" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Delete sale</h3>
            <p className="text-xs text-gray-400 mb-5">
              Sale of <span className="font-medium text-gray-700">Rs. {Number(deleteTarget.totalAmount).toLocaleString()}</span> will be permanently removed.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget.saleId)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}