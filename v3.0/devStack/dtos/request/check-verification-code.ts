/**
 * DTO (Data Transfer Object) to validate a verification code or OTP.
 *
 * @remarks
 * This interface defines the structure of the request payload to validate a verification code.
 */
export interface CheckVerificationCodeDto {
    /**
     * Primary key of the verification code database record.
     */
    verificationCodeId: string;
  
    /**
     * Email or username of the user for whom the verification code was generated.
     */
    email: string;
  
    /**
     * The purpose for which the code was generated.
     * 
     * Possible values:
     * - `VerifyEmailAddress`
     * - `TwoFA`
     * - `ResetPwd`
     * - `UpdatePwd`
     * - `UnlockAccount`
     */
    requestType: string;
  
    /**
     * The verification code or OTP provided/entered by the user.
     */
    secretCode: string;
  }
  
  export type { CheckVerificationCodeDto };
  