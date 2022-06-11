import { Title } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppState } from "../../../StoreManagement/rootStore";
import { EmployerListView } from "../Employer/EmployerListView";

type FormValues = {
    title: string;
    dateStart: Date;
    expire: Date;
}

export const EmploymentContractCreateEditForm = () => {

    const selectedContract = useSelector((state: AppState) => state.employment.selectedEmployer);
    const editSelected = useSelector((state: AppState) => state.employment.editSelectedEmploymentContract);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();


    const createNew: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return <Container sx={{mt: 2}}>
        
        <Box 
            component="form"
            sx={{
                mt: 2,
                display: "flex",
                justifyContent:"center"
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(createNew)}>

            <Grid 
                container 
                width="fit-content"
                spacing={1}
                justifyContent="center"
                alignItems="center" >

                <Grid item xs={12}>
                    <Typography variant="h6" component="div">
                        DEV :: opprett arbeidsavtale
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <EmployerListView />
                </Grid>

                <Grid item xs={12}>
                    <div>DEV :: title</div>
                </Grid>

                <Grid item xs={6}>
                    <div>dev :: start</div>
                </Grid>

                <Grid item xs={6}>
                    <div>Dev :: end</div>
                </Grid>

                <Grid item xs={12}>
                    <div>DEV :: Lagre / Avbryt</div>
                </Grid>
                
            </Grid>
            
        </Box>


    </Container>
}