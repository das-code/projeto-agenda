export default function showFormWarning(targetForm, inputGroup, msg) {
  const targetElement = targetForm.querySelector(inputGroup)

  const alertElement = document.createElement('small')
  alertElement.classList.add('form-text', 'text-danger')
  alertElement.textContent = msg

  // Whether the element already not exists
  if (!targetElement.querySelector('.form-text'))
    targetElement.appendChild(alertElement)
}
