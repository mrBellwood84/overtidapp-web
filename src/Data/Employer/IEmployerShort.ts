/**
 * Model for employer short info
 */
export interface IEmployerShort {

    /** Entity id */
    id: string;
    /** employer commonly used name */
    name: string;
    /** employer organization number */
    organizationNumber: string;
    /** employer localization */
    region: string;
    /** true if employer is bound by collective agreement */
    hasAgreement: boolean;
}