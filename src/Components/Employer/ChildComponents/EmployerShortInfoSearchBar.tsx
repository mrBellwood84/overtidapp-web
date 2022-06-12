import { Box, Typography, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IEmployerShort } from "../../../Data/Employer/IEmployerShort";
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../../StoreManagement/rootStore";

interface IProps {
    maxItems?: number;
}

export const EmployerShortInfoSearchBar = ({maxItems}: IProps) => {

    const employers = useSelector((state: AppState) => state.employer.employersShortInfoList);
    const dispatch = useDispatch();
    const { t } = useTranslation("employment");


    const handleSearchTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        var result = searchEmployers(value.toUpperCase());

        if (Boolean(maxItems)) {
            result = result.slice(maxItems)
        }

        dispatch(employerStateActions.setShortDataFiltered(result));
    }

    const searchEmployers = (value: string) => {
        
        let res: IEmployerShort[] = [];

        employers.map(emp => {
            let name = emp.name.toUpperCase()
            let org = emp.organizationNumber
            let reg = emp.region.toUpperCase()

            let matchName = name.indexOf(value) > -1;
            let matchOrg = org.indexOf(value) > -1;
            let matchReg = reg.indexOf(value) > -1;

            if ( matchName || matchOrg || matchReg ) res.push(emp)
        })

        return res;
    }


    return (
        <Box sx={{
            display: "flex",
            alignItems: "baseline"
        }}>
            <Typography
                variant="body1"
                sx={{mr:1, fontWeight: 400}} >
                {t("search")}
            </Typography>

            <TextField 
                variant="standard"
                label={t("searchLabel")}
                onChange={handleSearchTextInput} >
            </TextField>

        </Box>
    )
}