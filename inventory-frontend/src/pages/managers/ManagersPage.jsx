import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import {
  getAllManagers,
  createManager,
  deleteManager,
  toggleManager
} from "../../api/userApi"
import toast from "react-hot-toast"

export default function ManagersPage() {
  const [managers, setManagers]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]           = useState({ username: "", password: "" })
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => { fetchManagers() }, [])

  async function fetchManagers() {
    try {
      setLoading(true)
      const res = await getAllManagers()
      setManagers(res.data)
    } catch (err) {
      toast.error("Failed to load managers")
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    if (!form.username || !form.password) {
      toast.error("Please fill all fields")
      return
    }
    if (form.password.length < 4) {
      toast.error("Password must be at least 4 characters")
      return
    }
    try {
      setSubmitting(true)
      await createManager(form)
      toast.success("Manager created successfully")
      setShowModal(false)
      setForm({ username: "", password: "" })
      fetchManagers()
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Username already exists")
      } else {
        toast.error("Failed to create manager")
      }
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteManager(id)
      toast.success("Manager deleted")
      setDeleteConfirm(null)
      fetchManagers()
    } catch {
      toast.error("Failed to delete manager")
    }
  }

  async function handleToggle(id) {
    try {
      await toggleManager(id)
      toast.success("Status updated")
      fetchManagers()
    } catch {
      toast.error("Failed to update status")
    }
  }

  const avatarColors = [
    "bg-blue-50 text-blue-800",
    "bg-green-50 text-green-800",
    "bg-amber-50 text-amber-800",
    "bg-pink-50 text-pink-800",
    "bg-purple-50 text-purple-800",
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Managers" subtitle="Manage system users" />

        <div className="flex-1 p-5">

          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm text-gray-500">
                {managers.length} manager{managers.length !== 1 ? "s" : ""} registered
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              Add Manager
            </button>
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
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading managers...
                    </td>
                  </tr>
                ) : managers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <i className="ti ti-users text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No managers yet</p>
                      <p className="text-xs text-gray-300 mt-1">Click "Add Manager" to create one</p>
                    </td>
                  </tr>
                ) : (
                  managers.map((m, i) => (
                    <tr key={m.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-xs text-gray-400">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                            text-xs font-medium ${avatarColors[i % avatarColors.length]}`}>
                            {m.username[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{m.username}</p>
                          </div>
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
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {/* Toggle button */}
                          <button
                            onClick={() => handleToggle(m.id)}
                            title={m.active ? "Active" : "Disabled"}
                            className={`w-7 h-7 rounded-lg border flex items-center
                              justify-center text-xs transition-all
                              ${m.active
                                ? "border-amber-200 text-amber-500 hover:bg-amber-50"
                                : "border-green-200 text-green-500 hover:bg-green-50"}`}>
                            <i className={`ti ${m.active ? "ti-lock" : "ti-lock-open"} text-sm`} />
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => setDeleteConfirm(m)}
                            className="w-7 h-7 rounded-lg border border-red-100
                              text-red-400 flex items-center justify-center
                              hover:bg-red-50 transition-all">
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

      {/* Add Manager Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-gray-800">Add New Manager</h2>
              <button onClick={() => { setShowModal(false); setForm({ username: "", password: "" }) }}
                className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="Enter username"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setShowModal(false); setForm({ username: "", password: "" }) }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5
                  rounded-lg text-sm hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={submitting}
                className="flex-1 bg-[#0B1120] text-white py-2.5 rounded-lg
                  text-sm font-medium hover:opacity-80 transition-all disabled:opacity-50">
                {submitting ? "Creating..." : "Create Manager"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs mx-4 p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center
              justify-center mx-auto mb-4">
              <i className="ti ti-trash text-red-500 text-xl" />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Delete Manager</h3>
            <p className="text-xs text-gray-400 mb-5">
              Are you sure you want to delete
              <span className="font-medium text-gray-700"> {deleteConfirm.username}</span>?
              This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2
                  rounded-lg text-sm hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
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