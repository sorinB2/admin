import React, { useState } from 'react';
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from 'tss-react/mui';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useNavigate } from 'react-router-dom';

// Actions
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setCustomer } from '../../features/newCustomer/slice';
import { setCustomerId } from '../../features/editCustomer/slice';
import { formatNumber } from '../../utils/formatNumber';
import { getProducts } from '../../features/allProducts/slice';

// Other resources
import { CustomerFetchData } from '../../types/types';
import { STRINGS } from '../../constants/strings';
import { ROUTES } from '../../constants/routes';

export const CustomersTableRow = ({ customerData }: { customerData: CustomerFetchData }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes, cx } = useStyles();
  const { name, location, products, receivables, phone, id } = { ...customerData };
  const [open, setOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const optionsOpen = Boolean(anchorEl);

  const optionsCloseHandler = () => {
    setAnchorEl(null);
  };

  const editCustomerHandler = async () => {
    dispatch(setCustomer({ name, location, phone, receivables, products }));
    dispatch(setCustomerId(id));
    await dispatch(getProducts());
    navigate(ROUTES.EDIT_CUSTOMER);
  };

  const deleteCustomerHandler = () => {
    setAnchorEl(null);
  };

  const optionsClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        <TableCell align="right" className={classes.buttonCell}>
          <Button
            className={classes.optionsButton}
            id={id}
            aria-controls={optionsOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={optionsOpen ? 'true' : undefined}
            onClick={optionsClickHandler}
          >
            <MoreVertOutlinedIcon />
          </Button>
          <Menu
            className={classes.optionsMenu}
            id="basic-menu"
            anchorEl={anchorEl}
            open={optionsOpen}
            onClose={optionsCloseHandler}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem className={classes.optionsMenuItem} onClick={editCustomerHandler}>
              Edit
            </MenuItem>
            <MenuItem className={classes.optionsMenuItem} onClick={deleteCustomerHandler}>
              Delete
            </MenuItem>
          </Menu>
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
                      {STRINGS.PRODUCT}
                    </TableCell>
                    <TableCell align="right" className={classes.collapseHeader}>
                      {STRINGS.PRICE} (mdl)
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
  buttonCell: {
    width: '36px',
  },
  optionsButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
  },
  optionsMenu: {
    '& .MuiPaper-root': {
      border: `0.5px solid ${theme.palette.primary.light}`,
    },
    '& .MuiMenu-list': {
      padding: `${theme.spacing(1)} 0`,
    },
  },
  optionsMenuItem: {
    padding: `${theme.spacing(0.5)} ${theme.spacing(3)}`,
  },
}));
