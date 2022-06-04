/**
 *  Resolve weeknumber for given date
 * 
 * @param date date to resolve weeknumber
 * @returns weeknumber for given date
 */
 export const resolveWeekNumber = (date: Date) => {
    
    let weekNumber = 1;

    // 4th of january always in week 1
    let mondayWeek1 = new Date(date.getFullYear(), 0, 4)

    // go back to monday in january forth
    let daysToSubtract = mondayWeek1.getDay() - 1;
    mondayWeek1.setDate(mondayWeek1.getDate() - daysToSubtract)

    // get the second count of the first monday
    let mondayWeek1Seconds = mondayWeek1.getTime();
    let currentDateInSeconds = date.getTime();

    // get difference in miliseconds
    let difference = currentDateInSeconds - mondayWeek1Seconds;

    // convert difference to weeks
    difference = difference / 1000 / 60 / 60 / 24 / 7

    // add the difference rounded down to weeknumber
    weekNumber += Math.round(difference)

    // use function recursive in case weeknumber is 0 or less to get weeknumber from previous year
    if (weekNumber <= 0) {
        weekNumber = resolveWeekNumber(mondayWeek1)
    }

    return weekNumber;
}