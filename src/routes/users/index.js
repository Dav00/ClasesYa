const router = require("express").Router()
const { isAuthenticated } = require("../../middlewares/auth")
const { isTheUser } = require("./helpers")
const prisma = require("../../db")
const validate = require("../../middlewares/validate")
const Yup = require("yup")

const adsRoutes = require("./ads")

router.use("/:userId/ads", adsRoutes)

const UserBody = Yup.object().shape({
  contact: Yup.string().min(8).max(50).required(),
})

router.get("/:userId", isAuthenticated, isTheUser, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.userId,
    },
    select: {
      contact: true,
    },
  })

  res.json(user)
})

router.put(
  "/:userId",
  isAuthenticated,
  isTheUser,
  validate(UserBody),
  async (req, res) => {
    const { contact } = req.body
    const user = await prisma.user.update({
      where: {
        id: req.params.userId,
      },
      data: {
        contact,
      },
      select: {
        contact: true,
      },
    })

    res.json(user)
  }
)

module.exports = router
