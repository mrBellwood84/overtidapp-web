import { Box, Button, ButtonGroup, Toolbar, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { accountStateActions } from "../../StoreManagement/Account/accountStateActions"
import { LanguageSelectButton } from "./LanguageSelectButton"

export const AppbarNoUser = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleSigninClick = () => {
        dispatch(accountStateActions.setSigninDialogOpen(true));
    }

    const handleSignupClick = () => {
        dispatch(accountStateActions.setSignupDialogOpen(true));
    }

    return (
        <Toolbar sx={{
            gridRow: 1,
            gridColumn: "1 / 4"
        }}>

            <Typography 
                variant="h6"
                component="div"
                sx={{flexGrow: 1}}>
                    {t("appTitle")}
            </Typography>

            <Box>
                <LanguageSelectButton iconOnly={true} />
                <ButtonGroup variant="text">
                    <Button onClick={handleSignupClick}>
                        {t("signup")}
                    </Button>
                    <Button onClick={handleSigninClick}>
                        {t("signin")}
                    </Button>
                </ButtonGroup>
            </Box>

        </Toolbar>
    )
}