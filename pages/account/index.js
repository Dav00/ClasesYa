import Link from "next/link"
import Layout from "../../components/layout"
import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import AdList from "../../components/adList"
import { useEffect, useState } from "react"
import useAuthStore from "../../stores/auth"
import shallow from "zustand/shallow"
import { HiPencil, HiTrash } from "react-icons/hi"
import { IconContext } from "react-icons"
import AdForm from "../../components/adForm"

const AdListItemActions = ({ ad, fetchAds }) => {
  const [user, axios] = useAuthStore(
    ({ user, axios }) => [user, axios],
    shallow
  )

  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure()

  const editAd = async (values) => {
    await axios.put(`/users/${user.id}/ads/${ad.id}`, values)

    fetchAds()
  }

  const deleteAd = async () => {
    await axios.delete(`/users/${user.id}/ads/${ad.id}`)

    fetchAds()
  }

  return (
    <IconContext.Provider value={{ size: "1.2rem" }}>
      <IconButton colorScheme="blue" onClick={openEdit}>
        <HiPencil />
      </IconButton>

      <Modal isOpen={isEditOpen} onClose={closeEdit}>
        <ModalOverlay />


        <ModalContent>
          <ModalHeader>Edit Advertisment</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <AdForm defaultValues={ad} onSubmit={editAd} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeEdit} mr="3">
              Close
            </Button>

            <Input
              type="submit"
              colorScheme="blue"
              form="adForm"
              value="Save"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <IconButton colorScheme="red" onClick={deleteAd}>
        <HiTrash />
      </IconButton>
    </IconContext.Provider>
  )
}

const AccountPage = () => {
  const [ads, setAds] = useState(undefined)
  const [hasMore, setHasMore] = useState(true)

  const [user, axios] = useAuthStore(
    ({ user, axios }) => [user, axios],
    shallow
  )

  const fetchAds = async () => {
    const { data } = await axios.get(`/users/${user.id}/ads?take=10&skip=${ads ? ads.length : 0}`)

    setAds(ads?.length ? [...ads, ...data] : data)

    if(data.length < 10) setHasMore(false)
  }
  
  useEffect(() => {
    if (user) fetchAds()
  }, [user])

  return (
    <Layout title="My Advertisments">
      <div className="flex items-center gap-x-4">
        <Link href="/account/create">
          <Button>Create Advertisment</Button>
        </Link>
        <Link href="/account/edit">
          <Button>Edit Contact Info</Button>
        </Link>
      </div>

      {!ads ? (
        <CircularProgress />
      ) : (
        <AdList
            ads={ads}
            onLoadMore={fetchAds}
              hasMore={hasMore}
          actionsProps={{ fetchAds }}
          Actions={AdListItemActions}
        />
      )}
    </Layout>
  )
}

export default AccountPage
