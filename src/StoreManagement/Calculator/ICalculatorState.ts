import { IWorkhourDataPrimitive } from "../../Data/Calculator/IWorkhourDataPrimitive";
import { WorkhourData } from "../../Data/Calculator/WorkhourData";
import { WorkhourDataAnual } from "../../Data/Calculator/WorkhourDataAnnual";
import { IHoliday } from "../../Data/DateTime/IHoliday";

/** state for calculator values */
export interface ICalculatorState {

    /** hold all primitive data objects in array */
    primitiveData: IWorkhourDataPrimitive[];

    /** hold annual workday data */
    workhourDataAnnual: WorkhourDataAnual[];

    /** hold a single workhour data object for view, edit or delete */
    workhourDataSingleSelected?: WorkhourData;

    /** hold a group of workhour data objects for view */
    workhourDataGroupSelected: WorkhourData[];

    /** hold holidays for selected year */
    holidays: IHoliday[];

    /** hold selected year for data view */
    yearSelected: number;

    /** hold selected month for data view */
    monthSelected: number;


    /** hold data view option for calculator dataview */
    calculatorDataViewSelected: string;

    /** set true to open add or edit data dialog on screen */
    addEditDialogOpen: boolean;

    /** activate load spinner in dataview when loading data from WebAPI */
    apiLoading: boolean;



}