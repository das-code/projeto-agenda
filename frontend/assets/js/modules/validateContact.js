import validator from 'validator'
import showFormWarning from './createWarning'

export default function validateContact(formClass) {
  const formElement = document.querySelector(formClass)

  if (!formElement) return

  formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const error = validateForm(formElement)
    if (error) return

    formElement.submit()
  })
}

function validateForm(formElement) {
  const nameInput = formElement.querySelector('input[name="name"]')
  const surnameInput = formElement.querySelector('input[name="surname"]')
  const emailInput = formElement.querySelector('input[name="email"]')
  const phoneInput = formElement.querySelector('input[name="phone"]')

  let error = false

  if (!nameInput.value.length) {
    showFormWarning(formElement, '.name-group', 'Nome não informado')
    error = true
  }

  if (!surnameInput.value.length) {
    showFormWarning(formElement, '.surname-group', 'Sobrenome não informado!')
    error = true
  }

  if (!validator.isEmail(emailInput.value)) {
    showFormWarning(formElement, '.email-group', 'Email inválido!')
    error = true
  }

  if (phoneInput.value.length < 8 && phoneInput.value.length > 16) {
    showFormWarning(formElement, '.phone-group', 'Telefone inválido!')
    error = true
  }

  return error
}
