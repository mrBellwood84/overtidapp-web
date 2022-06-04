import { appConfig } from "../appConfig";
import { tokenStorageHandler } from "../Utils/Misc/tokenStorageHandler";

const getToken = () => tokenStorageHandler.get();
const setSubdomain = (subdomain: string):string => `${appConfig.apiUrl}${subdomain}`

export const rootApiAgent = {

  /** api get request */
  get: async (subdomain: string) => {
    let url = setSubdomain(subdomain);
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: getToken(),
      },
    });
    return response;
  },

  /** api post request */
  post: async (subdomain: string, body: {}) => {
    let url = setSubdomain(subdomain);
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(body),
    });
    return response;
  },

  /** api put request */
  put: async (subdomain: string, body: {}) => {
    let url = setSubdomain(subdomain);
    let response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(body),
    });
    return response;
  },

  /** api delete request */
  delete: async (subdomain: string, body: {}) => {
    let url = setSubdomain(subdomain);
    let response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(body),
    });
    return response;
  },

}
