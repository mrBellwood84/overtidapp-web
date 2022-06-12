import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { monthNameKeys } from "../../../Utils/DateTimeLib/monthNameKeys";

interface IProps {
    index: number;
}

/** button for selecting month, month buttons are default and fallback in date select */
export const CalculatorMonthSelectButton = ({ index }: IProps) => {

    const { t } = useTranslation("datetime");

    const dispatch = useDispatch()
    const state = useSelector((state: AppState) => state.calculator)

    const buttonClick = (index: number) => {
        dispatch(calculatorStateActions.setMonthSeleted(index))
    }

    return (
        <ListItem disablePadding>
            <ListItemButton
                selected={state.monthSelected === index}
                onClick={() => buttonClick(index)}>
                <ListItemText
                    primary={t(monthNameKeys[index].i18nKeyFull)}
                    sx={{textAlign: "center"}} />
                </ListItemButton>
        </ListItem>
    )
}