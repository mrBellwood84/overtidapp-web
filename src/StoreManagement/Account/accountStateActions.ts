import { IAccount } from "../../Data/Account/IAccount";

/** collection of actions for account state */
export const accountStateActions = {
    /** Set user account on login */
    signIn: (account: IAccount, newUser: boolean = false) => ({
        type: "SIGN_IN",
        account: account,
        newUser: newUser
    } as const ),

    unsetNewUser: () => ({
        type: "ACCOUNT_UNSET_NEW_USER",
    } as const),

    /** set user role */
    setActiveRole: (role: string) => ({
        type: "SET_ACTIVE_ROLE",
        role: role
    } as const ),

    /** set open signin dialog */
    setSigninDialogOpen: (open: boolean) => ({
        type: "SET_SIGNIN_DIALOG_OPEN",
        open: open
    } as const),

    /** set open signup dialog */
    setSignupDialogOpen: (open: boolean) => ({
        type: "SET_SIGNUP_DIALOG_OPEN",
        open: open
    } as const),

    /** remove user account on logout */
    signOut: () => ({
        type: "SIGN_OUT",
    } as const ),
    
    /** loads state data from ap */
    loadStateFromSession: () => ({
        type: "LOAD_STATE_FROM_SESSION",
    } as const ),

}

