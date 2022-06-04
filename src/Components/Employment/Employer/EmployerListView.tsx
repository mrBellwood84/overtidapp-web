import { Box, List, ListItem } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { EmployersApiAgent } from "../../../ApiAgent/PublicData/EmployersApiAgent";
import { employmentStateActions } from "../../../StoreManagement/Employment/EmploymentStateActions";
import { AppState } from "../../../StoreManagement/rootStore"
import { EmployerListItem } from "./EmployerListItem";
import { EmployerSearchBar } from "./EmployerSearchBar";

export const EmployerListView = () => {

    const dispatch = useDispatch()
    const employers = useSelector((state :AppState) => state.employment.employersFiltered);
    const dataLoaded = useSelector((state :AppState) => state.employment.employerDataLoaded)
    

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

    },[dispatch, EmployersApiAgent])
    return (
        <Box>
            <List>
                <ListItem>
                    <EmployerSearchBar />
                </ListItem>
                {employers.map(e => (
                    <EmployerListItem key={e.id} employer={e} />
                ))}
            </List>
        </Box>
    )
}