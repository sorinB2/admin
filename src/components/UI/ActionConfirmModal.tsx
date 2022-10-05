import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Modal, Typography } from '@mui/material';

// Other resources
import { ActionConfirmModalProps } from '../../types/types';
import { STRINGS } from '../../constants/strings';

export const ActionConfirmModal = ({
  id,
  isVisible,
  title,
  description,
  confirmHandler,
  closeHandler,
}: ActionConfirmModalProps) => {
  const { classes } = useStyles();
  return (
    <Modal open={isVisible} className={classes.modal} onClose={closeHandler}>
      <Box className={classes.wrapper}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
        <Box className={classes.buttonsBox}>
          <Button variant="outlined" className={classes.button} onClick={closeHandler}>
            {STRINGS.CANCEL}
          </Button>
          <Button variant="contained" className={classes.button} onClick={confirmHandler} id={id}>
            {STRINGS.CONFIRM}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles()(theme => ({
  modal: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    boxSizing: 'border-box',
    outline: 'none',
    width: '500px',
    height: '250px',
    display: 'grid',
  },
  title: {
    fontWeight: '600',
  },
  buttonsBox: {
    alignSelf: 'end',
    justifySelf: 'end',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2),
  },
  button: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
}));
