import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { employmentStateActions } from "../../../StoreManagement/Employment/EmploymentStateActions";
import { employmentStateReducer } from "../../../StoreManagement/Employment/EmploymentStateReducer";
import { AppState } from "../../../StoreManagement/rootStore";

/** Select box for changing selected contract */
export const CalculatorContractSelect = () => {

    const { t } = useTranslation("calculator");
    
    const dispatch = useDispatch()
    const state = useSelector((state: AppState) => state.employment)

    const handleChange = (event: SelectChangeEvent) => {
        if (!state.selectedEmploymentContract) return;
        var value = event.target.value
        var contract = state.employmentContracts.find(x => x.id === value)
        console.error("DEV :: Selector temporary changed")
        // dispatch(employmentStateActions.(contract))
    }

    return (
        <FormControl variant="standard" sx={{width: "200px"}}>
            <InputLabel>{t("employmentContract")}</InputLabel>
            <Select 
                value={state.selectedEmploymentContract ? "DEV :: Contract" : undefined}
                onChange={handleChange}>
                {state.employmentContracts.length > 0 ? (
                    state.employmentContracts.map(x => (
                        <MenuItem key={x.id} value={x.id}>DEV :: Contract</MenuItem>
                    ))
                ) : (
                    <MenuItem value={undefined}>{t("noContract")} </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}