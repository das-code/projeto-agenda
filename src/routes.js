const { Router } = require('express')
const route = Router()

const { homePage } = require('./controllers/home-controller')
const { formPage, sendFormData } = require('./controllers/form-controller')

// pagina inicial
route.get('/', homePage)

// pagina de formulário
route.get('/formulario', formPage)
route.post('/formulario', sendFormData)

module.exports = route
