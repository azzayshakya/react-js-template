import MENU_KEYS from '@devStack/components/sidebar/constants/MenuKeys'
import { lazy } from 'react'

export const ROUTE_ELEMENTS = {
  [MENU_KEYS.HOME]: lazy(() => import('@/pages/Home/Home')),
  [MENU_KEYS.ABOUT]: lazy(() => import('@/pages/About/About')),
  [MENU_KEYS.MY_PROFILE]: lazy(() => import('@/pages/MyProfile/MyProfile')),
}

export default ROUTE_ELEMENTS
