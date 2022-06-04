export interface IEmployerEditRequest {
    id?: string;
    employerId?: string;
    name: string;
    organizationNumber?: string;
    address: string;
    postalArea: string;
    zipCode: string;
    county: string;
    hasCollectiveAgreement: boolean;
    requestBy: string;
    resolved: boolean;
}