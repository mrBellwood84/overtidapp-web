import { ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next"
import { IEmployerShort } from "../../../Data/Employer/IEmployerShort"

interface IProps {
    employer: IEmployerShort
}

export const EmployerLitsItem = ({employer}: IProps) => {
    const { t } = useTranslation("employment");
    
    const handleItemClick = () => {
        console.warn("DEV :: Employer list item click not resolved yet")
    }

    return (
        <ListItem button onClick={handleItemClick}>
            <ListItemText primary={employer.name} secondary={employer.region}></ListItemText>
        </ListItem>
    )
}