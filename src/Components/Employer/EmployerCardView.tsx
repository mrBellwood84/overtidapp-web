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
import { EmployerCard } from "./ChildComponents/EmployerCard";
import { EmployerFullInfoSearchBar } from "./ChildComponents/EmployerFullInfoSearchBar";

/** full page for viewing employer cards */
export const EmployerCardView = () => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoFiltered);
    const dataLoaded = useSelector((state: AppState) => state.employer.employersFullInfoLoaded);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { t } = useTranslation("employment")

    const navigateCreate = () => {
        navigate("./create")
    }

    useEffect(() => {
        const loadDataFromAPI = async () => {
            if (dataLoaded) return;

            let emp = await employerApiAgent.getFullDataList();

            if (typeof(emp) === "number") {
                console.error(emp, "Could not load employer data from web api")
                return
            }

            dispatch(employerStateActions.setFullDataList(emp))
        }

        const resetFilteredList = () => {
            dispatch(employerStateActions.resetFilteredLists());
        }

        loadDataFromAPI()
        resetFilteredList()

    }, [dispatch, dataLoaded])

    return (
        <Container sx={{mt: 1}}>

            <Box sx={{
                mt: 1, mb: 1,
                display: "flex",
                alignItems: "center"
            }}>
                <EmployerFullInfoSearchBar />
                
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

            <Grid container spacing={1} justifyContent="space-between">
                {employers.map(emp => (
                    <Grid item key={emp.id}>
                        <EmployerCard employer={emp} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}