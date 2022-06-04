import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { collectiveAgreementApiAgent } from "../../ApiAgent/PublicData/collectiveAgreementApiAgent";
import { agreementStateActions } from "../../StoreManagement/Agreements/agreementStateActions";
import { AppState } from "../../StoreManagement/rootStore"

export const DevCollectiveAgreement = () => {

    const agreements = useSelector((state: AppState) => state.agreement.collectiveAgreements)
    const isLoaded = useSelector((state: AppState) => state.agreement.collectiveAgreementsLoaded);
    const dispatch = useDispatch()

    useEffect(() => {
        const loadDataFromApi = async() => {
            if (isLoaded) return

            const data = await collectiveAgreementApiAgent.getAll()

            if (typeof(data) === "number") {
                console.error("DEV :: could not download collective agreements from api")
                return
            }

            dispatch(agreementStateActions.setCollectiveAgreements(data));

        }

        loadDataFromApi();
    }, [dispatch, isLoaded])

    return (
        <div>
            <h4>DEV :: Avtaler / Overenkomster</h4>
            {agreements && agreements.map(x => (
                <div key={x.id}>
                    {x.agreementName}
                </div>
            ))}
        </div>
    )

}