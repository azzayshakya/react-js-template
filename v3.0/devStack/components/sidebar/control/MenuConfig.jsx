import { HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons'

import MENU_KEYS from '../constants/MenuKeys'
import MENU_LABELS from '../constants/MenuLabels'

export const MENU_CONFIG = [
  {
    key: MENU_KEYS.HOME,
    label: MENU_LABELS.home,
    icon: HomeOutlined,
  },
  {
    key: MENU_KEYS.ABOUT,
    label: MENU_LABELS.about,
    icon: InfoCircleOutlined,
  },
  {
    key: MENU_KEYS.MY_PROFILE,
    label: MENU_LABELS.myProfile,
    icon: UserOutlined,
  },
]

export default MENU_CONFIG
