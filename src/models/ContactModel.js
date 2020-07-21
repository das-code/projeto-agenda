const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now },
})

const ContactModel = mongoose.model('Contact', contactSchema)

function Contact(name, surname, email, phone) {
  this.name = name
  this.surname = surname
  this.email = email
  this.phone = phone
}

Contact.prototype.register = async function () {
  const errors = this.validate()
  if (errors.length > 0) return { contact: null, errors }

  const contact = await ContactModel.create(this)
  return { contact, errors: null }
}

Contact.findById = async function (id) {
  if (typeof id !== 'string') return
  return await ContactModel.findById(id)
}

Contact.prototype.validate = function () {
  if (typeof this.name !== 'string') this.name = ''
  if (typeof this.surname !== 'string') this.surname = ''
  if (typeof this.email !== 'string') this.email = ''
  if (typeof this.phone !== 'string') this.phone = ''

  const errors = []

  if (!this.name) errors.push('Nome é obrigatório.')

  if (this.email && !validator.isEmail(this.email))
    errors.push('E-mail inválido.')

  if (!this.email && !this.phone)
    errors.push('E-mail ou telefone precisa ser preenchido.')

  return errors
}

module.exports = Contact
