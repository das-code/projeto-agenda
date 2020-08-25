import 'core-js/stable'
import 'regenerator-runtime/runtime'

import '../images/contacts.png'
import '../images/favicon/contacts-favicon.ico'

import validateLoginAndCreate from './modules/validateLoginAndCreate'
import validateContact from './modules/validateContact'

validateLoginAndCreate('.form-login')
validateLoginAndCreate('.form-register')
validateContact('.form-contact')

import fadeOutAlerts from './modules/fadeOutAlerts'

fadeOutAlerts()
