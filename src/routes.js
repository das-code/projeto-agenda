const { Router } = require('express')
const route = Router()

const { loginRequired } = require('./middleware/middleware')

const homeController = require('./controllers/homeController')
const loginController = require('./controllers/loginController')
const contactsController = require('./controllers/contactsController')

// pagina inicial
route.get('/', homeController.index)

// login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// contato
route.get('/contato/index', loginRequired, contactsController.index)
route.post('/contato/register', loginRequired, contactsController.register)
route.get('/contato/index/:id', loginRequired, contactsController.updateIndex)
route.post('/contato/update/:id', loginRequired, contactsController.update)
route.get('/contato/delete/:id', loginRequired, contactsController.delete)

module.exports = route
