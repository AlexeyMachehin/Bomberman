import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../utils/hooks';
import { selectorUserError } from '../../store/user/selectors';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const errorText = useAppSelector(selectorUserError);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  React.useEffect(() => {
    if (errorText) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [errorText]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert severity="error">{errorText}</Alert>
      </Snackbar>
    </div>
  );
}
