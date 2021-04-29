const express = require("express")
const prisma = require("../db")
const router = express.Router()
const bodyParser = require("body-parser")
const authorized = require("../middlewares/auth").authorized

router.use(bodyParser.json())

const authRoutes = require("./auth")
const usersRoutes = require("./users")

router.use("/auth", authRoutes)

router.use("/users", usersRoutes)

module.exports = router
