import { ArrowLeft, ArrowRight } from "@mui/icons-material"
import { Box, Button, IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { appConfig } from "../../../appConfig"
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions"
import { AppState } from "../../../StoreManagement/rootStore"

interface IProps {
    onClick: () => void;
}

/** Container for year select buttons, include forward and backward, and button for direct year select */
export const CalculatorYearSelector = ({ onClick }: IProps) => {

    const dispatch = useDispatch()
    const year = useSelector((state: AppState) => state.calculator.yearSelected);

    const handleYearArrowClick = (addYear: number) => {
        dispatch(calculatorStateActions.setYearSelected(year + addYear));
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
                disabled={year <= appConfig.calculatorMinYear}
                onClick={() => handleYearArrowClick(-1)}
                sx={{
                    gridRow: 1,
                    gridColumn: 1,
                }}>

                    <ArrowLeft />
            </IconButton>

            <Button
                size="large"
                onClick={onClick}
                sx={{
                    gridRow: 1,
                    gridColumn: 2,
                    fontWeight: 600
                }}>

                {year}
            </Button>

            <IconButton
                color="primary"
                size="large"
                disabled={year >= appConfig.calculatorMaxYear}
                onClick={() => handleYearArrowClick(1)}
                sx={{
                    gridRow: 1,
                    gridColumn: 3
                }}>

                    <ArrowRight />
                </IconButton>
                

        </Box>
    )
}