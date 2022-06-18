import { IAgreementRuleBase } from "../IAgreementRuleBase";
import { IRuleExtendLimit } from "../IRuleExtendLimit";
import { IRuleExtendPeriod } from "../IRuleExtendPeriod";
import { IRuleExtendRate } from "../IRuleExtendRate";


/** working environment act data set,
 *  used for defining rulesets for overtime calculating overtime,
 *  and sets limits for creating special agreements  */
export interface IAml {

    /** Definition of normal working hour.
     * - limit: hours
    */
    workhoursDay: IAgreementRuleBase & IRuleExtendLimit

    /** Max legal working hours for a single day 
     * - limit: hours
    */
    workhoursDayMaxLegal: IAgreementRuleBase & IRuleExtendLimit

    /** Max normal workhours per day with individual agreement 
     * - limit: hours
    */
    workhoursDayIndividual: IAgreementRuleBase & IRuleExtendLimit

    /** Max normal workhour per day with special agreement 
     * - limit: hours
    */
    workhoursDaySpecial: IAgreementRuleBase & IRuleExtendLimit

    /** Max legal workhours per day with special agreement 
     * - limit: hours
    */
    workhoursDaySpecialMaxLegal: IAgreementRuleBase & IRuleExtendLimit



    /** Definition of hours in a normal workweek 
     * - limit: hours
    */
    workhoursWeek: IAgreementRuleBase & IRuleExtendLimit

    /** Max normal workhours per week in individual agreement.
     *  Used in combination with calculating average hours per workweek rule
     * - limit: hours
    */
    workhoursWeekIndividual: IAgreementRuleBase & IRuleExtendLimit

    /** Max normal workhours per week in special agreements.
     *  Used in combination with calculating average hours per workweek rule
     * - limit: hours
    */
    workhoursWeekSpecial: IAgreementRuleBase & IRuleExtendLimit

    /** Rule for average calculation of workhours per week over time period 
     * - limit: average hours per week
     * - period: period of weeks
    */
    workhoursWeekAverage: IAgreementRuleBase & IRuleExtendLimit & IRuleExtendPeriod

    /** maximum legal workhours per week
     * - limit: hours
     */
    workhoursWeekMaxLegal: IAgreementRuleBase & IRuleExtendLimit


    /** max legal overtime hours per week 
     * - limit: hours
    */
    maxOvertimeWeek: IAgreementRuleBase & IRuleExtendLimit

    /** limit for max legal overtime per week in special agreement 
     * - limit: hours
    */
    maxOvertimeWeekSpecial: IAgreementRuleBase & IRuleExtendLimit

    /** max legal overtime hours per week period 
     * - limit: hours
     * - period: weeks in period
    */
    maxOvertimeMonth: IAgreementRuleBase & IRuleExtendLimit & IRuleExtendPeriod

    /** limit for max legal overtime per week period in special agreement 
     * - limit: hours
     * - period: weeks in period
    */
    maxOvertimeMonthSpecial: IAgreementRuleBase & IRuleExtendLimit & IRuleExtendPeriod

    /** max legal overtime per year 
     * - limit: hours
    */
    maxOvertimeYear: IAgreementRuleBase & IRuleExtendLimit
    /** limit for max legal overtime per year in special agreement 
     * - limit: hours
    */
    maxOvertimeYearSpecial: IAgreementRuleBase & IRuleExtendLimit


    /** definition of workfree hours between separate shifts 
     * - limit: hours
    */
    workfreeDay: IAgreementRuleBase & IRuleExtendLimit

    /** limit of minimum workfree hours between separate shifts in special agreements 
     * - limit: hours
    */
    workfreeDaySpecial: IAgreementRuleBase & IRuleExtendLimit

    /** definition of workfree hours in period during a week 
     * - limit: hours
     * - period: days in period
    */
    workfreeWeek: IAgreementRuleBase & IRuleExtendLimit & IRuleExtendPeriod

    /** limit of minium workfree hours during a week with special agreement 
     * - limit: hours
     * - period: days in period
    */
    workfreeWeekSpecial: IAgreementRuleBase & IRuleExtendLimit & IRuleExtendPeriod

    /** definition of overtime as stated in law */
    overtimeDefinition: IAgreementRuleBase

    /** overtime supplement rate as stated in law 
     * - rate: overtime rate
    */
    supplementRate: IAgreementRuleBase & IRuleExtendRate

    /** paragraph sundays off */
    sundayOff: IAgreementRuleBase

}