import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { employerApiAgent } from "../../ApiAgent/PublicData/employerApiAgent";
import { employerStateActions } from "../../StoreManagement/Employer/employerStateActions";
import { AppState } from "../../StoreManagement/rootStore"
import { EmployerCard } from "./ChildComponents/EmployerCard";

/** full page for viewing employer cards */
export const EmployerCardView = () => {

    const employers = useSelector((state: AppState) => state.employer.employersFullInfoFiltered);
    const dataLoaded = useSelector((state: AppState) => state.employer.employersFullInfoLoaded);
    const dispatch = useDispatch();

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

        loadDataFromAPI()
    }, [dispatch, dataLoaded])

    return (
        <Container sx={{mt: 1}}>
            <Grid container spacing={2}>
                {employers.map(emp => (
                    <Grid item key={emp.id}>
                        <EmployerCard employer={emp} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}