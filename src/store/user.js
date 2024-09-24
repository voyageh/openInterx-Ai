import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import Apis from '@/api'

const store = (set, get) => ({
  theme: 'light',
  width: '50%',
  user: {
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIECKAcott0kv2IWin_pMNkSgzvMkJs784gqjj1BWaD2qGxjPE=s96-c',
  },

  changeTheme: (e) => {
    const theme = get().theme === 'light' ? 'dark' : 'light'
    if (!document.startViewTransition) {
      set({ theme })
      document.documentElement.dataset.theme = theme
      return
    }
    // 开始一次视图过渡：
    const transition = document.startViewTransition(() => {
      set({ theme })
      document.documentElement.dataset.theme = theme
    })

    transition.ready.then(() => {
      const x = e.clientX
      const y = e.clientY
      //计算按钮到最远点的距离用作裁剪圆形的半径
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      const isDark = theme === 'dark'
      //开始动画
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 300,
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        }
      )
    })
  },

  changeWidth: (width) => {
    set({ width })
  },

  login: async (token) => {
    await Apis.user.login({ token })
    const user = await Apis.user.getUser()
    set({ user })
  },
})

export const useUserStore = create(
  devtools(
    persist(store, {
      name: 'openinterx-user',
      onRehydrateStorage: () => {
        return (state) => {
          document.documentElement.dataset.theme = state.theme
        }
      },
    })
  )
)
