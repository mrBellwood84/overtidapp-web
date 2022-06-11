import { IContractSalary } from "../../Data/Employment/IContractSalary";
import { IEmployer } from "./IEmployer";

/** Hold information for employment contract between employer and employee */
export interface IEmploymentContract {

    /** Id for database entity, provided by WebAPI only */
    id: string;
    /** Employee user id  */
    employeeId: string;

    /** Employer object */
    employer: IEmployer;

    /** Title / job */
    jobTitle: string;

    /** Start of contract period */
    contractStart: Date;
    /** Date when contract period is set to expired*/
    contractExpire?: Date;
    /** Date if and when contract was terminated or if expired*/
    contractEnded?: Date;

    /** Max hours per week */
    maxHoursMonth: number;
    /** Percentage of position */
    positionPercentage: number;

    /** Salary values */
    salary: IContractSalary[];

    /** True if contract include weekends */
    includeWeekend: boolean;
    /** Contain minutes of unpaid break during workday */
    unpaidBreak: number;

}