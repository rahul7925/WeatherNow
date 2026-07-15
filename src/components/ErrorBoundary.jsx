import { Component } from 'react'

/**
 * Catches unexpected runtime errors anywhere in the component tree
 * and shows a graceful fallback instead of a blank page.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Unknown error' }
  }

  componentDidCatch(error, info) {
    // In production you would send this to a logging service (e.g. Sentry)
    console.error('[ErrorBoundary]', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="eb-wrap" role="alert">
        <div className="eb-card">
          <span className="eb-icon" aria-hidden="true">⚠️</span>
          <h2 className="eb-title">Something went wrong</h2>
          <p className="eb-msg">{this.state.message}</p>
          <button className="eb-btn" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
