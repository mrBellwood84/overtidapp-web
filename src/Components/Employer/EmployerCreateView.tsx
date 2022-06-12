import { Container } from "@mui/material"
import { useState } from "react"
import { IBrrregEntity } from "../../Data/External Request/IBrregEntity"
import { EmployerPublicRecordQueryField } from "./ChildComponents/EmployerPublicRecordQueryField";


export const EmployerCreateView = () => {


    const [queryResult, setQueryResult] = useState<IBrrregEntity | number | undefined>(undefined);
    const [orgNumber, setOrgNumber] = useState<string | undefined>("");

    return (
        <Container sx={{mt: 1}}>
            
            <EmployerPublicRecordQueryField 
                setQueryResult={setQueryResult} 
                setOrgNum={setOrgNumber} />

            
        </Container>
    )

}