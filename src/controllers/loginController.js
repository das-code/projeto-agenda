const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if (req.session.user) return res.redirect('/')

  return res.render('login')
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.createAccount()

    if (login.errors.length > 0) {
      req.flash('errorsMessages', login.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu usuário foi criado com sucesso.')
    req.session.save(() => res.redirect('back'))
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if (login.errors.length > 0) {
      req.flash('errorsMessages', login.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu usuário já está logado.')
    req.session.user = login.user
    req.session.save(() => res.redirect('/'))
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.logout = (req, res) => {
  req.session.destroy()

  return res.redirect('back')
}
