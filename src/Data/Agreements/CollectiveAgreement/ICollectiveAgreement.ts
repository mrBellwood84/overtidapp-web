import { ICollectiveAgreementEdition } from "./ICollectiveAgreementEdition";

/** Defines data for a collective agreement */
export interface ICollectiveAgreement {
    
    /** db entity id provided by backend */
    id: string;
    /** name of agreement */
    agreementName: string;
    /** name of employee organization */
    employeeOrganization: string
    /** name of employer organization */
    employerOrganization: string;
    /** list of editions of the collective agreement */
    editions: ICollectiveAgreementEdition[];
}