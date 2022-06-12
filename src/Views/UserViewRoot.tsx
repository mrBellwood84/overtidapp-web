import { Route, Routes } from "react-router-dom"
import { AppbarUser } from "../Components/Navigation/AppbarUser"

export const UserViewRoot = () => {
    return <div className="page-container">
        
        <nav>
            <AppbarUser />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={null} />
                <Route path="workhour" element={null} />
                <Route path="contract" element={null} />
                <Route path="contract/create" element={null} />
            </Routes>
        </main>
    </div>
}