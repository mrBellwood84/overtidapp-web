import { Route, Routes } from "react-router-dom"
import { EmployerCardView } from "../Components/Employer/EmployerCardView"
import { EmployerCreateView } from "../Components/Employer/EmployerCreateView"
import { EmployerSingleDetailView } from "../Components/Employer/EmployerSingleDetailView"
import { AppbarAdmin } from "../Components/Navigation/AppbarAdmin"

export const AdminViewRoot = () => {

    return <div className="page-container">

        
        <nav>
            <AppbarAdmin />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={<div>dashboard</div>} />
                <Route path="agreements/collectiveagreement" element={null} />
                <Route path="employers" element={<EmployerCardView />} />
                <Route path="employers/create" element={<EmployerCreateView />} />
                <Route path="employers/details" element={<EmployerSingleDetailView />} />
                <Route path="employers/edit" element={null} />
                <Route path="*" element={<div>No Route...</div>} />
            </Routes>
        </main>
        

        
    </div>
}