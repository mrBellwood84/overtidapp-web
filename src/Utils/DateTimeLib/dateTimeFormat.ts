/** collection of functions to extract the correct date time format for  */
export const dateTimeFormat = {
    
    getDateNowString: () => {
        return new Date(Date.now()).toISOString().split("T")[0];
    }
}