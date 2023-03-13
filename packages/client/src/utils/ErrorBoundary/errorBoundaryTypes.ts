import { ErrorInfo, FC } from 'react';

export type TriggerErrorType = ({
  err,
  errorInfo,
}: {
  err: Error;
  errorInfo?: ErrorInfo;
}) => void;

export type ErrorBoundaryProps = {
  children?: JSX.Element;
  ErrorComponent: FC<{ error: Error }>;
};

export type ErrorBoundaryState = { error: Error | null };
