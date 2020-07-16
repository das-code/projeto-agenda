exports.globalMiddleware = (req, res, next) => {
  res.locals.localVariable = 'este é o valor da variável local'

  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    res.render('404')
    return
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()

  next()
}
