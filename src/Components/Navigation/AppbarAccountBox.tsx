import { Close, Logout, ManageAccounts, Translate } from "@mui/icons-material"
import { AppBar, Avatar, Box, Dialog, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Slide, Toolbar, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { sign } from "crypto";
import { forwardRef, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { accountStateActions } from "../../StoreManagement/Account/accountStateActions";
import { miscStateActions } from "../../StoreManagement/Misc/MiscStateActions";
import { AppState } from "../../StoreManagement/rootStore";

interface IProps {
    iconOnly?: boolean
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AppbarAccountBox = ({iconOnly = false}: IProps ) => {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const account = useSelector((state: AppState) => state.account.account)

    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const [menuDialogOpen, setMenuDialogOpen] = useState<boolean>(false);
    
    const menuOpen = Boolean(anchorElAccount);
    
    const handleAccountMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorElAccount(event.currentTarget)
    const handleAccountMenuClose = () => setAnchorElAccount(null)

    const handleMenuDialogOpen = () => setMenuDialogOpen(true)
    const handleMenuDialogClose = () => setMenuDialogOpen(false);

    const signOut = () => {
        sessionStorage.clear()
        dispatch(accountStateActions.signOut());
        window.location.replace("/")
    }

    const changeLanguageClick = () => {
        dispatch(miscStateActions.setLanguageSelectDialogOpen(true))
    }
 
    return (
        <Box sx={{flexGrow: 1, display: "flex", alignItems: "center"}}>

            {!iconOnly && (
                <Typography variant="body1" color="inherit" sx={{mr: 1}}>
                    {account && `${account.firstName} ${account.lastName}`}
                </Typography>
            )}

            <IconButton
                onClick={iconOnly ? handleMenuDialogOpen : handleAccountMenuOpen}
                size="small"
                color="inherit"
                aria-controls={menuOpen ? "account-menu" : undefined} 
                aria-expanded={menuOpen ? 'true' : undefined}>

                <Avatar sx={{width: 32, height: 32}}>
                    {account && `${account.firstName[0]}${account.lastName[0]}`}
                </Avatar>

            </IconButton>

            <Menu
                anchorEl={anchorElAccount}
                id="account-menu"
                open={menuOpen}
                onClose={handleAccountMenuClose}
                onClick={handleAccountMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {

                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

                <MenuItem>
                    <ManageAccounts />
                    <Typography variant="subtitle1" component="div" sx={{ml: 1}}>
                        {t("userAccount")}
                    </Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={changeLanguageClick}>
                    <Translate />
                    <Typography variant="subtitle1" component="div" sx={{ml: 1}}>
                        {t("selectLanguage")}
                    </Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={signOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="subtitle1" component="div" sx={{ml: 1}}>
                        {t("signout")}
                    </Typography>
                </MenuItem>
            </Menu>

            <Dialog
                fullScreen
                open={menuDialogOpen}
                onClose={handleMenuDialogOpen}
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

                    <ListItem component={Link} to={"#account"}>
                        <ListItemButton onClick={handleMenuDialogClose} >
                            <ListItemIcon>
                                <ManageAccounts />
                            </ListItemIcon>
                            <ListItemText 
                                primaryTypographyProps={{
                                    variant: "button",
                                }}
                                sx={{
                                    color: "GrayText"
                                }}
                                primary={t("userAccount")}/>
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem component={Link} to={"#account"}>
                        <ListItemButton onClick={() => {
                            handleMenuDialogClose()
                            changeLanguageClick()
                        }} >
                            <ListItemIcon>
                                <Translate />
                            </ListItemIcon>
                            <ListItemText 
                                primaryTypographyProps={{
                                    variant: "button",
                                }}
                                sx={{
                                    color: "GrayText"
                                }}
                                primary={t("selectLanguage")}/>
                        </ListItemButton>
                    </ListItem>

                    <Divider />
                    
                    <ListItem component={Link} to={"#account"}>
                        <ListItemButton onClick={signOut} >
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText 
                                primaryTypographyProps={{
                                    variant: "button",
                                }}
                                sx={{
                                    color: "GrayText"
                                }}
                                primary={t("signout")}/>
                        </ListItemButton>
                    </ListItem>

                </List>
            </Dialog>
            
        </Box>
    )
}