/** Model for holding i18next key for names 
 *  Used for day and month name in calendar / calculator.
*/
export interface INameByIndex {

    /** day index in JS date object */
    index: number;

    /** i18next key for full day name */
    i18nKeyFull: string;

    /** i18next key for shortend day name */
    i18nKeyShort?: string;
}