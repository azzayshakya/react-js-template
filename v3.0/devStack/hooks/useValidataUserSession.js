import { message } from 'antd'
import { useEffect, useState } from 'react'

import { getMySession, refreshSession } from '../apis/accounts-me-apis'
import { useUserSessionStore } from '../stores/user-session-store'
import { redirectToLoginUtil } from '../utils/redirect-utils'
import {
  isUserSessionValid,
  removeUserSessionLocally,
  setUserSessionLocally,
} from '../utils/user-session-utils'

export const useValidateUserSession = () => {
  const { setUserSession } = useUserSessionStore()
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const validate = async () => {
      // In PROD, skip API call entirely if session already expired
      if (import.meta.env.PROD && !isUserSessionValid()) {
        redirectToLoginUtil()
        return
      }

      setIsPending(true)

      try {
        const apiFn = import.meta.env.DEV ? getMySession : refreshSession
        const httpResponse = await apiFn()

        if (!httpResponse) return

        setUserSession(setUserSessionLocally(httpResponse.data))
      } catch (error) {
        message.error(error?.message || 'Session validation failed.')
        setUserSession(null)
        removeUserSessionLocally(true)
        redirectToLoginUtil()
      } finally {
        setIsPending(false)
      }
    }

    validate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { isPending }
}
