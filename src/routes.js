const { Router } = require('express')
const route = Router()

const homeController = require('./controllers/homeController')
const loginController = require('./controllers/loginController')

// pagina inicial
route.get('/', homeController.index)

// login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

module.exports = route
