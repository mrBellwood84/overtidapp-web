import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
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
export const EmployerFullInfoSearchBar = ({ maxItems }:IProps) => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoList);
    const dispatch = useDispatch();
    const { t } = useTranslation("employment");


    const handleSearchTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        var result = searchEmployers(value.toUpperCase());

        if (Boolean(maxItems)) {
            result = result.slice(maxItems)
        }

        dispatch(employerStateActions.setFullDataFiltered(result));

    }

    const searchEmployers = (value: string) => {
        
        let res: IEmployerFull[] = [];

        employers.forEach(emp => {
            let name = emp.nameUsed.toUpperCase()
            let org = emp.organizationNumber
            let add = emp.addressUsed.toUpperCase()
            let city = emp.postAreaUsed.toUpperCase()
            let reg = emp.regionUsed.toUpperCase()

            let matchName = name.indexOf(value) > -1;
            let matchOrg = org.indexOf(value) > -1;
            let matchAdd = add.indexOf(value) > -1;
            let matchCity = city.indexOf(value) > -1;
            let matchReg = reg.indexOf(value) > -1;

            if ( matchName || matchOrg || matchAdd || matchCity || matchReg ) res.push(emp)
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