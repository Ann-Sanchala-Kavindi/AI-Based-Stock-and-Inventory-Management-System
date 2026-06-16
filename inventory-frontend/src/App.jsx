import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./routes/ProtectedRoute"
import LoginPage from "./pages/auth/LoginPage"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import ManagerDashboard from "./pages/dashboard/ManagerDashboard"
import ManagersPage from "./pages/managers/ManagersPage"
import ManagerViewPage from "./pages/managers/ManagerViewPage"
import CategoryViewPage from "./pages/categories/CategoryViewPage"
import CategoryPage from "./pages/categories/CategoryPage"

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin only */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/managers" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <ManagersPage />
          </ProtectedRoute>
        } />

        {/* Manager only */}
        <Route path="/manager-dashboard" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/manager-dashboard/managers" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerViewPage />
          </ProtectedRoute>
        } />

        // Admin routes
        <Route path="/categories" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <CategoryPage />
          </ProtectedRoute>
        } />

        // Manager routes
        <Route path="/manager-dashboard/categories" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <CategoryViewPage />
          </ProtectedRoute>
        } />
      </Routes>

      
    </BrowserRouter>
  )
}

export default App