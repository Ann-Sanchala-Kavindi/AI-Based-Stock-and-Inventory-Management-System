import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import NewSalePage from "./NewSalePage"

export default function AdminNewSalePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="New Sale" subtitle="Record a new sale" />
        <NewSalePage backPath="" />
      </div>
    </div>
  )
}