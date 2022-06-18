import { IRegisterDto } from "../../Data/Account/IRegisterDto";
import { ISigninDto } from "../../Data/Account/ISigninDto";
import { ISigninResponse } from "../../Data/Account/ISigninResponse";
import { rootApiAgent } from "../rootApiAgent";

const subdomain = "account"
const signinDomain = `${subdomain}/signin`
const registerDomain = `${subdomain}/signup`


export const accountAgent = {

    /** 
     * Sends a sign in request to web api
     * @param signinData request with signin data
     * @returns signin response if successfull, else only responsecode if something went wrong
     */
    signIn: async (signinData: ISigninDto): Promise<ISigninResponse | number> => {
        
        let response = await rootApiAgent.post(signinDomain, signinData);

        if (!response.ok) return response.status;

        let body: ISigninResponse = await response.json();
        return body;
    },

    /**
     * Sends a sign up request to web api
     * @param signupData request data
     * @returns signin response if successful, else responsecode only.
     */
    signUp: async (signupData: IRegisterDto): Promise<ISigninResponse | number> => {

        let response = await rootApiAgent.post(registerDomain, signupData);

        if (!response.ok) return response.status

        let body: ISigninResponse = await response.json()
        return body;
    }
}