import { Button, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import shallow from "zustand/shallow"
import AuthForm from "../components/authForm"
import useAuthStore from "../stores/auth"
import BaseLayout from "../components/layout/base"
import Link from "next/link"
import useAuthRedirect from "../hooks/authRedirect"

const LoginPage = () => {
  useAuthRedirect()

  const [login, loginToken] = useAuthStore(
    (store) => [store.login, store.loginToken],
    shallow
  )

  const handleSubmit = async (value, setError, setValue) => {
    let request
    try {
      request = await login(value)
    } catch (err) {
      switch (err.response?.status) {
        case 403:
          setError("password", { message: "Incorrect password" })
          break
        case 404:
          setError("email", { message: "User is not found" })
          setValue("email", "")
      }
      return
    }

    loginToken(request.data.token)
  }

  return (
    <BaseLayout className="justify-center min-h-screen">
      <AuthForm title="Login" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Input type="submit" colorScheme="blue" value="Login" />
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </div>
      </AuthForm>
    </BaseLayout>
  )
}

export default LoginPage
