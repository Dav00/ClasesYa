const { sign, verify } = require("jsonwebtoken")

const signToken = (user) =>
  sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600 * 24 * 7,
    }
  )

const verifyToken = (token) => verify(token, process.env.JWT_SECRET)

module.exports = { signToken, verifyToken }
