import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { IBrrregEntity } from "../../../../Data/External Request/IBrregEntity"
import { employmentStateActions } from "../../../../StoreManagement/Employment/EmploymentStateActions"
import { AppState } from "../../../../StoreManagement/rootStore"
import { QueryNewEmployerField } from "./QueryNewEmployerField"
import { QueryNewEmployerResult } from "./QueryNewEmployerResult"


export const AddEmployerDialog = () => {

    const dispatch = useDispatch()
    const open = useSelector((state: AppState) => state.employment.addEmployerDialogOpen)
    const { t } = useTranslation("employment")

    const [queryResult, setQueryResult] = useState<IBrrregEntity | number | undefined>(undefined);
    const [orgNumber, setOrgNumber] = useState<string | undefined>(undefined);

    const handleClose = () => {
        dispatch(employmentStateActions.setAddEmployerDialogOpen(false))
    }

    return (
        <Dialog 
            fullWidth
            maxWidth="xs"
            open={open} 
            onClose={handleClose}>

            <DialogTitle>
                {t("addEmployer")}
            </DialogTitle>

            <DialogContent sx={{
                mb: 0,
            }}>
                {!queryResult && <QueryNewEmployerField 
                    setQueryResult={setQueryResult} 
                    setOrgNum={setOrgNumber} />}
                {queryResult && <QueryNewEmployerResult 
                    queryResult={queryResult}
                    orgNum={orgNumber!}
                    closeDialog={handleClose} />}
            </DialogContent>

                <DialogActions>
                    {queryResult && (
                        <Button onClick={() => setQueryResult(undefined)}>
                            {t("back")}
                        </Button>
                    )}
                    <Button onClick={handleClose}>
                        {t("close")}
                    </Button>
                </DialogActions>

        </Dialog>
    )
}