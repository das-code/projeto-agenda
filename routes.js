const { Router } = require('express')
const route = Router()

const { homePage } = require('./src/controllers/home-controller')
const { formPage, sendFormData } = require('./src/controllers/form-controller')

// pagina inicial
route.get('/', homePage)

// pagina de formulário
route.get('/formulario', formPage)
route.post('/formulario', sendFormData)

module.exports = route
