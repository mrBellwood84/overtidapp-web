import { IWageSupplement } from "../Agreements/CollectiveAgreement/IWageSupplement";

/** 
 *  Model for rules used for calculating salary, supplements and overtime for single shift 
 *  Values are to be set from agreements, employment contract and other regulations that are valid
 *  for the selected workday
 * */
export interface IWorkdayRuleset {
    /** Salary per hour */
    hourWage: number;

    /** Sefine supplement for evening shift */
    supplementEvening: IWageSupplement;
    /** Define supplement for saturday shift */
    supplementSaturday: IWageSupplement;
    /** Define supplement for sunday shift */
    supplementSunday: IWageSupplement;
    /** Define supplement for night shift without manual labour */
    supplementNightRest: IWageSupplement;
    /** Define additional supplement for night shift with manual labour*/
    supplementNightLabour: IWageSupplement;
}