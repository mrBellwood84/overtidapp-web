import { Language } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { miscStateActions } from "../../StoreManagement/Misc/MiscStateActions";
import { AppState } from "../../StoreManagement/rootStore";
import i18n from "../../Utils/Localization/i18nConfig";
import { languageStorageHandler } from "../../Utils/Localization/languageStorageHandler";
import { ILanguage, languagesSupported } from "../../Utils/Localization/languageSupport";
import { useEffect } from "react";

interface IProps {
    iconOnly?: boolean;
  }
  
  export const LanguageSelectButton = ({ iconOnly = false }: IProps) => {
    // redux dispatch object
    const dispatch = useDispatch();
  
    const { t } = useTranslation();
  
    // get active language from state
    const lang = useSelector((state: AppState) => state.misc.language);
  
    // open language select dialog
    const openLangugeSelectDialog = () => {
      dispatch(miscStateActions.setLanguageSelectDialogOpen(true));
    };
  
    useEffect(() => {
      // get or set selected language for localization
      const setLanguage = () => {
        // get current language from local storage if stored
        let current: ILanguage | null = languageStorageHandler.get();
  
        // if no current language is stored
        if (!current) {
          // get detected language
          let detected = i18n.language;
          console.log(detected);
  
          // if norwegian alternatives, set code to "no"
          if (["nn", "nb"].includes(detected)) detected = "no";
  
          // check if language found is supported
          let supported = languagesSupported.find((x) => x.code === detected);
  
          // set as english if not supported, else as detected
          if (!supported) current = languagesSupported[0];
          else current = supported;
        }
        // change language code for i18next
        i18n.changeLanguage(current.code);
        // set selected language in local storage and state
        languageStorageHandler.set(current);
        dispatch(miscStateActions.setLanguage(current.lang));
      };
  
      // run set language function
      setLanguage();
    }, [dispatch]);
  
    return iconOnly ? (
      <Tooltip title={t("selectLanguage").toString()}>
        <IconButton color="inherit" onClick={openLangugeSelectDialog}>
          <Language />
        </IconButton>
      </Tooltip>
    ) : (
      <Button
        variant="text"
        color="inherit"
        startIcon={<Language />}
        onClick={openLangugeSelectDialog}
      >
        {lang}
      </Button>
    );
  };