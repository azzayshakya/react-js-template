interface CreateVerificationCodeDto {
    /** Email/username of the account who is requesting the code */
    email: string;
  
    /** The purpose for which the code will be generated.
     * Options are: Two2FA, VerifyEmailAddress, ResetPwd, UnlockAccount
     */
    requestType: string;
  }
  
  export { type CreateVerificationCodeDto };
  