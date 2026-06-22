import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import PurchaseOrdersPage from "./PurchaseOrdersPage"

export default function AdminPurchaseOrdersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Purchase Orders" subtitle="Restock from suppliers" />
        <PurchaseOrdersPage />
      </div>
    </div>
  )
}