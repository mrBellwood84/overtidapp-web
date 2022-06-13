
/** 
 * Full employer entity
 * Contain all information as in database
 */
export interface IEmployerFull {

    /** entity id */
    id: string;

    /** legal name from public records */
    nameLegal: string;
    /** commonly used name */
    nameUsed: string;

    /** employer organization number */
    organizationNumber: string;

    /** legal address from public records */
    addressLegal: string;
    /** actual address for place of employment */
    addressUsed: string;

    /** postal area as from public records */
    postAreaLegal: string;
    /** post area for place of employment */
    postAreaUsed: string;

    /** zip code as from public records */
    zipCodeLegal: string;
    /** zip code for place of employment */
    zipCodeUsed: string;

    /** region as registerd in public records */
    regionLegal: string;
    /** region of place of employment */
    regionUsed: string;

    /** id of collective agreement */
    collectiveAgreementId: string;

    /** true if employer has change request */
    hasChangeRequest: boolean;

    /** date when employer was added */
    dateAdded: Date;
    /** name of user added employer */
    addedBy: string;

    /** date of last edit */
    DateLastUpdate: Date;
    /** name of user last edited */
    LastUpdateBy: string;

}