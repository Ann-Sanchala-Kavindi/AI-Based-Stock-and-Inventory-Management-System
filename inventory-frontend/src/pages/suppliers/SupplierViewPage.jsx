import { useEffect, useState } from "react"
import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"
import { getAllSuppliers } from "../../api/supplierApi"

export default function SupplierViewPage() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => { fetchSuppliers() }, [])

  async function fetchSuppliers() {
    try {
      const res = await getAllSuppliers()
      setSuppliers(res.data)
    } catch (err) {
      console.error("Failed to load suppliers", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Suppliers" subtitle="View supplier directory" />
        <div className="flex-1 p-5">

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2
            mb-5 flex items-center gap-2">
            <i className="ti ti-info-circle text-blue-500 text-base" />
            <p className="text-xs text-blue-600">
              You can view suppliers. Only admin can add, edit or remove suppliers.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Phone</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading suppliers...
                    </td>
                  </tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <i className="ti ti-truck text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No suppliers found</p>
                    </td>
                  </tr>
                ) : (
                  suppliers.map((s) => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-sm font-medium text-gray-800">{s.name}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{s.companyName}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">{s.email}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">{s.phoneNo}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${s.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}