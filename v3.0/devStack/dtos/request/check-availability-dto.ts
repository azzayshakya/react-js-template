/**
 * DTO (Data Transfer Object) to make a request to check the availability of text in a database table.
 * 
 * @remarks
 * This interface defines the structure for the payload used to check if a given text already exists in the database.
 */
export interface CheckAvailabilityDto {
    /** 
     * The text input provided by the user to check availability for.
     */
    userInput: string;
  }
  