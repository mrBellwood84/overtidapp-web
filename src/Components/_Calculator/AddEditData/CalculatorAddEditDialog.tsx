import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { CalculatorAddEditForm } from "./CalculatorAddEditForm";

/** Dialog for adding or editing workhour data */
export const CalculatorAddEditDialog = () => {

    const { t } = useTranslation("calculator")

    const dispatch = useDispatch()
    const open = useSelector((state: AppState) => state.calculator.addEditDialogOpen)
    const selected = useSelector((state: AppState) => state.calculator.workhourDataSingleSelected)

    const handleClose = () => {
        dispatch(calculatorStateActions.setAddEditDialogOpen(open));
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color="GrayText">
                {selected ? t("editDay") : t("addDay")}
            </DialogTitle>

            <DialogContent>
                <CalculatorAddEditForm />
            </DialogContent>

        </Dialog>
    )
}