import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";
import { AppState } from "../../../StoreManagement/rootStore";

/** Tab bar for selecting data view */
export const CalculatorDataViewSelector = () => {

    const { t } = useTranslation("calculator");

    const dispatch = useDispatch();
    const state = useSelector((state: AppState) => state.calculator.calculatorDataViewSelected)
    
    const keys:string[] = ["annualOverview","monthOverview","calendarOverview","tableOverview"]

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleOnClick = (event: SyntheticEvent, value: number) => {
        setSelectedTab(value)
        dispatch(calculatorStateActions.setCalculatorDataViewSelected(keys[value]))
    }

    const a11yProps = (index: number) => {
        return {
            id: `calculator-data-tabpanel-${index}`,
            'aria-controls': `calculator-data-tabpanel-${index}`
        }
    }

    useEffect(() => {
        const initializeTabSelected = () => {
            const index = keys.indexOf(state);
            if (index > 0 || index <= keys.length) return;
            setSelectedTab(index);
        }
        initializeTabSelected();
    },[])

    return (
        <Box sx={{
            gridRow: 1,
            gridColumn: 2
        }}>
            <Tabs
                value={selectedTab}
                onChange={handleOnClick}
                aria-label="calculator dataview tabs"
                centered>

                <Tab label={t(keys[0])} {...a11yProps(0)} />
                <Tab label={t(keys[1])} {...a11yProps(1)} />
                <Tab label={t(keys[2])} {...a11yProps(2)} />
                <Tab label={t(keys[3])} {...a11yProps(3)} />
            </Tabs>

        </Box>
    )
}