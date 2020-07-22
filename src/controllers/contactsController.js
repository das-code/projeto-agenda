const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
  res.render('contacts', { contact: null })
}

exports.register = async (req, res) => {
  try {
    const { name, surname, email, phone } = req.body
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

exports.updateIndex = async (req, res) => {
  if (!req.params.id) return res.render('404')

  const contact = await Contact.findById(req.params.id)
  if (!contact) return res.render('404')

  res.render('contacts', { contact })
}

exports.update = async (req, res) => {
  if (!req.params.id) return res.render('404')

  try {
    const { name, surname, email, phone } = req.body
    const contact = new Contact(name, surname, email, phone)
    const updatedContact = await contact.update(req.params.id)

    if (updatedContact.errors && updatedContact.errors.length > 0) {
      req.flash('errorsMessages', updatedContact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu contato foi atualizado com sucesso.')
    req.session.save(() =>
      res.redirect(`/contato/index/${updatedContact.contact._id}`)
    )
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}
