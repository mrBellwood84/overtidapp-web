import { stateStorage } from "../../Utils/Misc/stateStorage";
import { agreementStateActions } from "./agreementStateActions";
import { IAgreementState } from "./IAgreementState";

const key = "agreementState";

// set empty init state for agreement
const initState: IAgreementState = {
    collectiveAgreements: [],
    collectiveAgreementsLoaded: false,
}

type Action = 
    | ReturnType<typeof agreementStateActions.setCollectiveAgreements>
    | ReturnType<typeof agreementStateActions.signOut>
    | ReturnType<typeof agreementStateActions.loadStateFromSession>


const sessionSafeState = (state: IAgreementState) => {
    return { ...state}
}

/** agreement state reducer */
export const agreementStateReducer = (
    state: IAgreementState = initState,
    action: Action,
): IAgreementState => {

    let newState: IAgreementState;

    switch(action.type) {


        case "SET_COLLECTIVE_AGREEMENT":

            newState = {
                ...state,
                collectiveAgreements: action.agreements,
                collectiveAgreementsLoaded: true,
            }

            stateStorage.set(key, sessionSafeState(newState))
            return newState;


        case "SIGN_OUT":
            return { ...initState }


        case "LOAD_STATE_FROM_SESSION":

            let storedData = stateStorage.get(key);
            if (storedData !== undefined) return storedData;
            return { ...initState }

        default: 
            return state;
    }


}