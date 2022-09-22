import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Box, Card, List, Typography } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

// Components
import { NavigationItem } from './NavigationItem';

// Other resources
import { ROUTES } from '../../constants/routes';
import { STRINGS } from '../../constants/strings';

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
        <NavigationItem name={STRINGS.DASHBOARD} link={ROUTES.DASHBOARD} icon={<GridViewOutlinedIcon />} />
        <NavigationItem name={STRINGS.SALES} link={ROUTES.SALES} icon={<AccountBalanceWalletOutlinedIcon />} />
        <NavigationItem name={STRINGS.PRODUCTS} link={ROUTES.PRODUCTS} icon={<LocalMallOutlinedIcon />} />
        <NavigationItem name={STRINGS.CUSTOMERS} link={ROUTES.CUSTOMERS} icon={<BusinessCenterOutlinedIcon />} />
        <NavigationItem name={STRINGS.PRODUCTION} link={ROUTES.PRODUCTION} icon={<InventoryOutlinedIcon />} />
      </List>
      <Box onClick={clickHandler} className={classes.logOut}>
        <NavigationItem name={STRINGS.LOG_OUT} icon={<LogoutOutlinedIcon />} />
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
