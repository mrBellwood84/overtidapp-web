import { ILanguage } from "./languageSupport";

/** methods for handling language settings in local storage */
export const languageStorageHandler = {
  // get saved language from local storage storage
  get: (): ILanguage => {
    // extract from storage
    let result = localStorage.getItem("lang");
    // return as object
    return JSON.parse(result!);
  },
  // set language in local storage
  set: (lang: ILanguage) => {
    localStorage.setItem("lang", JSON.stringify(lang));
  },
  // delete selected language from local storage
  delete: () => {
    localStorage.removeItem("lang");
  },
};
