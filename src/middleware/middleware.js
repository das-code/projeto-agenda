exports.globalData = (req, res, next) => {
  res.locals.successMessage = req.flash('successMessage')
  res.locals.errorsMessages = req.flash('errorsMessages')
  res.locals.user = req.session.user

  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    res.render('404')
    return
  }
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()

  next()
}

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errorsMessages', 'Você precisa está logado.')
    req.session.save(() => res.redirect('/'))
    return
  }
  
  next()
}
