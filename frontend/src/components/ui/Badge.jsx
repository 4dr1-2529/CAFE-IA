const variants = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  neutral: 'badge-neutral',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return <span className={`${variants[variant] || variants.neutral} ${className}`}>{children}</span>
}
