
/** Salary data for employment contract */
export interface IContractSalary {
    /** Id for database entity, provided by WebAPI only */
    id: string;
    /** Salary as per hour */
    amountPerHour: number;
    /** Salary as per month */
    amountPerMonth: number;

    /** Start date for salary */
    validFrom: Date;
    /** End date for salary if new salary is added to contract*/
    expired: Date | null;

}