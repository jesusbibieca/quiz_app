import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Typography, Slide, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStoreState } from 'easy-peasy';

const useStyles = makeStyles({
  snackbar: {
    width: '500px',
    display: 'flex',
    alignItems: 'center'
  }
});

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function Notification({ handleClose }) {
  const classes = useStyles();

  const showNotification = useStoreState((state) => state.notification.open);
  const { severity, message } = useStoreState((state) => state.notification);

  return (
    <Snackbar
      open={showNotification}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={2500}
      TransitionComponent={SlideTransition}
    >
      <Alert className={classes.snackbar} severity={severity}>
        <Typography variant="h6" component="p" align="center">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

Notification.propTypes = {
  handleClose: PropTypes.func
};

export default Notification;
