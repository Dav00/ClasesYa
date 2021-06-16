const express = require("express")
const prisma = require("../db")
const router = express.Router()
const Yup = require("yup")
const validate = require("../middlewares/validate")

// /api/ads/search?q=programacion

const SearchBody = Yup.object().shape({
  query: Yup.string().min(3).required(),
})

router.post("/search", validate(SearchBody), async (req, res) => {
  const { query } = req.body

  res.json(
    await prisma.ad.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
            
          },
        ],
      },
      skip: parseInt(req.query.skip) || undefined,
      take: parseInt(req.query.take) || undefined,
      include: {
        user: {
          select: {
            contact: true,
            email: true,
          },
        },
      },
    })
  )
})

module.exports = router
