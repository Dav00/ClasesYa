const verifyToken = require("../helpers/auth").verifyToken
const prisma = require("../db")
const userRole = require("@prisma/client").userRole

const getRoleLevel = (role) => Object.values(userRole).indexOf(role)

const authenticate = (role) => async (req, res, next) => {
  let user

  try {
    const token = req.headers.authorization?.slice("Bearer ".length)

    if (!token) throw new Error()

    const tokenData = verifyToken(token)

    if (getRoleLevel(tokenData.role) < getRoleLevel(role)) throw new Error()

    user = await prisma.user.findUnique({
      where: { id: tokenData.id },
      rejectOnNotFound: true,
    })
  } catch (err) {
    return res.status(403).end()
  }

  req.user = user

  next()
}

const isAuthenticated = authenticate(userRole.USER)
const isAdmin = authenticate(userRole.ADMIN)
const isRoot = authenticate(userRole.ROOT)

module.exports = { authenticate, isAuthenticated, isAdmin, isRoot }
