import { ArrowCircleLeft } from "@mui/icons-material";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../../StoreManagement/rootStore"
import { EmployerEditForm } from "./Forms/EmployerEditForm";

export const EmployerEditViewAdmin = () => {

    const selected = useSelector((state: AppState) => state.employer.employerSelected);
    
    const { t } = useTranslation("employment")

    const navigate = useNavigate();
    
    const handleNavigateBack = () => {
        navigate("../employers/details");
    }


    return (
        <Container sx={{mt: 2}}>
            {!Boolean(selected) && (<Navigate to="../employers" replace={true} />)} 

            <Box sx={{
                borderBottom: "1px solid lightgrey",
                pb: 1, mb: 2,
                display: "flex",
                alignItems: "center"
            }} >
                <Tooltip title={t("back")}>
                    <IconButton 
                        onClick={handleNavigateBack}
                        sx={{mr: 5}}
                        color="primary">
                        <ArrowCircleLeft />
                    </IconButton>
                </Tooltip>

                <Typography variant="h6" component="div">
                    {t("edit")} {selected?.nameUsed}
                </Typography>

            </Box>

            <EmployerEditForm />

        </Container>
    )
}