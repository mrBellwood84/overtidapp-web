/** action collection for miscellanous  */
export const miscStateActions = {

    setLanguage: (language: string) => ({
        type: "SET_LANGUAGE",
        lang: language
    } as const),

    /**
     * set open dialog for language select
     * @param open true if open
     */
    setLanguageSelectDialogOpen: (open: boolean) => ({
        type: "SET_LANGUAGE_SELECT_DIALOG_OPEN",
        open: open
    } as const),

}