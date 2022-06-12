import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ICalendarItem } from '../../../../Data/DateTime/ICalendarItem'
import { AppState } from '../../../../StoreManagement/rootStore'
import { dayNameKeys } from '../../../../Utils/DateTimeLib/dayNameKeys'
import { resolveHoliday } from '../../../../Utils/DateTimeLib/resolveHolydays'

interface IProps {
    calendarItem: ICalendarItem
}

/** Date box for calendar */
export const CalendarBox = ({ calendarItem }: IProps) => {

    const { t } = useTranslation("datetime")

    const dayKey = dayNameKeys[calendarItem.date.getDay()].i18nKeyShort
    const holidays = useSelector((state: AppState) => state.calculator.holidays)

    const holiday = resolveHoliday(calendarItem.date, holidays)
    const semiHoliday = (holiday !== undefined && holiday.start !== "00:00:00") && calendarItem.isSelectedMonth;
    const isHoliday = (holiday !== undefined) && calendarItem.isSelectedMonth && !semiHoliday

    const resolveDataBox = () => {
        
        return <Box>
            {calendarItem.data ? "data" : "no data"}
        </Box>
    }

    return (
        <Card sx={{
                gridRow: calendarItem.row,
                gridColumn: calendarItem.column,
                opacity: calendarItem.isSelectedMonth ? 1: 0.5,
                cursor: calendarItem.isSelectedMonth ? "pointer" : "default",
                height: "120px",
                width: "120px",
                margin: "2px",
                display: "grid",
                gridTemplateColumns: "auto",
                gridTemplateRows: "max-content auto max-content"
            }}
            variant="outlined"
            onClick={() => console.warn("DEV :: Dataview not added")}
        >
            <Box sx={{
                display: "flex",
                alignItems: "baseline",
                margin:"5px",
                gridRow: 1
            }}>
                <Typography 
                    color={ isHoliday ? "red" : "GrayText" }
                    variant="h6"
                    component="div">
                    {calendarItem.date.getDate()}
                </Typography>
                <Typography
                    sx={{paddingLeft: "5px"}}
                    variant="button"
                    component="div"
                    color={ isHoliday ? "red" : "GrayText" }>
                        {t(dayKey!)}
                    </Typography>
            </Box>

            {resolveDataBox()}

            {isHoliday && (
                <Typography
                    variant="caption"
                    component="div"
                    bgcolor="red"
                    color="white"
                    textAlign="center"
                    sx={{
                        fontWeight: 600,
                        gridRow: 3,
                        padding: "2px"
                    }}
                >
                    {t(holiday.i18nTagLong)}
                </Typography>
            )}

            {semiHoliday && (
                <Typography
                    variant="caption"
                    component="div"
                    color="red"
                    borderTop="2px solid red"
                    textAlign="center"
                    sx={{
                        fontWeight: 600,
                        gridRow: 3,
                        padding: "1px"
                    }}
                >
                    {t(holiday.i18nTagLong)}
                </Typography>
            )}

        </Card>
    )
}