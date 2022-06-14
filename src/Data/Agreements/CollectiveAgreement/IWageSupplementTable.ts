import { IWageSupplement } from "./IWageSupplement";

/** wage supplement table for collective agreement */
export interface IWageSupplementTable {

    /** entity id */
    id: string;

    /** valid from date */
    validFrom: Date;
    /** date of expiration */
    expire: Date;

    /** wage supplement evening */
    supplementEvening: IWageSupplement;

    /** wage supplement saturday */
    supplementSaturday: IWageSupplement;

    /** wage supplement for sundays */
    supplementSunday: IWageSupplement;

    /** wage supplements for night (resting)*/
    supplementNight: IWageSupplement;

    /** wage supplement for night with manual labour */
    supplementNightLabour: IWageSupplement;
}