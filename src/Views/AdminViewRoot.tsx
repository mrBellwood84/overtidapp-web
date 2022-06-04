import { Route, Routes } from "react-router-dom"
import { DevCollectiveAgreement } from "../Components/DEV_Components/DevCollectiveAgreement"
import { AddEmployerDialog } from "../Components/Employment/Employer/AddEmployerDialog/AddEmployerDialog"
import { EditEmployer } from "../Components/Employment/Employer/EditEmployer"
import { EmployerDetailedView } from "../Components/Employment/Employer/EmployerDetailedView"
import { AppbarAdmin } from "../Components/Navigation/AppbarAdmin"
import { AdminEmployersView } from "./AdminPages/AdminEmployersView"

export const AdminViewRoot = () => {

    return <div className="page-container">

        <AddEmployerDialog />
        
        <nav>
            <AppbarAdmin />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={<div>dashboard</div>} />
                <Route path="agreements/collectiveagreement" element={<DevCollectiveAgreement />} />
                <Route path="employers" element={<AdminEmployersView />} />
                <Route path="employers/details" element={<EmployerDetailedView />} />
                <Route path="employers/edit" element={<EditEmployer />} />
                <Route path="*" element={<div>No Route...</div>} />
            </Routes>
        </main>
        

        
    </div>
}