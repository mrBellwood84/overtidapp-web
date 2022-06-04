
/** 
 *  Response from signin api request.
 *  Contain user data and token.
 */
export interface ISigninResponse {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
}