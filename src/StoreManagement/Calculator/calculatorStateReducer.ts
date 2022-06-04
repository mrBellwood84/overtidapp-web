import { getHolidays } from "../../Utils/DateTimeLib/resolveHolydays";
import { calculatorStateActions } from "./calculatorStateActions";
import { calculatorStateSession } from "./calculatorStateSession";
import { calculatorStateUtils } from "./calculatorStateUtils";
import { ICalculatorState } from "./ICalculatorState";

// get current date
const now = new Date();

// initial calculator state
const initState: ICalculatorState  = {
    primitiveData: [],
    workhourDataAnnual: [],
    workhourDataSingleSelected: undefined,
    workhourDataGroupSelected: [],
    
    holidays: getHolidays(now.getFullYear()),
    yearSelected: now.getFullYear(),
    monthSelected: now.getMonth(),

    calculatorDataViewSelected: "annualOverview",

    addEditDialogOpen: false,
    apiLoading: false
}

// define actions for reducer
type Action = 
    | ReturnType<typeof calculatorStateActions.importPrimitiveDataCollection>
    | ReturnType<typeof calculatorStateActions.addWorkhourDataSingle>
    | ReturnType<typeof calculatorStateActions.replaceWorkhourDataSingle>
    | ReturnType<typeof calculatorStateActions.removeWorkhourDataSingle>
    | ReturnType<typeof calculatorStateActions.removeWorkhourDataCollection>
    | ReturnType<typeof calculatorStateActions.setWorkhourDataSingleSelected>
    | ReturnType<typeof calculatorStateActions.setWorkhourDataGroupSelected>
    | ReturnType<typeof calculatorStateActions.setYearSelected>
    | ReturnType<typeof calculatorStateActions.setMonthSeleted>
    | ReturnType<typeof calculatorStateActions.setYearAndMonthSelected>
    | ReturnType<typeof calculatorStateActions.setCalculatorDataViewSelected>
    | ReturnType<typeof calculatorStateActions.setAddEditDialogOpen>
    | ReturnType<typeof calculatorStateActions.setApiLoading>


export const calculatorStateReducer = (
    state: ICalculatorState = initState,
    action: Action
): ICalculatorState => {

    let calculatorState: ICalculatorState;

    switch(action.type) {

        case "IMPORT_PRIMITIVE_DATA_COLLECTION":
            console.error("DEV :: import primitive data not added");
            return state;
        
        case "ADD_WORKHOUR_DATA_SINGLE":
            calculatorState = calculatorStateUtils.handleAddWorkhourData(state, action.data);
            calculatorStateUtils.safeSessionStorage(calculatorState);
            return calculatorState;

        case "REPLACE_WORKHOUR_DATA_SINGLE":
            console.error("DEV :: replace single workhour object not added");
            return state;

        case "REMOVE_WORKHOUR_DATA_SINGLE":
            console.error("DEV :: Remove single workhour object not added")
            return state;

        case "REMOVE_WORKHOUR_DATA_COLLECTION":
            console.error("DEV :: Remove collection of workhour objects not added");
            return state;

        case "SET_WORKHOUR_DATA_SINGLE_SELECTED":
            return {...state, workhourDataSingleSelected: action.data};

        case "SET_WORKHOUR_DATA_GROUP_SELECTED":
            return {...state, workhourDataGroupSelected: action.data};

        case "SET_YEAR_SELECTED":
            calculatorState = calculatorStateUtils.handleYearSelect(state, action.year);
            calculatorStateUtils.safeSessionStorage(calculatorState);
            return calculatorState;

        case "SET_MONTH_SELECTED":
            calculatorState = { ...state, monthSelected: action.month };
            calculatorStateUtils.safeSessionStorage(calculatorState);
            return calculatorState;

        
        case "SET_YEAR_AND_MONTH_SELECTED":
            calculatorState = { ...state, monthSelected: action.month, yearSelected: action.year}
            calculatorStateUtils.safeSessionStorage(calculatorState);
            return calculatorState;

        case "SET_CALCULATOR_DATAVIEW_SELECTED":
            calculatorState = { ...state, calculatorDataViewSelected: action.viewName }
            calculatorStateUtils.safeSessionStorage(calculatorState);
            return calculatorState;

        case "SET_ADD_EDIT_DIALOG_OPEN":
            return { ...state, addEditDialogOpen: action.open };

        case "SET_API_LOADING":
            return { ...state, apiLoading: action.loading };

        default: 
            return state;
    }
    
}
