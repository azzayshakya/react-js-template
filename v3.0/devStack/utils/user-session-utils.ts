import {
  DEV_JWT_LS_KEY,
  USER_PREFERENCES_LS_KEY,
  USER_SESSION_LS_KEY,
} from "../constants";

import { UserSessionDto } from "../dtos/response/user-session-dto";
import { UserPreferencesType } from "../types/user-prefrences-types";
import {
  IJwtPayload,
  IUserSessionLS,
  IUserSessionStore,
} from "../types/user-session-types";

import { redirectToLoginUtil } from "../utils/redirect-utils";
import { jwtDecode } from "jwt-decode";

// Function to set user session in local storage
const setUserSessionLocally = (userSession: UserSessionDto): IUserSessionStore => {
  // Decode JWT (considering DEV condition)
  const decodedJwt = jwtDecode<IJwtPayload>(
    import.meta.env.DEV
      ? localStorage.getItem(DEV_JWT_LS_KEY) || ""
      : userSession.accessToken
  );

  // Create user session local storage object
  const userSessionLS: IUserSessionLS = {
    userName: decodedJwt.uname,
    expiresOn: new Date(decodedJwt.exp * 1000),
  };

  // Store user session data in local storage
  localStorage.setItem(USER_SESSION_LS_KEY, JSON.stringify(userSessionLS));

  // Set user preferences locally
  setUserPreferencesLocally();

  // Create roles array
  const roles: string[] =
    decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];

  // Return user session store object
  return {
    email: decodedJwt.uname,
    firstName: userSession.firstName,
    lastName: userSession.lastName,
    userInitials: userSession.userInitials,
    isGE: roles.includes("GE"),
    userRoles: roles,
    expiresOn: new Date(decodedJwt.exp * 1000),
  };
};

// Function to set user preferences in local storage
const setUserPreferencesLocally = (userPreferences?: UserPreferencesType) => {
  // Get existing user preferences
  const oldUserPreferencesLSObj = JSON.parse(
    localStorage.getItem(USER_PREFERENCES_LS_KEY) || "{}"
  ) as UserPreferencesType;

  // If preferences already exist, return
  if (!userPreferences && oldUserPreferencesLSObj) return;

  // Create user preferences object
  const userPreferencesLS: UserPreferencesType = {
    theme: userPreferences?.theme || "light",
    studio: userPreferences?.studio || {
      layoutDirection: "TB",
      miniMap: true,
      undoRedo: true,
      interactivityToggle: true,
      zoomControls: true,
      deleteAlert: true,
    },
  };

  // Store user preferences in local storage
  localStorage.setItem(USER_PREFERENCES_LS_KEY, JSON.stringify(userPreferencesLS));
};

// Function to remove user session from local storage
const removeUserSessionLocally = (redirectToLogin?: boolean) => {
  localStorage.removeItem(USER_SESSION_LS_KEY);

  // Redirect to login page after 2 seconds
  if (redirectToLogin) redirectToLoginUtil();
};

// Function to check if user session is valid
const isUserSessionValid = (): boolean => {
  // Get user session data
  const userSessionLS = JSON.parse(
    localStorage.getItem(USER_SESSION_LS_KEY) || "{}"
  ) as IUserSessionLS;

  // Check if session exists and is valid
  if (!userSessionLS || new Date(userSessionLS.expiresOn) <= new Date()) return false;

  return true;
};

// Function to add seconds to a date
const addSecondsToDate = (date: Date, secondsToAdd: number): Date => {
  // Convert date to seconds and add the offset
  const dateInSeconds = date.getTime() / 1000 + secondsToAdd;

  // Convert back to Date object
  return new Date(dateInSeconds * 1000);
};

// Function to convert local date/time to UTC
const convertDateTimeToUTC = (dateInput: Date): Date => {
  return new Date(dateInput.getTime() + dateInput.getTimezoneOffset() * 60 * 1000);
};

// Export functions
export {
  convertDateTimeToUTC,
  isUserSessionValid,
  removeUserSessionLocally,
  addSecondsToDate,
  setUserSessionLocally,
  setUserPreferencesLocally
};
