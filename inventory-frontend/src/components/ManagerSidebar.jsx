import { NavLink, useNavigate } from "react-router-dom"

const managerNav = [
  { label: "Dashboard",  icon: "ti-layout-dashboard", path: "/manager-dashboard"            },
  { label: "Managers",   icon: "ti-users",            path: "/manager-dashboard/managers"   },
  { label: "Categories", icon: "ti-tags",              path: "/manager-dashboard/categories" }, // ✅ add
  { label: "Inventory",  icon: "ti-stack-2",          path: "/inventory"                     },
  { label: "Sales",      icon: "ti-receipt",          path: "/sales"                         },
  { label: "Products",   icon: "ti-package",          path: "/products"                      },
  { label: "Suppliers",  icon: "ti-truck",            path: "/suppliers"                      },
]

export default function ManagerSidebar() {
  const navigate  = useNavigate()
  const username  = localStorage.getItem("username") || "Manager"

  function handleLogout() {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="w-[200px] flex-shrink-0 bg-[#0B1120] flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/5">
        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
          <i className="ti ti-box text-white text-sm" />
        </div>
        <span className="text-white text-sm font-medium tracking-widest">INVENTRO</span>
      </div>

      <div className="px-2 pt-3">
        <p className="text-[10px] text-white/25 uppercase tracking-widest px-2 mb-1">
          Operations
        </p>
        {managerNav.map((item) => (
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

      <div className="mt-auto px-3 py-3 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-green-500 rounded-full flex items-center
            justify-center text-white text-xs font-medium">
            {username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white text-xs font-medium">{username}</p>
            <p className="text-white/30 text-[10px]">Manager</p>
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