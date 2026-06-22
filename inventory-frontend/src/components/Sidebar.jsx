import { NavLink, useNavigate } from "react-router-dom"

const adminNav = [
  { label: "Dashboard",    icon: "ti-layout-dashboard", path: "/dashboard" },
  { label: "Managers",     icon: "ti-users",            path: "/managers" },
  { label: "Products",     icon: "ti-package",          path: "/products" },
  { label: "Categories",   icon: "ti-tags",             path: "/categories" },
  { label: "Suppliers",    icon: "ti-truck",            path: "/suppliers" },
]

const operationsNav = [
  { label: "Inventory",       icon: "ti-stack-2",   path: "/inventory" },
  { label: "Purchase Orders", icon: "ti-truck-delivery", path: "/purchase-orders" },  // ✅ add this
  { label: "Sales",           icon: "ti-receipt",   path: "/sales" },
  { label: "AI Predictions",  icon: "ti-brain",     path: "/predictions" },
  { label: "Analytics",       icon: "ti-chart-bar", path: "/analytics" },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username") || "Admin"

  function handleLogout() {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="w-[200px] flex-shrink-0 bg-[#0B1120] flex flex-col min-h-screen">

      {/* Brand */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/5">
        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
          <i className="ti ti-box text-white text-sm" />
        </div>
        <span className="text-white text-sm font-medium tracking-widest">INVENTRO</span>
      </div>

      {/* Main Nav */}
      <div className="px-2 pt-3">
        <p className="text-[10px] text-white/25 uppercase tracking-widest px-2 mb-1">Main</p>
        {adminNav.map((item) => (
          <NavLink key={item.path} to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-all
              ${isActive
                ? "bg-blue-500/15 text-blue-400"
                : "text-white/40 hover:bg-white/5 hover:text-white/80"}`
            }>
            <i className={`ti ${item.icon} text-sm`} />
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Operations Nav */}
      <div className="px-2 pt-3">
        <p className="text-[10px] text-white/25 uppercase tracking-widest px-2 mb-1">Operations</p>
        {operationsNav.map((item) => (
          <NavLink key={item.path} to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-all
              ${isActive
                ? "bg-blue-500/15 text-blue-400"
                : "text-white/40 hover:bg-white/5 hover:text-white/80"}`
            }>
            <i className={`ti ${item.icon} text-sm`} />
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Bottom user */}
      <div className="mt-auto px-3 py-3 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white text-xs font-medium">{username}</p>
            <p className="text-white/30 text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md
            text-xs text-white/40 hover:bg-white/5 hover:text-red-400 transition-all">
          <i className="ti ti-logout text-sm" />
          Logout
        </button>
      </div>
    </div>
  )
}