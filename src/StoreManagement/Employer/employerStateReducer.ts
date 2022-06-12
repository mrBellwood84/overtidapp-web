import { IEmployerFull } from "../../Data/Employer/IEmployerFull"
import { IEmployerShort } from "../../Data/Employer/IEmployerShort"
import { stateStorage } from "../../Utils/Misc/stateStorage"
import { employerStateActions } from "./employerStateActions"
import { IEmployerState } from "./IEmployerState"


const key = "employerState"

const initState: IEmployerState = {
    employersFullInfoList: [],
    employersFullInfoFiltered: [],
    employersFullInfoLoaded: false,

    employersShortInfoList: [],
    employersShortInfoFiltered:[],
    employersShortInfoLoaded: false,

    employersChangeSuggestions: [],
    employerChangeSuggestionLoaded: false,

    employerSelected: undefined
    
}

type Action = 
    | ReturnType<typeof employerStateActions.setFullDataList>
    | ReturnType<typeof employerStateActions.setFullDataFiltered>
    | ReturnType<typeof employerStateActions.setShortDataList>
    | ReturnType<typeof employerStateActions.setShortDataFiltered>
    | ReturnType<typeof employerStateActions.setChangeSuggestions>
    | ReturnType<typeof employerStateActions.setSelected>
    | ReturnType<typeof employerStateActions.addNewEmployer>
    | ReturnType<typeof employerStateActions.sign_out>
    | ReturnType<typeof employerStateActions.loadStateFromSession>


const sortEmployersFull = (data: IEmployerFull[]) => {
    return data.sort((a,b) => {
        if (a.nameUsed > b.nameUsed) return 1;
        return -1
    })
}

const sortEmployerShort = (data: IEmployerShort[]) => {
    return data.sort((a,b) => {
        if (a.name > b.name) return 1;
        return -1;
    })
}

export const employerStateReducer = (
    state: IEmployerState = initState,
    action: Action
): IEmployerState => {
    
    let newState: IEmployerState;
    let fullList: IEmployerFull[];
    let shortList: IEmployerShort[];

    switch(action.type) {

        case "EMPLOYERS_SET_FULL_DATA_LIST":
            
            newState = {
                ...state,
                employersFullInfoList: sortEmployersFull(action.data),
                employersFullInfoFiltered: sortEmployersFull(action.data),
                employersFullInfoLoaded: true,
            }

            stateStorage.set(key, newState);
            return newState;

        case "EMPLOYERS_SET_FULL_DATA_FILTERED":

            return {
                ...state,
                employersFullInfoFiltered: sortEmployersFull(action.data)
            }
        
        case "EMPLOYERS_SET_SHORT_DATA_LIST":

            newState = {
                ...state,
                employersShortInfoList: sortEmployerShort(action.data),
                employersShortInfoFiltered: sortEmployerShort(action.data),
                employersShortInfoLoaded: true,
            }

            stateStorage.set(key, newState);
            return newState;
        
        case "EMPLOYERS_SET_SHORT_DATA_FILTERED":

            return {
                ...state,
                employersShortInfoFiltered: sortEmployerShort(action.data), 
            }
        
        case "EMPLOYERS_SET_CHANGE_SUGGESTIONS": 

            newState = {
                ...state,
                employersChangeSuggestions: action.data,
                employerChangeSuggestionLoaded: true,
            }

            stateStorage.set(key, newState)
            return newState;
        
        case "EMPLOYER_SET_SELECTED":

            newState = {
                ...state, 
                employerSelected: action.data,
            }

            stateStorage.set(key, state)
            return newState;
        
        case "EMPLOYER_ADD_EMPLOYER_DATA": 
            
            fullList = [...state.employersFullInfoList]
            shortList = [...state.employersShortInfoList]

            if (action.full !== null) fullList.push(action.full)
            if (action.short !== null) shortList.push(action.short)

            newState = {
                ...state,
                employersFullInfoList: sortEmployersFull(fullList),
                employersFullInfoFiltered: sortEmployersFull(fullList),
                employersShortInfoList: sortEmployerShort(shortList),
                employersShortInfoFiltered: sortEmployerShort(shortList)
            }

            stateStorage.set(key, newState);
            return newState;
            

        case "SIGN_OUT": 
            return { ...initState }
        
        
        case "LOAD_STATE_FROM_SESSION":
            
            let storedData: IEmployerState | undefined = stateStorage.get(key);
            let exist = Boolean(storedData)

            if (!exist) return { ...initState }

            storedData!.employersFullInfoFiltered = storedData!.employersFullInfoList;
            storedData!.employersShortInfoFiltered = storedData!.employersShortInfoList;

            return { ...storedData! }

        default:
            return state;
    }
}