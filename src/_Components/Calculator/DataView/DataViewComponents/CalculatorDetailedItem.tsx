export const x = 0;

// import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material"
// import { useTranslation } from "react-i18next";
// import { WorkhourData } from "../../../../_Core/Data/WorkhourData/WorkhourData"

// interface IProps {
//     data: WorkhourData;
// }

// export const CalculatorDetailedItem = ({data}: IProps) => 
// {

//     const { t } = useTranslation("calculator")

//     return (
//         <Box sx={{
//             marginTop: "10px",
//             marginBottom: "10px"

//         }}>
//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
                        
//                         <TableCell>{t("start")}</TableCell>
//                         <TableCell>{t("end")}</TableCell>
//                         <TableCell>{t("hours")}</TableCell>
//                         <TableCell>{t("rate")}</TableCell>
//                         <TableCell>{t("total")}</TableCell>

//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow>

//                         <TableCell>
//                             {data.rawData.start.toTimeString().substring(0,5)}
//                         </TableCell>

//                         <TableCell>
//                             {data.rawData.end.toTimeString().substring(0,5)}
//                         </TableCell>

//                         <TableCell>
//                             {data.workhoursTotal}
//                         </TableCell>

//                         <TableCell>
//                             {`${data.hourWage} kr`}
//                         </TableCell>

//                         <TableCell>
//                             {`${data.workhourSalary} kr`}
//                         </TableCell>

//                     </TableRow>
//                 </TableBody>
//             </Table>

//             <Table size="small">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell></TableCell>
//                         <TableCell>{t("hours")}</TableCell>
//                         <TableCell>{t("rate")}</TableCell>
//                         <TableCell>{t("total")}</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>

//                     <TableRow>
//                         <TableCell>{t("weekendSupplement")}</TableCell>
//                         <TableCell>{data.weekendHours}</TableCell>
//                         <TableCell>{`${data.weekendRate} kr`}</TableCell>
//                         <TableCell>{`${data.weekendTotal} kr`}</TableCell>
//                     </TableRow>

//                     <TableRow>
//                         <TableCell>{t("eveningSupplement")}</TableCell>
//                         <TableCell>{data.eveningHours}</TableCell>
//                         <TableCell>{`${data.eveningRate} kr`}</TableCell>
//                         <TableCell>{`${data.eveningTotal} kr`}</TableCell>                    
//                     </TableRow>

//                     <TableRow>
//                         <TableCell>{t("nightSupplement")}</TableCell>
//                         <TableCell>{data.nightHours}</TableCell>
//                         <TableCell>{`${data.nightRate} kr`}</TableCell>
//                         <TableCell>{`${data.nightTotal} kr`}</TableCell>                    
//                     </TableRow>

//                     <TableRow>
//                         <TableCell>{t("holydaySupplement")}</TableCell>
//                         <TableCell>{data.holydayHours}</TableCell>
//                         <TableCell>{`${data.holydayRate} %`}</TableCell>
//                         <TableCell>{`${data.holydayTotal} kr`}</TableCell>                    
//                     </TableRow>

//                 </TableBody>

//                 <TableFooter>
//                     <TableRow>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                         <TableCell align="right">{`${t("supplementTotal")}:`}</TableCell>
//                         <TableCell>0 kr</TableCell>
//                     </TableRow>
//                 </TableFooter>

//             </Table>

//             overtid? <br />
//             årsak:text <br />
//             timer  prosent - total tillegg <br />

//             total lønn 
//         </Box>
//     )
// }