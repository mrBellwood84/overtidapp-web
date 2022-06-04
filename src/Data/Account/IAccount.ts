/**
 *  Contain user information.
 *  
 *  Note that this interface is used as WebAPI DTO
 */
export interface IAccount {

    /** Id for database entity. Id provided only by API response */
    userName?: string;

    /** User firstname */
    firstName: string;

    /** User lastname */
    lastName: string;

    /** User email adress */
    email: string;

    /** User role in application */
    role: string;
}