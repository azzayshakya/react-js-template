import { jwtDecode } from 'jwt-decode'

import { DEV_JWT_LS_KEY, USER_PREFERENCES_LS_KEY, USER_SESSION_LS_KEY } from '../constants'

import { redirectToLoginUtil } from '../utils/redirect-utils'

// Function to set user session in local storage
const setUserSessionLocally = (userSession) => {
  const decodedJwt = jwtDecode(
    import.meta.env.DEV ? localStorage.getItem(DEV_JWT_LS_KEY) || '' : userSession.accessToken
  )

  const userSessionLS = {
    userName: decodedJwt.uname,
    expiresOn: new Date(decodedJwt.exp * 1000),
  }

  localStorage.setItem(USER_SESSION_LS_KEY, JSON.stringify(userSessionLS))
  setUserPreferencesLocally()

  const roles = decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []

  return {
    email: decodedJwt.uname,
    firstName: userSession.firstName,
    lastName: userSession.lastName,
    userInitials: userSession.userInitials,
    isGE: roles.includes('GE'),
    userRoles: roles,
    expiresOn: new Date(decodedJwt.exp * 1000),
  }
}

const setUserPreferencesLocally = (userPreferences) => {
  const oldUserPreferencesLSObj = JSON.parse(localStorage.getItem(USER_PREFERENCES_LS_KEY) || '{}')

  if (!userPreferences && oldUserPreferencesLSObj?.theme) return

  const userPreferencesLS = {
    theme: userPreferences?.theme || 'light',
    studio: userPreferences?.studio || {
      layoutDirection: 'TB',
      miniMap: true,
      undoRedo: true,
      interactivityToggle: true,
      zoomControls: true,
      deleteAlert: true,
    },
  }

  localStorage.setItem(USER_PREFERENCES_LS_KEY, JSON.stringify(userPreferencesLS))
}

// Function to check if user session is valid
const isUserSessionValid = () => {
  const userSessionLS = JSON.parse(localStorage.getItem(USER_SESSION_LS_KEY) || '{}')

  if (!userSessionLS?.expiresOn || new Date(userSessionLS.expiresOn) <= new Date()) return false

  return true
}

// Function to add seconds to a date
const addSecondsToDate = (date, secondsToAdd) => {
  return new Date(date.getTime() + secondsToAdd * 1000)
}

// Function to convert local date/time to UTC
const convertDateTimeToUTC = (dateInput) => {
  return new Date(dateInput.getTime() + dateInput.getTimezoneOffset() * 60 * 1000)
}

export {
  addSecondsToDate,
  convertDateTimeToUTC,
  isUserSessionValid,
  setUserPreferencesLocally,
  setUserSessionLocally,
}
