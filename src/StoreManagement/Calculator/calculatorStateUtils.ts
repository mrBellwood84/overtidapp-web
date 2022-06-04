import { WorkhourData } from "../../Data/Calculator/WorkhourData";
import { WorkhourDataAnual } from "../../Data/Calculator/WorkhourDataAnnual";
import { getHolidays } from "../../Utils/DateTimeLib/resolveHolydays";
import { calculatorStateSession } from "./calculatorStateSession";
import { ICalculatorState } from "./ICalculatorState";

/** 
 *  Collection of functions used to update states in calculator state
 * 
 *  NOTE: These function only update states.
 *  Data verificaton must be done before 
 * */
export const calculatorStateUtils = {

    /** 
     *  Handle adding workhour data to state.
     *  Will append a new annual workhour data object to data collection
     *  if not exist for that year
     * 
     * @param state calculator state
     * @param data  data to be added
     * @returns updated state
     */
    handleAddWorkhourData: (
        state: ICalculatorState, 
        data: WorkhourData
    ): ICalculatorState => {

        // create a copy of existing workhour data arrays
        let workhourDataCopy    = [...state.workhourDataAnnual];
        let primitiveDataCopy   = [ ...state.primitiveData]

        // add primitive data to collection
        primitiveDataCopy.push(data.primitive)

        // get year index in array
        let yearIndex = workhourDataCopy.findIndex(x => x.year === data.year);

        // if year dont exist
        if (yearIndex === -1) {

            // create new annual data obect, add data 
            // and append to annual data collection
            let newObj = new WorkhourDataAnual(data.year, data.primitive.contractId)
            newObj.AddWorkhourDataSingle(data);
            workhourDataCopy.push(newObj);
            workhourDataCopy = sortAnnualWorkhourData(workhourDataCopy)

        } else {

            // else add worhourdata object to data collection
            workhourDataCopy[yearIndex].AddWorkhourDataSingle(data);
        }

        // create an updated state for return
        let updatedState: ICalculatorState = {
            ...state,
            primitiveData: primitiveDataCopy,
            workhourDataAnnual: workhourDataCopy,
            yearSelected: data.year,
            monthSelected: data.month,
        }

        return updatedState;
    },

    /**
     * Handle selected year for state
     * @param state 
     * @param year 
     * @returns 
     */
    handleYearSelect: (state: ICalculatorState, year: number) => {
        let holidays = getHolidays(year)
        let updatedState: ICalculatorState = {
            ...state,
            yearSelected: year,
            holidays: holidays
        }

        return updatedState
    },


    /**
     * Saves ICalculator state in session storage.
     * Ensures all dialog or loading booleans are set to false.
     * 
     * @param state ICalculator state
     */
    safeSessionStorage: (state: ICalculatorState) => {
        let storageState: ICalculatorState = {
            ...state,
            addEditDialogOpen: false,
            apiLoading: false,
        }
        calculatorStateSession.set(storageState)
    }
}



/** sort annual workdata objects in array after year */
const sortAnnualWorkhourData = (data: WorkhourDataAnual[]): WorkhourDataAnual[] => {

    return data.sort((a,b) => {
        if (a > b) return 1;
        return -1;
    })

}