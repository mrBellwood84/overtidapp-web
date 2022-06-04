import { ICollectiveAgreement } from "../../Data/Agreements/CollectiveAgreement/ICollectiveAgreement";

/** Agreement state values */
export interface IAgreementState {

    collectiveAgreements: ICollectiveAgreement[];
    collectiveAgreementsLoaded: boolean;
}