import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";

/** Button to open add workday modal, for creating a new workhour data object */
export const CalculatorAddEditButton = () => {
    const { t } = useTranslation("calculator");
    
    const dispatch = useDispatch();

    const click = () => {
        dispatch(calculatorStateActions.setAddEditDialogOpen(true));
    }

    return <Button onClick={click}>
        DEV :: {t("addWorkday")}
    </Button>}