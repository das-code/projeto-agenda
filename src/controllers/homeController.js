const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
  try {
    const contacts = await Contact.listAll()

    return res.render('index', { contacts })
  } catch (err) {
    console.log(err)
    return res.render('404')
  }
}
