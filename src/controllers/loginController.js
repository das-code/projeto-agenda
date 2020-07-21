const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if (req.session.user) return res.redirect('/')

  return res.render('login')
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const login = new Login(email, password)

    const userAccount = await login.createAccount()

    if (userAccount.errors && userAccount.errors.length > 0) {
      req.flash('errorsMessages', userAccount.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu usuário foi criado com sucesso.')
    req.session.user = userAccount.user
    req.session.save(() => res.redirect('back'))
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const login = new Login(email, password)

    const userAccount = await login.login()

    if (userAccount.errors && userAccount.errors.length > 0) {
      req.flash('errorsMessages', userAccount.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu usuário já está logado.')
    req.session.user = userAccount.user
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
