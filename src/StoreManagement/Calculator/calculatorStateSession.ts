import { ICalculatorState } from "./ICalculatorState";

const keyword = "calculatorState"

/** get and set calculator state to session storage */
export const calculatorStateSession = {

    /**
     *  Get calculator state from session storage
     * 
     *  @returns state if data exist, else undefined
     */
    get: (): ICalculatorState | undefined => {

        // try getting data from session storage
        let str = sessionStorage.getItem(keyword);
        if (!str) return undefined

        // try parsing data from json string
        try {
            let state: ICalculatorState = JSON.parse(str);
            return state;
        }
        catch {
            return undefined
        }
    },

    /**
     *  Set calculator state to session
     * 
     *  @param state agreement state
     */
     set: (state: ICalculatorState): void => {
        let str = JSON.stringify(state)
        sessionStorage.setItem(keyword, str);
    }
}