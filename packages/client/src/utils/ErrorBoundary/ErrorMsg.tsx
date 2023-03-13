import { FC } from 'react';

const ErrorMsg: FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <p>Something went wrong!</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorMsg;
