import { IEmployer } from "../../Data/Employment/IEmployer";
import { IEmploymentContract } from "../../Data/Employment/IEmploymentContract";

/** Hold state for employer data
 * 
 * REMARK: employment contracts are stored in user data state!
 */
export interface IEmploymentState {
    /** List of all registred employers */
    employersAll: IEmployer[];

    /** List of filtered employers */
    employersFiltered: IEmployer[];

    /** Set true after downloaded employer data */
    employerDataLoaded: boolean;

    /** set a selected employer for edit or delete */
    selectedEmployer?: IEmployer;

    /** all registred employment contracts for user */
    employmentContracts: IEmploymentContract[];

    /** selected employment contract for user */
    selectedEmploymentContract?: IEmploymentContract;

    /** boolean for edititing selected employment contract */
    editSelectedEmploymentContract: boolean;

    /** set true after loaded contract data from api */
    contractDataLoaded: boolean;

    /** bool for open add employer dialog */
    addEmployerDialogOpen: boolean;
}