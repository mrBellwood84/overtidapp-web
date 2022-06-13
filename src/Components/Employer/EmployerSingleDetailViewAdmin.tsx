import { ArrowCircleLeft, Delete, Edit } from "@mui/icons-material";
import { Button, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../../StoreManagement/rootStore"

/** full page for viewing employer details */
export const EmployerSingleDetailViewAdmin = () => {
    
    const selected = useSelector((state: AppState) => state.employer.employerSelected);
    const { t } = useTranslation("employment");
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate("../employers");
    }

    const handleEditClick = () => {
        navigate("../employers/edit")
    }

    return (
        <Container sx={{mt: 2}}>
            {!Boolean(selected) && (<Navigate to="../employers" replace={true} /> )}

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
                    {selected?.nameUsed}
                </Typography>

                <Box sx={{ml: "auto"}}>
                    <Button
                        startIcon={<Edit />}
                        onClick={handleEditClick} >
                        {t("edit")}
                    </Button>
                    <Button
                        color="warning"
                        startIcon={<Delete />}
                        onClick={() => console.warn("DEV :: delete function not added")} >

                        {t("delete")}
                    </Button>
                </Box>

            </Box>

            <Box sx={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgrey", mb:2, pb: 2}}>

                <Box sx={{pr: 2}}>
                    <Typography variant="subtitle2"> {t("address")} </Typography>
                    <Typography variant="body2" component="div"> {selected?.addressUsed} </Typography>
                    <Typography variant="body2" component="div"> {selected?.zipCodeUsed} {selected?.postAreaUsed} </Typography>
                    <Typography variant="body2" component="div"> {selected?.regionUsed} </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2"> {t("addressLegal")} </Typography>
                    <Typography variant="body2" component="div"> {selected?.addressLegal} </Typography>
                    <Typography variant="body2" component="div"> {selected?.zipCodeLegal} {selected?.postAreaLegal} </Typography>
                    <Typography variant="body2" component="div"> {selected?.regionLegal} </Typography>
                </Box>

                <Box sx={{pl:2}}>
                    <Box>
                        <Typography variant="subtitle2" component="div"> {t("nameLegal")} </Typography>
                        <Typography variant="body2" component="div"> {selected?.nameLegal} </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" component="div"> {t("orgNumberShort")} </Typography>
                        <Typography variant="body2" component="div"> {selected?.organizationNumber} </Typography>
                    </Box>
                </Box>

            </Box>

        </Container>
    )
}