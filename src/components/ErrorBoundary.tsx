import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/** Catches unhandled errors in the component tree and renders a fallback UI. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  /** Updates state to trigger fallback UI when a descendant throws. */
  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  /** Logs the caught error to the console for debugging. */
  componentDidCatch(error: unknown) {
    console.error(error);
  }

  /** Renders children normally, or a fallback UI with a retry button on error. */
  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-fallback">
          <p role="alert">Something went wrong.</p>
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children;
  }
}