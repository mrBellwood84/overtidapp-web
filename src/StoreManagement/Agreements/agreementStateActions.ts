import { ICollectiveAgreement } from "../../Data/Agreements/CollectiveAgreement/ICollectiveAgreement";

/** collection of agreement state actions for reducer */
export const agreementStateActions = {
    setCollectiveAgreements: (agreements: ICollectiveAgreement[]) => ({
        type: "SET_COLLECTIVE_AGREEMENT",
        agreements: agreements
    } as const),

    signOut: () => ({
        type: "SIGN_OUT"
    } as const),

    loadStateFromSession: () => ({
        type: "LOAD_STATE_FROM_SESSION"
    } as const),
}