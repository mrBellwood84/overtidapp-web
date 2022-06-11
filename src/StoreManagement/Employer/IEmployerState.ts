import { IEmployerChangeSuggestion } from "../../Data/Employer/IEmployerChangeSuggestion";
import { IEmployerFull } from "../../Data/Employer/IEmployerFull";
import { IEmployerShort } from "../../Data/Employer/IEmployerShort";

/** state for employer data */
export interface IEmployerState {

    /** list of employer data with full info */
    employersFullInfoList: IEmployerFull[];

    /** employer full data list after filtered with search */
    employersFullInfoFiltered: IEmployerFull[];

    /** true if data was loaded from webApi */
    employersFullInfoLoaded: boolean


    /** list of employers data short info  */
    employersShortInfoList: IEmployerShort[];

    /** list of short info data after filtered with searcg */
    employersShortInfoFiltered: IEmployerShort[];

    /** true when data gets loaded from web api */
    employersShortInfoLoaded: boolean;

    
    /** edit suggestion data for admin */
    employersChangeSuggestions: IEmployerChangeSuggestion[]

    /** true when data gets loaded from web api */
    employerChangeSuggestionLoaded: boolean;

    
    /** selected full employer data for single view or editing */
    employerSelected?: IEmployerFull;

}