import { useEffect } from "react"
import { agreementApiAgent } from "../../ApiAgent/PublicData/agreementApiAgent"

export const DEV_testAgreementView = () => {

    console.log("test")

    useEffect(() => {
        const getAgreements = async () => {
            var colAg = await agreementApiAgent.getCollectiveAgreements()
            var aml = await agreementApiAgent.getAML()

            console.log(colAg)
            console.log(aml)
        }

        getAgreements()
    },[])

    return null
}