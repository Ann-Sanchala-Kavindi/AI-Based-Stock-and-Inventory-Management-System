import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import {
  getSupplierById,
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../../api/supplierApi"
import toast from "react-hot-toast"

const emptyForm = { name: "", companyName: "", email: "", phoneNo: "", address: "", status: "ACTIVE" }

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading]     = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm]           = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => { fetchSuppliers() }, [])

  async function fetchSuppliers() {
    try {
      setLoading(true)
      const res = await getAllSuppliers()
      setSuppliers(res.data)
    } catch (err) {
      toast.error("Failed to load suppliers")
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  function openEditModal(s) {
    setEditingId(s.id)
    setForm({
      name: s.name || "",
      companyName: s.companyName || "",
      email: s.email || "",
      phoneNo: s.phoneNo || "",
      address: s.address || "",
      status: s.status || "ACTIVE",
    })
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name.trim() || !form.companyName.trim()) {
      toast.error("Name and company name are required")
      return
    }
    try {
      setSubmitting(true)
      if (editingId) {
        await updateSupplier(editingId, form)
        toast.success("Supplier updated")
      } else {
        await createSupplier(form)
        toast.success("Supplier created")
      }
      setShowModal(false)
      fetchSuppliers()
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSupplier(id)
      toast.success("Supplier deleted")
      setDeleteTarget(null)
      fetchSuppliers()
    } catch (err) {
      toast.error("Failed to delete supplier")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Suppliers" subtitle="Manage your supplier directory" />
        <div className="flex-1 p-5">

          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              {suppliers.length} supplier{suppliers.length !== 1 ? "s" : ""}
            </p>
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-[#0B1120] text-white
                px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-all">
              <i className="ti ti-plus text-base" />
              Add Supplier
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Phone</th>
                   <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Address</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                      <i className="ti ti-loader-2 animate-spin text-xl block mb-2" />
                      Loading suppliers...
                    </td>
                  </tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <i className="ti ti-truck text-3xl text-gray-200 block mb-2" />
                      <p className="text-sm text-gray-400">No suppliers yet</p>
                      <p className="text-xs text-gray-300 mt-1">Click "Add Supplier" to create one</p>
                    </td>
                  </tr>
                ) : (
                  suppliers.map((s) => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                      <td className="px-5 py-3 text-sm font-medium text-gray-800">{s.name}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{s.companyName}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">{s.email}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">{s.phoneNo}</td>
                      <td className="px-5 py-3 text-xs text-gray-500">{s.address}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${s.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditModal(s)}
                            className="w-7 h-7 rounded-lg border border-gray-200
                              text-gray-400 flex items-center justify-center hover:bg-gray-50">
                            <i className="ti ti-edit text-sm" />
                          </button>
                          <button onClick={() => setDeleteTarget(s)}
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
                {editingId ? "Edit supplier" : "Add supplier"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Contact name</label>
              <input type="text" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Kasun Perera"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Company name</label>
              <input type="text" value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                placeholder="e.g. Sunrise Distributors"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                <input type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                    text-sm text-gray-800 outline-none focus:border-blue-400
                    focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
                <input type="text" value={form.phoneNo}
                  onChange={e => setForm({ ...form, phoneNo: e.target.value })}
                  placeholder="+94 77 123 4567"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                    text-sm text-gray-800 outline-none focus:border-blue-400
                    focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Address</label>
              <input type="text" value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="Street, City"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
              <select value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5
                  text-sm text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
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
            <h3 className="text-sm font-medium text-gray-800 mb-1">Delete supplier</h3>
            <p className="text-xs text-gray-400 mb-5">
              <span className="font-medium text-gray-700">{deleteTarget.name}</span> ({deleteTarget.companyName}) will be permanently removed.
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