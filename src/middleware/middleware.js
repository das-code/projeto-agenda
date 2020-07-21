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

const Login = require('../models/LoginModel')

exports.loginRequired = async (req, res, next) => {
  const cacheUserData = req.session.user

  if (!cacheUserData) {
    req.flash('errorsMessages', 'Você precisa está logado.')
    req.session.save(() => res.redirect('/'))
    return
  }

  try {
    const serverUserData = await Login.findByID(cacheUserData._id)
    console.log(cacheUserData.password, serverUserData.password)

    if (cacheUserData.password !== serverUserData.password) {
      req.flash('errorsMessages', 'Você precisa está logado.')
      req.session.save(() => res.redirect('/'))
      return
    }

    next()
  } catch (err) {
    console.log(err)
    res.render('404')
  }
}
