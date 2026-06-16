import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token")
  const role  = localStorage.getItem("role")

  // Not logged in → back to login
  if (!token) return <Navigate to="/" replace />

  // Wrong role → redirect to correct dashboard
  if (allowedRole && role !== allowedRole) {
    if (role === "ROLE_ADMIN")   return <Navigate to="/dashboard" replace />
    if (role === "ROLE_MANAGER") return <Navigate to="/manager-dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children
}