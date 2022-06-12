/** handle session storage for state */
export const stateStorage = {
    /**
     * Load state data from session storage
     * @param key name of state
     * @returns state object if stored, else undefined
     */
    get: (key: string) => {
        
        let jsonString = sessionStorage.getItem(key);
        
        if (!jsonString) return undefined

        let obj = JSON.parse(jsonString);

        return obj;
    },

    /**
     * Saves state data to session storage.
     * @param key name of state
     * @param state object to be saved.
     */
    set: (key: string, state: {}): void => {

        let jsonString = JSON.stringify(state);

        sessionStorage.setItem(key,jsonString);
    }
}