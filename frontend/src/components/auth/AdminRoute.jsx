import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { ROUTES } from '../../constants/routes.js'

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin h-10 w-10 border-b-2 border-amber-600 rounded-full" />
      </div>
    )
  }
  if (user?.rol !== 'admin') {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }
  return children
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
