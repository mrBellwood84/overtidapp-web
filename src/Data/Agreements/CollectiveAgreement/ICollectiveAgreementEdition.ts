import { ISalaryTable } from "./ISalaryTable";

/** Model for collective agreements edition.
 * Usually valid for two years.
 * Salary tables are usually updated each year and stored as object list in edition
 */
export interface ICollectiveAgreementEdition {
    /** db entity id provided by backend only */
    id: string;
    /** date of valid from */
    validFrom: Date;
    /** date of expiration if expired */
    expired?: Date;
    /** salary table containing minimum wage and wage supplements */
    salaryTables: ISalaryTable[];
}