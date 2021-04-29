import { Button } from "@nature-ui/button"
import Link from "next/link"
import shallow from "zustand/shallow"
import useAuthStore from "../../stores/auth"

const Header = () => {
  const [user, logout] = useAuthStore(
    (store) => [store.user, store.logout],
    shallow
  )

  return (
    <header className="flex flex-wrap items-center justify-around mx-5 my-4 gap-x-3 gap-y-5">
      <h1 className="text-4xl font-semibold">Clases YA!</h1>

      {user ? (
        <>
          <div className="flex items-center gap-x-3">
            <h4 className="text-xl italic">{user.email}</h4>

            <Button size="xs" onClick={logout}>
              Logout
            </Button>
          </div>

          <Link href="/account">
            <Button color="blue-500">Account</Button>
          </Link>
        </>
      ) : (
        <Link href="/login">
          <Button color="blue-500">Login</Button>
        </Link>
      )}
    </header>
  )
}

export default Header
