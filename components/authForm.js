import { Controller, useForm } from "react-hook-form"

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
const AuthFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email. Eg: (test@test.com)")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must have at least 5 characters")
    .required("Password is required"),
})

const AuthForm = ({ children, title, onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(AuthFormValidationSchema),
  })

  return (
    <form
      id="authForm"
      onSubmit={handleSubmit((value) => onSubmit(value, setError, setValue))}
      className="flex flex-col w-full max-w-md p-6 mx-4 border-2 rounded-md shadow-md gap-y-8"
    >
      {title && <h2 className="text-2xl font-semibold text-center">{title}</h2>}

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>

            <Input {...field} placeholder="Email" isInvalid={!!errors.email} />

            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>

            <Input
              {...field}
              type="password"
              placeholder="Password"
              isInvalid={!!errors.password}
            />

            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        )}
      />

      {children}
    </form>
  )
}

export default AuthForm
