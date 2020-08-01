const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
  res.render('contacts', { contact: null })
}

exports.register = async (req, res) => {
  try {
    const { name, surname, email, phone } = req.body
    const newContact = new Contact(name, surname, email, phone)

    const createdById = req.session.user._id
    
    const contact = await newContact.register(createdById)

    if (contact.errors && contact.errors.length > 0) {
      req.flash('errorsMessages', contact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('successMessage', 'Seu novo contato foi registrado com sucesso.')
    req.session.save(() =>
      res.redirect('/')
    )
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.updateIndex = async (req, res) => {
  if (!req.params.id) return res.render('404')

  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.render('404')

    res.render('contacts', { contact })
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
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
      res.redirect('/')
    )
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render('404')

  try {
    const deletedContact = await Contact.delete(req.params.id)

    req.flash(
      'successMessage',
      `O contato ${deletedContact.name} foi deletado com sucesso.`
    )
    req.session.save(() => res.redirect('back'))
    return
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}
