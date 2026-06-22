import ManagerSidebar from "../../components/ManagerSidebar"
import SalesHistoryPage from "./SalesHistoryPage"

export default function ManagerSalesHistoryPage() {
  return (
    <SalesHistoryPage
      SidebarComponent={ManagerSidebar}
      isAdmin={false}
      newSalePath="/manager-dashboard/sales/new"
    />
  )
}