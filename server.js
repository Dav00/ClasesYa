const express = require("express")
const routes = require("./src/routes/")
require("dotenv").config()

const next = require("next")
require("./src/db")
const dev = process.env.NODE_ENV !== "production"

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()
  app.use("/api", routes)
  app.get("*", handle)

  app.listen(process.env.PORT || 3000, () =>
    console.log(`[INFO] Server running`)
  )
})
