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
  this.errors = []
  this.contact = null
}

Contact.prototype.register = async function () {
  this.validate()
  if (this.errors.length > 0) return

  const contact = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    phone: this.phone,
  }

  this.contact = await ContactModel.create(contact)
}

Contact.searchById = async function (id) {
  if (typeof id !== 'string') return
  const contact = await ContactModel.findById(id)
  return contact
}

Contact.prototype.validate = function () {
  if (typeof this.name !== 'string') this.name = ''
  if (typeof this.surname !== 'string') this.surname = ''
  if (typeof this.email !== 'string') this.email = ''
  if (typeof this.phone !== 'string') this.phone = ''

  if (!this.name) this.errors.push('Nome é obrigatório.')
  if (this.email && !validator.isEmail(this.email))
    this.errors.push('E-mail inválido.')
  if (!this.email && !this.phone)
    this.errors.push('E-mail ou telefone precisa ser preenchido.')
}

module.exports = Contact
