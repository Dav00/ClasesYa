const prisma = require("../../db")
const Yup = require("yup")
const validate = require("../../middlewares/validate")
const { isAuthenticated } = require("../../middlewares/auth")
const { isTheUser } = require("./helpers")

const router = require("express").Router({ mergeParams: true })

router.get("/", async (req, res) => 
  res.json(
    await prisma.ad.findMany({
      where: {
        userId: req.params.userId,
      },
      skip: parseInt(req.query.skip) || undefined,
      take: parseInt(req.query.take) || undefined,
    })
  )
)

router.get("/:adId", async (req, res) =>
  res.json(await prisma.ad.findUnique({ where: { id: req.params.adId } }))
)

router.delete("/:adId", isAuthenticated, isTheUser, async (req, res) =>
  res.json(await prisma.ad.delete({ where: { id: req.params.adId } }))
)

const AdBody = Yup.object().shape({
  title: Yup.string().min(8).max(36).required(),
  description: Yup.string().min(20).max(500).required(),
})

router.post(
  "/",
  isAuthenticated,
  isTheUser,
  validate(AdBody),
  async (req, res) => {
    const { title, description } = req.body

    const ad = await prisma.ad.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    })

    res.json(ad)
  }
)

router.put(
  "/:adId",
  isAuthenticated,
  isTheUser,
  validate(AdBody),
  async (req, res) => {
    const { title, description } = req.body

    const ad = await prisma.ad.update({
      where: {
        id: req.params.adId,
      },
      data: {
        title,
        description,
      },
    })

    res.json(ad)
  }
)

module.exports = router
