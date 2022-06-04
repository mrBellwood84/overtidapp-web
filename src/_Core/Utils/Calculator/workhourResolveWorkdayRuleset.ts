export const x = 0;

// import { ICollectiveAgreement } from "../../../Data/Agreement/ICollectiveAgreement";
// import { ISalaryTable } from "../../../Data/Agreement/ISalaryTable";
// import { ISupplement } from "../../../Data/Agreement/IWageSupplement";
// import { IWorkdayRuleset } from "../../Data/AgreementData/IWorkdayRuleset";
// import { IContractSalary } from "../../Data/IContractSalary";
// import { IEmploymentContract } from "../../Data/IEmploymentContract";
// import { IWorkHourDataRaw } from "../../Data/WorkhourData/IWorkHourDataRaw";


// export const workhourResolveWorkdayRuleset = (
//     workhourRawData: IWorkHourDataRaw,
//     contract: IEmploymentContract,
// ): IWorkdayRuleset => {

//     // true if has collective agreeement
//     const hasColAgree  = contract.employer.collectiveAgreement;
//     // true if has special agreements
//     const hasSpecAgree = contract.employer.specialAgreement.length > 0;


//     // get valid agreement for workday
//     const agreement: ICollectiveAgreement | null = hasColAgree ? 
//         getAgreementToDate(workhourRawData.start, contract.employer.collectiveAgreement!) :
//         null;
    
//     // get valid salaryTable for workday
//     const salaryTable: ISalaryTable | null = hasColAgree ? 
//         getSalaryTableToDate(workhourRawData.start, agreement!.salaryTable) :
//         null;

//     // get wage supplements if any
//     let supplementEvening:      ISupplement | null = salaryTable ? salaryTable.supplementEvening     : null;
//     let supplementSaturday:     ISupplement | null = salaryTable ? salaryTable.supplementSaturday    : null;
//     let supplementSunday:       ISupplement | null = salaryTable ? salaryTable.supplementSunday      : null;
//     let supplementNightRest:    ISupplement | null = salaryTable ? salaryTable.supplementNightRest   : null;
//     let supplementNightLabour:  ISupplement | null = salaryTable ? salaryTable.supplementNightLabour : null;

//     let supplementHolyday: ISupplement = salaryTable ? salaryTable.supplementHolyday : {
//         id: "noid",
//         start: "00:00:00",
//         end: "00:00:00",
//         rate: 40
//     }
//     console.error("DEV :: no agreement holyday supplement hardcoded, must be set with working environment act")

    
//     // create ruleset for calculation
//     const ruleset: IWorkdayRuleset = {

//         hourWage: getSalaryToDate(workhourRawData.start, contract.salary),
        
//         supplementEvening: supplementEvening,
//         supplementSaturday: supplementSaturday,
//         supplementSunday: supplementSunday,
//         supplementNightRest: supplementNightRest,
//         supplementNightLabour: supplementNightLabour,
//         supplementHolyday: supplementHolyday,
//     }


//     return ruleset;
// }


// const getAgreementToDate = (date: Date, agreements: ICollectiveAgreement[]) => {
//     let valid = agreements.filter(x => x.validFrom < date);

//     if (valid.length === 0) {
//         throw new Error("No valid collective agreement found in employment contract")
//     }

//     // return if only one valid
//     if (valid.length === 1) return valid[0];

//     valid = valid.sort((a,b) => {
//         if (a.validFrom > b.validFrom) return -1;
//         else return 1
//     })

//     return valid[0];
// }

// const getSalaryToDate = (date: Date, salary: IContractSalary[]): number => {
//     let valid = salary.filter(x => x.validFrom < date);

//     // return if only one valid
//     if (valid.length === 1) return valid[0].amountPerHour;

//     valid = valid.sort((a,b) => {
//         if (a.validFrom > b.validFrom) return -1;
//         else return 1
//     })

//     return valid[0].amountPerHour;
// }

// const getSalaryTableToDate = (date: Date, salaryTable: ISalaryTable[]) => {
//     let valid = salaryTable.filter(x => x.validFrom < date);

//     // return if only one valid
//     if (valid.length === 1) return valid[0];

//     valid = valid.sort((a,b) => {
//         if (a.validFrom > b.validFrom) return -1;
//         else return 1
//     })

//     return valid[0];
// }