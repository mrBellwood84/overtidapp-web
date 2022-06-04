import { combineReducers, createStore, Store } from "redux"
import { accountStateReducer } from "./Account/accountStateReducer";
import { IAccountState } from "./Account/IAccounState";
import { agreementStateReducer } from "./Agreements/agreementStateReducer";
import { IAgreementState } from "./Agreements/IAgreementState";
import { calculatorStateReducer } from "./Calculator/calculatorStateReducer";
import { ICalculatorState } from "./Calculator/ICalculatorState";
import { employmentStateReducer } from "./Employment/EmploymentStateReducer";
import { IEmploymentState } from "./Employment/IEmploymentState";
import { IMiscState } from "./Misc/IMiscState";
import { miscStateReducer } from "./Misc/MiscStateReducer";


export interface AppState {
    account: IAccountState
    agreement: IAgreementState;
    calculator: ICalculatorState;
    employment: IEmploymentState;
    misc: IMiscState;
}


const rootReducer = combineReducers<AppState>({
    account: accountStateReducer,
    agreement: agreementStateReducer,
    calculator: calculatorStateReducer,
    employment: employmentStateReducer,
    misc: miscStateReducer,
})

export const configureStore = (): Store<AppState> => {
    const store = createStore(rootReducer,  undefined);
    return store;
}