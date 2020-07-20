const Contact = require('../models/ContactModel')
const { subscribe } = require('../routes')

exports.index = (req, res) => {
  res.render('contacts', {
    contact: { name: '', surname: '', email: '', phone: '' },
  })
}

exports.register = async (req, res) => {
  try {
    const name = req.body.username
    const surname = req.body.surname
    const email = req.body.email
    const phone = req.body.phone

    const contact = new Contact(name, surname, email, phone)

    await contact.register()

    if (contact.errors.length > 0) {
      req.flash('errorsMessages', contact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Contato foi registrado com sucesso.')
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
