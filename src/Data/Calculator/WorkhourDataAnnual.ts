import { WorkhourData } from "./WorkhourData";
import { WorkhourDataMonthly } from "./WorkhourDataMonthly";


/** hold and manage workhour data for annual dataset */
export class WorkhourDataAnual {

    /** hold year for data collection */
    year: number;

    /** hold id of employment contract */
    contractId?: string;

    /** hold detailed workhour data sorted by month */
    dataSorted: WorkhourDataMonthly[];


    constructor(year: number, contractId: string | undefined){
        this.year = year;
        this.contractId = contractId;
        this.dataSorted = [];

        for (let i = 0; i < 12; i++) {
            this.dataSorted.push(new WorkhourDataMonthly(i));
        }
    }

    /** add a single workhour data object to dataset */
    AddWorkhourDataSingle(data: WorkhourData) {
        
        if (data.month !== this.dataSorted[data.month].month) this.sortDetailedData();
        this.dataSorted[data.month].AddWorkhourDataSingle(data);

        this.setTotalValues()
    }

    /** sort months my month */
    private sortDetailedData() {
        this.dataSorted = this.dataSorted.sort((a,b) => {
            if (a.month > b.month) return -1;
            return 1
        })
    }

    private setTotalValues(){
        console.warn("DEV :: total values in annual data not added")
    }
}