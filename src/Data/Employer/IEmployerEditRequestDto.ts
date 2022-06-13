
/** 
 * DTO for api request changing employer data.
 * Request can only be made by admin, and only change used data 
 * / place of employment information
 */
export interface IEmployerEditRequestDto {

    /** id of employer entity */
    employerId: string;

    /** new used name */
    name: string;

    /** new organization number  */
    organizationNumber: string;

    /** new address */
    address: string;

    /** new post area */
    postArea: string;

    /** new zip code */
    zipCode: string;

    /** new region */
    region: string;

    /** new collective agreement id */
    collectiveAgreementId?: string;

    /** user name of user editing */
    editedBy: string;
}