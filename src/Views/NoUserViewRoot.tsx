import { DevQuickSignIn } from "../Components/DEV_Components/DevQuickSignIn"
import { AppbarNoUser } from "../Components/Misc/AppbarNoUser"
import { SignInDialog } from "../Components/Misc/SignIn/SignInDialog"
import { SignupDialog } from "../Components/Misc/Signup/SignupDialog"

export const NoUserViewRoot = () => {

    return <div className="page-container">
        <SignInDialog />
        <SignupDialog />

        <nav>
            <AppbarNoUser />
        </nav>

        
        <div className="aside-right">
            <DevQuickSignIn />
        </div>
    </div>
}