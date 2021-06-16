import Layout from "../../components/layout"
import AdForm from "../../components/adForm"
import { Button, Input } from "@chakra-ui/react"
import useAuthStore from "../../stores/auth"
import shallow from "zustand/shallow"
import { useRouter } from "next/router"
import Link from "next/link"

const CreateAdPage = () => {
  const { push } = useRouter()

  const [user, axios] = useAuthStore(
    ({ user, axios }) => [user, axios],
    shallow
  )

  const handleSubmit = async (value) => {
    await axios.post(`/users/${user.id}/ads`, value)

    push("/account")
  }

  return (
    <Layout>
      <AdForm
        title="Create Ad"
        className="max-w-md p-6 mx-4 border-2 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-4">
          <Input type="submit" colorScheme="blue" value="Save" />
          <Link href="/account">
            <Button>Back</Button>
          </Link>
        </div>
      </AdForm>
    </Layout>
  )
}

export default CreateAdPage
