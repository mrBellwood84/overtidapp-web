import { Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployersApiAgent } from "../../../ApiAgent/PublicData/EmployersApiAgent";
import { employmentStateActions } from "../../../StoreManagement/Employment/EmploymentStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import { EmployerCard } from "./EmployerCard";
import { EmployerSearchBar } from "./EmployerSearchBar";

export const EmployersCardView = () => {

    const dispatch = useDispatch()
    const employers = useSelector((state: AppState) => state.employment.employersFiltered);
    const dataLoaded = useSelector((state: AppState) => state.employment.employerDataLoaded);

    useEffect(() => {
        // load employers data from web api
        const loadDataFromAPI = async () => {
            // return if data loaded
            if (dataLoaded) return

            let employers = await EmployersApiAgent.getAll()

            if (typeof(employers) === "number") {
                console.error("DEV :: could not fetch employer data from api, statuscode: ", employers);
                return
            }

            dispatch(employmentStateActions.setEmployersAll(employers))
        }
        

        loadDataFromAPI()

    },[dispatch, dataLoaded])


    return (
        <Box sx={{margin: 1}}>

            <Grid container spacing={1}>
                {employers.map(e => (
                    <Grid item key={e.id}>
                        <EmployerCard employer={e} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}