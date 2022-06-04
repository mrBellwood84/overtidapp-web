
/** Defines data for wage supplement */
export interface IWageSupplement {
    /** Db entity id, provided by database */
    id: string;
    /** clock start of time period, represtented as string, example: "00:00" */
    start: string;
    /** clock end of time period represended as string, example: "00:00" */
    end: string;
    /** wage supplement in NOK */
    rate: number;
}