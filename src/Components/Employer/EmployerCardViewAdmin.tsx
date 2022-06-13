import { Add } from "@mui/icons-material";
import { Box, Button, Container, Grid, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { employerApiAgent } from "../../ApiAgent/PublicData/employerApiAgent";
import { employerStateActions } from "../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../StoreManagement/rootStore"
import { EmployerCardAdmin } from "./ChildComponents/EmployerCardAdmin";
import { EmployerFullInfoSearchBarAdmin } from "./ChildComponents/EmployerFullInfoSearchBarAdmin";

/** full page for viewing employer cards */
export const EmployerCardViewAdmin = () => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoFiltered);
    const fullDataLoaded = useSelector((state: AppState) => state.employer.employersFullInfoLoaded);
    const suggDataLoaded = useSelector((state: AppState) => state.employer.employerChangeSuggestionLoaded);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { t } = useTranslation("employment")

    const navigateCreate = () => {
        navigate("./create")
    }

    useEffect(() => {
        const loadDataFromAPI = async () => {
            if (fullDataLoaded) return;

            let emp = await employerApiAgent.getFullDataList();

            if (typeof(emp) === "number") {
                console.error(emp, ": could not load employer data from web api")
                return
            }

            dispatch(employerStateActions.setFullDataList(emp))
        }

        const loadSuggestionDataFromAPI = async () => {
            if (suggDataLoaded) return

            var data = await employerApiAgent.getChangeSuggestions()
            
            if (typeof(data) === "number") {
                console.error(data, ": could not load employer change suggestions from web api")
                return;
            }

            dispatch(employerStateActions.setChangeSuggestions(data));
        }

        const resetFilteredList = () => {
            dispatch(employerStateActions.resetFilteredLists());
        }

        loadDataFromAPI();
        loadSuggestionDataFromAPI();
        resetFilteredList();

    }, [dispatch, fullDataLoaded, suggDataLoaded])

    return (
        <Container sx={{mt: 1}}>

            <Box sx={{
                mt: 1, mb: 1,
                display: "flex",
                alignItems: "center"
            }}>
                <EmployerFullInfoSearchBarAdmin />
                
                <Tooltip title={t("addEmployer")}>
                    <Button 
                        sx={{ml: "auto"}}
                        color="primary"
                        size="small"
                        onClick={navigateCreate}
                        startIcon={<Add />}
                        variant="contained"  >
                            {t("add")}
                    </Button>
                </Tooltip>

            </Box>

            <Grid container spacing={1} justifyContent="flex-start">
                {employers.map(emp => (
                    <Grid item key={emp.id}>
                        <EmployerCardAdmin employer={emp} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}