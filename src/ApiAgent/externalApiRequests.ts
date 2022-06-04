import { appConfig } from "../appConfig";
import { IBrrregEntity } from "../Data/External Request/IBrregEntity";


export const externalApiRequests = {
    brregSearchOrgNum: async (orgNum: string): Promise<IBrrregEntity | number> => {
        let url = `${appConfig.brregUrl}${orgNum}`
        let response = await fetch(url, {
            method: "GET"
        });

        if (response.ok) {
            let body: IBrrregEntity = await response.json();
            return body
        }

        return response.status
    }
}