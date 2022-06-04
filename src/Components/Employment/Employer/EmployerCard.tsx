import { Card, CardContent, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IEmployer } from "../../../Data/Employment/IEmployer"
import { employmentStateActions } from "../../../StoreManagement/Employment/EmploymentStateActions"

interface IProps {
    employer: IEmployer
}

export const EmployerCard = ({employer}: IProps) => {
    
    const { t } = useTranslation("employment")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCardClick = () => {
        dispatch(employmentStateActions.setSelectedEmployer(employer));
        navigate("./details")
    }

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                cursor: "pointer", 
                opacity: 0.7, 
                transition: "0.2s", 
                    ":hover" : {
                opacity: 1,
                }
            }}>

            <CardContent>
                <Typography variant="h6">
                    {employer.name}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.address}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                    {employer.zipCode} {employer.postalArea}
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