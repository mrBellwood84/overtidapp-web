import { IWorkhourDataPrimitive } from "./IWorkhourDataPrimitive";

export class WorkhourData {

    primitive: IWorkhourDataPrimitive

    year: number;
    month: number;
    date: number;
    day: number;

    constructor(data: IWorkhourDataPrimitive) {
        this.primitive  = data;

        this.year   = data.start.getFullYear();
        this.month  = data.start.getMonth();
        this.date   = data.start.getDate();
        this.day    = data.start.getDay();

    }

}