import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Box, Card, List, Typography } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// Components
import { NavigationItem } from './NavigationItem';

// Other resources
import { ROUTES } from '../../constants/routes';

export const Sidebar = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const clickHandler = () => {
    sessionStorage.removeItem('authToken');
    navigate(ROUTES.LOGIN);
  };

  return (
    <Card className={classes.sidebar}>
      <Typography className={classes.brandName}>Admin Panel</Typography>
      <List className={classes.menuItems}>
        <NavigationItem name={'Dashboard'} link={ROUTES.DASHBOARD} icon={<GridViewOutlinedIcon />} />
        <NavigationItem name={'Sales'} link={ROUTES.SALES} icon={<AccountBalanceWalletOutlinedIcon />} />
        <NavigationItem name={'Products'} link={ROUTES.PRODUCTS} icon={<LocalMallOutlinedIcon />} />
        <NavigationItem name={'Customers'} link={ROUTES.CUSTOMERS} icon={<BusinessCenterOutlinedIcon />} />
      </List>
      <Box onClick={clickHandler} className={classes.logOut}>
        <NavigationItem name={'Log out'} icon={<LogoutOutlinedIcon />} />
      </Box>
    </Card>
  );
};

const useStyles = makeStyles()(() => ({
  sidebar: {
    backgroundColor: 'transparent',
    paddingTop: '40px',
    position: 'relative',
  },
  brandName: {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
  },
  menuItems: {
    display: 'grid',
    marginTop: '30px',
    gridGap: '10px',
  },
  logOut: {
    position: 'absolute',
    bottom: '30px',
  },
}));
