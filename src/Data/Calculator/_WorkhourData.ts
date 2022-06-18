import { IWorkhourDataPrimitive } from "./IWorkhourDataPrimitive";
import { IWorkdayRuleset } from "./IWorkhourDataRuleset";

/** Workhour data class, process the raw input data 
 *  and hold detailed workhour information, including overtime */
export class _WorkhourData {

    /** rawdata as stored in database */
    // ruleset: IWorkdayRuleset;

    // hourWage: number;

    // weekendHours: number;
    // eveningHours: number;
    // nightHours: number;
    // holydayHours: number;

    // weekendRate: number;
    // eveningRate: number;
    // nightRate: number;

    // weekendTotal: number;
    // eveningTotal: number;
    // nightTotal: number;


    // workhoursTotal: number;
    // workhourSalary: number;

    // totalSupplement: number;

    

    constructor(primitiveData: IWorkhourDataPrimitive, ruleset: IWorkdayRuleset){

        // this.ruleset = ruleset;     // hold ruleset for calculations

        // this.hourWage       = ruleset.hourWage;

        // this.weekendHours   = this.ruleset.supplementSunday ? this.resolveWeekendHours() : 0;
        // this.eveningHours   = this.resolveEveningHours()
        // this.nightHours     = this.resolveNigthHours()
        // this.holydayHours   = this.resolveHolydayHours()

        // this.weekendRate    = ruleset.supplementSunday ? ruleset.supplementSunday.rate : 0;
        // this.eveningRate    = ruleset.supplementEvening ? ruleset.supplementEvening.rate : 0;
        // this.nightRate      = ruleset.supplementNightRest ? (primitiveData.nightManualLabour ? (ruleset.supplementNightLabour!.rate + ruleset.supplementNightRest.rate) : ruleset.supplementNightRest.rate) : 0

        // this.weekendTotal   = this.resolveRatePerHour(this.weekendHours, this.weekendRate);
        // this.eveningTotal   = this.resolveRatePerHour(this.eveningHours, this.weekendRate);
        // this.nightTotal     = this.resolveRatePerHour(this.nightHours, this.nightRate);

        // this.workhoursTotal = this.resolveWorkHours(primitiveData.start, primitiveData.end)

        // this.workhourSalary = this.resolveRatePerHour(this.workhoursTotal, this.hourWage);

        // this.totalSupplement = this.resolveSupplementTotal();
    }

    private resolveWorkHours = (start: Date, end: Date) => {
        let ms = end.getTime() - start.getTime();
        let hours = ms / 1000 / 60 / 60;
        let rounded = (Math.round(hours * 100)) / 100;
        return rounded;
    }
    
    private resolveRatePerHour = (hours: number, rate: number): number => {
        let sum = hours * rate;
        return (Math.round(sum * 100)) / 100;
    }

    private resolvePercentPerHour = (hours: number, percent: number) => {
        let p = (percent / 100) + 1;
        return hours * p;
    }

    private resolveWeekendHours = (): number => {

        // let saturdayRule = this.convertSuppementToDateObj(this.ruleset.supplementSaturday!)
        // let sundayRule = this.convertSuppementToDateObj(this.ruleset.supplementSunday!)

        // let saturdayHours = this.resolveWeekendSupplementFromRule(saturdayRule, false);
        // let sundayHours = this.resolveWeekendSupplementFromRule(sundayRule, true);

        // return saturdayHours + sundayHours;
        return 0
    }

    private resolveEveningHours = (): number => {
        console.error("DEV :: resolve evening hours not added")
        return 0
    }

    private resolveNigthHours = (): number => {
        console.error("DEV :: resolve night hours not added")
        return 0
    }

    private resolveHolydayHours = (): number => {
        console.error("DEV :: resolve holyday not added")
        return 0
    }

    private resolveHolydayTotal = (): number => {
        console.error("DEV :: holyday total not resolved");
        return 0;
    }

    private resolveSupplementTotal = () => {
        // return this.weekendTotal + this.eveningTotal + this.nightTotal;
    }

    /** Get hours within supplement rule. To be used within methods! 
    private resolveSupplementFromRule = (rule:IWageSupplementDateTime): number => {

        let ruleStartBeforeEnd = rule.start > this.primitive.end;
        let ruleEndBeforeStart = rule.end < this.primitive.start;

        if (ruleStartBeforeEnd || ruleEndBeforeStart) return 0;

        let start = (this.primitive.start >= rule.start) ? this.primitive.start : rule.start;
        let end = (this.primitive.end >= rule.end) ? rule.end : this.primitive.end;

        let hours = (end.getTime() - start.getTime()) / 1000 / 60 / 60
        hours = (Math.round(hours * 100)) / 100;

        console.warn(
            "DEV :: TESTING SUPPLEMENT\n-------------------------n",
            "\nRawData start    : ", this.primitive.start.toString(),
            "\nRule data: start : ", rule.start.toString(),
            "\nSelected         : ", start.toString(), "\n",

            "\nRawData end      : ", this.primitive.end.toString(),
            "\nRule data end    : ", rule.end.toString(),
            "\nSelected         : ", end.toString(), "\n",

            "\nHours calculated : ", hours
        )

        return hours
    }*/

    /** set rule dates forward to closest saturday or sunday before running "resolveSupplementFromRuleMethod". Used for weekend supplement. 
    private resolveWeekendSupplementFromRule = (rule: IWageSupplementDateTime, isSunday: boolean): number => {

        let startRule = rule.start;
        let endRule = rule.end;

        if (isSunday) {
            while (startRule.getDay() !== 0) startRule.setDate(startRule.getDate() + 1)
            while (endRule.getDay() !== 1) endRule.setDate(endRule.getDate() + 1)
        }
        else {
            while (startRule.getDay() !== 6) startRule.setDate(startRule.getDate() + 1)
            while (endRule.getDay() !== 0) endRule.setDate(endRule.getDate() + 1)
        }

        let ruleset: IWageSupplementDateTime = {
            start: startRule,
            end: endRule,
            rate: rule.rate
        }

        return this.resolveSupplementFromRule(ruleset);/*
    } 

    /** converts ISupplement data string to usable Date objects in a IWageSupplementDateTime object 
    private convertSuppementToDateObj = (data: IWageSupplement): IWageSupplementDateTime => {
        let startDateTimeString = `${this.primitive.start.getFullYear()}-${this.primitive.start.getMonth() + 1}-${this.primitive.start.getDate()} ${data.start}`
        let endDateTimeString   = `${this.primitive.start.getFullYear()}-${this.primitive.start.getMonth() + 1}-${this.primitive.start.getDate()} ${data.end}`

        let startDate = new Date(startDateTimeString)
        let endDate = new Date(endDateTimeString)

        if (data.end === "00:00:00") endDate.setDate(endDate.getDate() + 1);


        let res: IWageSupplementDateTime = {
            start: startDate,
            end: endDate,
            rate: data.rate,
        }

        return res;*/
    // }
}