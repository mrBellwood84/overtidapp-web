import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ICalendarItem } from "../../../Data/DateTime/ICalendarItem";
import { AppState } from "../../../StoreManagement/rootStore";
import { resolveWeekNumber } from "../../../Utils/DateTimeLib/resolveWeekNumber";
import { CalendarBox } from "./SubComponents/CalendarBox";

interface IWeeknumberItem {
    key: string;
    number: number;
    row: number;
}

/** Calendar data view */
export const CalculatorDataCalendar = () => {

    const state = useSelector((state: AppState) => state.calculator);

    // create a start date for calendar
    // first monday of first week of selected month
    const startDate = new Date(state.yearSelected, state.monthSelected, 1)
    while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() - 1)
    }

    // create an end date for calendar
    // sunday of last week of selected month
    const endDate = new Date(state.yearSelected, (state.monthSelected + 1), 1);
    endDate.setDate(endDate.getDate() - 1);
    while (endDate.getDay() !== 0) {
        endDate.setDate(endDate.getDate() + 1)
    }

    // create calendar items with accending dates, no data
    const createCalendarItems = (): ICalendarItem[] => {

        let rowIndex = 0;
        let columnIndex = 2
        let result: ICalendarItem[] = [];

        while(startDate <= endDate) {

            columnIndex++;
            if (startDate.getDay() === 1) {
                rowIndex++;
                columnIndex = 2
            }


            const item: ICalendarItem = {
                key: `calendaritem-${startDate.toISOString()}`,
                date: new Date(startDate.toDateString()),
                isSelectedMonth: startDate.getMonth() === state.monthSelected,
                column: columnIndex,
                row: rowIndex,
            }

            result.push(item)
            startDate.setDate(startDate.getDate() + 1)
        }
        return result;
    }

    // add workhour data to calendar items
    const populateCalendarItems = (items: ICalendarItem[]):ICalendarItem[] => {

        // find annual data, return items if no data
        var annual = state.workhourDataAnnual.find(x => x.year === state.yearSelected);
        if (!annual) return items;

        // find month data, return items if no data
        var month = annual.dataSorted.find(x => x.month === state.monthSelected);
        if (month!.data.length === 0) return items;

        // populate calendar items with worhour data and return
        return items.map(x => {

            // find any data with same date as calendar item and same month as state selected month
            // add data if any, then return object
            let data = month!.data.filter(y => y.date === x.date.getDate() && y.month === state.monthSelected)
            if (data.length > 0) x.data = data;
            return x;
        })
    }

    // create weeknumber objects for calendar
    const createWeekNumberArray = (calendarItems: ICalendarItem[]) => {
        let l = calendarItems.length;
        let r = 1; 
        let res: IWeeknumberItem[] = [];

        for (let i = 0; i < l; i += 7) {
            let n = resolveWeekNumber(calendarItems[i].date)
            let item: IWeeknumberItem = {
                key: `weeknumber-${n}-for-${state.yearSelected}`,
                number: n,
                row: r,
            }
            res.push(item)
            r++;
        }
        return res;
    }

    // create weeknumber and calendar items
    const calendarItems = populateCalendarItems(createCalendarItems());
    const weeknumberItems = createWeekNumberArray(calendarItems);


    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "72px auto auto auto auto auto auto auto",
            gridTemplateRows: "auto auto auto auto auto auto",
            width: "max-content",
            marginLeft: "auto"
        }}>
            {calendarItems.map(x => (
                <CalendarBox key={x.key} calendarItem={x} />
            ))}

            {weeknumberItems.map(x => (
                <Typography 
                    key={x.key}
                    variant="h4"
                    component="div"
                    color="GrayText"
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        marginRight: "5px"
                    }}>
                        {x.number}
                </Typography>
            ))}

        </Box>
    )
}