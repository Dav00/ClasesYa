const isTheUser = (req, res, next) => {
  if (req.user.id === req.params.userId) return next()

  res.status(401).end()
}

module.exports = { isTheUser }
