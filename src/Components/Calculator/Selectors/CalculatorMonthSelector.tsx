import { ArrowLeft, ArrowRight } from "@mui/icons-material"
import { Box, Button, IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { appConfig } from "../../../appConfig"
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions"
import { AppState } from "../../../StoreManagement/rootStore"
import { monthNameKeys } from "../../../Utils/DateTimeLib/monthNameKeys"

interface IProps {
    onClick: () => void;
}

/** Month selector container, contain forward and backward buttons, and button for month list for direct select */
export const CalculatorMonthSelector = ({ onClick }: IProps) => {

    const { t } = useTranslation("datetime");

    const dispatch = useDispatch();
    const state = useSelector((state: AppState) => state.calculator)

    const handleMonthArrowClick = (addIndex: number) => {
        let year = state.yearSelected;
        let month = state.monthSelected + addIndex;

        if (month < 0)  { month = 11;   year -= 1 };
        if (month > 11) { month = 0;    year += 1 };

        dispatch(calculatorStateActions.setYearAndMonthSelected(month, year));
    }

    const getMonthKeyString = (index: number): string => {
        let obj = monthNameKeys.find(x => x.index === index);
        if (!obj) console.error("Could not resolve month name in button");
        let str = obj ? obj.i18nKeyFull : "";
        return str;
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "max-content",
            gridTemplateColumns: "max-content auto max-content",
            alignItems: "center"
        }}>

            <IconButton
                color="primary"
                size="large"
                disabled={(state.yearSelected <= appConfig.calculatorMinYear) && (state.monthSelected <= 0)}
                onClick={() => handleMonthArrowClick(-1)}
                sx={{
                    gridRow: 1,
                    gridColumn: 1
                }}>
                <ArrowLeft />
            </IconButton>

            <Button
                onClick={onClick}
                sx={{
                gridRow: 1,
                gridColumn: 2,
                fontWeight: 600,
            }}>
                {t(getMonthKeyString(state.monthSelected))}
            </Button>

            <IconButton
                color="primary"
                size="large"
                disabled={(state.yearSelected >= appConfig.calculatorMaxYear) && (state.monthSelected >= 11)}
                onClick={() => handleMonthArrowClick(1)}
                sx={{
                    gridRow: 1,
                    gridColumn: 3
                }}>
                <ArrowRight />
            </IconButton>

        </Box>
    )
}