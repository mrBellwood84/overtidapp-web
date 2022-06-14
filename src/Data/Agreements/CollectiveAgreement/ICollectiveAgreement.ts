import { ICollectiveAgreementEdition } from "./ICollectiveAgreementEdition";

/** model for for collective agreement. 
 *  Used for components and response DTO from API */
export interface ICollectiveAgreement {
    /** entity id */
    id: string;
    /** agreement name */
    name: string;
    /** employee organization */
    employeeOrganization: string;
    /** employer organization */
    employerOrganization: string;

    /** list of editons of the collective agreement */
    edition: ICollectiveAgreementEdition[];
}