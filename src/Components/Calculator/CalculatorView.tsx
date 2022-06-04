import { Box, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { AppState } from "../../StoreManagement/rootStore"
import { monthNameKeys } from "../../Utils/DateTimeLib/monthNameKeys"
import { CalculatorAddEditButton } from "./AddEditData/CalculatorAddEditButton"
import { CalculatorAddEditDialog } from "./AddEditData/CalculatorAddEditDialog"
import { CalculatorContractSelect } from "./AddEditData/CalculatorContractSelect"
import { CalculatorDataAnnualOverview } from "./DataView/CalculatorDataAnnualOverview"
import { CalculatorDataCalendar } from "./DataView/CalculatorDataCalendar"
import { CalculatorDataMonthOverview } from "./DataView/CalculatorDataMonthOverview"
import { CalculatorDataMonthTable } from "./DataView/CalculatorDataMonthTable"
import { CalculatorDataViewSelector } from "./Selectors/CalculatorDataViewSelector"
import { CalculatorDateSelector } from "./Selectors/CalculatorDateSelector"

/** Compontent for viewing calculator */
export const CalculatorView = () => {

    const { t } = useTranslation()

    const state = useSelector((state: AppState) => state.calculator)

    // keys for switching views and localization
    const keys:string[] = ["annualOverview","monthOverview","calendarOverview","tableOverview"]

    // resolve view title, or rather year and month
    const resolveHeader = (key: string) => {

        let monthKeyIndex = monthNameKeys.findIndex(x => x.index === state.monthSelected)

        let date = key === keys[0] ? state.yearSelected : `${t(monthNameKeys[monthKeyIndex].i18nKeyFull, {ns: "datetime"})} ${state.yearSelected}`

        return (<Typography variant="h4" color="GrayText" sx={{marginRight: "auto"}}>{`${date}`}</Typography>)
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "max-content auto",
                gridTemplateColumns: "max-content auto",
        }}>
            <CalculatorAddEditDialog />

            <CalculatorAddEditButton />
            <CalculatorDataViewSelector />
            <CalculatorDateSelector />

            <Box sx={{
                gridColumn: 2,
                gridRow: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    
                }}>
                    {resolveHeader(state.calculatorDataViewSelected)}
                    <CalculatorContractSelect />
                </Box>

                {state.calculatorDataViewSelected === keys[0] && <CalculatorDataAnnualOverview />}
                {state.calculatorDataViewSelected === keys[1] && <CalculatorDataMonthOverview />}
                {state.calculatorDataViewSelected === keys[2] && <CalculatorDataCalendar />}
                {state.calculatorDataViewSelected === keys[3] && <CalculatorDataMonthTable />}
            </Box>

        </Box>
    )
}