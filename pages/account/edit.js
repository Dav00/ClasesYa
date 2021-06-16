import Layout from "../../components/layout"
import {
  Button,
  FormControl,
  Input,
  Textarea,
  FormLabel,
  FormErrorMessage,
  CircularProgress,
} from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"
import shallow from "zustand/shallow"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useEffect, useState } from "react"

const AccountBody = Yup.object().shape({
  contact: Yup.string()
    .min(8, "Contact must contain more than 8 characters")
    .max(50, "Contact must not contain more than 50 characters")
    .required(),
})

const EditAccountPage = () => {
  const { push } = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(AccountBody),
  })

  const [user, axios] = useAuthStore(
    ({ user, axios }) => [user, axios],
    shallow
  )

  const [userData, setUserData] = useState(undefined)

  const handleEdit = async (value) => {
    const newUserData = await axios.put(`/users/${user.id}`, value)

    setUserData(newUserData)
    push("/account")
  }

  const fetchUser = async () => {
    const { data } = await axios.get(`/users/${user.id}`)

    setUserData(data)
  }

  useEffect(() => {
    if (user) fetchUser()
  }, [user])

  return (
    <Layout>
      {!!userData ? (
        <form
          id="adForm"
          onSubmit={handleSubmit(handleEdit)}
          className="flex flex-col w-full max-w-md p-6 mx-4 border-2 rounded-md shadow-md gap-y-8"
        >
          <h2 className="text-2xl font-semibold text-center">Edit Account</h2>

          <Controller
            name="contact"
            control={control}
            defaultValue={userData.contact}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.contact}>
                <FormLabel>Contact</FormLabel>

                <Textarea {...field} placeholder="Contact" resize="none" />

                <FormErrorMessage>{errors.contact?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <div className="flex flex-col gap-y-4">
            <Input type="submit" colorScheme="blue" value="Save" />
            <Link href="/account">
              <Button>Back</Button>
            </Link>
          </div>
        </form>
      ) : (
        <CircularProgress />
      )}
    </Layout>
  )
}

export default EditAccountPage
