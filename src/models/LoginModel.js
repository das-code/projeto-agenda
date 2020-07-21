const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  async login() {
    const errors = this.validate()
    if (errors.length > 0) return { user: null, errors }

    const user = await this.userExists()
    if (!user) return { user: null, errors: ['Usuário não cadastrado.'] }

    if (!bcrypt.compareSync(this.password, user.password)) {
      return 'Senha incorreta.'
    }

    return { user, errors: null }
  }

  async createAccount() {
    const errors = this.validate() // array de erros, vazio se não ouver erros.
    if (errors.length > 0) return { user: null, errors }

    const userExists = await this.userExists() // se o usuario já existir, retorna ele
    if (userExists)
      return { user: null, errors: [`Usuário ${userExists.email} já existe.`] }

    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)

    const user = await LoginModel.create({
      email: this.email,
      password: this.password,
    })

    return { user, errors: null }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.email })

    return user ? user : null
  }

  validate() {
    if (typeof this.email !== 'string') this.email = ''
    if (typeof this.password !== 'string') this.password = ''

    const errors = []

    if (!validator.isEmail(this.email)) errors.push('E-mail inválido.')
    if (this.password.length < 6 || this.password.length > 30)
      errors.push('A senha precisa ter entre 6 a 30 caracteres.')

    return errors
  }
}

module.exports = Login
