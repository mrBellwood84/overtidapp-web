import { Box, List, ListItem } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { employerApiAgent } from "../../ApiAgent/PublicData/employerApiAgent"
import { employerStateActions } from "../../StoreManagement/Employer/employerStateActions"
import { AppState } from "../../StoreManagement/rootStore"
import { EmployerLitsItem } from "./ChildComponents/EmployerLitsItem"
import { EmployerShortInfoSearchBar } from "./ChildComponents/EmployerShortInfoSearchBar"

/** component for viewing employers short info data in list */
export const EmployerListView = () => {

    const employers = useSelector((state: AppState) => state.employer.employersShortInfoFiltered)
    const dataLoaded = useSelector((state: AppState) => state.employer.employersShortInfoLoaded)
    const dispatch = useDispatch()

    useEffect(() => {
        const loadDataFromAPI = async () => {
            if (dataLoaded) return

            let res = await employerApiAgent.getShortDataList();

            if (typeof(res) === "number") {
                console.error(res, "Could not fetch employer data from api")
                return
            }

            dispatch(employerStateActions.setShortDataList(res));
        }

        loadDataFromAPI()
    },[dispatch, dataLoaded])

    return (
        <List>
            <ListItem>
                <EmployerShortInfoSearchBar />
            </ListItem>

            {employers.map(emp => (
                <EmployerLitsItem key={emp.id} employer={emp} /> 
            ))}
        </List>
    )
}