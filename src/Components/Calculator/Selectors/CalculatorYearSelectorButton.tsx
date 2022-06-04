import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";
import { AppState } from "../../../StoreManagement/rootStore";

interface IProps {
    year: number,
    onClick: () => void;
}

/** Button for direct year select in date view */
export const CalculatorYearSelectorButton = ({year, onClick}: IProps) => {

    const dispatch = useDispatch()
    const state = useSelector((state: AppState) => state.calculator)

    const selectYearOnClick = () => {
        dispatch(calculatorStateActions.setYearSelected(year));
        onClick();
    }

    return (
        <ListItem disablePadding>
            <ListItemButton 
                selected={state.yearSelected === year}
                onClick={selectYearOnClick} >
                <ListItemText 
                    primary={year}
                    sx={{textAlign: "center"}} />
            </ListItemButton>
        </ListItem>
    )
}