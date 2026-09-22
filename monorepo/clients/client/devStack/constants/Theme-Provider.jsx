import { useSystemThemeSync } from '@devStack/hooks/useSystemThemeSync'
import { useTheme } from '@devStack/hooks/useTheme'
import getAntdTheme from '@devStack/styles/theme-token'
import { applyThemeToDOM } from '@devStack/utils/theme-utils'
import { ConfigProvider } from 'antd'
import { useLayoutEffect } from 'react'

export default function ThemeProvider({ children }) {
  const { resolvedTheme } = useTheme()
  useSystemThemeSync()

  
  useLayoutEffect(() => {
    applyThemeToDOM(resolvedTheme)
  }, [resolvedTheme])

  return <ConfigProvider theme={getAntdTheme(resolvedTheme)}>{children}</ConfigProvider>
}
