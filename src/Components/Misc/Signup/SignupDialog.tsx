import { LockOutlined } from "@mui/icons-material"
import { Avatar, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { accountStateActions } from "../../../StoreManagement/Account/accountStateActions"
import { AppState } from "../../../StoreManagement/rootStore"
import { SignUpForm } from "./SignUpForm"

export const SignupDialog = () => {

    const dispatch = useDispatch()
    const isOpen = useSelector((state: AppState) => state.account.signupDialogOpen)

    const {t} = useTranslation();

    const closeDialog = () => {
        dispatch(accountStateActions.setSignupDialogOpen(false))
    }

    return (
        <Dialog open={isOpen} onClose={closeDialog} fullWidth maxWidth="xs">
            <DialogTitle sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Avatar sx={{bgcolor: "#6699cc", mb:1, mt: 2}}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h4" component="div" fontWeight={200}>
                    {t("signup")}
                </Typography>
            </DialogTitle>
                <SignUpForm closeDialog={closeDialog} />
            <DialogContent />
        </Dialog>
    )
}