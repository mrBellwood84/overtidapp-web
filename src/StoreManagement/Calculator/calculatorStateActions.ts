import { IWorkhourDataPrimitive } from "../../Data/Calculator/IWorkhourDataPrimitive";
import { WorkhourData } from "../../Data/Calculator/WorkhourData";

/** hold collection of actions for calculator state */
export const calculatorStateActions = {

    /**
     *  Import primitive data array to data collection.
     * @param data primitive data as imported from web api
     */
    importPrimitiveDataCollection: (data: IWorkhourDataPrimitive[]) => ({
        type: "IMPORT_PRIMITIVE_DATA_COLLECTION",
        data: data
    } as const),

    /** 
     * Add a single workhour data object to workhour data collection
     * @param data : workhour data object
     */
    addWorkhourDataSingle: (data: WorkhourData) => ({
        type: "ADD_WORKHOUR_DATA_SINGLE",
        data: data,
    } as const ),

    /**
     * Replace a single workhour data object in workhour data collection
     * Used to replace edited workhour data object
     * @param data data to be replaced
     */
    replaceWorkhourDataSingle: (data: WorkhourData) => ({
        type: "REPLACE_WORKHOUR_DATA_SINGLE",
        data: data,
    } as const),

    /**
     * Remove a single workhour data object in workhour data collection
     * Used when object gets deleted.
     * @param id id of workhour object
     */
    removeWorkhourDataSingle: (id: string) => ({
        type: "REMOVE_WORKHOUR_DATA_SINGLE",
        id: id,
    } as const),

    /** 
     * Remove a collection of workhour data objects in workhour data collection.
     * Used when a collection of workhour data objects get deleted.
     * @param id string array containing id of workhour objects
     * */
    removeWorkhourDataCollection: (id: string[]) => ({
        type: "REMOVE_WORKHOUR_DATA_COLLECTION",
        id: id
    } as const),

    /**
     * Set a single workhour data object as selected, used for view, edit or delete
     * @param data workhour data object, default = undefined
     */
    setWorkhourDataSingleSelected: (data: WorkhourData | undefined = undefined) => ({
        type: "SET_WORKHOUR_DATA_SINGLE_SELECTED",
        data: data
    } as const ),

    /**
     * Set a group of workhour objects as selected for view
     * @param data workhour data objects, default = empty array
     */
    setWorkhourDataGroupSelected: (data: WorkhourData[] = []) => ({
        type: "SET_WORKHOUR_DATA_GROUP_SELECTED",
        data: data
    } as const ),

    /**
     *  Set selected year for dataview,
     *  also updates holidays in state when called in reducer!
     * @param year selected year
     */
    setYearSelected: (year: number) => ({
        type: "SET_YEAR_SELECTED",
        year: year,
    } as const),

    /**
     * Set selected month for dataview
     * @param month selected month
     */
    setMonthSeleted: (month: number) => ({
        type: "SET_MONTH_SELECTED",
        month: month,
    } as const),

    /**
     *  Set selected year and month for dataview
     * @param month month index as indexed in date object
     * @param year selected year
     */
    setYearAndMonthSelected: (month: number, year: number) => ({
        type: "SET_YEAR_AND_MONTH_SELECTED",
        year: year,
        month: month
    } as const),

    /**
     * set string for calculator data view type select
     * @param viewName name of dataview
     */
    setCalculatorDataViewSelected: (viewName: string) => ({
        type: "SET_CALCULATOR_DATAVIEW_SELECTED",
        viewName: viewName,
    } as const),

    /**
     * Set open or close dialog for dataview
     * @param open true for open dialog, default = false
     */
    setAddEditDialogOpen: (open: boolean = false) => ({
        type: "SET_ADD_EDIT_DIALOG_OPEN",
        open: open
    } as const),


    /**
     * Activate or deactivate load spinner for calculator data view
     * @param loading set true to show data spinner, default = true
     */
    setApiLoading: (loading: boolean = false) => ({
        type: "SET_API_LOADING",
        loading: loading
    } as const)
}