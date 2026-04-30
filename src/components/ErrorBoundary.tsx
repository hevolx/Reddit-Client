import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-fallback">
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      )
    }
    return this.props.children;
  }
}