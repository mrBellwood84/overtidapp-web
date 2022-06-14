
/** defines start end and rate for a spesified timespan */
export interface IWageSupplement {
    /** timespan start (greater or equal) as string, example "06:00" */
    start: string;
    /** timespan end (less than) as string, example "00:00" */
    end: string;
    /** wage supplement rate in NOK */
    rate: string;
}