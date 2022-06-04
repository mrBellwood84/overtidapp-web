import { appConfig } from "../../appConfig"
import { IWorkhourDataPrimitive } from "../../Data/Calculator/IWorkhourDataPrimitive"


/** 
 *  Check that provided date does not break app date limitation
 * 
 * @param date date to check
 * @returns false if given date is outside app date limit, else true
 */
export const resolveDateWithinAppLimit = (date: Date) => {

    let minDate = new Date(`${appConfig.calculatorMinDate} 00:00:00`)
    let maxDate = new Date(`${appConfig.calculatorMaxDate} 23:59:00`)

    if (date > maxDate || date < minDate) return false

    return true
}

/**
 *  Check if data set does not overlap any other stored data objects
 * 
 * @param data data to be added
 * @param dataset array of existing data objects
 * @returns true if not overlapping, else false
 */
export const resolveNoOverlap = (
    data: IWorkhourDataPrimitive, 
    dataset: IWorkhourDataPrimitive[]
): boolean => {

    let dataSubset = dataset.filter(x => 
        checkSameDate(data.start,x.start) ||
        checkSameDate(data.start, x.end) ||
        checkSameDate(data.end, x.start)
    )

    let l = dataSubset.length;
    
    for (let i = 0; i < l; i++) {
        if(data.start >= dataSubset[i].start) {
            if (data.start < dataSubset[i].end) return false;
        }

        if(data.start < dataSubset[i].start) {
            if (data.end > dataSubset[i].start) return false;
        }
    }
    return true
}



/**
 *  Checks if two datetime objects got the same date
 * 
 * @param date_1 
 * @param date_2 
 * @returns true if date objects have same date, else false
 */
const checkSameDate = (date_1: Date, date_2: Date) => {
    return date_1.toDateString() === date_2.toDateString();
}