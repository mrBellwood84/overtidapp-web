import { PriorityHigh } from "@mui/icons-material"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IEmployerFull } from "../../../Data/Employer/IEmployerFull"
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions"

interface IProps {
    employer: IEmployerFull,
}

export const EmployerCardAdmin = ({employer}: IProps) => {

    const { t } = useTranslation("employment");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCardClick = () => {
        dispatch(employerStateActions.setSelected(employer))
        navigate("./details")
    }

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                cursor: "pointer",
                opacity: 0.7,
                transition: "0.2s",
                bgcolor: employer.hasChangeRequest ? "#fdd" : "#dfd",
                width: {
                    xs: "80vw",
                    sm: "250px"
                },
                minWidth: "max-content",
                ":hover": { opacity: 1}
            }} >

            <CardHeader 
                title={employer.nameUsed}
                titleTypographyProps={{
                    fontWeight: 500,
                    fontSize: 24,
                    pr: 2
                }}
                action={
                    employer.hasChangeRequest ? <PriorityHigh color="action" /> : null
                }
                sx={{pb: 0}} />

            <CardContent>
                <Typography variant="body2" fontWeight={600}>
                    {employer.addressUsed}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.zipCodeUsed} {employer.postAreaUsed}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.regionUsed}
                </Typography>
                <Typography
                    variant="caption"
                    color="GrayText">
                        {t("orgNumberShort")}: {employer.organizationNumber}
                </Typography>
            </CardContent>
        </Card>
    )
}