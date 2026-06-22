import ManagerSidebar from "../../components/ManagerSidebar"
import Topbar from "../../components/Topbar"
import NewSalePage from "./NewSalePage"

export default function ManagerNewSalePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="New Sale" subtitle="Record a new sale" />
        <NewSalePage backPath="/manager-dashboard" />
      </div>
    </div>
  )
}