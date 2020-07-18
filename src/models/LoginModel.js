const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async login() {
    this.validate()
    if (this.errors.length > 0) return

    this.user = await LoginModel.findOne({ email: this.body.email })

    if (!this.user) {
      this.errors.push('Usuário não cadastrado.')
      return
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha incorreta.')
      // this.user = null
      return
    }
  }

  async createAccount() {
    this.validate()
    if (this.errors.length > 0) return

    await this.userExists()
    if (this.errors.length > 0) return

    const salt = bcrypt.genSaltSync()
    this.body.password = bcrypt.hashSync(this.body.password, salt)

    this.user = await LoginModel.create(this.body)
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email })

    if (user) this.errors.push('Usuário já existe.')
  }

  validate() {
    this.cleanUp()

    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido.')

    if (this.body.password.length < 6 || this.body.password.length > 30)
      this.errors.push('A senha precisa ter entre 6 a 30 caracteres.')
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    }
  }
}

module.exports = Login
