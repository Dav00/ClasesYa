const router = require("express").Router()

const adsRoutes = require("./ads")
router.use("/:userId", adsRoutes)

module.exports = router
