import { useEffect } from "react"
import shallow from "zustand/shallow"
import useAuthStore from "../stores/auth"
import { useRouter } from "next/router"

const useAuthRedirect = () => {
  const { push } = useRouter()

  const user = useAuthStore((store) => store.user, shallow)

  useEffect(() => {
    if (user) push("/")
  }, [user])
}

export default useAuthRedirect
