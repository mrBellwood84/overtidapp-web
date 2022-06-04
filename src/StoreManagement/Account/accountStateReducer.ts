import { stateStorage } from "../../Utils/Misc/stateStorage";
import { accountStateActions } from "./accountStateActions";
import { IAccountState } from "./IAccounState";

// key for session storage
const key = "accountState"

// set initial account state
const initState: IAccountState = {
    account: undefined,
    activeRole: undefined,
    newUser: false,
    signedIn: false,
    signinDialogOpen: false,
    signupDialogOpen: false,
}

// action collection
type Action = 
    | ReturnType<typeof accountStateActions.signIn>
    | ReturnType<typeof accountStateActions.setActiveRole>
    | ReturnType<typeof accountStateActions.signOut>
    | ReturnType<typeof accountStateActions.setSigninDialogOpen>
    | ReturnType<typeof accountStateActions.setSignupDialogOpen>
    | ReturnType<typeof accountStateActions.loadStateFromSession>



// state safe for session
const sessionSafeState = (state: IAccountState): IAccountState => {
    return { ...state, signinDialogOpen: false, signupDialogOpen: false}
}

export const accountStateReducer = (
    state: IAccountState = initState,
    action: Action
): IAccountState => {

    let stateCopy: IAccountState

    switch(action.type) {
        
        case "SIGN_IN":

            stateCopy = { 
                ...state,
                account: action.account,
                activeRole: action.account.role,
                newUser: action.newUser,
                signedIn: true,
                signinDialogOpen: false,
            }
            
            stateStorage.set(key, sessionSafeState(stateCopy));
            return stateCopy;
        

        case "SET_ACTIVE_ROLE":

            stateCopy = {
                ...state,
                activeRole: action.role
            }

            stateStorage.set(key, stateCopy)
            return stateCopy;
        

        case "SET_SIGNIN_DIALOG_OPEN":
            return {
                ...state,
                signinDialogOpen: action.open,
            }
            
        case "SET_SIGNUP_DIALOG_OPEN":
            return {
                ...state,
                signupDialogOpen: action.open,
            }

        case "SIGN_OUT":
            return { ...initState }

        
        case "LOAD_STATE_FROM_SESSION":
            
            let storedState: IAccountState | undefined = stateStorage.get(key)

            if (storedState !== undefined) return storedState
            return { ...initState }
        
        default: 
            return state;
    }

}
