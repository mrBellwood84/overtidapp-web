import { SubdirectoryArrowLeft } from "@mui/icons-material";
import { IEmployerChangeSuggestion } from "../../Data/Employer/IEmployerChangeSuggestion";
import { IEmployerCreateRequestDto } from "../../Data/Employer/IEmployerCreateRequestDto";
import { IEmployerEditRequestDto } from "../../Data/Employer/IEmployerEditRequestDto";
import { IEmployerEditSuggestionDto } from "../../Data/Employer/IEmployerEditSuggestionDto";
import { IEmployerFull } from "../../Data/Employer/IEmployerFull"
import { IEmployerShort } from "../../Data/Employer/IEmployerShort";
import { IRequestById } from "../../Data/Misc/IRequestById";
import { IRequestByUserName } from "../../Data/Misc/IRequestByUserName";
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
        var res = await rootApiAgent.get(subDomain.main);

        if (!res.ok) return res.status

        try {
            var body: IEmployerShort[] = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse employer short data list recived from web api", ex);
            return 500;
        }
    },

    /** get full info data list from api */
    getFullDataList: async (): Promise<IEmployerFull[] | number> => {
        var res = await rootApiAgent.get(subDomain.full);

        if (!res.ok) return res.status

        try {
            var body: IEmployerFull[] = await res.json();
            return body
        } catch (ex) {
            console.error("DEV :: could not parse employers full data list recived from web api", ex);
            return 500;
        }
    },

    /** get change suggestions from web ap */
    getChangeSuggestions: async(): Promise<IEmployerChangeSuggestion[] | number> => {
        var res = await rootApiAgent.get(subDomain.suggest);

        if (!res.ok) return res.status;
        
        try {
            var body: IEmployerChangeSuggestion[] = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse employer change suggestions list data recived from web api ")
            return 500;
        }
    },

    /** create new employer from user request, also adds a change suggestion entity for employer entity */
    createNewEmployer: async (request: IEmployerCreateRequestDto): Promise<IEmployerFull | number> => {
        var res = await rootApiAgent.post(subDomain.main, request);
        
        if (!res.ok) return res.status

        try {
            var body: IEmployerFull = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse employer entity from api response")
            return 500;
        }
    },

    /** add a change suggestion for an existing employer entity */
    addChangeSuggestionFromUser: async (request: IEmployerEditSuggestionDto): Promise<number> => {
        var res = await rootApiAgent.post(subDomain.suggest, request)
        return res.status;
    },

    /** updates an employer entity based on change request from user */
    updateEmployerFromChangeSuggestion: async (request: IEmployerEditRequestDto): Promise<number> => {
        var res = await rootApiAgent.put(subDomain.main, request)
        return res.status;
    },

    /** delete an employer entity from database */
    deleteEmployer: async(id: string): Promise<number> => {
        
        var dto: IRequestById = { id: id };

        var res = await rootApiAgent.delete(subDomain.main, dto)

        return res.status;
    },

    /** delete a suggestion by entity id */
    deleteSuggestionById: async (id: string): Promise<number> => {
        var dto: IRequestById = { id: id };
        var res = await rootApiAgent.delete(subDomain.suggest, dto)
        return res.status;
    },

    /** delete collection of suggestions by username (if several added by same user) */
    deleteSuggestionsByUserName: async (userName: string): Promise<number> => {
        var dto: IRequestByUserName = { userName: userName }
        var res = await rootApiAgent.delete(subDomain.deleteAllFromuser, dto)
        return res.status;
    }



}