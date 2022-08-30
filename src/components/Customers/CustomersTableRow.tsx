import React, { useState } from 'react';
import { IconButton, Table, TableHead, TableBody, TableRow, TableCell, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from 'tss-react/mui';

// Other resources
import { CustomerData } from '../../types/types';
import { formatNumber } from '../../utils/formatNumber';

export const CustomersTableRow = ({ customerData }: { customerData: CustomerData }) => {
  const { name, location, products, receivables, phone } = { ...customerData };
  const [open, setOpen] = useState<boolean>(false);
  const { classes, cx } = useStyles();

  return (
    <>
      <TableRow className={classes.customerRow}>
        <TableCell className={classes.arrowCell}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {name}
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {location}
        </TableCell>
        <TableCell align="right" className={classes.tableCell}>
          {phone}
        </TableCell>
        <TableCell align="right" className={cx(classes.tableCell, classes.receivables)}>
          {formatNumber(receivables)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} className={classes.collapseCell}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" className={classes.collapseHeader}>
                      Product
                    </TableCell>
                    <TableCell align="right" className={classes.collapseHeader}>
                      Price ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell align="right" className={classes.collapseData}>
                        {product.product}
                      </TableCell>
                      <TableCell align="right" className={classes.collapseData}>
                        {product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  customerRow: {
    '& > *': { borderBottom: 'unset' },
  },
  tableCell: {
    color: '#000000DE',
    fontSize: '14px',
  },
  receivables: {
    color: theme.palette.secondary.main,
  },
  arrowCell: {
    width: '20px',
  },
  collapseCell: {
    padding: '0',
  },
  collapseHeader: {
    fontWeight: '600',
    fontSize: '13px',
    color: '#000000DE',
  },
  collapseData: {
    fontSize: '13px',
    color: '#000000DE',
  },
}));
