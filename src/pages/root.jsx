import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'

import './root.scss'

export default function Root() {
  const location = useLocation()
  const user = useUserStore((state) => state.user)
  const { theme, changeTheme } = useUserStore()

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
          <img src={user.avatar} alt="avatar" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
