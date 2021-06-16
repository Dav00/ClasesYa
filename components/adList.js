import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Input } from "@chakra-ui/input"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { Textarea } from "@chakra-ui/textarea"

const AdListItem = ({ ad, Actions, actionsProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <li className="flex items-center justify-between p-4 gap-x-8">
        <h2
          className="text-xl font-bold cursor-pointer whitespace-nowrap"
          onClick={onOpen}
        >
          {ad.title}
        </h2>
        <p className="w-full text-lg truncate cursor-pointer" onClick={onOpen}>
          {ad.description}
        </p>
        <div className="flex items-center gap-x-2">
          <Actions ad={ad} {...actionsProps} />
        </div>
      </li>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{ad.title}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Textarea isReadOnly defaultValue={ad.description} />

            {ad.user && (
              <>
                {ad.user.contact && (
                  <Textarea isReadOnly defaultValue={ad.user.contact} />
                )}

                <Input isReadOnly defaultValue={ad.user.email} />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const AdList = ({ ads, onLoadMore, hasMore, Actions, actionsProps }) => {
  return (
    <ul className="flex flex-col w-full max-w-screen-md gap-y-3">
      {ads.map((ad) => (
        <AdListItem
          key={ad.id}
          ad={ad}
          Actions={Actions}
          actionsProps={actionsProps}
        />
      ))}

      {!ads.length && <p>No ads to show</p>}
      {ads.length && hasMore && <Button onClick={onLoadMore}>Load More</Button>}
    </ul>
  )
}

export default AdList
