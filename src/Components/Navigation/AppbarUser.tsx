import { AssignmentInd, EventAvailable } from "@mui/icons-material"
import { ILinkData } from "../../Data/Misc/ILinkData"
import { AppbarBase } from "./AppbarBase"

const links: ILinkData[] = [
    {
        linkText: "workhour",
        linkIcon: <EventAvailable />,
        href: "../workhour"
    },
    {
        linkText: "employmentContract",
        linkIcon: <AssignmentInd />,
        href: "../contract"
    }
]

export const AppbarUser = () => {
    return <AppbarBase links={links} />
}