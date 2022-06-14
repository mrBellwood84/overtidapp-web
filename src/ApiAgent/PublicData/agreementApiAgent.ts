import { ICollectiveAgreement } from "../../Data/Agreements/CollectiveAgreement/ICollectiveAgreement"
import { IRequestById } from "../../Data/Misc/IRequestById"
import { rootApiAgent } from "../rootApiAgent"

const urls = {
    collectiveAgreement: "public/collectiveagreement"
}

/** collection of agreement api call functions */
export const agreementApiAgent = {

    /** get all collection agreements from api */
    getCollectiveAgreements: async (): Promise<ICollectiveAgreement[] | number> => {

        var response = await rootApiAgent.get(urls.collectiveAgreement)

        if (!response.ok) return response.status;

        try {
            var body: ICollectiveAgreement[] = await response.json();
            return body
        } catch (ex) {
            console.error("DEV :: Could not parse collective agreements from api response", ex)
            return 500;
        }
    },

    /** get single collective agreement from api by entity id query */
    getCollectiveAgreementById: async (id: string): Promise<ICollectiveAgreement | number> => {

        var reqObj: IRequestById = {
            id: id
        }

        var response = await rootApiAgent.post(urls.collectiveAgreement, reqObj);

        if (!response.ok) return response.status;

        try {
            var body: ICollectiveAgreement = await response.json();
            return body;
        } catch (ex) {
            console.error("DEV :: could not parse collective agreement from api response", ex)
            return 500
        }
    }
}