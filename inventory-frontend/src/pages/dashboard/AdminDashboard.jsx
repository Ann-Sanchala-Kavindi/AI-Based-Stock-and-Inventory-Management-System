import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { getAllManagers } from "../../api/userApi"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const barHeights = [45, 65, 50, 90, 72, 80, 55]

const avatarColors = [
  "bg-blue-50 text-blue-800",
  "bg-green-50 text-green-800",
  "bg-amber-50 text-amber-800",
  "bg-pink-50 text-pink-800",
  "bg-purple-50 text-purple-800",
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    products: 0, revenue: 0, lowStock: 0, managers: 0
  })
  const [managers, setManagers] = useState([])

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const managersRes = await getAllManagers()
      setManagers(managersRes.data)
      setStats({
        products: 0,
        lowStock: 0,
        managers: managersRes.data.length,
        revenue: "84,200",
      })
    } catch (err) {
      console.error("Dashboard error:", err)
    }
  }                                           // ✅ fetchStats closes here

  const statCards = [                         // ✅ inside component
    { label: "Total products",   value: stats.products,         icon: "ti-package",        color: "bg-blue-50",  iconColor: "text-blue-800",  trend: "+12%",   trendUp: true  },
    { label: "Monthly revenue",  value: `Rs. ${stats.revenue}`, icon: "ti-receipt",        color: "bg-green-50", iconColor: "text-green-800", trend: "+8%",    trendUp: true  },
    { label: "Low stock alerts", value: stats.lowStock,         icon: "ti-alert-triangle", color: "bg-amber-50", iconColor: "text-amber-800", trend: "items",  trendUp: false },
    { label: "Active managers",  value: stats.managers,         icon: "ti-users",          color: "bg-red-50",   iconColor: "text-red-800",   trend: "Active", trendUp: true  },
  ]

  return (                                  
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Dashboard" />
        <div className="flex-1 p-5 overflow-y-auto">

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {statCards.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center`}>
                    <i className={`ti ${s.icon} text-base ${s.iconColor}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${s.trendUp ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                    {s.trend}
                  </span>
                </div>
                <p className="text-xl font-medium text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Row 2 — Bar Chart + Alerts */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="col-span-3 bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-800">Weekly sales overview</p>
                <button className="text-xs text-blue-500">View all</button>
              </div>
              <div className="flex items-end gap-2 h-24">
                {weekDays.map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-sm transition-all
                        ${i === 3 ? "bg-blue-500" : "bg-blue-100 hover:bg-blue-300"}`}
                      style={{ height: `${barHeights[i]}px` }}
                    />
                    <span className="text-[10px] text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-800">Smart alerts</p>
                <button className="text-xs text-blue-500">View all</button>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { text: "Rice stock will finish in 3 days", time: "Now",    dot: "bg-red-400"   },
                  { text: "High demand predicted for Sugar",  time: "2h ago", dot: "bg-amber-400" },
                  { text: "New prediction model available",   time: "5h ago", dot: "bg-blue-400"  },
                  { text: "Milk reorder level reached",       time: "1d ago", dot: "bg-amber-400" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 border border-gray-100 rounded-lg">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`} />
                    <span className="text-xs text-gray-700 flex-1">{a.text}</span>
                    <span className="text-[10px] text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 — Top Products + Active Managers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-800">Top selling products</p>
                <button className="text-xs text-blue-500">View all</button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Basmati Rice", val: 1420, pct: 95 },
                  { name: "Whole Milk",   val: 1102, pct: 78 },
                  { name: "White Sugar",  val: 890,  pct: 60 },
                  { name: "Coconut Oil",  val: 634,  pct: 45 },
                  { name: "Red Lentils",  val: 448,  pct: 32 },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 w-3">{i + 1}</span>
                    <span className="text-xs text-gray-700 flex-1">{p.name}</span>
                    <div className="w-20 h-1 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-400 rounded-full"
                        style={{ width: `${p.pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">{p.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real managers from backend */}
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-800">Active managers</p>
                <button
                  onClick={() => navigate("/managers")}
                  className="text-xs text-blue-500 hover:text-blue-700 transition-all">
                  Manage →
                </button>
              </div>

              {managers.length === 0 ? (
                <div className="text-center py-6">
                  <i className="ti ti-users text-2xl text-gray-200 block mb-2" />
                  <p className="text-xs text-gray-400">No managers yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {managers.slice(0, 5).map((m, i) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center
                        text-[11px] font-medium flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {m.username[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-800">{m.username}</p>
                        <p className="text-[10px] text-gray-400">Manager</p>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full
                        ${m.active
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"}`}>
                        {m.active ? "Active" : "Disabled"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}                                             