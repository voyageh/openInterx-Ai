import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: {
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIECKAcott0kv2IWin_pMNkSgzvMkJs784gqjj1BWaD2qGxjPE=s96-c',
  },
  login: (user) => {
    set({ user })
  },
}))
