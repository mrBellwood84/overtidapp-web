/** information about employer */
export interface IEmployer {

    /** Id for database entity, provided by WebAPI only */
    id?: string;

    /** Name of company / employer, can differ from legal name */
    name: string;
    /** legal name as registred in public record */
    nameOfficial: string;

    /** Organization number of employer */
    organizationNumber: string;

    /** Address */
    address: string;
    /** Address registred in public record */
    addressOfficial: string;

    /** postal area (poststed på godt norsk) */
    postalArea: string;
    /** postal aerai registerd in public record */
    postalAreaOfficial: string;

    /** Conty (kommune på godt norsk...)*/
    county: string;
    /** County registerd in public record */
    countyOfficial: string;

    /** Zip code */
    zipCode: string;
    /** zip code as registerd in public record */
    zipCodeOfficial: string;

    /** Collective agreement if any, else null */
    collectiveAgreementId?: string;
    /** Special agreements if any, else empty array */
    specialAgreements?: undefined[];

    /** have request for editing */
    haveEditRequest: boolean;

    /** source of information */
    dataSource: string;
    /** date addeed */
    dateAdded: Date;
    /** date last edited */
    dateLastEdit: Date;
    /** editor */
    editedBy: string;
    
}