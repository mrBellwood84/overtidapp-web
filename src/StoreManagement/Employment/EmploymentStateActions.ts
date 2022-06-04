import { IEmployer } from "../../Data/Employment/IEmployer";

export const employmentStateActions = {
    setEmployersAll: (employers: IEmployer[]) => ({
        type: "SET_EMPLOYERS_ALL",
        data: employers,
    } as const ),

    setEmployersFiltered: (employers: IEmployer[]) => ({
        type: "SET_EMPLOYERS_FILTERED",
        data: employers
    } as const),

    addSingleEmployer: (employer: IEmployer) => ({
        type: "ADD_SINGLE_EMPLOYER",
        data: employer,
    } as const),

    replaceSingleEmployer: (employer: IEmployer) => ({
        type: "REPLACE_SINGLE_EMPLOYER",
        data: employer
    } as const),

    removeSingleEmployer: (id: string) => ({
        type: "REMOVE_SINGLE_EMPLOYER",
        id: id
    } as const),

    setSelectedEmployer: (employer: IEmployer) => ({
        type: "SET_SELECTED_EMPLOYER",
        employer: employer
    } as const),

    setAddEmployerDialogOpen: (open: boolean) => ({
        type: "SET_ADD_EMPLOYER_DIALOG_OPEN",
        open: open,
    } as const),

    signOut: () => ({
        type: "SIGN_OUT"
    } as const),

    loadStateFromSession: () => ({
        type: "LOAD_STATE_FROM_SESSION"
    } as const),
}