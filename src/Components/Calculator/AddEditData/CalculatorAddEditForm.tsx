import { Box, Button, Checkbox, Divider, FormControlLabel, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { appConfig } from "../../../appConfig";
import { IWorkhourDataPrimitive } from "../../../Data/Calculator/IWorkhourDataPrimitive";
import { IEmploymentContract } from "../../../Data/Employment/IEmploymentContract";
import { calculatorStateActions } from "../../../StoreManagement/Calculator/calculatorStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { resolveDateWithinAppLimit, resolveNoOverlap } from "../../../Utils/CalculatorLib/resolveWorkhourValidation";
import { resolveIsHoliday } from "../../../Utils/DateTimeLib/resolveHolydays";
import { CalculatorContractSelect } from "./CalculatorContractSelect";

// form values
type FormValues = {
    date: string;
    start: string;
    end: string;
    unpaidBreak: number;
    plannedDayOff: boolean;
    manualNightLabour: boolean;
    contract?: IEmploymentContract;
}

/** Form for creating or editing workhour data object */
export const CalculatorAddEditForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FormValues>();

    const { t } = useTranslation("calculator")

    const dispatch = useDispatch()
    const state = useSelector((state: AppState) => state);

    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    // converts form data to workhour primitive data
    const convertFormDataToPrimitive = (data: FormValues): IWorkhourDataPrimitive => {
        
        let start = new Date(`${data.date} ${data.start}`)
        let end = new Date(`${data.date} ${data.end}`)

        if (start > end) end.setDate(end.getDate() + 1)

        // check if start or end date is a holiday
        let isHoliday = (start.getFullYear() === state.calculator.yearSelected) ?
            resolveIsHoliday(start, state.calculator.holidays) :
            resolveIsHoliday(start) ||
            (end.getFullYear() === state.calculator.yearSelected) ?
            resolveIsHoliday(end, state.calculator.holidays) :
            resolveIsHoliday(end)

        let result: IWorkhourDataPrimitive = {
            id: undefined,
            contractId: state.employment.selectedEmploymentContract ? 
                state.employment.selectedEmploymentContract.id : undefined,
            start: start,
            end: end,
            unpaidBreak: data.unpaidBreak,
            plannedDayOff: data.plannedDayOff,
            isHoliday: isHoliday,
            nightManualLabour: data.manualNightLabour
        }

        return result;
    }

    /** handle submit */
    const submit: SubmitHandler<FormValues> = (data) => {

        setErrorMsg("")

        let primitiveData = convertFormDataToPrimitive(data);

        let inDateLimit = resolveDateWithinAppLimit(primitiveData.start);
        if (!inDateLimit) {
            setErrorMsg(t("errorOutsideAppLimit"));
            return;
        }

        let noOverlap = resolveNoOverlap(primitiveData, state.calculator.primitiveData)
        if (!noOverlap) {
            setErrorMsg(t("errorOverlapDate"));
            return;
        }

        console.warn("DEV :: create ruleset")
        console.warn("DEV :: create workhour data object")

        console.warn("DEV :: upload workhour primitive data to WebAPI")
        console.warn("DEV :: get guid from WebAPI and add to data")
        console.warn("DEV :: add workhour data to state")
        



        setApiLoading(true)
        setApiLoading(false)
    }

    const handleClose = () => {
        dispatch(calculatorStateActions.setAddEditDialogOpen(false));
    }

    // handle unpaid break limits when blur
    const handleUnpaidBreakBlur = () => {
        const unpaidBreak = watch("unpaidBreak");
        if (unpaidBreak < 0) setValue("unpaidBreak", 0);
        if (unpaidBreak > 120) setValue("unpaidBreak", 120);
    }

    return (
        <Box 
            component="form"
            noValidate
            autoComplete="false"
            onSubmit={handleSubmit(submit)}>

            {/* date and time input */}
            <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "auto auto", 
                    gridTemplateColumns: "auto auto auto"}}>


                <Typography 
                    variant="overline" 
                    sx={{gridRow:"1", gridColumn:"1", fontWeight:"600", textAlign:"center"}}> 
                    {t("date")} 
                </Typography>

                <Typography 
                    variant="overline" 
                    sx={{gridRow:"1", gridColumn:"2", fontWeight:"600", textAlign:"center"}}> 
                    {t("start")} 
                </Typography>
                
                <Typography 
                    variant="overline" 
                    sx={{gridRow:"1", gridColumn:"3", fontWeight:"600", textAlign:"center"}}> 
                    {t("end")} 
                </Typography>


                <TextField 
                    type="date"
                    InputProps={{
                        inputProps: {
                            min: appConfig.calculatorMinDate,
                            max: appConfig.calculatorMaxDate
                        }
                    }}
                    
                    variant="standard"
                    {...register("date", {required: true})}
                    error={errors.date !== undefined}
                    sx={{gridRow:"2", gridColumn:"1", margin: " 0 10px"}} />

                <TextField 
                    type="time"
                    variant="standard"
                    {...register("start", {required: true})}
                    error={errors.start !== undefined}
                    sx={{gridRow:"2", gridColumn:"2", margin: " 0 10px"}} />

                <TextField 
                    type="time"
                    variant="standard"
                    {...register("end", {required: true})}
                    error={errors.end !== undefined}
                    sx={{gridRow:"2", gridColumn:"3", margin: " 0 10px"}} />
            </Box>

            <Divider sx={{ margin: "20px 0"}} />

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "15px",
            }}>

                <CalculatorContractSelect />

                <TextField 
                    type="number"
                    variant="standard"
                    {...register("unpaidBreak")}
                    label={t("unpaidBreak")}
                    onBlur={handleUnpaidBreakBlur}
                    InputProps={{
                        inputProps: { min: 0, max: 120, step: 5},
                        endAdornment: <InputAdornment position="end">{t("minutes")}</InputAdornment>,
                    }}
                    sx={{width: "200px", textAlign:"right"}} />
                
                <FormControlLabel
                    sx={{width: "200px"}}
                    control={<Checkbox {...register("plannedDayOff")} />}
                    label={t("plannedDayOff").toString()} />
                
                <FormControlLabel
                    sx={{width: "200px"}}
                    control={<Checkbox {...register("manualNightLabour")} />}
                    label={t("manualNightLabour").toString()} />
                
            </Box>

            {errorMsg && (
                <Typography variant="overline" sx={{ color: "red", fontWeight: 600, alignText: "center"}}>
                    {errorMsg}
                </Typography>
            )}

            {/*  submit and cancel buttons */}
            <Box sx={{display:"flex", alignItems: "center", justifyContent: "space-evenly"}}>

                <Button 
                    size="large" 
                    color="success" 
                    type="submit"
                    variant="outlined"> 

                    {t("add")} 
                
                </Button>

                <Button 
                    size="large" 
                    color="error"
                    type="button"
                    variant="outlined"
                    onClick={handleClose}>

                    {t("cancel")} 
                </Button>

            </Box>

        </Box>
    )
}