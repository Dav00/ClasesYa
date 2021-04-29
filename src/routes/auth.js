const express = require("express")
const prisma = require("../db")
const router = express.Router()
const Yup = require("yup")
const bcrypt = require("bcryptjs")
const signToken = require("../helpers/auth").signToken

const AuthBody = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must have at least 5 characters")
    .required("Password is required"),
})

router.post("/register", async (req, res) => {
  try {
    await AuthBody.validate(req.body)
  } catch (e) {
    return res.status(400).json(e.errors)
  }
  //Si hay un error

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

router.post("/login", async (req, res) => {
  try {
    await AuthBody.validate(req.body)
  } catch (e) {
    return res.status(400).json(e.errors)
  }
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
