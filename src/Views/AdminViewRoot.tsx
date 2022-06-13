import { Route, Routes } from "react-router-dom"
import { EmployerCardViewAdmin } from "../Components/Employer/EmployerCardViewAdmin"
import { EmployerCreateView } from "../Components/Employer/EmployerCreateView"
import { EmployerEditViewAdmin } from "../Components/Employer/EmployerEditViewAdmin"
import { EmployerSingleDetailViewAdmin } from "../Components/Employer/EmployerSingleDetailViewAdmin"
import { AppbarAdmin } from "../Components/Navigation/AppbarAdmin"

/** root view component for admin users */
export const AdminViewRoot = () => {

    return <div className="page-container">

        
        <nav>
            <AppbarAdmin />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={<div>dashboard</div>} />
                <Route path="agreements/collectiveagreement" element={null} />
                <Route path="employers" element={<EmployerCardViewAdmin />} />
                <Route path="employers/create" element={<EmployerCreateView />} />
                <Route path="employers/details" element={<EmployerSingleDetailViewAdmin />} />
                <Route path="employers/edit" element={<EmployerEditViewAdmin />} />
                <Route path="*" element={<div>No Route...</div>} />
            </Routes>
        </main>
        

        
    </div>
}