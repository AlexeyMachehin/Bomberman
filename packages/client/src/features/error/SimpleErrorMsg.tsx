import { FC } from 'react';
import classes from './simpleErrorMsg.module.css';

const SimpleErrorMsg: FC<{ error: Error }> = ({ error }) => {
  return (
    <div className={classes.container}>
      <p className={classes.header}>Something went wrong!</p>
      <p className={classes.error}>{error.message}</p>
    </div>
  );
};

export default SimpleErrorMsg;
