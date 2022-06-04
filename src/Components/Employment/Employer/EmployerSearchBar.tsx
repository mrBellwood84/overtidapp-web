import { AddCircle } from "@mui/icons-material";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IEmployer } from "../../../Data/Employment/IEmployer"
import { employmentStateActions } from "../../../StoreManagement/Employment/EmploymentStateActions";
import { AppState } from "../../../StoreManagement/rootStore";

interface IProps {
    showAddButton?: boolean
}

/**
 * Search bar for employers. Work with redux state and can be used as standalone
 */
export const EmployerSearchBar = ({showAddButton = false}: IProps) => {

    const employersAll = useSelector((state: AppState) => state.employment.employersAll);
    const dispatch = useDispatch();
    const { t } = useTranslation("employment");

    const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        const result = searchInEmployers(value.toUpperCase())
        dispatch(employmentStateActions.setEmployersFiltered(result))
    }

    const searchInEmployers = (value: string) => {
        let result: IEmployer[] = []
        employersAll.map(e => {
            let name    = e.name.toUpperCase();
            let orgNum  = e.organizationNumber.toString();
            let city    = e.postalArea.toUpperCase();
            let county  = e.county.toUpperCase();

            let matchName   = name.indexOf(value) > -1;
            let matchOrgNum = orgNum.indexOf(value) > -1;
            let matchCity   = city.indexOf(value) > -1;
            let matchCouny  = county.indexOf(value) > -1;

            if (matchName || matchOrgNum || matchCity || matchCouny) result.push(e)
        })

        return result;
    }

    const handleAddEmployer = () => {
        dispatch(employmentStateActions.setAddEmployerDialogOpen(true))
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "baseline"
            
        }}>
            <Typography 
                variant="body1" 
                sx={{mr: 1, fontWeight: 400}}> 
                {t("search")}:
            </Typography>

            <TextField 
                variant="standard" 
                label={t("searchLabel")} 
                onChange={handleSearchText} />

            {showAddButton && (
                <Tooltip title={t("addEmployer")}>
                    <IconButton color="primary" onClick={handleAddEmployer} size="large">
                        <AddCircle />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    )
}