
/**
 * DTO for user suggestion for editing data for an employer
 * Any user can send a suggestion for changing employer data,
 * but only admin can change the actual data in the employer entity
 */
export interface IEmployerEditSuggestionDto {

    /** id of employer entity */
    employerId: string;

    /** suggested name */
    name: string;

    /** suggested organization number (not really used) */
    organizationNumber: string;

    /** suggested address */
    address: string;

    /** suggested post area */
    postArea: string;

    /** suggested zip code */
    zipCode: string;

    /** suggested region */
    region: string;

    /** suggest has agreement */
    hasAgreement: string;

    /** suggesting users username */
    requestBy: string;
}