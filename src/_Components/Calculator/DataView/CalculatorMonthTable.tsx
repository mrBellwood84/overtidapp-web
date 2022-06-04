export const x = 0

// import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux"
// import { globalDayStaticDataArray } from "../../../_Core/Data/DateTime/dayStaticData";
// import { globalMonthStaticDataArray } from "../../../_Core/Data/DateTime/monthStaticData";
// import { WorkhourData } from "../../../_Core/Data/WorkhourData/WorkhourData";
// import { calculatorActions } from "../../../_Core/Store/Calculator/calculatorActions";
// import { AppState } from "../../../_Core/Store/rootStore"

// export const CalculatorMonthTable = () => {
    
//     const { t } = useTranslation(["calculator", "datetime"])
//     const state = useSelector((state: AppState) => state.calculator)
//     const dispatch = useDispatch();

//     const yearIndex = state.workhourData.findIndex(x => x.year === state.selectedYear);
//     const monthData = (yearIndex === -1) ? undefined : state.workhourData[yearIndex].data[state.selectedMonth].data

//     const handleRowClick = (data: WorkhourData) => {
//         dispatch(calculatorActions.setSelectedWorkhourDataCollection([data]));
//     }


//     if (!monthData || monthData.length === 0) {
//         return (
//         <Box sx={{margin: "20px"}}>
//             <Typography 
//                 variant="h6"
//                 component="h6"
//                 color="gray"
//                 sx={{marginBottom: "10px"}}>
//                     {t("noData", {ns: "calculator"})}
//                 </Typography>
//         </Box>)
//     }
    

//     return (
//         <Box sx={{margin: "20px"}}>

//             <Typography 
//                 variant="h6"
//                 component="h6"
//                 color="gray"
//                 sx={{marginBottom: "10px"}}>
//                 {`${t(globalMonthStaticDataArray[state.selectedMonth].i18nTagLong, {ns: "datetime"})}, ${state.selectedYear}`}
//             </Typography>

//             <TableContainer 
//                 component={Paper} >
//                 <Table size="small">

//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="center">{t("date", {ns: "calculator"})}</TableCell>
//                             <TableCell align="center">{t("clockTime", {ns: "calculator"})}</TableCell>
//                             <TableCell align="center">{t("hours", {ns: "calculator"})}</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {monthData.map(x => (

//                             <TableRow 
//                             key={`workhourdata-table-${x.rawData.start.toLocaleString()}`}
//                             onClick={() => handleRowClick(x)}
//                             sx={{
//                                 opacity: "0.7",
//                                 transition: "0.1s",
//                                 cursor: "pointer",
//                                 ":hover": {
//                                     opacity: "1",
//                                     bgcolor: "#eee",
//                                 }
//                             }}>

//                                 <TableCell align="center">
//                                     {`${t(globalDayStaticDataArray[x.day].i18nShortTag, {ns: "datetime"})}, ${x.date}.${x.month < 9 ? "0" : ""}${x.month + 1}`}
//                                 </TableCell>

//                                 <TableCell align="center">
//                                     {`${x.rawData.start.toTimeString().substring(0,5)} - ${x.rawData.end.toTimeString().substring(0,5)}`}
//                                 </TableCell>

//                                 <TableCell align="center">{x.workhoursTotal}</TableCell>

//                             </TableRow>
//                         ))}
//                     </TableBody>

//                 </Table>
//             </TableContainer>
//         </Box>
//     )
// }