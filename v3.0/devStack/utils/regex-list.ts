/**
 * Regular expressions for input validation.
 */

/** Checks whether the email address is valid. */
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

/** Checks whether the phone number contains valid characters (digits, hyphen, space, dot, hash, star, and plus). */
const phoneRegex = new RegExp(/^[0-9\s\-+.#*]+$/);

/** Checks whether the name contains only letters and a single space between words. */
const nameRegex = new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);

/** Checks whether the field contains only digits. */
const numericRegex = new RegExp(/^[0-9]+$/);

/** Checks whether the field contains letters, numbers, and a single space between words. */
const alphaNumericRegex = new RegExp(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/);

/** Checks whether the field contains a valid variable name (letters, numbers, and underscores, starting with a letter or underscore). */
const variableRegex = new RegExp(/^[a-zA-Z_][a-zA-Z0-9_]*$/);

/** Checks whether the field contains no whitespace. */
const nowhitespaceRegex = new RegExp(/^\S+$/);

/** Checks whether the password meets security requirements:
 *  - Minimum 8 characters
 *  - At least 1 uppercase letter
 *  - At least 1 lowercase letter
 *  - At least 1 digit
 *  - At least 1 special character
 */
const pwdRegex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#@$%^&*-]).{8,}$/);

export {
  emailRegex,
  phoneRegex,
  nameRegex,
  numericRegex,
  alphaNumericRegex,
  variableRegex,
  nowhitespaceRegex,
  pwdRegex,
};
