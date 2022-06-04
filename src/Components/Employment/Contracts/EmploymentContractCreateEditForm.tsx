import { Box, Container } from "@mui/material"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppState } from "../../../StoreManagement/rootStore";

type FormValues = {
    dateStart: Date,
    expire?: Date,
}



export const EmploymentContractCreateEditForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const selectedContract = useSelector((state: AppState) => state.employment.selectedEmployer);
    const editSelected = useSelector((state: AppState) => state.employment.editSelectedEmploymentContract);
    const dispatch = useDispatch();

    const { t } = useTranslation();



    return <Container sx={{mt: 2}}>
        
        <Box 
            component="form"
            noValidate
            autoComplete="off">

        </Box>


    </Container>
}