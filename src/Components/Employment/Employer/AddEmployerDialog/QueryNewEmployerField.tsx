import { Search } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { ChangeEvent, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next";
import { externalApiRequests } from "../../../../ApiAgent/externalApiRequests";
import { IBrrregEntity } from "../../../../Data/External Request/IBrregEntity"
import { stringFormat } from "../../../../Utils/Misc/stringFormat";
import { LoadBox } from "../../../Misc/LoadBox";

interface IProps {
    setQueryResult: React.Dispatch<SetStateAction<IBrrregEntity | number | undefined>>;
    setOrgNum: React.Dispatch<SetStateAction<string | undefined>>
}

export const QueryNewEmployerField = ({setQueryResult, setOrgNum} :IProps) => {

    const { t } = useTranslation("employment");

    const [fieldInput, setFieldInput] = useState<string>("");
    const [validOrgNum, setValidOrgNum] = useState<boolean>(false);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const handleFieldInput = (event: ChangeEvent<HTMLInputElement>) => {
        
        let value     = event.target.value;         // input value
        const len       = value.length;             // input value length
        const pattern   = /^[0-9.]*$/               // pattern for valid input
        const valid     = pattern.test(value)       // test for valid pattern
        const increment = len > fieldInput.length;  // check if chars added or removed

        // if field is empty, set field and return
        if (len === 0)
        {
            setFieldInput(value)
            return
        }

        // return if max length reached
        if (increment && len > 11) {
            event.target.value = fieldInput;
            return
        }

        // reset to last valid if input not valid
        if (!valid) {
            event.target.value = fieldInput;
            return;
        }

        // disallow dot input from user
        if (increment && value[len - 1] === ".") {
            event.target.value = fieldInput;
            return
        }

        // add dots if treshhold reached
        if (increment && (len === 3 || len === 7)) {
            value += "."
            event.target.value = value;
        }

        // ensure dots for these indexes
        if (increment && (len === 4 || len === 8)) {
            let last = value[len - 1];
            value = value.slice(0,-1)
            value += `.${last}`;
            event.target.value = value;
        }

        // remove dots if treshold reached
        if (!increment && (len === 4 || len === 8)) {
            value = value.slice(0, -1);
            event.target.value = value
        }

        setFieldInput(value)
        setValidOrgNum(len === 11)
    }

    const handleSearch = async() => {
        setApiLoading(true)
        setOrgNum(fieldInput)
        let orgNumStriped = stringFormat.stripOrgNumString(fieldInput)
        var response = await externalApiRequests.brregSearchOrgNum(orgNumStriped)
        setQueryResult(response)
        setApiLoading(false)

    }

    if (apiLoading) return <LoadBox />

    return (
        <Box>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="subtitle2" component="div">
                        {t("searchOrgNumber")}
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <TextField 
                        fullWidth
                        variant="standard"
                        label={t("orgNumber")}  
                        onChange={handleFieldInput} />
                </Grid>
                <Grid item xs={5}>
                    <Button 
                        color="primary"
                        startIcon={<Search />}
                        variant="contained"
                        onClick={handleSearch}
                        disabled={!validOrgNum}>
                            {t("search")}
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="div" sx={{mt:2}}>
                        {t("searhOrgNumberInfo")}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}