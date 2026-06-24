import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppRouter } from './router'
import './index.css'
// import { QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { queryClient } from 'api/queryClient'
// import { AuthProvider } from 'context/AuthContext'
// import { ThemeProvider } from 'context/ThemeContext'
// import { ToastProvider } from 'context/ToastContext'
// import { AppRouter } from 'router'
// import 'styles/tokens.css'
// import 'styles/globals.css'

// const { isPending } = useValidateUserSession()
//   useAuthSync()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    {/* <AuthProvider> */}
    {/* <ThemeProvider> */}
    {/* <ToastProvider> */}
    <AppRouter />
    {/* <VersionUpdate /> */}
    {/* </ToastProvider> */}
    {/* </ThemeProvider> */}
    {/* </AuthProvider> */}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </QueryClientProvider> */}
  </React.StrictMode>
)
