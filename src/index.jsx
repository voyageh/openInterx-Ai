import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import '@/utils/flexible'
import router from '@/routes'
import './index.scss'

// listenerSize()
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={process.env.PUBLIC_GOOGLE_ID}>
      <ConfigProvider theme={{ cssVar: { key: 'ant-css-var' } }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
)
