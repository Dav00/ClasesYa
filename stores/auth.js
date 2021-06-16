import create from "zustand"
import baseAxios from "../lib/axios"
import Axios from "axios"
import cookies from "js-cookie"
import { decode } from "jsonwebtoken"
import { useEffect } from "react"

const useAuthStore = create((set, get) => ({
  token: undefined,
  user: undefined,
  axios: undefined,

  Provider: ({ children }) => {
    useEffect(() => {
      const { refreshToken } = get()

      const token = cookies.get("auth-token")

      if (token) refreshToken(token)
    }, [])

    return <>{children}</>
  },

  refreshToken: (token) => {
    try {
      const user = decode(token)

      set({
        token,
        user,
        axios: Axios.create({
          ...baseAxios.defaults,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      })
    } catch (e) {
      return
    }
  },

  loginToken: (token) => {
    get().refreshToken(token)

    const { user } = get()

    if (user)
      cookies.set("auth-token", token, {
        secure: true,
        expires: new Date(user.exp * 1000),
      })
  },

  logout: () => {
    cookies.remove("auth-token")

    set({ token: undefined, user: undefined })
  },

  login: ({ email, password }) =>
    baseAxios.post("/auth/login", {
      email,
      password,
    }),
  register: ({ email, password }) =>
    baseAxios.post("/auth/register", {
      email,
      password,
    }),
}))

export default useAuthStore
