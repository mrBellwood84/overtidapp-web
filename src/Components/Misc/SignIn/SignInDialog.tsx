import { LockOutlined } from "@mui/icons-material";
import { Avatar, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { accountStateActions } from "../../../StoreManagement/Account/accountStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { SignInForm } from "./SignInForm";

/** Dialog for signing in as user */
export const SignInDialog = () => {

    // redus dispatch
    const dispatch = useDispatch();
  
    // import translation hook
    const { t } = useTranslation();

    const isOpen = useSelector((state: AppState) => state.account.signinDialogOpen)
  
    // function for closing modal
    const closeDialog = () => {
      dispatch(accountStateActions.setSigninDialogOpen(false));
    };

    // return component
    return (
      <Dialog onClose={closeDialog} open={isOpen} fullWidth maxWidth="xs">
        <DialogTitle sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Avatar sx={{bgcolor: "#6699cc", mb:1, mt: 2}}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h4" component="div" fontWeight={200}>
            {t("signin")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <SignInForm closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    );
  };