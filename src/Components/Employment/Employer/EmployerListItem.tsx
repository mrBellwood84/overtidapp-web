import { ListItem, ListItemText, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { IEmployer } from "../../../Data/Employment/IEmployer"

interface IProps {
    employer: IEmployer
}

export const EmployerListItem = ({employer}: IProps) => {
    const { t } = useTranslation("employment")

    const handleButtonClicked = () => {
        console.warn("DEV :: Employer list button action not added")
    }

    return (
        <ListItem button onClick={handleButtonClicked} >
            <ListItemText primary={employer.name} secondary={`${t("orgNumberShort")}: ${employer.organizationNumber}`}/>

        </ListItem>
    )
}