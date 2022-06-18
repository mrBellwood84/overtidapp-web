import { IEmployerChangeSuggestion } from "../../Data/Employer/IEmployerChangeSuggestion";
import { IEmployerCreateRequestDto } from "../../Data/Employer/IEmployerCreateRequestDto";
import { IEmployerEditRequestDto } from "../../Data/Employer/IEmployerEditRequestDto";
import { IEmployerEditSuggestionDto } from "../../Data/Employer/IEmployerEditSuggestionDto";
import { IEmployerFull } from "../../Data/Employer/IEmployerFull"
import { IEmployerShort } from "../../Data/Employer/IEmployerShort";
import { IRequestById } from "../../Data/Misc/IRequestById";
import { rootApiAgent } from "../rootApiAgent"

const subDomain = {
    main: "public/employer",
    full: "public/employer/full",
    suggest: "public/employer/suggest",
    deleteAllFromuser: "public/employer/suggest/deleteallfromuser",
}

export const employerApiAgent = {

    /** get short info data list from api */
    getShortDataList: async(): Promise<IEmployerShort[] |  number> => {
        var response = await rootApiAgent.get(subDomain.main);

        if (!response.ok) return response.status

        var body: IEmployerShort[] = await response.json();
        return body;
    },

    /** get full info data list from api */
    getFullDataList: async (): Promise<IEmployerFull[] | number> => {
        var response = await rootApiAgent.get(subDomain.full);

        if (!response.ok) return response.status

        var body: IEmployerFull[] = await response.json();
        return body
    },

    /** get change suggestions from web ap */
    getChangeSuggestions: async(): Promise<IEmployerChangeSuggestion[] | number> => {
        var response = await rootApiAgent.get(subDomain.suggest);

        if (!response.ok) return response.status;
        
        var body: IEmployerChangeSuggestion[] = await response.json();
        return body;
    },

    /** create new employer from user request, also adds a change suggestion entity for employer entity */
    createNewEmployer: async (request: IEmployerCreateRequestDto): Promise<IEmployerFull | number> => {
        var response = await rootApiAgent.post(subDomain.main, request);
        
        if (!response.ok) return response.status

        var body: IEmployerFull = await response.json();
        return body;
    },

    /** add a change suggestion for an existing employer entity */
    addChangeSuggestionFromUser: async (request: IEmployerEditSuggestionDto): Promise<number> => {
        var response = await rootApiAgent.post(subDomain.suggest, request)
        return response.status;
    },

    /** updates an employer entity based on change request from user */
    updateEmployerFromChangeSuggestion: async (request: IEmployerEditRequestDto): Promise<IEmployerFull | number> => {
        var response = await rootApiAgent.put(subDomain.main, request)
        if (!response.ok)  return response.status;

        var body: IEmployerFull = await response.json();
        return body
    },


    /** delete an employer entity from database */
    deleteEmployer: async(id: string): Promise<number> => {
        
        var dto: IRequestById = { id: id };

        var response = await rootApiAgent.delete(subDomain.main, dto)

        return response.status;
    },

    /** delete a suggestion by entity id */
    deleteSuggestionById: async (id: string): Promise<number> => {
        var dto: IRequestById = { id: id };
        var response = await rootApiAgent.delete(subDomain.suggest, dto)
        return response.status;
    },
}