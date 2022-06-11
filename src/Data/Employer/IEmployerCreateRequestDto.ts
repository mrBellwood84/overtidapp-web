import { IEmployerEditSuggestionDto } from "./IEmployerEditSuggestionDto";

/**
 * DTO for creating new employer data object
 * Any user can add an employer with data from public records.
 * Any changes to public data will be added as an edit suggestion,
 * and needs to be approved by an admin
 */
export interface IEmployerCreateRequestDto {
    /** employer data from public records */
    legalData: IEmployerEditSuggestionDto;

    /** suggestion for changing data for place of employment */
    usedData: IEmployerEditSuggestionDto;
}