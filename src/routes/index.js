const express = require("express")
const prisma = require("../db")
const router = express.Router()
const bodyParser = require("body-parser")

router.use(bodyParser.json())

const authRoutes = require("./auth")
const usersRoutes = require("./users")
const adsRoutes = require("./ads")

router.use("/auth", authRoutes)

router.use("/users", usersRoutes)
router.use("/ads", adsRoutes)

module.exports = router
