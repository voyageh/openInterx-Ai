import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Tooltip } from 'antd'
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
          <Tooltip title="My video" placement="right">
            <NavLink to="/my-video" className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon name="MyVideo" className="menu-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Sample video" placement="right">
            <NavLink to="/sample-video" className={({ isActive }) => (isActive || location.pathname === '/' ? 'active' : '')}>
              <Icon name="SampleVideo" className="menu-icon" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="user-avatar">
          <Tooltip title="Theme switch" placement="right">
            <Icon name={theme} className="theme-icon" onClick={changeTheme} />
          </Tooltip>
          <Tooltip title="User settings" placement="right">
            <img src={user.avatar} alt="avatar" />
          </Tooltip>
        </div>
      </div>
      <div className="openinterx-ai__right">
        <Outlet />
      </div>
    </div>
  )
}
