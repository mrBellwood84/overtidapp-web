import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { employerApiAgent } from "../../../ApiAgent/PublicData/employerApiAgent";
import { appConfig } from "../../../appConfig";
import { IEmployerCreateRequestDto } from "../../../Data/Employer/IEmployerCreateRequestDto";
import { IEmployerShort } from "../../../Data/Employer/IEmployerShort";
import { IBrrregEntity } from "../../../Data/External Request/IBrregEntity";
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { stringFormat } from "../../../Utils/Misc/stringFormat";
import { LoadBox } from "../../Misc/LoadBox";

interface IProps {
    queryResult: IBrrregEntity;
    setQueryResult: React.Dispatch<SetStateAction<IBrrregEntity | number | undefined>>;
}

type FormValues = {
    name: string;
    orgNum: string;
    address: string;
    postArea: string;
    zipCode: string;
    region: string;
    hasAgreement: boolean;
}

export const EmployerAddForm = ({queryResult, setQueryResult}: IProps) => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoList);
    const userName = useSelector((state: AppState) => state.account.account!.firstName);
    const dispatch = useDispatch();

    const { t } = useTranslation("employment");

    const navigate = useNavigate();

    const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>(undefined);
    const [apiLoading, setApiLoading] = useState<boolean>(false);


    const dataFromApiResponse: FormValues = {
        name: stringFormat.capitalizeEachWord(queryResult.navn),
        orgNum: queryResult.organisasjonsnummer,
        address: queryResult.forretningsadresse.adresse.join(" "),
        postArea: queryResult.forretningsadresse.poststed,
        zipCode: queryResult.forretningsadresse.postnummer,
        region: queryResult.forretningsadresse.kommune,
        hasAgreement: false
    }

    const validIndustryCode = appConfig.validIndustryCodes.includes(queryResult.naeringskode1.kode);

    const employerExist = Boolean(employers.find(x => x.organizationNumber === queryResult.organisasjonsnummer))

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({
        defaultValues: dataFromApiResponse
    });

    const submit: SubmitHandler<FormValues> = async (data) => {

        setFormErrorMsg(undefined)
        setApiLoading(true)

        const dto: IEmployerCreateRequestDto = {
            legalData: {
                name: dataFromApiResponse.name,
                organizationNumber: dataFromApiResponse.orgNum,
                address: dataFromApiResponse.address,
                postArea: dataFromApiResponse.postArea,
                zipCode: dataFromApiResponse.zipCode,
                region: dataFromApiResponse.region,
                hasAgreement: false,
                requestedBy: userName
            },
            changeSuggestion: {
                name: data.name,
                organizationNumber: data.orgNum,
                address: data.address,
                postArea: data.postArea,
                zipCode: data.zipCode,
                region: data.region,
                hasAgreement: data.hasAgreement,
                requestedBy: userName
            }
        }

        let response = await employerApiAgent.createNewEmployer(dto);

        if (typeof(response) === "number") {
            console.error("Api request for creating a new employer failed", response)
            setFormErrorMsg(t("serverErrorShort"))
            setApiLoading(false)
            return;
        }

        const shortData: IEmployerShort = {
            id: response.id,
            name: response.nameUsed,
            organizationNumber: response.organizationNumber,
            region: response.regionUsed,
            hasAgreement: Boolean(response.collectiveAgreement),
        }

        dispatch(employerStateActions.addNewEmployer(response, shortData));
        dispatch(employerStateActions.setSelected(response));
        navigate("../employers/details")

        setApiLoading(false)
    }

    if (apiLoading) return <LoadBox />

    return (
        <Box 
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submit)} >
        
            <Grid 
                container 
                spacing={0} 
                justifyContent="center"
                alignItems="center">

                <Grid item xs={12}>
                    <TextField 
                        {...register("name", {required: t("nameRequiredError")})}
                        type="text"
                        variant="standard"
                        label={t("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errors.name.message : `${t("nameLegal")}: ${queryResult.navn}`}
                        size="small"
                        fullWidth
                        disabled={!validIndustryCode || employerExist}
                        margin="dense" />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        { ...register("orgNum")}
                        type="text"
                        variant="standard"
                        label={t("orgNumber")}
                        disabled={true}
                        size="small"
                        fullWidth
                        margin="dense" />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField 
                        { ...register("address", {required: t("adressRequireError")})}
                        variant="standard"
                        label={t("address")}
                        error={Boolean(errors.address)}
                        helperText={errors.address ? errors.address.message : `${t("addressLegal")}: ${dataFromApiResponse.address}`}
                        size="small"
                        fullWidth
                        disabled={!validIndustryCode || employerExist}
                        margin="dense" />
                </Grid>
                
                <Grid item xs={4}>
                    <TextField 
                        { ...register("zipCode", {required: t("zipCodeRequireError")})}
                        type="text"
                        variant="standard"
                        error={Boolean(errors.zipCode)}
                        helperText={errors.zipCode ? errors.zipCode.message : `${t("zipcodeLegal")}: ${dataFromApiResponse.zipCode}`}
                        size="small"
                        fullWidth
                        disabled={!validIndustryCode || employerExist}
                        margin="dense" />
                </Grid>
                
                <Grid item xs={8}>
                    <TextField 
                        { ...register("postArea", {required: t("postalAreaRequireError")})}
                        type="text"
                        variant="standard"
                        error={Boolean(errors.postArea)}
                        helperText={errors.postArea ? errors.postArea.message : `${t("postalAeraLegal")}: ${dataFromApiResponse.postArea}`}
                        size="small"
                        fullWidth
                        disabled={!validIndustryCode || employerExist}
                        margin="dense" />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField 
                        { ...register("region", {required: t("countyRequireError")})}
                        type="text"
                        variant="standard"
                        error={Boolean(errors.region)}
                        helperText={errors.region ? errors.region.message : `${t("countyLegal")}: ${dataFromApiResponse.region}`}
                        size="small"
                        fullWidth
                        disabled={!validIndustryCode || employerExist}
                        margin="dense" />
                </Grid>
                
                <Grid item xs={12}>
                    <Box>
                        <Typography variant="subtitle2" component="div">
                            {t("industryCode")} ${queryResult.naeringskode1.kode}
                        </Typography>
                        <Typography variant="caption" component="div" >
                            {queryResult.naeringskode1.beskrivelse}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        disabled={!validIndustryCode || employerExist}
                        control={<Checkbox { ...register("hasAgreement")} />} 
                        label={t("hasCollectiveAgreement")} />
                </Grid>
                
                {!validIndustryCode && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div" color="red" sx={{mb: 1}}>
                            {t("wrongIndustryCodeError")}
                        </Typography>
                    </Grid>
                )}

                {employerExist && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div" color="red" sx={{mb: 2}}>
                            {t("employerExistError")}
                        </Typography>
                    </Grid>
                )}

                {Boolean(formErrorMsg) && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div" color="red" sx={{mb: 2}}>
                            {formErrorMsg}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={6}>
                    <Button 
                        type="submit"
                        color="primary"
                        variant="outlined"
                        fullWidth 
                        disabled={!validIndustryCode || employerExist}>
                        {t("register")}
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button 
                    type="button"
                    color="error"
                    fullWidth
                    variant="outlined"
                    onClick={() => setQueryResult(undefined)} >
                        {t("remove")}
                    </Button>
                </Grid>

            </Grid>

        </Box>
    )

}
