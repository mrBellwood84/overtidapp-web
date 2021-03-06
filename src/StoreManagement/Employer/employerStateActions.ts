import { IEmployerChangeSuggestion } from "../../Data/Employer/IEmployerChangeSuggestion";
import { IEmployerFull } from "../../Data/Employer/IEmployerFull";
import { IEmployerShort } from "../../Data/Employer/IEmployerShort";

/** collection of state actions for employer state */
export const employerStateActions = {

    /** set list of employer full data */
    setFullDataList: (data: IEmployerFull[]) => ({
        type: "EMPLOYERS_SET_FULL_DATA_LIST",
        data: data
    } as const),

    /** set list of search filtered full employer data */
    setFullDataFiltered: (data: IEmployerFull[]) => ({
        type: "EMPLOYERS_SET_FULL_DATA_FILTERED",
        data: data
    } as const),

    /** set list of employer short data */
    setShortDataList: (data: IEmployerShort[]) => ({
        type: "EMPLOYERS_SET_SHORT_DATA_LIST",
        data: data
    } as const),

    /** set list of search filtered short employer data */
    setShortDataFiltered: (data: IEmployerShort[]) => ({
        type: "EMPLOYERS_SET_SHORT_DATA_FILTERED",
        data: data
    } as const),

    /** set list of employer change suggestion data */
    setChangeSuggestions: (data: IEmployerChangeSuggestion[]) => ({
        type: "EMPLOYERS_SET_CHANGE_SUGGESTIONS",
        data: data
    } as const),

    /** set a selected employer data entity for view or edit */
    setSelected: (data: IEmployerFull | undefined) => ({
        type: "EMPLOYER_SET_SELECTED",
        data: data,
    } as const),

    /** reset filtered lists */
    resetFilteredLists: () => ({
        type: "EMPLOYER_RESET_FILTERED_LISTS",
    } as const),

    /**
     * Add employer to dataset.
     * 
     * Also set dataLoaded for all fields to false to ensure db data was downloaded correctly
     * 
     * @param fullInfoData set null if only adding short info data
     * @param shortInfoData set null if only adding long info data
     */
    addNewEmployer: (fullInfoData: IEmployerFull | null, shortInfoData: IEmployerShort | null) => ({
        type: "EMPLOYER_ADD_EMPLOYER_DATA",
        full: fullInfoData,
        short: shortInfoData
    } as const),

    /** Set all download statuses for fields as false to force new api download on next component load */
    resetDownloadStatus: () => ({
        type: "EMPLOYER_RESET_DOWNLOAD_STATUS"
    } as const),

    /** global action for sign out */
    sign_out: () => ({
        type: "SIGN_OUT",
    } as const),

    /** global action for loading state from session */
    loadStateFromSession: () => ({
        type: "LOAD_STATE_FROM_SESSION"
    } as const)


}