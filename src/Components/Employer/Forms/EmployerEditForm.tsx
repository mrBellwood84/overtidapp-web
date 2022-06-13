import { RestartAlt } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { employerApiAgent } from "../../../ApiAgent/PublicData/employerApiAgent";
import { IEmployerEditRequestDto } from "../../../Data/Employer/IEmployerEditRequestDto";
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { LoadBox } from "../../Misc/LoadBox";

type FormValues = {
    name: string;
    orgNum: string;
    address: string;
    postArea: string;
    zipCode: string;
    region: string;
    agreeementId?: string;
}

export const EmployerEditForm = () => {

    const selected = useSelector((state: AppState) => state.employer.employerSelected)!
    const changeSuggestions = useSelector((state: AppState) => state.employer.employersChangeSuggestions).filter(x => x.employerId === selected?.id)
    const suggestionsLoaded = useSelector((state: AppState) => state.employer.employerChangeSuggestionLoaded)
    const userName = useSelector((state: AppState) => state.account.account!.userName)

    const dispatch = useDispatch()

    const { t } = useTranslation("employment");

    const navigate = useNavigate();

    const [formErrorMsg, setFormErrorMsg] = useState<string | undefined>(undefined);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const nameSuggestions = changeSuggestions.map(x => {
        if (x.name !== selected.nameUsed) return x.name;
        return undefined
    }).filter(x => x !== undefined)


    const handleNameSuggestSelect = (event: SelectChangeEvent<string>) => setValue("name", event.target.value)
    const handleNameReset = () => setValue("name", selected.nameUsed)
    
    const addressSuggestions = changeSuggestions.map(x => {
        if (x.address !== selected.addressUsed) return x.address;
        return undefined
    }).filter(x => x !== undefined)

    const handleAddressSuggestSelect = (event: SelectChangeEvent<string>) => setValue("address", event.target.value);
    const handleAddressReset = () => setValue("address", selected.addressUsed);

    const postAreaSuggested = changeSuggestions.map(x => {
        if (x.postArea !== selected.postAreaUsed) return x.postArea;
        return undefined
    }).filter(x => x !== undefined)

    const handlePostAreaSuggetSelect = (event: SelectChangeEvent<string>) => setValue("postArea", event.target.value);
    const handlePostAreaReset = () => setValue("postArea", selected.postAreaUsed)

    const zipCodeSuggested = changeSuggestions.map(x => {
        if (x.zipCode !== selected.zipCodeUsed) return x.zipCode;
        return undefined
    }).filter(x => x !== undefined)

    const handleZipcodeSuggestSelect = (event: SelectChangeEvent<string>) => setValue("zipCode", event.target.value);
    const handleZipcodeReset = () => setValue("zipCode", selected.zipCodeUsed)

    const regionSuggested = changeSuggestions.map(x => {
        if (x.region !== selected.regionUsed) return x.region;
        return undefined
    }).filter(x => x !== undefined)

    const handleRegionSuggestSelect = (event: SelectChangeEvent<string>) => setValue("region", event.target.value);
    const handleRegionReset = () => setValue("region", selected.regionUsed);

    const defaultData: FormValues = {
        name: selected.nameUsed,
        orgNum: selected.organizationNumber,
        address: selected.addressUsed,
        postArea: selected.postAreaUsed,
        zipCode: selected.zipCodeUsed,
        region: selected.regionUsed,
        agreeementId: selected.collectiveAgreementId,
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: defaultData
    })

    const orginialStr = (value: string) => {
        return `${t("original")}: ${value}`
    }


    const submit: SubmitHandler<FormValues> = async (data) => {
        setApiLoading(true);
        setFormErrorMsg(undefined)

        const dto: IEmployerEditRequestDto = {
            employerId: selected.id,
            name: data.name,
            organizationNumber: data.orgNum,
            address: data.address,
            postArea: data.postArea,
            zipCode: data.zipCode,
            region: data.zipCode,
            collectiveAgreementId: data.agreeementId,
            editedBy: userName!,
        }

        let response = await employerApiAgent.updateEmployerFromChangeSuggestion(dto);

        if (typeof(response) === "number") {
            console.log(response, ": could not update employer data!");
            setFormErrorMsg(t("serverErrorShort"));
            setApiLoading(false);
            return;
        }

        dispatch(employerStateActions.setSelected(response));
        dispatch(employerStateActions.resetDownloadStatus());

        navigate("../employers/details");
        

        setApiLoading(false)
    }


    useEffect(() => {
        const loadChangeSuggestionsFromAPI =  async () => {
            if (suggestionsLoaded) return

            var data = await employerApiAgent.getChangeSuggestions();

            if (typeof(data) === "number") {
                console.error(data, ": could not download change suggestions from web api")
                return;
            }

            dispatch(employerStateActions.setChangeSuggestions(data));
        }

        loadChangeSuggestionsFromAPI()
    },[dispatch, suggestionsLoaded])

    if (apiLoading) return <LoadBox />

    return (
        <Box 
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submit)}
            sx={{
                display: "grid",
                gridTemplateColumns: "auto max-content max-content",
                gridTemplateRows: "repeat(9, auto)",
                alignItems: "baseline"
            }} >

                <TextField 
                    { ...register("name", {required: t("nameRequiredError")})}
                    variant="standard"
                    label={t("name")}
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : orginialStr(selected.nameUsed)}
                    size="small"
                    fullWidth
                    margin="dense"
                    sx={{
                        gridColumn: 1,
                        gridRow: 1,
                    }} />
                
                <FormControl 
                    sx={{gridColumn: 2, gridRow: 1, pr: 2}}
                    disabled={nameSuggestions.length === 0}
                    fullWidth
                    size="small"
                    margin="dense">
                    <InputLabel 
                        id="name-suggestion-select-label"> {t("nameSuggestions")} </InputLabel>
                    <Select 
                        labelId="name-suggestion-select-label"
                        defaultValue=""
                        onChange={handleNameSuggestSelect}
                        variant="standard" >
                        
                        {nameSuggestions.map(x => (
                            <MenuItem 
                                key={`namesuggestion-${x}`}
                                value={x}
                                >{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip 
                    title={t("reset")}
                    sx={{gridColumn: 3, gridRow: 1, ml:1}} >
                    <IconButton onClick={handleNameReset}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>

                <TextField 
                    { ...register("address", {required: t("adressRequireError")})}
                    variant="standard"
                    label={t("address")}
                    error={Boolean(errors.address)}
                    helperText={errors.address ? errors.address.message : orginialStr(selected.addressUsed)}
                    size="small"
                    fullWidth
                    margin="dense"
                    sx={{
                        gridColumn: 1,
                        gridRow: 2,
                    }} />
                
                <FormControl 
                    sx={{gridColumn: 2, gridRow: 2, pr: 2}}
                    disabled={addressSuggestions.length === 0}
                    fullWidth
                    size="small"
                    margin="dense">
                    <InputLabel 
                        id="address-suggestion-select-label"> {t("addressSuggestions")} </InputLabel>
                    <Select 
                        labelId="address-suggestion-select-label"
                        defaultValue=""
                        onChange={handleAddressSuggestSelect}
                        variant="standard" >
                        
                        {addressSuggestions.map(x => (
                            <MenuItem 
                                key={`addressuggestions-${x}`}
                                value={x}
                                >{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip 
                    title={t("reset")}
                    sx={{gridColumn: 3, gridRow: 2, ml:1}} >
                    <IconButton onClick={handleAddressReset}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>

                <TextField 
                    { ...register("postArea", {required: t("postalAreaRequireError")})}
                    variant="standard"
                    label={t("postalArea")}
                    error={Boolean(errors.postArea)}
                    helperText={errors.postArea ? errors.postArea.message : orginialStr(selected.postAreaUsed)}
                    size="small"
                    fullWidth
                    margin="dense"
                    sx={{
                        gridColumn: 1,
                        gridRow: 3,
                    }} />
                
                <FormControl 
                    sx={{gridColumn: 2, gridRow: 3, pr: 2}}
                    disabled={postAreaSuggested.length === 0}
                    fullWidth
                    size="small"
                    margin="dense">
                    <InputLabel 
                        id="postArea-suggestion-select-label"> {t("postalAreaSuggestions")} </InputLabel>
                    <Select 
                        labelId="postArea-suggestion-select-label"
                        defaultValue=""
                        onChange={handlePostAreaSuggetSelect}
                        variant="standard" >
                        
                        {postAreaSuggested.map(x => (
                            <MenuItem 
                                key={`postareasuggest-${x}`}
                                value={x}
                                >{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip 
                    title={t("reset")}
                    sx={{gridColumn: 3, gridRow: 3, ml:1}} >
                    <IconButton onClick={handlePostAreaReset}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>

                <TextField 
                    { ...register("zipCode", {required: t("zipCodeRequireError")})}
                    variant="standard"
                    label={t("zipcode")}
                    error={Boolean(errors.zipCode)}
                    helperText={errors.zipCode ? errors.zipCode.message : orginialStr(selected.zipCodeUsed)}
                    size="small"
                    fullWidth
                    margin="dense"
                    sx={{
                        gridColumn: 1,
                        gridRow: 4,
                    }} />
                
                <FormControl 
                    sx={{gridColumn: 2, gridRow: 4, pr: 2}}
                    disabled={zipCodeSuggested.length === 0}
                    fullWidth
                    size="small"
                    margin="dense">
                    <InputLabel 
                        id="zipCode-suggestion-select-label"> {t("zipcodeSuggestions")} </InputLabel>
                    <Select 
                        labelId="zipCode-suggestion-select-label"
                        defaultValue=""
                        onChange={handleZipcodeSuggestSelect}
                        variant="standard" >
                        
                        {zipCodeSuggested.map(x => (
                            <MenuItem 
                                key={`zipcodesuggest-${x}`}
                                value={x}
                                >{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Tooltip 
                    title={t("reset")}
                    sx={{gridColumn: 3, gridRow: 4, ml:1}} >
                    <IconButton onClick={handleZipcodeReset}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>

                <TextField 
                    { ...register("region", {required: t("countyRequireError")})}
                    variant="standard"
                    label={t("county")}
                    error={Boolean(errors.region)}
                    helperText={errors.region ? errors.region.message : orginialStr(selected.regionUsed)}
                    size="small"
                    fullWidth
                    margin="dense"
                    sx={{
                        gridColumn: 1,
                        gridRow: 5,
                    }} />
                
                <FormControl 
                    sx={{gridColumn: 2, gridRow: 5, pr: 2}}
                    disabled={regionSuggested.length === 0}
                    fullWidth
                    size="small"
                    margin="dense">
                    <InputLabel 
                        id="region-suggestion-select-label"> {t("countySuggestion")} </InputLabel>
                    <Select 
                        labelId="region-suggestion-select-label"
                        defaultValue=""
                        onChange={handleRegionSuggestSelect}
                        variant="standard" >
                        
                        {regionSuggested.map(x => (
                            <MenuItem 
                                key={`regionsuggest-${x}-${regionSuggested.indexOf(x)}`}
                                value={x}
                                >{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Tooltip 
                    title={t("reset")}
                    sx={{gridColumn: 3, gridRow: 5, ml:1}} >
                    <IconButton onClick={handleRegionReset}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>
                
                <Box sx={{gridRow: 6, gridColumn: "1 / 4"}}>
                    DEV :: change org number?
                </Box>

                <Box sx={{gridRow: 7, gridColumn: "1 / 4"}}>
                    DEV :: set collective agreement
                </Box>
                
                <Button 
                    type="submit"
                    variant="outlined"
                    color="success"
                    size="large"
                    sx={{gridRow: 8, gridColumn: "1 / 4", mt: 2}} >
                        {t("save")}
                </Button>
                
                {Boolean(formErrorMsg) && (
                    <Typography 
                        variant="subtitle2"
                        component="div"
                        color="red"
                        sx={{ gridRow: 9, gridColumn: "1/4" }}>
                        {formErrorMsg}
                    </Typography>
                )}


        </Box>
    )
}