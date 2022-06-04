import { WorkhourData } from "./WorkhourData";

/** hold and manage workhour data by month */
export class WorkhourDataMonthly {
    
    //** month for dataset */
    month: number;

    /** array of workhour data opjects */
    data: WorkhourData[];
    
    constructor(month: number) {
        this.month = month;
        this.data = [];
    }

    /** add a single workhour data object to month list */
    AddWorkhourDataSingle(data: WorkhourData) {
        this.data.push(data)
        this.SortDataByDate()
        this.setTotalValues()
    }

    /** sort data objects by dates */
    SortDataByDate() {
        this.data = this.data.sort((a,b) => {
            if (a.primitive.start > b.primitive.start) return -1
            else return 1
        })
    }

    private setTotalValues(){
        console.warn("DEV :: total values not added to class")
    }
    

}