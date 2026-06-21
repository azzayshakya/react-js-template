import { useEffect } from 'react'

import { StorageKey } from '@/enums/storage-key-enum'
import { useUserSessionStore } from '@/stores/user-session-store'
import { redirectToLoginUtil } from '@/utils/redirect-utils'

/**
 * Syncs auth state across browser tabs.
 * If user logs out in tab A, all other tabs redirect to login automatically.
 * Place this hook once in App.jsx alongside useValidateUserSession.
 */
export const useAuthSync = () => {
  const { setUserSession } = useUserSessionStore()

  useEffect(() => {
    const handleStorageChange = (event) => {
      // Session was removed in another tab → logout this tab too
      if (event.key === StorageKey.USER_SESSION && !event.newValue) {
        setUserSession(null)
        redirectToLoginUtil(false) // don't save path, intentional logout
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [setUserSession])
}
