import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ConfigProvider } from 'antd'
import { listenerSize } from '@/utils/flexible'
import router from '@/routes'
import './index.scss'

listenerSize()

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={process.env.PUBLIC_GOOGLE_ID}>
    <ConfigProvider theme={{ cssVar: { key: 'ant-css-var' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </GoogleOAuthProvider>
)
