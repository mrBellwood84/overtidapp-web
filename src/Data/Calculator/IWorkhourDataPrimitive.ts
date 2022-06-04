
/** Raw data from user input stored in database 
 *  This object is used as DTO for WebAPI
*/
export interface IWorkhourDataPrimitive {

    /** Id for database entity. Provided by WebAPI only. */
    id?: string;

    /** Id for valid work contract */
    contractId?: string;

    /** Start of shift */
    start: Date;

    /** End of shift */
    end: Date;

    /** Minutes of unpaid break */
    unpaidBreak: number;
    
    /** True if shift on workplan */
    plannedDayOff: boolean;

    /** true if day is holyday */
    isHoliday: boolean;

    /** true if shift include night manual labour */
    nightManualLabour: boolean;

}