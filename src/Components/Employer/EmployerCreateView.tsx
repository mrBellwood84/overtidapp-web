import { ArrowCircleLeft } from "@mui/icons-material";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IBrrregEntity } from "../../Data/External Request/IBrregEntity"
import { EmployerPublicRecordQueryField } from "./ChildComponents/EmployerPublicRecordQueryField";
import { EmployerAddForm } from "./Forms/EmployerAddForm";


export const EmployerCreateView = () => {


    const { t } = useTranslation("employment");
    const navigate = useNavigate();

    const [queryResult, setQueryResult] = useState<IBrrregEntity | number | undefined>(undefined);
    const [orgNumber, setOrgNumber] = useState<string | undefined>("");


    const handleNavigateBack = () => {
        navigate("../employers");
    }

    return (
        <Container sx={{
            mt: 2
        }} >

            <Box sx={{
                mb:2, pb: 1,
                display: "flex", 
                alignItems: "center", 
                borderBottom: "1px solid lightgrey"
            }}>
                <Tooltip title={t("back")}>
                    <IconButton 
                        onClick={handleNavigateBack}
                        sx={{mr: 5}}
                        color="primary">
                        <ArrowCircleLeft />
                    </IconButton>
                </Tooltip>

                <Typography variant="h6" component="div">
                    {t("addEmployer")}
                </Typography>
            </Box>
            
            {typeof(queryResult) !== "object"  && (
                <EmployerPublicRecordQueryField 
                    setQueryResult={setQueryResult} 
                    setOrgNum={setOrgNumber} />
            )}

            {typeof(queryResult) === "number" && (
                <Typography variant="subtitle1" component="div" color="red" sx={{textAlign: "center", mt:2}}>
                    {t("searchOrgNumberNoResult")} : <b>{orgNumber}</b>
                </Typography>
            )}

            {typeof(queryResult) === "object" && (
                <EmployerAddForm queryResult={queryResult} setQueryResult={setQueryResult} />
            )} 


            
        </Container>
    )

}