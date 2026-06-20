import { jwtDecode } from 'jwt-decode'

import { StorageKeyEnum } from '../enums/storage-key-enums'

const setUserSessionLocally = (userSession) => {
  const decodedJwt = jwtDecode(
    import.meta.env.DEV
      ? localStorage.getItem(StorageKeyEnum.DEV_JWT) || ''
      : userSession.accessToken
  )

  const userSessionToSave = {
    userName: decodedJwt.uname,
    expiresOn: new Date(decodedJwt.exp * 1000),
  }

  localStorage.setItem(StorageKeyEnum.USER_PREFERENCES, JSON.stringify(userSessionToSave))
  setUserPreferencesLocally()

  return {
    email: decodedJwt.uname,
    firstName: userSession.firstName,
    lastName: userSession.lastName,
    expiresOn: new Date(decodedJwt.exp * 1000),
  }
}

const setUserPreferencesLocally = (userPreferences) => {
  const oldUserPreferencesLSObj = JSON.parse(
    localStorage.getItem(StorageKeyEnum.USER_SESSION) || '{}'
  )

  if (!userPreferences && oldUserPreferencesLSObj?.theme) return

  const userPreferencesLS = {
    theme: userPreferences?.theme || 'light',
  }

  localStorage.setItem(StorageKeyEnum.USER_PREFERENCES, JSON.stringify(userPreferencesLS))
}

const isUserSessionValid = () => {
  const userSessionLS = JSON.parse(localStorage.getItem(StorageKeyEnum.USER_SESSION) || '{}')

  if (!userSessionLS?.expiresOn || new Date(userSessionLS.expiresOn) <= new Date()) return false

  return true
}

export { isUserSessionValid, setUserPreferencesLocally, setUserSessionLocally }
