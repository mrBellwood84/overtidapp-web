import { AddCircle } from "@mui/icons-material";
import { Box, Button, Container, Tooltip } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";
import { EmploymentContractList } from "../../Components/Employment/Contracts/EmploymentContractList";

export const UserEmploymentContractsView = () => {


    const { t } = useTranslation("employment");
    
    return (
        <Container sx={{mt: 2}}>

            <Box sx={{display: "flex"}}>
                <Tooltip title={t("addContractTooltip")}>
                    <Button
                        href="../contract/create"
                        variant="text"
                        color="primary"
                        startIcon={<AddCircle fontSize="large" />} >
                            {t("add")}
                    </Button>
                </Tooltip>
            </Box>

            <EmploymentContractList />

        </Container>
    )
}