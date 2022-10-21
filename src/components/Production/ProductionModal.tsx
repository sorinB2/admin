import React from 'react';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// Actions
import { formatDate } from '../../utils/formatDate';

// Other resources
import { ProductionModalProps } from '../../types/types';
import { STRINGS } from '../../constants/strings';
import { formatNumber } from '../../utils/formatNumber';

export const ProductionModal = ({ open, onClose, production }: ProductionModalProps) => {
  const { classes } = useStyles();
  return (
    <Modal open={open} className={classes.modal} onClose={onClose}>
      <Box className={classes.wrapper}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.WIPES_PRODUCTION}
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{STRINGS.PRODUCT}</TableCell>
                <TableCell>{STRINGS.UNITS}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {production?.products.map(item => (
                <TableRow key={item.id} className={classes.bodyTableRow}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {item.product}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{formatNumber(+item.units)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={classes.bottomWrapper}>
          <Typography variant="h5" className={classes.productionDate}>
            {formatDate(new Date(production?.date))}
          </Typography>
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
    outline: 'none',
    width: '700px',
    maxHeight: '600px',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    boxSizing: 'border-box',
    overflowY: 'scroll',
  },
  title: {
    fontWeight: '600',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  bodyTableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
  },
  tableCell: {
    fontSize: '14px',
  },
  bottomWrapper: {
    marginTop: theme.spacing(4),
  },
  productionDate: {
    color: theme.palette.primary.main,
  },
}));
