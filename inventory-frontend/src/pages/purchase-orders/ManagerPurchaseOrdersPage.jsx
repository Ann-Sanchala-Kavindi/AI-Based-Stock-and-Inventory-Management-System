import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"
import PurchaseOrdersPage from "./PurchaseOrdersPage"

export default function ManagerPurchaseOrdersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Purchase Orders" subtitle="Restock from suppliers" />
        <PurchaseOrdersPage />
      </div>
    </div>
  )
}