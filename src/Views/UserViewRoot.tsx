import { Route, Routes } from "react-router-dom"
import { EmploymentContractCreateEditForm } from "../Components/Employment/Contracts/EmploymentContractCreateEditForm"
import { AppbarUser } from "../Components/Navigation/AppbarUser"
import { UserEmploymentContractsView } from "./UserPages/UserEmploymentContractsView"

export const UserViewRoot = () => {
    return <div className="page-container">
        
        <nav>
            <AppbarUser />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={null} />
                <Route path="workhour" element={null} />
                <Route path="contract" element={<UserEmploymentContractsView />} />
                <Route path="contract/create" element={<EmploymentContractCreateEditForm />} />
            </Routes>
        </main>
    </div>
}