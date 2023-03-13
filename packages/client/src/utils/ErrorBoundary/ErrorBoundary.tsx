import { Component, ErrorInfo, createContext, useContext } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  TriggerErrorType,
} from './errorBoundaryTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ErrorBoundaryContext = createContext<TriggerErrorType>(() => {});

export const useErrorHandling = () => {
  return useContext(ErrorBoundaryContext);
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { error: null };

  static getDerivedStateFromError(err: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { error: err };
  }

  componentDidCatch(err: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.error({ err, errorInfo });
  }

  triggerError: TriggerErrorType = ({ err, errorInfo }) => {
    console.error({ err, errorInfo });
    this.setState({ error: err });
  };

  render() {
    const { error } = this.state;

    return (
      <ErrorBoundaryContext.Provider value={this.triggerError}>
        {error ? (
          <this.props.ErrorComponent error={error} />
        ) : (
          this.props.children
        )}
      </ErrorBoundaryContext.Provider>
    );
  }
}
