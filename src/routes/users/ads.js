const prisma = require("../../db")

const router = require("express").Router({ mergeParams: true })

router.get("/ads", async (req, res) =>
  res.json(
    await prisma.ad.findMany({
      where: {
        userId: req.params.userId,
      },
    })
  )
)

module.exports = router
