export default function Card({ children, className = '', interactive = false, flat = false }) {
  const base = flat ? 'card-panel-flat' : interactive ? 'card-panel-interactive' : 'card-panel'
  return <div className={`${base} ${className}`}>{children}</div>
}
