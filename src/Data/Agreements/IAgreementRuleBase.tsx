import { IReference } from "./IReference";

/** base rule model for agreement, only contain paragraph and reference list */
export interface IAgreementRuleBase {
    /** paragraph in agreement */
    paragraph: string;
    /** list of reference objects */
    reference: IReference[];
}