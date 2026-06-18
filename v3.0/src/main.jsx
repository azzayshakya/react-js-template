import React from 'react'
import ReactDOM from 'react-dom/client'
import VersionUpdate from './components/ui/VersionUpdate'
import { AppRouter } from './router'
// import { QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { queryClient } from 'api/queryClient'
// import { AuthProvider } from 'context/AuthContext'
// import { ThemeProvider } from 'context/ThemeContext'
// import { ToastProvider } from 'context/ToastContext'
// import { AppRouter } from 'router'
// import 'styles/tokens.css'
// import 'styles/globals.css'

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
