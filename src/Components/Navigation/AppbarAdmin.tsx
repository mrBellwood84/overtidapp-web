import { Work } from "@mui/icons-material"
import { ILinkData } from "../../Data/Misc/ILinkData"
import { AppbarBase } from "./AppbarBase"


const links: ILinkData[] = [
    {
        linkText: "employers",
        linkIcon: <Work />,
        href: "../employers"
    }
]

export const AppbarAdmin = () => {
    return <AppbarBase links={links} />
}