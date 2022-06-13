import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IEmployerFull } from "../../../Data/Employer/IEmployerFull";
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../../StoreManagement/rootStore";

interface IProps {
    maxItems?: number
}

/** Search field to set filtered employers list in state */
export const EmployerFullInfoSearchBarAdmin = ({ maxItems }:IProps) => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoList);
    const dispatch = useDispatch();
    const { t } = useTranslation("employment");

    const [queryText, setQueryText] = useState<string>("");
    const [changeRequestOnly, setChangeRequestOnly] = useState<boolean>(false);


    const handleChangeRequestCheck = (event: ChangeEvent<HTMLInputElement>) => {
        
        setChangeRequestOnly(event.target.checked)
        var result = searchEmployers(queryText, event.target.checked)

        if (Boolean(maxItems)) {
            result = result.slice(maxItems)
        }

        dispatch(employerStateActions.setFullDataFiltered(result));
    }


    const handleSearchTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.toUpperCase();
        setQueryText(value)

        var result = searchEmployers(value.toUpperCase(), changeRequestOnly);

        if (Boolean(maxItems)) {
            result = result.slice(maxItems)
        }

        dispatch(employerStateActions.setFullDataFiltered(result));
    }


    const searchEmployers = (value: string, hasChangeRequest: boolean) => {
        
        let result: IEmployerFull[] = [...employers];

        if (hasChangeRequest) result = result.filter(x => x.hasChangeRequest === true);

        result = result.filter(x => {
            let name = x.nameUsed.toUpperCase()
            let org = x.organizationNumber
            let add = x.addressUsed.toUpperCase()
            let city = x.postAreaUsed.toUpperCase()
            let reg = x.regionUsed.toUpperCase()

            let matchName = name.indexOf(value) > -1;
            let matchOrg = org.indexOf(value) > -1;
            let matchAdd = add.indexOf(value) > -1;
            let matchCity = city.indexOf(value) > -1;
            let matchReg = reg.indexOf(value) > -1;

            if ( matchName || matchOrg || matchAdd || matchCity || matchReg ) return x;
            return undefined;
        }).filter(x => x !== undefined)


        return result;
    }


    return (
        <Box sx={{
            display: "flex",
            alignItems: "baseline"
        }}>
            <Typography
                variant="body1"
                sx={{mr:1, fontWeight: 500}} >
                {t("search")}
            </Typography>

            <TextField 
                variant="standard"
                label={t("searchLabel")}
                onChange={handleSearchTextInput} >
            </TextField>

            <FormControlLabel
                sx={{
                    ml: 2,
                }}
                control={<Checkbox onChange={handleChangeRequestCheck}/>} 
                label={t("editRequestOnly")} />

        </Box>
    )
}