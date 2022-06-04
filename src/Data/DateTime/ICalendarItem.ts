import { WorkhourData } from "../Calculator/WorkhourData";

/** Datamodel for calendar items */
export interface ICalendarItem {
    /** key for react component */
    key: string;
    /** date */
    date: Date,
    /** true if date is within selcted month */
    isSelectedMonth: boolean;
    /** grid row (css)*/
    row: number;
    /** grid column (css)*/
    column: number;
    /** any data belonging to data view */
    data?: WorkhourData[];
}