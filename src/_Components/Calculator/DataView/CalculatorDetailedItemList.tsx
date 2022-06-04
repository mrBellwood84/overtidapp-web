export const x = 0;

// import { Box, Typography } from "@mui/material"
// import { useTranslation } from "react-i18next"
// import { useSelector } from "react-redux"
// import { globalDayStaticDataArray } from "../../../_Core/Data/DateTime/dayStaticData"
// import { globalMonthStaticDataArray } from "../../../_Core/Data/DateTime/monthStaticData"
// import { AppState } from "../../../_Core/Store/rootStore"
// import { CalculatorDetailedItem } from "./DataViewComponents/CalculatorDetailedItem"

// export const CalculatorDetailedItemList = () => {

//     const { t } = useTranslation(["calculator", "datetime"]);

//     const state = useSelector((state: AppState) => state.calculator)

//     if (!state.selectedWorkhourDataCollection) {
//         return (
//             <Box>
//                 <Typography 
//                     variant="h6"
//                     component="h6"
//                     color="gray"
//                     sx={{marginBottom: "10px"}}>
//                         {t("noData", {ns: "calculator"})}
//                 </Typography>
//             </Box>
//         )
//     }

//     const firstData = state.selectedWorkhourDataCollection[0]
//     const dateString = `${t(globalDayStaticDataArray[firstData.day].i18nLongTag, {ns: "datetime"})}, ${firstData.date} ${t(globalMonthStaticDataArray[firstData.month].i18nTagLong, {ns: "datetime"})} ${firstData.year}`

//     return (
//         <Box 
//             sx={{
//                 margin: "20px"
//             }}
//         >
//             <Typography 
//                 variant="h6"
//                 component="h6"
//                 color="gray"
//                 sx={{marginBottom: "10px"}}>

//                 {dateString}

//             </Typography>

//             {state.selectedWorkhourDataCollection.map(x => (
//                 <CalculatorDetailedItem key={`workhour-data-detail-listitem-${x.rawData.id}`} data={x} />
//             ))}

//         </Box>
//     )
// }