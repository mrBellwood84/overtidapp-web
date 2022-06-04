import { IWageSupplement } from "./IWageSupplement";

export interface ISalaryTable {
    /** db entity id provided by backend */
    id: string;
    /** date valid from */
    validFrom: Date;
    /** date of expiration if expired */
    expire?: Date;
    /** defininiton and supplement for evening hours */
    supplementEvening: IWageSupplement;
    /** definition and supplement for saturday hours */
    supplementSaturday: IWageSupplement;
    /** definition and supplement for sunday hours */
    supplementSunday: IWageSupplement;
    /** definition and supplement for night hours */
    supplementNight: IWageSupplement;
    /** definition and supplement in addition for night hours if includes manual labour */
    supplementNightLabour: IWageSupplement;
}