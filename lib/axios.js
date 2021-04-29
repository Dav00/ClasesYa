import baseAxios from "axios"

const axios = baseAxios.create({
  baseURL: "http://localhost:3000/api",
})

export default axios
