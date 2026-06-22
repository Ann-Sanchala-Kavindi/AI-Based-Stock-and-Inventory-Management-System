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
import ProductsPage from "./pages/products/ProductsPage"
import ManagerProductsPage from "./pages/products/ManagerProductsPage"
import AllProductsPage from "./pages/products/AllProductsPage"
import ManagerAllProductsPage from "./pages/products/ManagerAllProductsPage"
import SalesHistoryPage from "./pages/sales/SalesHistoryPage"
import ManagerSalesHistoryPage from "./pages/sales/ManagerSalesHistoryPage"
import AdminNewSalePage from "./pages/sales/AdminNewSalePage"
import ManagerNewSalePage from "./pages/sales/ManagerNewSalePage"
import AdminPurchaseOrdersPage from "./pages/purchase-orders/AdminPurchaseOrdersPage"
import ManagerPurchaseOrdersPage from "./pages/purchase-orders/ManagerPurchaseOrdersPage"
import SuppliersPage from "./pages/suppliers/SuppliersPage"
import SupplierViewPage from "./pages/suppliers/SupplierViewPage"

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
        <Route path="/categories" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <CategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/categories/:categoryId/products" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <ProductsPage />
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
        <Route path="/manager-dashboard/categories" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <CategoryViewPage />
          </ProtectedRoute>
        } />
        <Route path="/manager-dashboard/categories/:categoryId/products" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerProductsPage />
          </ProtectedRoute>
        } />

                // Admin
        <Route path="/products" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <AllProductsPage />
          </ProtectedRoute>
        } />

        // Manager
        <Route path="/manager-dashboard/products" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerAllProductsPage />
          </ProtectedRoute>
        } />

                // Admin
        <Route path="/sales" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <SalesHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/sales/new" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <AdminNewSalePage />
          </ProtectedRoute>
        } />

        // Manager
        <Route path="/manager-dashboard/sales" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerSalesHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/manager-dashboard/sales/new" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerNewSalePage />
          </ProtectedRoute>
        } />

                // Admin
        <Route path="/purchase-orders" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <AdminPurchaseOrdersPage />
          </ProtectedRoute>
        } />

        // Manager
        <Route path="/manager-dashboard/purchase-orders" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <ManagerPurchaseOrdersPage />
          </ProtectedRoute>
        } />

                // Admin
        <Route path="/suppliers" element={
          <ProtectedRoute allowedRole="ROLE_ADMIN">
            <SuppliersPage />
          </ProtectedRoute>
        } />

        // Manager
        <Route path="/manager-dashboard/suppliers" element={
          <ProtectedRoute allowedRole="ROLE_MANAGER">
            <SupplierViewPage />
          </ProtectedRoute>
        } />




      </Routes>
    </BrowserRouter>
  )
}

export default App