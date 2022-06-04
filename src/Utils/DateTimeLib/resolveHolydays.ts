import { IHoliday } from "../../Data/DateTime/IHoliday";

/** 
 * Get easter sunday of given year using gauss algoritm
 * 
 * @param year - year to set easter
 * @returns Date object with easter of provided year
 */
const getEaster = (year: number) => {

    // Code copied from online source!
    // I have no idea how this works, I put my thrust in Gauss ;) 

    let a,b,c,p,q,m,n,d,e,days;

    a = year % 19;
    b = year % 4;
    c = year % 7;

    p = Math.floor(year / 100);
    q = Math.floor((13 + 8 * p) / 25 );

    m = (15 - q + p - p / 4) % 30;
    n = (4 + p - p / 4) % 7;

    d = (19 * a + m) % 30;
    e = (2 * b + 4 * c + 6 * d + n) % 7;

    days = (22 + d + e)

    if ((d === 29) && (e === 6)) return new Date(`${year}-4-19`)
    if ((d === 28) && (e === 6)) return new Date(`${year}-4-18`)

    if (days > 31) return new Date(`${year}-4-${days - 31}`);
    
    return new Date(`${year}-3-${days}`);
}

/** 
 *  Generate a list of IHoliday objects with holidays for given year.
 *  These holidays are defined by the tariff agreement.
 *  Using Gauss algoritm for easter do define movable holidays
 * 
 * @param year year for holidays
 * @returns IHolidays
 */
export const getHolidays = (year: number):IHoliday[] => {

    // create datetime objects for holidays for given year
    let maundyThursday  = getEaster(year);  maundyThursday.setDate(maundyThursday.getDate() - 3);
    let goodFriday      = getEaster(year);  goodFriday.setDate(goodFriday.getDate() - 2);
    let easter          = getEaster(year);  easter.setDate(easter.getDate() - 1)
    let easterSunday    = getEaster(year);
    let easterMonday    = getEaster(year);  easterMonday.setDate(easterMonday.getDate() + 1);

    let mayFirst        = new Date(`${year}-5-1`)
    let maySeventeen    = new Date(`${year}-5-17`)

    let ascension       = getEaster(year);  ascension.setDate(ascension.getDate() + 39)

    let pentecost       = getEaster(year);  pentecost.setDate(pentecost.getDate() + 48)
    let pentecostSunday = getEaster(year);  pentecostSunday.setDate(pentecostSunday.getDate() + 49)
    let pentecostMonday = getEaster(year);  pentecostMonday.setDate(pentecostMonday.getDate() + 50)

    let christmas       = new Date(`${year}-12-24`);
    let christmasday    = new Date(`${year}-12-25`);
    let christmasday2   = new Date(`${year}-12-26`);

    let newYear         = new Date(`${year}-12-31`);
    let newYearDay      = new Date(`${year}-1-1`);

    // create list with holiday objects
    // start and end time for holidays are hard coded since they are not likely to change
    let result: IHoliday[] = [
        {
            date: maundyThursday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "maundyThursday"
        }, {
            date: goodFriday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "goodFriday"
        }, {
            date: easter,
            start: "15:00:00",
            end: "00:00:00",
            i18nTagLong: "easter"
        }, {
            date: easterSunday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "easterSunday"
        }, {
            date: easterMonday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "easterMonday"
        }, {
            date: mayFirst,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "mayFirst"
        }, {
            date: maySeventeen,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "maySeventeen"
        }, {
            date: ascension,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "ascension"
        }, {
            date: pentecost,
            start: "15:00:00",
            end: "00:00:00",
            i18nTagLong: "pentecost"
        }, {
            date: pentecostSunday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "pentecostSunday"
        }, {
            date: pentecostMonday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "pentecostMonday"
        }, {
            date: christmas,
            start: "15:00:00",
            end: "00:00:00",
            i18nTagLong: "christmas"
        }, {
            date: christmasday,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "christmasday"
        }, {
            date: christmasday2,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "christmasday2"
        }, {
            date: newYear,
            start: "15:00:00",
            end: "00:00:00",
            i18nTagLong: "newYear"
        }, {
            date: newYearDay,
            start: "00:00:00",
            end: "00:00:00",
            i18nTagLong: "newYearDay"
        }
    ]

    return result;
}

/**
 * Check if date is holiday based on given date.
 * Use a precalculated holiday object list for faster calculation!
 * 
 * @param date date with with time "00:00:00"
 * @param holidayData array with holiday data, default is undefined
 * @returns IHoliday object if day is holiday, else undefined
 */
export const resolveHoliday = (
    date: Date, 
    holidayData: IHoliday[] | undefined = undefined
): IHoliday | undefined => {

    // create holiday list for year if no precalculated list is provided
    let holidays = holidayData ? holidayData : getHolidays(date.getFullYear())
    let res = holidays.find(x => x.date.toDateString() === date.toDateString());
    return res;

}

/**
 * Works as getHoliday, but only returns a boolean value
 * 
 * @param date          date
 * @param holidayData   static holiday data for date with same year
 * @returns             true if day is holiday, else false
 */
export const resolveIsHoliday = (
    date: Date, 
    holidayData: IHoliday[] | undefined = undefined
):boolean => {
    let res = resolveHoliday(date, holidayData);
    return (res ? true : false);
}