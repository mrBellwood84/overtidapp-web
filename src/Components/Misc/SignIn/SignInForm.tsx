import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { accountAgent } from "../../../ApiAgent/UserData/accountAgent";
import { IAccount } from "../../../Data/Account/IAccount";
import { ISigninDto } from "../../../Data/Account/ISigninDto";
import { accountStateActions } from "../../../StoreManagement/Account/accountStateActions";
import { tokenStorageHandler } from "../../../Utils/Misc/tokenStorageHandler";
import { LoadBox } from "../LoadBox";

interface IProps {
    closeDialog: () => void;
}

type FormValues = {
    email: string;
    password: string;
}

export const SignInForm = ({ closeDialog }: IProps) => {

    // form hooks
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    // redux dispatch
    const dispatch = useDispatch();

    // i18n translator hook
    const { t } = useTranslation();

    // local hooks
    const [signInError, setSignInError] = useState<string | undefined>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const submit: SubmitHandler<FormValues> = async (data) => {
        // reset local hooks
        setSignInError(undefined);
        setApiLoading(true);

        const dto: ISigninDto = {
            email: data.email,
            password: data.password
        }

        let response = await accountAgent.signIn(dto)

        if (typeof(response) === "number") {
            if (response === 500) setSignInError(t("serverErrorShort"));
            else setSignInError(t("signinCredentialError"))
            setApiLoading(false)
            return
        }

        let accountData: IAccount = {
            userName: response.userName,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role
        }

        dispatch(accountStateActions.signIn(accountData))
        tokenStorageHandler.set(response.token)

        // set api loading as false and close dialog
        closeDialog();
    }

    if (apiLoading) return <LoadBox />

    // return signin form
    return (
        <Box
            sx={{ml: 3, mr: 3}}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submit)}>

            <TextField
                {...register("email", {
                    required: t("emailRequiredError").toString(),
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: t("emailFormatError").toString()
                    }
                })}
                required
                type="email"
                variant="standard"
                label={t('email')}
                error={errors.email !== undefined}
                helperText={errors.email?.message}
                fullWidth
                margin="dense"/>
            <TextField 
                {...register("password", {
                    required: t("passwordRequireMissing").toString()
                })}
                required
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                variant="standard"
                label={t("password")}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
                fullWidth
                margin="dense" />

            {signInError && (
                <Typography variant="overline" sx={{color: "red", fontWeight: 600}}>
                    {signInError}
                </Typography>
            ) }

            <Button 
                variant="outlined" 
                fullWidth sx={{mt: 2}} 
                color="primary" 
                type="submit">

                {t("signin")}
            </Button>
            
            <Box sx={{mt:2, mb: 1}}>
                <Link href="#" variant="body2">
                    {t("forgotPassword")}
                </Link>
            </Box>

        </Box>

    )
}