import { yupResolver } from "@hookform/resolvers/yup"
import {
  FormControl,
  Input,
  Textarea,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"

const AdBody = Yup.object().shape({
  title: Yup.string()
    .min(8, "Title must be at least 8 characters")
    .max(36, "Title must not contain more than 36 characters")
    .required(),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not contain more than 500 characters")
    .required(),
})

const AdForm = ({ children, title, onSubmit, className, defaultValues }) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(AdBody),
    defaultValues,
  })

  return (
    <form
      id="adForm"
      onSubmit={handleSubmit((value) => onSubmit(value, setError, setValue))}
      className={`flex flex-col w-full gap-y-8 ${className}`}
    >
      {title && <h2 className="text-2xl font-semibold text-center">{title}</h2>}

      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>

            <Input {...field} placeholder="Title" />

            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>

            <Textarea {...field} placeholder="Description" resize="none" />

            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
        )}
      />

      {children}
    </form>
  )
}

export default AdForm
