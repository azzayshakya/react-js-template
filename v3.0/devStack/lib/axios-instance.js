import axios from 'axios'
import { toast } from 'sonner'

import { refreshSession } from '../apis/accounts-me-apis'
import { DEV_JWT_LS_KEY, REQUEST_TIMEOUT } from '../constants'
import { sleep } from '../utils/sleep-util'
import { removeUserSessionLocally, setUserSessionLocally } from '../utils/user-session-utils'

/**
 * Axios instance configured with a request timeout and JSON content-type header.
 */
const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT from localStorage in DEV environment
axiosInstance.interceptors.request.use(
  (request) => {
    if (import.meta.env.DEV) {
      request.headers['Authorization'] = `Bearer ${localStorage.getItem(DEV_JWT_LS_KEY)}`
      request.withCredentials = true
    }
    return request
  },
  (error) => Promise.reject(error)
)

// Handle responses and errors
axiosInstance.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(import.meta.env.VITE_ARTIFICIAL_DELAY)
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Retry once on 401 (except login/logoff endpoints)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/me/logoff')
    ) {
      originalRequest._retry = true
      const newSession = await refreshSession()
      if (newSession) setUserSessionLocally(newSession.data)
      return axiosInstance(originalRequest)
    }

    let errorMessage = ''

    if (typeof error.response.data === 'string') {
      errorMessage = error.response.data
    }

    if (typeof error.response.data === 'object') {
      console.error(error.response.data.errors)
      errorMessage = error.response.data.title || 'Something went wrong. Please try again later'
    }

    switch (error.response.status) {
      case 400:
      case 409:
      case 429:
        return Promise.reject(errorMessage)

      case 401:
        toast.error(errorMessage)
        removeUserSessionLocally(true)
        break

      case 403:
        toast.error(errorMessage)
        break

      case 404:
        toast.error(errorMessage)
        // TODO: Route to 404 page
        break

      case 500:
        toast.error(errorMessage)
        // TODO: Route to 500 page
        break

      default:
        toast.error(`${error.response.status} Error`, {
          description: errorMessage,
        })
        return Promise.reject(error)
    }
  }
)

export { axiosInstance }
