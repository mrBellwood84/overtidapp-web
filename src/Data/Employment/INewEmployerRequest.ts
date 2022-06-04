import { IEmployerEditRequest } from "./IEmployerEditRequestDto";

export interface INewEmployerRequest {
    name: string;
    organizationNumber: string;
    address: string;
    postalArea: string;
    zipCode: string;
    county: string;
    dataSource: string;
    editRequest: IEmployerEditRequest;
}