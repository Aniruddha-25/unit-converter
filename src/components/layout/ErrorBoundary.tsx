import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

/** A failed dynamic import (network drop, or a stale chunk after a new deploy) rather than a bug in the converter. */
const isChunkLoadError = (e: Error) => /dynamically imported module|importing a module script|failed to fetch|loading chunk|ChunkLoadError|unable to preload/i.test(`${e.name} ${e.message}`)

/**
 * Keeps a failure inside one converter from blanking the whole app. Covers both render errors and failed
 * chunk loads (React.lazy rejects once and caches it, so a load failure is retried with a page reload).
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Converter crashed:', error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children
    const loadFailed = isChunkLoadError(error)
    return (
      <div className="soon" role="alert">
        <h2>Something went wrong</h2>
        <p>{loadFailed ? 'This converter could not be loaded. Check your connection and try again.' : `This converter failed to load: ${error.message}`}</p>
        <button type="button" className="uc-clear" onClick={() => (loadFailed ? window.location.reload() : this.setState({ error: null }))}>
          {loadFailed ? 'Reload page' : 'Try again'}
        </button>
      </div>
    )
  }
}
