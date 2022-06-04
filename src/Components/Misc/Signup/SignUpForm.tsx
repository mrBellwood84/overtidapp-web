import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Checkbox, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux";
import { accountAgent } from "../../../ApiAgent/UserData/accountAgent";
import { IAccount } from "../../../Data/Account/IAccount";
import { IRegisterDto } from "../../../Data/Account/IRegisterDto";
import { accountStateActions } from "../../../StoreManagement/Account/accountStateActions";
import { tokenStorageHandler } from "../../../Utils/Misc/tokenStorageHandler";
import { LoadBox } from "../LoadBox";

interface IProps {
    closeDialog: () => void
}

type FormValues = {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    passwordRepeat: string;
    terms: boolean;
}

export const SignUpForm = ({closeDialog}: IProps) => {

    // form hooks
    const {
        register,
        handleSubmit,
        watch,
        formState : { errors }
    } = useForm<FormValues>();

    const dispatch = useDispatch()

    // translation hooks
    const { t } = useTranslation()

    // local hooks
    const [signupErrorMsg, setSignupErrorMsg] = useState<string | undefined>();
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [showPasswords, setShowPasswords] = useState<boolean>(false)

    // toggle show password function
    const toggleShowPassword = () => setShowPasswords(!showPasswords);


    // handle submit
    const submit: SubmitHandler<FormValues> = async (data) => {

        // reset hooks
        setSignupErrorMsg(undefined)
        setApiLoading(true);

        // create dto
        const dto: IRegisterDto = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        }

        // get api response
        let response = await accountAgent.signUp(dto);

        // handle any error responses
        if (typeof(response) === "number") {

            console.error("DEV :: Signup error: ", response);

            switch (response) {
                default:
                    setSignupErrorMsg(t("serverErrorShort"))
                    break;
            }
            setApiLoading(false)
            return
        }

        // create account data object
        let accountData: IAccount = {
            userName: response.userName,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role,
        }

        // store account and token, and set close dialog
        dispatch(accountStateActions.signIn(accountData, true))
        tokenStorageHandler.set(response.token)
        closeDialog();
    }


    if (apiLoading) return <LoadBox />


    return (
        <Box sx={{ml: 4, mr: 4}} component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">

                <Grid item xs={6}>
                    <TextField 
                        { ...register("firstName", {
                            required: t("firstNameRequiredMissing").toString()
                        })}
                        required
                        type="text"
                        variant="standard"
                        label={t("firstName")}
                        error={errors.firstName !== undefined}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="dense" />
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                        { ...register("lastName", {
                            required: t("lastNameRequiredMissing").toString()
                        })}
                        required
                        type="text"
                        variant="standard"
                        label={t("lastName")}
                        error={errors.lastName !== undefined}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="dense" />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        { ...register("email", {
                            required: t("emailRequiredError").toString(),
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: t("emailFormatError").toString()
                            }
                        })}
                        required
                        type="email"
                        variant="standard"
                        label={t("email")}
                        error={errors.email !== undefined}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="dense" />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        {...register("password", {
                            required: t("passwordRequireMissing").toString(),
                            pattern: {
                                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
                                message: t("passwordFormatError")
                            }
                        })}
                        required
                        autoComplete="off"
                        type={showPasswords ? "text" : "password"}
                        variant="standard"
                        label={t("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowPassword}>
                                        {showPasswords ? <VisibilityOff /> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    error={errors.password !== undefined}
                    helperText={errors.password?.message}
                    fullWidth
                    margin="dense" />
                </Grid>

                <Grid item xs={12}>
                <TextField 
                        {...register("passwordRepeat", {
                            required: t("passwordRequireMissing").toString(),
                            validate: (value) => 
                                value === watch("password") ||
                                t("passwordRepeatError").toString()
                        })}
                        required
                        autoComplete="off"
                        type={showPasswords ? "text" : "password"}
                        variant="standard"
                        label={t("passwordRepeat")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowPassword}>
                                        {showPasswords ? <VisibilityOff /> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    error={errors.passwordRepeat !== undefined}
                    helperText={errors.passwordRepeat?.message}
                    fullWidth
                    margin="dense" />
                </Grid>

                <Grid item xs={1}>
                    <Checkbox { ...register("terms")} aria-label="accept terms and conditions"/>
                </Grid>

                <Grid item xs={11}>
                    <Link 
                        sx={{ml: 1, fontWeight: 600}}
                        variant="body2" 
                        onClick={() => alert("terms not added")} >
                        {t("acceptTerms")}
                    </Link>
                </Grid>

                <Grid item xs={12}>
                    <Button 
                        disabled={!watch("terms")}
                        type="submit" 
                        variant="outlined" 
                        color="primary" 
                        fullWidth >
                        {t("signup")}
                    </Button>
                </Grid>

                {signupErrorMsg && (
                    <Grid item xs={12}>
                        <Typography variant="overline" sx={{color:"red", fontWeight: 600}}>
                            {signupErrorMsg}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}