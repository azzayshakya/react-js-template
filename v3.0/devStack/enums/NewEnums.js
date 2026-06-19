// ── User Roles ───────────────────────────────────────────────
export const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  TESTER: 'TESTER',
})

// ── HTTP Status Codes ────────────────────────────────────────
export const HttpStatus = Object.freeze({
  // 2xx Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // 3xx Redirection
  NOT_MODIFIED: 304,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
})

// ── Local Storage Keys ───────────────────────────────────────
export const StorageKey = Object.freeze({
  USER_SESSION: 'user_session',
  USER_PREFERENCES: 'user_preferences',
  DEV_JWT: 'dev_jwt',
})

// ── Verification Code Types ──────────────────────────────────
export const VerificationCodeType = Object.freeze({
  RESET_PASSWORD: 'ResetPwd',
  EMAIL_VERIFICATION: 'EmailVerification',
  TWO_FACTOR_AUTH: '2FA',
  ACCOUNT_DELETION: 'AccountDeletion',
})

// ── Theme ────────────────────────────────────────────────────
export const Theme = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system', // follows OS preference
})
