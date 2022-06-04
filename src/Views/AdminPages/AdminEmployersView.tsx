import { AddCircle } from "@mui/icons-material";
import { Button, Container, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { EmployersCardView } from "../../Components/Employment/Employer/EmployersCardView";
import { EmployerSearchBar } from "../../Components/Employment/Employer/EmployerSearchBar";
import { employmentStateActions } from "../../StoreManagement/Employment/EmploymentStateActions";

export const AdminEmployersView = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation("employment")
    
    const handleAddEmployer = () => {
        dispatch(employmentStateActions.setAddEmployerDialogOpen(true));
    }

    const handleEditRequest = () => {
        alert("DEV :: feature not added");
        console.error("DEV :: feature not added");
    }

    return (
        <Container sx={{mt: 2}}>
            <Box sx={{display: "flex", ml: 1, mr: 1}}>
                <Box sx={{flexGrow: 1}}>

                    <Tooltip title={t("addEmployer")}>
                        <Button 
                            variant="text"
                            color="primary"
                            onClick={handleAddEmployer}
                            startIcon={<AddCircle fontSize="large"/>}>
                            {t("add")}
                        </Button>
                    </Tooltip>

                    <Tooltip title={t("editRequestsTip")}>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={handleEditRequest}>
                                    {t("editRequests")} DEV :: (0)
                            </Button>
                    </Tooltip>

                </Box>
                <Box sx={{marginLeft: "auto"}}>
                    <EmployerSearchBar />
                </Box>
            </Box>
            <EmployersCardView />
        </Container>
    )
}