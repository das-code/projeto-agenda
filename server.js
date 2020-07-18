require('dotenv').config()
process.env.NODE_ENV

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const helmet = require('helmet')
const csurf = require('csurf')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flashMessage = require('connect-flash')

const routes = require('./src/routes')
const {
  globalData,
  checkCsrfError,
  csrfMiddleware,
} = require('./src/middleware/middleware')

const app = express()

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database: it's ready..."))
  .then(() => app.emit('ready'))
  .catch((err) => console.log(err))

app.use(helmet())
// Adiciona a capacidade de lidar com dado que chegam no corpo da requisição.
// Converte o corpo da requisição para um objeto javascript.
app.use(express.urlencoded({ extended: true }))

// Seta o caminho da pasta de aquivos estáticos.
app.use(express.static(path.resolve('./public')))

const sessionOptions = session({
  secret: '42lkj342gb34khj2g34kg2j3hfk2hj52ghgdsx2fh35k2gh3xds',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
})

app.use(sessionOptions)
// Cria mensagens que se autodestrói depois de lidas.
app.use(flashMessage())

// Seta o caminho da pasta de views e a engine de renderização.
app.set('views', path.resolve('./src/views'))
app.set('view engine', 'pug')

app.use(csurf())

// Middleware disparado para todas as rotas.
app.use(globalData)
app.use(checkCsrfError)
app.use(csrfMiddleware)

// Usa as rotas criadas no arquivo "routes.js".
app.use(routes)

// Quando o banco de dados estiver proto começa a escutar na porta.
app.on('ready', () => {
  app.listen(3000, () => {
    console.log("Server: it's ready...")
    console.log('Access: http://localhost:3000')
  })
})
