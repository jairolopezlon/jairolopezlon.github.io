const modalMsg = document.querySelector('#modalMsg')
const errorNotification = document.querySelector('.error-notification')
const modalMsgBody = document.querySelector('#modalMsg .modal-body')
const btnEncrypt = document.querySelector('#btnEncrypt')
const btnDecrypt = document.querySelector('#btnDecrypt')
const btnCopy = document.querySelector('#btnCopyText')
const outputTextarea = document.querySelector('#outputTextarea')
const inputTextarea = document.querySelector('#inputTextarea')
const modalErrorContainer = document.querySelector('.modal-errors-container')
const modalErrorMsgEmpty = document.querySelector('.msg-empty')
const modalErrorMsgUppercase = document.querySelector('.msg-uppercase')
const modalErrorMsgSymbols = document.querySelector('.msg-symbols')

const MSG_EMPTY = 'Por favor, ingresa el mensaje que deseas encriptar o desencriptar.'
const MSG_UPPERCASE = 'Por favor, ingresa solo letras minúsculas; no se permiten mayúsculas.'
const MSG_SYMBOLS = 'Por favor, ingresa solo letras minúsculas; no se permiten acentos ni símbolos.';
const MSG_COPY = 'El mensaje ha sido copiado.';

let timeoutId;

function showErrorNotification(isShowing) {
  if (isShowing) {
    errorNotification.style.display = 'flex'
    return
  }
  modalErrorContainer.style.display = 'none'
  errorNotification.style.display = 'none'
}

function closeModalMsg() {
  modalMsg.style.display = 'none'
  timeoutId = null
}

function showModalMsg(msg, modalType = undefined) {
  modalMsgBody.textContent = msg
  modalMsg.style.display = 'flex'

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    closeModalMsg()
  }, 3000)
}

function validateInput(textarea) {

  const textValue = textarea.value
  enableBtnActions(false)

  modalErrorMsgSymbols.style.display = 'none'
  modalErrorMsgUppercase.style.display = 'none'
  modalErrorMsgEmpty.style.display = 'none'

  if (isEmpty(textValue)) {
    showModalMsg(MSG_EMPTY)
    showErrorNotification(true)
    modalErrorMsgEmpty.style.display = 'list-item'
    return
  }

  if (hasUpperCase(textValue)) {
    showModalMsg(MSG_UPPERCASE)
    showErrorNotification(true)
    modalErrorMsgUppercase.style.display = 'list-item'
    return
  }

  if (hasSymbols(textValue)) {
    showModalMsg(MSG_SYMBOLS)
    showErrorNotification(true)
    modalErrorMsgSymbols.style.display = 'list-item'
    return
  }

  closeModalMsg()
  showErrorNotification(false)
  enableBtnActions(true)
}

function hasUpperCase(text) {
  return /[A-Z]/.test(text)
}
function hasSymbols(text) {
  return !/^[a-z\s]+$/.test(text)
}
function isEmpty(text) {
  return text === ''
}

function enableBtnActions(enable) {
  if (enable) {
    btnDecrypt.removeAttribute('disabled')
    btnEncrypt.removeAttribute('disabled')
  } else {
    btnDecrypt.setAttribute('disabled', true)
    btnEncrypt.setAttribute('disabled', true)
  }
}

function getTextFromTextArea() {
  return inputTextarea.value
}
function setTextToOutputText(value) {
  return outputTextarea.value = value
}

function encryptMsg() {
  const text = getTextFromTextArea()
  const newText = text.split('').map(char => {
    if (char === 'a') return 'ai'
    if (char === 'e') return 'enter'
    if (char === 'i') return 'imes'
    if (char === 'o') return 'ober'
    if (char === 'u') return 'ufat'
    return char
  }).join('')
  setTextToOutputText(newText)
}

function decryptMsg() {
  const text = getTextFromTextArea()
  const newText = text.replace(/enter/g, 'e').replace(/ufat/g, 'u').replace(/imes/g, 'i').replace(/ober/g, 'o').replace(/ai/g, 'a')
  setTextToOutputText(newText)
}

async function copyText() {
  const textValue = outputTextarea.value
  await navigator.clipboard.writeText(textValue)
  showModalMsg(MSG_COPY)
}

function showErrors(isShowing) {
  if (isShowing) {
    modalErrorContainer.style.display = 'flex'
    errorNotification.style.display = 'none'
    return
  }
  modalErrorContainer.style.display = 'none'
  errorNotification.style.display = 'flex'
}