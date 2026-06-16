import { useEffect, useState } from "react"
import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"
import { getAllManagers } from "../../api/userApi"

const avatarColors = [
  "bg-blue-50 text-blue-800",
  "bg-green-50 text-green-800",
  "bg-amber-50 text-amber-800",
  "bg-pink-50 text-pink-800",
  "bg-purple-50 text-purple-800",
]

export default function ManagerViewPage() {
  const [managers, setManagers] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => { fetchManagers() }, [])

  async function fetchManagers() {
    try {
      const res = await getAllManagers()
      setManagers(res.data)
    } catch (err) {
      console.error("Failed to load managers", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Managers" subtitle="View all managers" />
        <div className="flex-1 p-5">

          {/* Read only notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2
            mb-5 flex items-center gap-2">
            <i className="ti ti-info-circle text-blue-500 text-base" />
            <p className="text-xs text-blue-600">
              You can view managers. Only admin can add or remove managers.
            </p>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">#</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Manager</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Role</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading managers...
                    </td>
                  </tr>
                ) : managers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12">
                      <i className="ti ti-users text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No managers found</p>
                    </td>
                  </tr>
                ) : (
                  managers.map((m, i) => (
                    <tr key={m.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-xs text-gray-400">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center
                            justify-center text-xs font-medium
                            ${avatarColors[i % avatarColors.length]}`}>
                            {m.username[0].toUpperCase()}
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {m.username}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs bg-blue-50 text-blue-700
                          px-2 py-0.5 rounded-full">
                          Manager
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full
                          ${m.active
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"}`}>
                         {m.active ? "Active" : "Disabled"}
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