import useAuthStore from "../stores/auth"
import shallow from "zustand/shallow"
import "../styles/globals.css"

function App({ Component, pageProps }) {
  const AuthProvider = useAuthStore((store) => store.Provider, shallow)

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
