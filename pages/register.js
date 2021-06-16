import { Button, Input } from "@chakra-ui/react"
import shallow from "zustand/shallow"
import AuthForm from "../components/authForm"
import useAuthStore from "../stores/auth"
import BaseLayout from "../components/layout/base"
import Link from "next/link"
import useAuthRedirect from "../hooks/authRedirect"

const RegisterPage = () => {
  useAuthRedirect()

  const [register, loginToken] = useAuthStore(
    (store) => [store.register, store.loginToken],
    shallow
  )

  const handleSubmit = async (value, setError, setValue) => {
    let request
    try {
      request = await register(value)
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          setError("email", { message: "Email taken" })
          setValue("email", "")
          break
      }

      return
    }

    loginToken(request.data.token)
  }

  return (
    <BaseLayout className="justify-center min-h-screen">
      <AuthForm title="Register" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Input type="submit" colorScheme="blue" value="Register" />
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </div>
      </AuthForm>
    </BaseLayout>
  )
}

export default RegisterPage
