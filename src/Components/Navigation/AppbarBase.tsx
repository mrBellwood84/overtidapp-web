import { Close, Menu } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Dialog, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Toolbar, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"
import { ILinkData } from "../../Data/Misc/ILinkData"
import { AppbarAccountBox } from "./AppbarAccountBox"

interface IProps {
    links: ILinkData[]
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AppbarBase = ({links}: IProps) => {

    const { t } = useTranslation()

    const navigate = useNavigate()

    const [menuDialogOpen, setMenuDialogOpen] = useState<boolean>(false)

    const handleMenuDialogOpen = () => setMenuDialogOpen(true)
    const handleMenuDialogClose = () => setMenuDialogOpen(false)

    const handleListButtonClick = (url: string) => {
        handleMenuDialogClose()
        navigate(url)
    }


    return (
        <AppBar position="relative">
            <Container maxWidth="xl">

                {/* Toolbar large screen */}
                <Toolbar disableGutters sx={{display: {xs: 'none', md: "grid", gridTemplateColumns: "max-content auto max-content"}}}>

                    {/* logo / title */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            gridColumn: 1,
                            color: 'inherit',
                            fontWeight:700,
                            letterSpacing: 3,
                            textDecoration: 'none',
                            mr: 2,
                        }}>
                            {t("appTitle")}
                    </Typography>

                    {/* Buttons */}
                    <Box sx={{
                        gridColumn: 2,
                        flexGrow: 1
                    }}>

                    {links.map(link => (
                        <Button 
                            key={`navbar-button-${link.href}`} 
                            href={link.href}
                            sx={{
                                color: "inherit"
                            }}>
                            {t(link.linkText)}
                        </Button>
                    ))}
                </Box>

                <Box sx={{
                    gridColumn: 3,
                    display: "flex"
                }}>
                    <AppbarAccountBox />
                </Box>

            </Toolbar>


                {/* Toolbar small screen */}
                <Toolbar disableGutters sx={{display: {xs: 'grid', md: "none", gridTemplateColumns: "max-content auto max-content"}}}>
                    
                    <IconButton 
                        color={"inherit"} 
                        onClick={handleMenuDialogOpen}
                        sx={{gridColumn: 1}}>
                        <Menu />
                    </IconButton>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gridColumn: 2,
                            color: 'inherit',
                            fontWeight:700,
                            letterSpacing: 3,
                            textDecoration: 'none',
                            mr: 2,
                        }}>
                            {t("appTitle")}
                    </Typography>

                    <Box sx={{
                        gridColumn: 3,
                        display: "flex",
                    }}>
                        <AppbarAccountBox iconOnly={true} />
                    </Box>
                    
                    <Dialog
                        fullScreen
                        open={menuDialogOpen}
                        onClose={handleMenuDialogClose}
                        TransitionComponent={Transition}>
                        
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar variant="dense">
                                <IconButton 
                                    edge="start"
                                    color="inherit"
                                    onClick={handleMenuDialogClose}
                                    aria-label="close">
                                        <Close />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        
                        <List dense>
                            {links.map(link => (
                                <ListItem key={`list-menu-item-${link.href}`}>
                                    <ListItemButton onClick={() => handleListButtonClick(link.href)} dense>
                                        <ListItemIcon>
                                            {link.linkIcon && link.linkIcon}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primaryTypographyProps={{
                                                variant: "button",
                                            }}
                                            sx={{
                                                color: "GrayText"
                                            }}
                                            primary={t(link.linkText)}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            
                        </List>
                    </Dialog>

                </Toolbar>

            </Container>
        </AppBar>
    )
}