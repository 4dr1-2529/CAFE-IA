export default function FormField({ label, name, error, children, required }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="label-field">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-error" role="alert">{error}</p>}
    </div>
  )
}
