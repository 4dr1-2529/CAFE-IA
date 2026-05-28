export default function Select({ className = '', error, children, ...props }) {
  return (
    <select
      className={`input-field ${error ? 'input-field-error' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
