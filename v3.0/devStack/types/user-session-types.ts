interface IUserSessionStore {
    email: string;
    firstName: string;
    lastName: string; // Fixed capitalization inconsistency
    userInitials: string;
    isGE: boolean; // IsGrapesCapitalEmployee flag
    userRoles: string[];
    expireson: Date;
    avatarSrc?: string;
  }
  
  interface IUserSessionLS {
    userName: string;
    expiresOn: Date;
  }
  
  interface IJwtPayload {
    /** JWT audience */
    aud: string;
    
    /** Issuer of JWT */
    iss: string;
    
    /** JWT expires on */
    exp: number;
    
    /** JWT issued on */
    iat: number;
    
    /** JWT ID (optional claim) */
    jti: string;
    
    /** Session ID */
    sid: string;
    
    /** User ID */
    uid: string;
    
    /** Username */
    uname: string;
    
    /** List of user roles */
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
  }
  
  export { type IUserSessionStore, type IUserSessionLS, type IJwtPayload };
  