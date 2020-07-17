const { Router } = require('express')
const route = Router()

const homeController = require('./controllers/homeController')
const loginController = require('./controllers/loginController')

// pagina inicial
route.get('/', homeController.index)

// login
route.get('/login/index', loginController.index)

module.exports = route
