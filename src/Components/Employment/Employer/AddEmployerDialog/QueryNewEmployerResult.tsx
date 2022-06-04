import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { Fragment, SetStateAction, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { EmployersApiAgent } from "../../../../ApiAgent/PublicData/EmployersApiAgent"
import { appConfig } from "../../../../appConfig"
import { INewEmployerRequest } from "../../../../Data/Employment/INewEmployerRequest"
import { IBrrregEntity } from "../../../../Data/External Request/IBrregEntity"
import { employmentStateActions } from "../../../../StoreManagement/Employment/EmploymentStateActions"
import { AppState } from "../../../../StoreManagement/rootStore"
import { stringFormat } from "../../../../Utils/Misc/stringFormat"
import { LoadBox } from "../../../Misc/LoadBox"

interface IProps {
    queryResult: IBrrregEntity | number;
    orgNum: string;
    closeDialog: React.Dispatch<SetStateAction<boolean>>;
}

type FormValues = {
    name: string;
    legalName: string;
    orgNum: string;
    address: string;
    postalArea: string;
    county: string;
    zipCode: string;
    hasCollectiveAgreement: boolean;
}

export const QueryNewEmployerResult = ({queryResult, orgNum, closeDialog } :IProps) => {

    const queryResultIsNumber = typeof(queryResult) === "number";

    // translation hook
    const { t } = useTranslation("employment")
    const dispatch = useDispatch()
    const employers = useSelector((state: AppState) => state.employment.employersAll);
    const user = useSelector((state: AppState) => state.account.account)

    const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>(undefined);
    const [apiLoading, setApiLoading] = useState<boolean>(false)

    const apiData: FormValues | {} = queryResultIsNumber ? {} : {
        name: stringFormat.capitalizeEachWord(queryResult.navn),
        legalName: queryResult.navn,
        orgNum: stringFormat.formatOrgNumber(queryResult.organisasjonsnummer),
        address: queryResult.forretningsadresse.adresse.join(" "),
        postalArea: queryResult.forretningsadresse.poststed,
        county: queryResult.forretningsadresse.kommune,
        zipCode: queryResult.forretningsadresse.postnummer,
        hasCollectiveAgreement: false,
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: apiData
    })


    const submit: SubmitHandler<FormValues> = async (data) => {

        if (queryResultIsNumber) return; 

        setFormErrorMsg(undefined);
        setApiLoading(true);

        const dto: INewEmployerRequest = {
            name: stringFormat.capitalizeEachWord(queryResult.navn),
            organizationNumber: stringFormat.formatOrgNumber(queryResult.organisasjonsnummer),
            address: queryResult.forretningsadresse.adresse.join(" "),
            postalArea: queryResult.forretningsadresse.poststed,
            zipCode: queryResult.forretningsadresse.postnummer,
            county: queryResult.forretningsadresse.kommune,
            dataSource: appConfig.employerDataSource,
            editRequest: {
                name: data.name,
                organizationNumber: queryResult.organisasjonsnummer,
                address: data.address,
                postalArea: data.postalArea,
                zipCode: data.zipCode,
                county: data.county,
                hasCollectiveAgreement: data.hasCollectiveAgreement,
                requestBy: user!.userName!,
                resolved: false,
            }
        }

        let response = await EmployersApiAgent.postNewEmployer(dto);

        if (typeof(response) === "number") {
            console.error("DEV :: Adding employer error occured, statuscode: ", response)
            switch (response) {
                default:
                    setFormErrorMsg(t("serverErrorShort"))
                    break;
            }

            setApiLoading(false)
            return;
        }

        dispatch(employmentStateActions.addSingleEmployer(response))
        setApiLoading(false)

    }


    // return component here if queryresult is a number
    if (queryResultIsNumber) {
        return (
            <Box sx={{
                display: "flex",
                flexDirection: "column"
                
            }}>
                {queryResult >= 500 && (
                    <Fragment>
                        <Typography variant="subtitle2" sx={{
                            color: "darkred"
                        }}>
                            {t("noBrregContact")}
                        </Typography>
                        <Typography variant="subtitle2" sx={{
                            color: "darkred"
                        }}>
                            {t("tryLater")}
                        </Typography>
                    </Fragment>
                )}

                {queryResult < 500 && (
                    <Fragment>
                        <Typography variant="subtitle2" sx={{
                            color: "darkred"
                        }}>
                            {t("searchOrgNumberNoResult")} {orgNum}
                        </Typography>
                    </Fragment>
                )}

            </Box>
        )
    }

    if (apiLoading) {
        return <LoadBox />
    }

    return (
        <Box 
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submit)} >
            
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                
                <Grid item xs={12}>
                    <TextField { ...register("name", {required: t("nameRequiredError").toString()})}
                        type="text"
                        variant="standard"
                        label={t("name")}
                        error={errors.name !== undefined}
                        helperText={errors.name ? 
                            errors.name.message : 
                            `${t("nameLegal")}: ${queryResult.navn}`}
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField { ...register("orgNum")}
                        type="text"
                        variant="standard"
                        label={t("orgNumber")}
                        disabled={true}
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField { ...register("address", {required: t("adressRequireError").toString()})}
                        type="text"
                        variant="standard"
                        label={t("address")}
                        error={errors.address !== undefined}
                        helperText={errors.address ?
                            errors.address.message : 
                            `${t("addressOfficial")}: ${queryResult.forretningsadresse.adresse.join(" ")}`}
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField { ...register("zipCode", {required: t("zipCodeRequireError")})}
                        type="text"
                        variant="standard"
                        label={t("zipcode")}
                        error={errors.zipCode !== undefined}
                        helperText={errors.zipCode ?
                            errors.zipCode.message : 
                            `${t("zipcodeLegal")}: ${queryResult.forretningsadresse.postnummer}`}                        
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField { ...register("postalArea", {required: t("postalAreaRequireError")})}
                        type="text"
                        variant="standard"
                        label={t("postalArea")}
                        error={errors.postalArea !== undefined}
                        helperText={errors.postalArea ?
                            errors.postalArea.message : 
                            `${t("postalAeraLegal")}: ${queryResult.forretningsadresse.poststed}`}      
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField { ...register("county", {required: t("countyRequireError")})}
                        type="text"
                        variant="standard"
                        label={t("county")}
                        error={errors.county !== undefined}
                        helperText={errors.county ?
                            errors.county.message : 
                            `${t("countyLegal")}: ${queryResult.forretningsadresse.kommune}`}                              
                        size="small"
                        fullWidth
                        margin="dense"/>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{mt: 1, mb: 1}}>
                        <Typography variant="subtitle2" component="div">
                            {t("industryCode")} {queryResult.naeringskode1.kode}
                        </Typography>
                        <Typography variant="caption" component="div">
                            {queryResult.naeringskode1.beskrivelse}
                        </Typography>
                    </Box>
                </Grid>

                {!(appConfig.validIndustryCodes.includes(queryResult.naeringskode1.kode)) && (
                    <Grid item xs={12}>
                        <Typography variant="caption" component="div" color="red">
                            {t("wrongIndustryCodeError")}
                        </Typography>
                    </Grid>
                )}

                {(Boolean(employers.find(x => x.organizationNumber === queryResult.organisasjonsnummer))) && (
                    <Grid item xs={12}>
                        <Typography variant="caption" component="div" color="red">
                            {t("employerExistError")}
                        </Typography>
                    </Grid>
                )}

                {   (appConfig.validIndustryCodes.includes(queryResult.naeringskode1.kode)) &&
                    !(Boolean(employers.find(x => x.organizationNumber === queryResult.organisasjonsnummer))) && (
                    
                        <Fragment>
                    <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox {...register("hasCollectiveAgreement")} />} label={t("hasCollectiveAgreement")} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" color="primary" variant="outlined" fullWidth sx={{mt: 1}}>
                            {t("register")}
                        </Button>
                    </Grid>

                    </Fragment>
                )}

            </Grid>

        </Box>
    )
}