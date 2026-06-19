/** Represents the types of verification code requests.
 * IMPORTANT NOTE: Any changes to this file should be manually synced with the back-end enum.
 */
export enum VerificationCodeRequestTypesEnum {
  /** Request type to create verification code to verify email address, when user creates */
  VerifyEmailAddress = 'VerifyEmailAddress',

  /** Request type to create verification code for Two-Factor Authentication (2FA) */
  TwoFA = 'TwoFA',

  /** Request type to create verification code for resetting a password */
  ResetPwd = 'ResetPwd',

  /** Request type to create verification code for updating a password */
  UpdatePwd = 'UpdatePwd',

  /** Request type to create verification code for unlocking an account */
  UnlockAccount = 'UnlockAccount',
}
