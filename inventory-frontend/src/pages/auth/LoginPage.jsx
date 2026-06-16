import { useState } from "react"

export default function LoginPage() {
  const [role, setRole] = useState("admin")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function handleLogin() {
    if (!username || !password) {
      setError("Please enter both username and password.")
      return
    }

    if (role === "admin" && username === "admin" && password === "admin123") {
      setError("")
      setSuccess(true)
      // later: save JWT token and redirect to dashboard
    } else {
      setError("Invalid credentials. Please check and try again.")
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-medium text-gray-800">Welcome, {username}!</h2>
          <p className="text-gray-500 text-sm mt-1">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-between flex-1 bg-[#0B1120] p-10 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(55,138,221,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(55,138,221,0.07) 1px, transparent 1px)`,
            backgroundSize: "36px 36px"
          }}
        />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📦</span>
          </div>
          <span className="text-white text-xl font-medium tracking-widest">INVENTRO</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <span className="text-xs font-medium text-blue-400 tracking-widest uppercase
            bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1">
            AI-Powered Platform
          </span>
          <h1 className="text-white text-4xl font-medium mt-4 leading-snug">
            Smart inventory,<br />
            <span className="text-blue-400">predicted ahead.</span>
          </h1>
          <p className="text-white/40 text-sm mt-3 max-w-xs leading-relaxed">
            Manage stock, track sales, and let AI forecast what you need — before you run out.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          {[["99%", "Uptime"], ["AI", "Demand forecast"], ["Real-time", "Stock alerts"]].map(([val, label], i) => (
            <div key={i}>
              <div className="text-white text-lg font-medium">{val}</div>
              <div className="text-white/30 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-medium text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to your INVENTRO account</p>

          {/* Role Tabs */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-7">
            {["admin", "manager"].map((r) => (
              <button key={r}
                onClick={() => { setRole(r); setError("") }}
                className={`flex-1 py-2 text-sm capitalize transition-all
                  ${role === r
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {r === "admin" ? "🛡 Admin" : "👤 Manager"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm
              rounded-lg px-4 py-2 mb-4">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                text-gray-800 outline-none focus:border-blue-400
                focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                  text-gray-800 outline-none focus:border-blue-400
                  focus:ring-2 focus:ring-blue-100 transition-all pr-10"
              />
              <button onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Hint */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-6">
            <p className="text-xs text-gray-500">
              Admin login: <span className="font-medium text-blue-600">admin</span> /
              <span className="font-medium text-blue-600"> admin123</span>
            </p>
          </div>

          {/* Login Button */}
          <button onClick={handleLogin}
            className="w-full bg-[#0B1120] text-white py-2.5 rounded-lg text-sm
              font-medium hover:opacity-80 transition-all">
            Sign in →
          </button>
        </div>
      </div>
    </div>
  )
}