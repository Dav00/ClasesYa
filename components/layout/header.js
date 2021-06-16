import { Button, ButtonGroup, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import shallow from "zustand/shallow"
import useAuthStore from "../../stores/auth"
import Dark from "../dark"

const Header = () => {
  const [user, logout] = useAuthStore(
    (store) => [store.user, store.logout],
    shallow
  )

  return (
    <header className="flex flex-wrap items-center justify-around w-full mx-5 mt-4 mb-16 gap-x-3 gap-y-5">
      <div className="flex items-center gap-x-3">
        <Link passHref href="/">
          <h1 className=" underline text-4xl font-semibold cursor-pointer">Clases YA!</h1>
        </Link>
      </div>

      {user ? (
        <>
          <div className="flex items-center gap-x-3">
            <h4 className="text-xl italic dark:text-white">{user.email}</h4>
          </div>
          
          <div className="flex items-center gap-x-3">

                <Link passHref href="/account">
                  <Button size="sm" width = "150px" colorScheme="blue">
                    Profile
                  </Button>
                </Link> 

                <div>
                  <Button size="sm" onClick={logout}>
                Logout
                  </Button>
                </div>
              
            <Dark />
          
          </div>
        </>
      ) 
      : 
      (
        <div className="flex items-center gap-x-3">
           
          <ButtonGroup variant="solid" spacing="3">
           
            <Link href="/login">
              <Button padding="2" colorScheme="blue">Login</Button>
            </Link>
            <Link href="/register">
            <Button padding="2" colorScheme="gray">Register</Button>
            </Link>
          </ButtonGroup>
          <Dark/> 

          
        </div>
      )}
    </header>
  )
}

export default Header
