const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
  res.render('contacts', {
    contact: { name: '', surname: '', email: '', phone: '' },
  })
}

exports.register = async (req, res) => {
  try {
    const { username: name, surname, email, phone } = req.body
    const newContact = new Contact(name, surname, email, phone)

    const contact = await newContact.register()

    if (contact.errors && contact.errors.length > 0) {
      req.flash('errorsMessages', contact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu novo contato foi registrado com sucesso.')
    req.session.save(() =>
      res.redirect(`/contato/index/${contact.contact._id}`)
    )
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render('404')

  const contact = await Contact.searchById(req.params.id)
  if (!contact) return res.render('404')

  res.render('contacts', { contact })
}
