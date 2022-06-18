import { Route, Routes } from "react-router-dom"
import { AppbarUser } from "../Components/Navigation/AppbarUser"
import { DEV_testAgreementView } from "./User/DEV_testAgreementView"

export const UserViewRoot = () => {
    return <div className="page-container">
        
        <nav>
            <AppbarUser />
        </nav>

        <main>
            <Routes>
                <Route path="/" element={null} />
                <Route path="workhour" element={null} />
                <Route path="contract" element={<DEV_testAgreementView />} />
                <Route path="contract/create" element={null} />
            </Routes>
        </main>
    </div>
}