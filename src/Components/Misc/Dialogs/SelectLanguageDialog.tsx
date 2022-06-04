import { Dialog, DialogTitle, List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { miscStateActions } from "../../../StoreManagement/Misc/MiscStateActions";
import { AppState } from "../../../StoreManagement/rootStore";
import i18n from "../../../Utils/Localization/i18nConfig";
import { languageStorageHandler } from "../../../Utils/Localization/languageStorageHandler";
import { ILanguage, languagesSupported } from "../../../Utils/Localization/languageSupport";


/** Dialog for selecting language */
export const LanguageSelectDialog = () => {
    // redux dispatch
    const dispatch = useDispatch();
  
    // translation hook
    const { t } = useTranslation();
  
    // boolean value for open dialog
    const isOpen = useSelector((state: AppState) => state.misc.languageSelectDialogOpen);

    const selected = useSelector((state: AppState) => state.misc.language)
  
    // function for closing modal
    const closeDialog = () => {
      dispatch(miscStateActions.setLanguageSelectDialogOpen(false));
    };
  
    // function for changing language
    const changeLanguage = (language: ILanguage) => {
      i18n.changeLanguage(language.code);
      languageStorageHandler.set(language);
      dispatch(miscStateActions.setLanguage(language.lang));
      closeDialog();
    };
  
    // return component
    return (
      <Dialog 
        maxWidth="xs"
        fullWidth
        onClose={closeDialog} 
        open={isOpen} 
        sx={{ cursor: "default" }}>

        <DialogTitle>{t("selectLanguage")}</DialogTitle>
        <List dense>
          {languagesSupported.map((x) => (
            <ListItemButton 
              key={x.code}
              selected={x.lang === selected}
              onClick={() => changeLanguage(x)}>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText 
              primary={x.lang}
              primaryTypographyProps={{
                variant: "button"
              }} />
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    );
  };
  