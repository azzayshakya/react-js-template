/**
 * Custom form message types.
 * 
 * - **None**: No message.
 * - **Gray**: Gray color message.
 * - **Yellow**: Yellow color message with warning icon.
 * - **Red**: Red color error message with cross icon. This is used to set manual form error messages with an icon.
 * - **Green**: Green color message with check icon.
 */
export type CustomMessageType = "None" | "Gray" | "Yellow" | "Red" | "Green";

/**
 * Custom form message type to show messages (which are not errors)
 * in the place of an error message in a form field.
 */
export interface CustomFormMessage {
  type: CustomMessageType;
  message: string;
}
