const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdById: { type: mongoose.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
})

const ContactModel = mongoose.model('Contact', contactSchema)

function Contact(name, surname, email, phone) {
  this.name = name
  this.surname = surname
  this.email = email
  this.phone = phone
}

Contact.prototype.register = async function (createdById) {
  const errors = this.validate()
  if (errors.length > 0) return { contact: null, errors }

  const contact = await ContactModel.create({ ...this, createdById })
  return { contact, errors: null }
}

Contact.prototype.update = async function (id) {
  if (typeof id !== 'string') return

  const errors = this.validate()
  if (errors.length > 0) return { contact: null, errors }

  const contact = await ContactModel.findByIdAndUpdate(id, this, { new: true })
  return { contact, errors: null }
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

// Static methods
Contact.findById = async function (id) {
  if (typeof id !== 'string') return

  const contact = await ContactModel.findById(id)
  return contact ? contact : null
}

Contact.listAll = async function (loggedUserId) {
  if (!loggedUserId) return null

  const contacts = await ContactModel.find({ createdById: loggedUserId }).sort({
    createdAt: -1,
  })

  return contacts ? contacts : null
}

Contact.delete = async function (id) {
  if (typeof id !== 'string') return

  return await ContactModel.findByIdAndDelete(id)
}

module.exports = Contact
