import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import useAuthStore from "../stores/auth"
import shallow from "zustand/shallow"
import "../styles/globals.css"
import { useLocalStorage } from "react-use"

const theme = extendTheme({})

function App({ Component, pageProps }) {
  const AuthProvider = useAuthStore((store) => store.Provider, shallow)

  return (
    <ChakraProvider theme={{ ...theme }}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
