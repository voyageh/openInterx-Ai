import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from '@/components/icon'
import { useGoogleLogin } from '@react-oauth/google'
import userAvatar from '@/assets/images/user-avatar.jpg'

import './root.scss'

export default function Root() {
  const location = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')
  const changeTheme = () => {
    const v = theme === 'light' ? 'dark' : 'light'
    setTheme(v)
    document.documentElement.setAttribute('data-theme', v)
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  })

  return (
    <div className="openinterx-ai">
      <div className="openinterx-ai__left">
        <div className="logo">
          <Icon name="Logo" className="logo-icon" />
        </div>
        <div className="menu-wrapper">
          <NavLink to="/my-video" className={({ isActive }) => (isActive ? 'active' : '')}>
            <Icon name="MyVideo" className="menu-icon" />
          </NavLink>
          <NavLink to="/sample-video" className={({ isActive }) => (isActive || location.pathname === '/' ? 'active' : '')}>
            <Icon name="SampleVideo" className="menu-icon" />
          </NavLink>
        </div>
        <div className="user-avatar">
          <Icon name={theme} className="theme-icon" onClick={changeTheme} />
          <img src={userAvatar} alt="avatar" onClick={login} />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
