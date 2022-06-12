import { Route, Routes } from "react-router-dom"
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
                <Route path="employers" element={null} />
                <Route path="employers/details" element={null} />
                <Route path="employers/edit" element={null} />
                <Route path="*" element={<div>No Route...</div>} />
            </Routes>
        </main>
        

        
    </div>
}