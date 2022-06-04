import { ICollectiveAgreement } from "../../Data/Agreements/CollectiveAgreement/ICollectiveAgreement"
import { rootApiAgent } from "../rootApiAgent"

const subdomain = "public/collectiveagreement"

export const collectiveAgreementApiAgent = {
    getAll: async (): Promise<ICollectiveAgreement[] | number> => {
        
        var res = await rootApiAgent.get(subdomain)

        if (!res.ok) return res.status

        try {
            var body: ICollectiveAgreement[] = await res.json();
            return body;
        } catch (ex) {
            console.error("DEV :: Could not parse collective agreement data recived from web api")
            return 500;
        }
    }
}