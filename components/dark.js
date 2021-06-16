import { useColorMode } from "@chakra-ui/color-mode"
import { FormLabel } from "@chakra-ui/form-control"
import { FormControl } from "@chakra-ui/form-control"
import { Switch } from "@chakra-ui/switch"
import { useEffect } from "react"
import { useLocalStorage, useMedia } from "react-use"

const Dark = () => {
  const { setColorMode } = useColorMode()

  const defaultDarkMode = useMedia("(prefers-dark-interface)")

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", defaultDarkMode)

  useEffect(() => {
    const htmlNode = document.querySelector("html")

    if (darkMode) htmlNode.classList.add("dark")
    else htmlNode.classList.remove("dark")

    setColorMode(darkMode ? "dark" : "light")
  }, [darkMode])

  return (
    <FormControl className="flex items-center justify-between">
      <Switch isChecked={darkMode} onChange={() => setDarkMode(!darkMode)} />
    </FormControl>
  )
}

export default Dark
