import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from '@/components/icon'
import { useUserStore } from '@/store/user'
import userAvatar from '@/assets/images/user-avatar.jpg'

import './root.scss'

export default function Root() {
  const location = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')
  const user = useUserStore((state) => state.user)

  const changeTheme = () => {
    const v = theme === 'light' ? 'dark' : 'light'
    setTheme(v)
    document.documentElement.dataset.theme = v
  }

  const updateView = (e) => {
    //在不支持的浏览器里不做动画
    if (!document.startViewTransition) {
      changeTheme()
      return
    }
    // 开始一次视图过渡：
    const transition = document.startViewTransition(() => changeTheme())

    transition.ready.then(() => {
      const x = e.clientX
      const y = e.clientY
      //计算按钮到最远点的距离用作裁剪圆形的半径
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      const isDark = document.documentElement.dataset.theme === 'dark'
      //开始动画
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        }
      )
    })
  }

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
          <Icon name={theme} className="theme-icon" onClick={updateView} />
          <img src={user.avatar} alt="avatar" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
