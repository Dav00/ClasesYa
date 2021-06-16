const express = require("express")
const prisma = require("../db")
const router = express.Router()
const Yup = require("yup")
const bcrypt = require("bcryptjs")
const signToken = require("../helpers/auth").signToken
const validate = require("../middlewares/validate")

const AuthBody = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(5).required(),
})

router.post("/register", validate(AuthBody), async (req, res) => {
  const { email, password } = req.body

  let user

  try {
    user = await prisma.user.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    })
  } catch (err) {
    return res.status(401).end() //401 => Desautorizado
  }
  res.json({ token: signToken(user) })
})

router.post("/login", validate(AuthBody), async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) return res.status(404).end()

  const pwdValid = await bcrypt.compare(password, user.password)

  if (!pwdValid) return res.status(403).end()

  res.json({ token: signToken(user) })
})

module.exports = router
