import { IMiscState } from "./IMiscState";
import { miscStateActions } from "./MiscStateActions";

const initState: IMiscState = {
    language: "",
    languageSelectDialogOpen: false,
}


type Action = 
    | ReturnType<typeof miscStateActions.setLanguageSelectDialogOpen>
    | ReturnType<typeof miscStateActions.setLanguage>


export const miscStateReducer = (
    state: IMiscState = initState,
    action: Action
): IMiscState => {

    switch(action.type) {

        case "SET_LANGUAGE":
            return {...state, language: action.lang}

        case "SET_LANGUAGE_SELECT_DIALOG_OPEN":
            return {...state, languageSelectDialogOpen: action.open}


        default:
            return state;
    }
}