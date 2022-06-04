import { Box, List } from "@mui/material";
import { useState } from "react";
import { appConfig } from "../../../appConfig";
import { monthNameKeys } from "../../../Utils/DateTimeLib/monthNameKeys";
import { CalculatorMonthSelectButton } from "./CalculatorMonthSelectButton";
import { CalculatorMonthSelector } from "./CalculatorMonthSelector";
import { CalculatorYearSelector } from "./CalculatorYearSelector";
import { CalculatorYearSelectorButton } from "./CalculatorYearSelectorButton";

/** container for selecting year and month for calculator data view */
export const CalculatorDateSelector = () => {

    const [showYearButtons, setShowYearButtons] = useState<boolean>(false);
    const [showMonthButtons, setShowMonthButtons] = useState<boolean>(true);

    const years = []

    for (let i = appConfig.calculatorMinYear; i <= appConfig.calculatorMaxYear; i++) {
        years.push(i)
    }

    const toggleShowYearClick = () => {
        setShowYearButtons(!showYearButtons)
        setShowMonthButtons(!showMonthButtons)
    }

    const monthSelectorButtonClick = () => {
        setShowYearButtons(false)
        setShowMonthButtons(true);
    }

    return (
        <Box sx={{
            gridRow: 2,
            gridColumn: 1,
            width: "200px"
        }}>
            <CalculatorYearSelector onClick={toggleShowYearClick}/>
            <CalculatorMonthSelector onClick={monthSelectorButtonClick}/>
            
            {showMonthButtons && (
            <List>
                    {monthNameKeys.map(x => (
                        <CalculatorMonthSelectButton key={`monthSelector-button-${x.index}`} index={x.index} />
                    ))}
                </List>
            )}

            {showYearButtons && years.map(x => (
                <CalculatorYearSelectorButton key={`yearselect-button-${x}`} year={x} onClick={toggleShowYearClick} />
            ))}

        </Box>
    )
}