
export const stringFormat = {
    /** capitalize each word in a string */
    capitalizeEachWord: (str: string) => {
        var result = str.toLowerCase().split(" ").map(w => {
                    return w.charAt(0).toUpperCase() + w.slice(1)
                }).join(" ");
        return result;
    },

    formatOrgNumber: (orgNumString: string) => {
        var result = `${orgNumString.substring(0,3)}.${orgNumString.substring(3,6)}.${orgNumString.substring(6,9)}`
        return result;
    },

    stripOrgNumString: (orgNumString: string) => {
        return `${orgNumString.substring(0,3)}${orgNumString.substring(4,7)}${orgNumString.substring(8,12)}`
    }



}