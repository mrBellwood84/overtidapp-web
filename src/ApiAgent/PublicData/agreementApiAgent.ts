import { IAml } from "../../Data/Agreements/AML/IAml"
import { ICollectiveAgreement } from "../../Data/Agreements/CollectiveAgreement/ICollectiveAgreement"
import { IRequestById } from "../../Data/Misc/IRequestById"
import { rootApiAgent } from "../rootApiAgent"

const urls = {
    collectiveAgreement: "public/collectiveagreement",
    aml: "public/aml"
}

/** collection of agreement api call functions */
export const agreementApiAgent = {

    /** get all collection agreements from api */
    getCollectiveAgreements: async (): Promise<ICollectiveAgreement[] | number> => {

        var response = await rootApiAgent.get(urls.collectiveAgreement)

        if (!response.ok) return response.status;

        var body = await response.json() as ICollectiveAgreement[]
        return body
    },

    /** get single collective agreement from api by entity id query */
    getCollectiveAgreementById: async (id: string): Promise<ICollectiveAgreement | number> => {

        var reqObj: IRequestById = {
            id: id
        }

        var response = await rootApiAgent.post(urls.collectiveAgreement, reqObj);

        if (!response.ok) return response.status;

        var body = await response.json() as ICollectiveAgreement;
        return body;
    },

    /** get working environment act data set */
    getAML: async (): Promise<IAml | number> => {
        var response = await rootApiAgent.get(urls.aml)

        if (!response.ok) return response.status

        var body = await response.json() as IAml
        return body
    }
}