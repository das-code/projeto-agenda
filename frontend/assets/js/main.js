import 'core-js/stable'
import 'regenerator-runtime/runtime'

import '../images/contacts.png'
import '../images/favicon/contacts-favicon.ico'

console.log('olá browser')

const flashMessage = document.querySelector('.flash-message')

setTimeout(() => {
  flashMessage.parentElement.removeChild(flashMessage)
}, 5000)