
/**
 * Entity models for change suggestions as downloaded from web api.
 * Used for viewing and resolving change suggestions for employer data
 */
export interface IEmployerChangeSuggestion {

    /** entity id */
    id: string;

    /** employer entity id */
    employerId: string;

    /** suggested new name */
    name: string;

    /** suggested new organization number */
    organizationNumber: string;

    /** suggested new address */
    address: string;

    /** suggested new post area */
    postArea: string;

    /** suggested new region */
    region: string;

    /** suggest has collective agreement */
    hasAgreement: boolean;

    /** true if resolved (should not be true if downloaded) */
    resolved: boolean;
}