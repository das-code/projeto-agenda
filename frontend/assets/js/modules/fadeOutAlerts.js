export default function fadeOutAlerts() {
  const flashMessage = document.querySelector('.alert')

  setTimeout(() => {
    if (flashMessage) flashMessage.parentElement.removeChild(flashMessage)
  }, 10 * 1000)
}
