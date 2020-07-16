const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String
})

const FormModel = mongoose.model('Form', FormSchema)
module.exports = FormModel
