import { IEmployer } from "../../Data/Employment/IEmployer";
import { stateStorage } from "../../Utils/Misc/stateStorage";
import { employmentStateActions } from "./EmploymentStateActions";
import { IEmploymentState } from "./IEmploymentState";

const key = "employmentState"

const initState: IEmploymentState = {
    employersAll: [],
    employersFiltered: [],
    employerDataLoaded: false,
    selectedEmployer: undefined,
    employmentContracts: [],
    selectedEmploymentContract: undefined,
    editSelectedEmploymentContract: false,
    contractDataLoaded: false,
    addEmployerDialogOpen: false,
}

type Action = 
    | ReturnType<typeof employmentStateActions.setEmployersAll>
    | ReturnType<typeof employmentStateActions.setEmployersFiltered>
    | ReturnType<typeof employmentStateActions.addSingleEmployer>
    | ReturnType<typeof employmentStateActions.replaceSingleEmployer>
    | ReturnType<typeof employmentStateActions.removeSingleEmployer>
    | ReturnType<typeof employmentStateActions.setSelectedEmployer>
    | ReturnType<typeof employmentStateActions.setAddEmployerDialogOpen>
    | ReturnType<typeof employmentStateActions.signOut>
    | ReturnType<typeof employmentStateActions.loadStateFromSession>


// state safe for session storage
const sessionSafeState = (state: IEmploymentState) => {
    return { ...state, addEmployerDialogOpen: false, addEditEmploymentContractDialog: false }
}

// function to sort employers list by name
const sortEmployers = (data: IEmployer[]) => {
    return data.sort((a,b) => {
        if (a.name > b.name) return 1;
        return -1;
    })
}

export const employmentStateReducer = (
    state: IEmploymentState = initState,
    action: Action
): IEmploymentState => {

    let newState: IEmploymentState;
    let employerAllCopy: IEmployer[];

    switch(action.type) {

        case "SET_EMPLOYERS_ALL":

        employerAllCopy = sortEmployers([...action.data])

            newState = {
                ...state,
                employersAll: employerAllCopy,
                employersFiltered: employerAllCopy,
                employerDataLoaded: true
            }

            stateStorage.set(key, sessionSafeState(newState))
            return newState;


        case "ADD_SINGLE_EMPLOYER":
            employerAllCopy = [ ...state.employersAll ]
            employerAllCopy.push(action.data);
            employerAllCopy = sortEmployers(employerAllCopy);

            newState = {
                ...state,
                employersAll: employerAllCopy,
                employersFiltered: employerAllCopy,
                addEmployerDialogOpen: false
            }

            stateStorage.set(key, sessionSafeState(newState))

            return newState;
        
        case "SET_EMPLOYERS_FILTERED":
            return {
                ...state,
                employersFiltered: action.data
            }


        case "REPLACE_SINGLE_EMPLOYER":
            console.error("DEV :: replace single employer not added to state")
            return state;


        case "REMOVE_SINGLE_EMPLOYER":
            console.error("DEV :: remove single employer to state not added")
            return state

        
        case "SET_SELECTED_EMPLOYER":
            newState = { 
                ...state,
                selectedEmployer: action.employer
            };

            stateStorage.set(key, newState);
            return newState;

        
        case "SET_ADD_EMPLOYER_DIALOG_OPEN":
            return { 
                ...state,
                addEmployerDialogOpen: action.open,
            }
        
        case "SIGN_OUT":
            return { ...initState }
        

        case "LOAD_STATE_FROM_SESSION":
            let storedData = stateStorage.get(key);
            if (storedData !== undefined) return storedData
            return { ...initState }


        default: 
            return state;
    }
}