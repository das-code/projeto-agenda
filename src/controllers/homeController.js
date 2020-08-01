const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
  try {
    const loggedUserId = req.session.user ? req.session.user._id : null
    const contacts = await Contact.listAll(loggedUserId)

    return res.render('index', { contacts })
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}
