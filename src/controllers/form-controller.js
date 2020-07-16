const FormModel = require('../models/FormModel')

exports.formPage = (req, res) => {
  res.render('form')
  return
}

// recebe os dados do formulário no corpo da requisição
exports.sendFormData = (req, res) => {
  const data = req.body
  FormModel.create(data)

  res.send(data)
  return
}
