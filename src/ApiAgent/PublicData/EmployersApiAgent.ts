import { IEmployer } from "../../Data/Employment/IEmployer";
import { IEmployerEditRequest } from "../../Data/Employment/IEmployerEditRequestDto";
import { INewEmployerRequest } from "../../Data/Employment/INewEmployerRequest";
import { rootApiAgent } from "../rootApiAgent"

const subdomain = "public/employer"

export const EmployersApiAgent = {

    getAll: async (): Promise<IEmployer[] | number> => {
        
        var res = await rootApiAgent.get(subdomain);
        
        if (!res.ok) {
            return res.status
        }

        try {
            var body: IEmployer[] = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse employers data recived from web api", ex);
            return 500;
        }
    },

    postNewEmployer: async(dto: INewEmployerRequest): Promise<IEmployer | number> => {

        var sub = `${subdomain}/add`;

        var res = await rootApiAgent.post(sub, dto);

        if (!res.ok) return res.status;

        try {
            var body: IEmployer = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse added employer data recived from web api")
            return 500;
        }
    },

    getEditRequests: async() : Promise<IEmployerEditRequest[] | number> => {
        let sub = `${subdomain}/editrequest`

        var res = await rootApiAgent.get(sub);

        if (!res.ok) return res.status;

        try {
            var body: IEmployerEditRequest[] = await res.json();
            return body
        } catch (ex) {
            console.error("DEV :: Could not parse edit request array recived from web api")
            return 500;
        }

    }

}