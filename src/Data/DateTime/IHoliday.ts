/**
 * Holiday data for calculation.
 */
export interface IHoliday {
    /** Date of holyday */
    date: Date,
    /** Clock start of holyday, may differ */
    start: string;
    /** Clock end of holyday, usually always at midnight! */
    end: string;
    /** Translation tag for i18next localization  */
    i18nTagLong: string;
}