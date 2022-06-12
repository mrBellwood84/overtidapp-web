import { Card, CardContent, Typography } from "@mui/material"
import { useTransition } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IEmployerFull } from "../../../Data/Employer/IEmployerFull"
import { employerStateActions } from "../../../StoreManagement/Employer/employerStateActions"

interface IProps {
    employer: IEmployerFull,
}

export const EmployerCard = ({employer}: IProps) => {

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
                ":hover": { opacity: 1}
            }} >

            <CardContent>
                <Typography variant="h5">
                    {employer.nameUsed}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.addressUsed}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.zipCodeUsed} {employer.postAreaUsed}
                </Typography>
                <Typography
                    variant="caption"
                    color="GrayText">
                        {t("orgNumberShort")} {employer.organizationNumber}
                </Typography>
            </CardContent>
        </Card>
    )
}