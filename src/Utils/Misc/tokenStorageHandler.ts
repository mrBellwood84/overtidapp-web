/** Collection of methods for handling tokens in storage */
export const tokenStorageHandler = {
    /**
     *  Get token from sessionStorage
     *  Return as bearer for http requests header
     *
     * @param asBearer return as bearer, default is true
     * @returns token
     */
    get: (asBearer: boolean = true): string => {
      let token: string | null = sessionStorage.getItem("token");
      if (!token) return "";
      if (asBearer) return `Bearer ${token}`;
      return token;
    },
  
    /**
     *    Set token in local storage
     *
     * @param token jwt token string
     */
    set: (token: string) => {
      sessionStorage.setItem("token", token);
    },
    /** Removes token from local storage */
    remove: () => sessionStorage.removeItem("token"),
  };
  