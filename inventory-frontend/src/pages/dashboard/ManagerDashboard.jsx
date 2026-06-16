import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"

export default function ManagerDashboard() {
  const username = localStorage.getItem("username") || "Manager"

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Dashboard" subtitle={`Welcome back, ${username}`} />
        <div className="flex-1 p-5">

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Products",      icon: "ti-package",   color: "bg-blue-50",  iconColor: "text-blue-800"  },
              { label: "Low Stock",     icon: "ti-alert-triangle", color: "bg-amber-50", iconColor: "text-amber-800" },
              { label: "Today Sales",   icon: "ti-receipt",   color: "bg-green-50", iconColor: "text-green-800" },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center
                  justify-center mb-3`}>
                  <i className={`ti ${s.icon} text-base ${s.iconColor}`} />
                </div>
                <p className="text-xl font-medium text-gray-800">—</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center">
            <i className="ti ti-layout-dashboard text-3xl text-gray-200 block mb-2" />
            <p className="text-sm text-gray-400">
              Manager dashboard coming soon
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}