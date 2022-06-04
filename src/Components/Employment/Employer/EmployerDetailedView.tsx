import { ArrowCircleLeft, ArrowLeft, ArrowLeftOutlined, ArrowRightAlt, Edit } from "@mui/icons-material"
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { AppState } from "../../../StoreManagement/rootStore"

export const EmployerDetailedView = () => {

    const selected = useSelector((state: AppState) => state.employment.selectedEmployer)
    const userRole = useSelector((state: AppState) => state.account.account?.role)
    const { t } = useTranslation("employment")
    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate("../employers/edit")
    }

    const handleNavigateBack = () => {
        navigate(-1)
    }

    return (
        <Container sx={{mt: 2}}>
            {!Boolean(selected) && (<Navigate to="../employers" replace={true} />)}

            <Box sx={{borderBottom: "1px solid lightgrey", pb:1, mb:2, display:"flex", alignItems: "center"}}>

                <Tooltip title={t("back")}>
                    <IconButton onClick={handleNavigateBack} sx={{mr: 5}} color="primary">
                        <ArrowCircleLeft />
                    </IconButton>
                </Tooltip>
                
                <Typography variant="h5">{selected?.name}</Typography>
                {(userRole === "admin") && (
                    <Box sx={{ml: "auto"}}>
                        <Tooltip title={t("editEmployer")}>
                            <IconButton color="primary" onClick={handleEditClick}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>

            <Box sx={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgrey", mb:2, pb: 2}}>

                <Box sx={{pr: 2}}>
                    <Typography variant="subtitle2"> {t("address")} </Typography>
                    <Typography variant="body2" component="div"> {selected?.address} </Typography>
                    <Typography variant="body2" component="div"> {selected?.zipCode} {selected?.postalArea} </Typography>
                    <Typography variant="body2" component="div"> {selected?.county} </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2"> {t("addressJuridical")} </Typography>
                    <Typography variant="body2" component="div"> {selected?.addressOfficial} </Typography>
                    <Typography variant="body2" component="div"> {selected?.zipCodeOfficial} {selected?.postalArea} </Typography>
                    <Typography variant="body2" component="div"> {selected?.countyOfficial} </Typography>
                </Box>

                <Box sx={{pl:2}}>
                    <Box>
                        <Typography variant="subtitle2" component="div"> {t("nameLegal")} </Typography>
                        <Typography variant="body2" component="div"> {selected?.nameOfficial} </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" component="div"> {t("orgNumberShort")} </Typography>
                        <Typography variant="body2" component="div"> {selected?.organizationNumber} </Typography>
                    </Box>
                </Box>

            </Box>

            <Box>
                DEV :: vis tariffavtale her!
            </Box>

        </Container>
    )

}