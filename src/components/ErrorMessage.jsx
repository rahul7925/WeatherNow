import { FiAlertCircle } from 'react-icons/fi'

function ErrorMessage({ message }) {
  return (
    <div className="error-msg" role="alert">
      <FiAlertCircle className="error-msg__icon" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
