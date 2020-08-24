import validator from 'validator'
import showFormWarning from './createWarning'

export default function validateLoginAndCreate(formClass) {
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
  const emailInput = formElement.querySelector('input[name="email"]')
  const passwordInput = formElement.querySelector('input[name="password"]')

  let error = false

  if (!validator.isEmail(emailInput.value)) {
    showFormWarning(formElement, '.email-group', 'Email inválido!')
    error = true
  }

  if (passwordInput.value.length < 6 || passwordInput.value.length > 30) {
    showFormWarning(
      formElement,
      '.password-group',
      'A senha precisa ter entre 6 a 30 caracteres.'
    )
    error = true
  }

  return error
}
