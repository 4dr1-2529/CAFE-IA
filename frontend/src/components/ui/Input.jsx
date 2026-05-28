export default function Input({ className = '', error, ...props }) {
  return (
    <input
      className={`input-field ${error ? 'input-field-error' : ''} ${className}`}
      {...props}
    />
  )
}
