import { IAccount } from "../../Data/Account/IAccount";

/**
 * State for values related to user account
 */
export interface IAccountState {

    /** logged in user account data */
    account?: IAccount;

    /** active user role, admins can switch between admin and user view! */
    activeRole?: string;

    /** true if user is logged in */
    signedIn: boolean;

    /** true only if new user */
    newUser: boolean;

    /** true for open signin dialog */
    signinDialogOpen: boolean;
    
    /** true for open signup dialog */
    signupDialogOpen: boolean;
}