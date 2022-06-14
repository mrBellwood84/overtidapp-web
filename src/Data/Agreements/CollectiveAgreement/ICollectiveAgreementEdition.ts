import { IAgreementRuleBase } from "../IAgreementRuleBase";
import { IRuleExtendRate } from "../IRuleExtendRate";

/** 
 * 
 * short internal interface for max hour definitions inside the collective agreement */
interface IMaxHourDefinition {
    /** regular hours per day */
    limit: number;
    /** regular hours per week */
    maxHourWeek: number;
    /** regular hours per month */
    maxHourMonth: number
    /** reference set as list of undefined to match backend data model */
    reference: undefined[];
}

/** model for editions of the collective agreement */
export interface ICollectiveAgreementEdition {
    /** entity id */
    id: string;
    
    /** agreement start date */
    validFrom: Date;
    /** agreement expiration date */
    expire: Date;
    
    /** set defnitions for regular workhours per day, week and month */
    maxHourDefinitions: IMaxHourDefinition[];

    /** contain paragraph and reference for how to calculate overtime */
    timeCalculationRule: IAgreementRuleBase;

    /** rate and paragraph for regular overtime */
    overtimeRegular: IAgreementRuleBase & IRuleExtendRate;

    /** rate and paragraph for overtime night */
    overtimeNight: IAgreementRuleBase & IRuleExtendRate;

    /** rate and paragraph for overtime day off */
    overtimeDayOff: IAgreementRuleBase & IRuleExtendRate;

    /** rate and paragraph for overtime day off for part time employees */
    overtimeDayoffPartTime: IAgreementRuleBase & IRuleExtendRate;

}