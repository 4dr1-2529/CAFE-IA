import PropTypes from 'prop-types'

export default function PageLoader({ label = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 animate-fadeIn" role="status">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-700" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spinSlow" />
      </div>
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
  )
}

PageLoader.propTypes = {
  label: PropTypes.string,
}
