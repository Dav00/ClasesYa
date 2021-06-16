const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body)
  } catch (e) {
    return res.status(400).json(e.errors)
  }

  next()
}

module.exports = validate
