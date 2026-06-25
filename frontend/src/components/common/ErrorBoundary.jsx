import { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle, RefreshCw } from 'lucide-react'

import { isChunkLoadError } from '../../utils/deployGuard.js'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.error('ErrorBoundary capturó un error:', error, errorInfo)
    if (isChunkLoadError(error)) {
      globalThis.location.reload()
    }
  }

  handleRetry = () => {
    if (isChunkLoadError(this.state.error)) {
      globalThis.location.reload()
      return
    }
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cafe-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-cafe-900 mb-4">Error en componente</h1>
            <p className="text-cafe-600 mb-6">
              {isChunkLoadError(this.state.error)
                ? 'Hay una versión nueva de la aplicación. Pulse reintentar para recargar la página.'
                : 'Ha ocurrido un error en este componente. Revisa la consola para más detalles.'}
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 bg-cafe-600 text-white px-6 py-3 rounded-lg hover:bg-cafe-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-cafe-500 hover:text-cafe-700">
                  Detalles técnicos
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack || "Sin detalles del componente"}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}