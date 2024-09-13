import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ConfigProvider } from 'antd'

import router from '@/routes'
import 'overlayscrollbars/overlayscrollbars.css'
import './index.scss'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="208248365321-r4100fh0n9dttg5o1eh9pi0boon68u8h.apps.googleusercontent.com">
    <ConfigProvider theme={{ cssVar: { key: 'ant-css-var' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </GoogleOAuthProvider>
)
