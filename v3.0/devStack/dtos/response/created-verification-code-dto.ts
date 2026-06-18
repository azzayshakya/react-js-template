interface CreatedVerificationCodeDto {
    /** Primary key of verification code db record */
    verificationCodeId: string;
  
    /** Email/username of the account who has requested the code */
    email: string;
  
    /** The purpose for which the code will be generated.
     * Options are: VerifyEmailAddress, TwoFA, ResetPwd, UpdatePwd, UnlockAccount
     */
    requestType: string;
  }
  
  export { type CreatedVerificationCodeDto };
  