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
    this.errors = []
    this.user = null
  }

  async login() {
    this.validate()
    if (this.errors.length > 0) return

    const user = await this.userExists()

    if (!user) {
      this.errors.push('Usuário não cadastrado.')
      return
    }

    if (!bcrypt.compareSync(this.password, user.password)) {
      this.errors.push('Senha incorreta.')
      this.user = null
      return
    }
    this.user = user
  }

  async createAccount() {
    this.validate()
    if (this.errors.length > 0) return

    const user = await this.userExists()

    if (user) {
      this.errors.push(`Usuário ${user.email} já existe.`)
      return
    }

    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)

    this.user = await LoginModel.create({
      email: this.email,
      password: this.password,
    })
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.email })

    return user ? user : null
  }

  validate() {
    if (typeof this.email !== 'string') this.email = ''
    if (typeof this.password !== 'string') this.password = ''

    if (!validator.isEmail(this.email)) this.errors.push('E-mail inválido.')
    if (this.password.length < 6 || this.password.length > 30)
      this.errors.push('A senha precisa ter entre 6 a 30 caracteres.')
  }
}

module.exports = Login
