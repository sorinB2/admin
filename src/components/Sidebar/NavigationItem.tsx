import React, { ReactElement } from 'react';
import { ListItem, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

export const NavigationItem = ({ icon, name, link }: NavigationProps) => {
  const location = useLocation();
  const isActive = link ? location.pathname.includes(link) : false;
  const navigate = useNavigate();
  const { classes } = useStyles({ isActive });

  const clickHandler = () => {
    if (link) navigate(link);
  };

  return (
    <Button onClick={clickHandler} className={classes.navigationItem}>
      <ListItem>
        {icon}
        <Typography variant="h5" className={classes.menuItem}>
          {name}
        </Typography>
      </ListItem>
    </Button>
  );
};

const useStyles = makeStyles<{ isActive: boolean }>()((theme, { isActive }) => ({
  navigationItem: {
    cursor: 'pointer',
    backgroundColor: isActive ? theme.palette.primary.main : '',
    color: isActive ? '#FBFDFE' : '#809FB8',
    width: '200px',
    height: '50px',
    display: 'grid',
    alignItems: 'center',
    borderRadius: '8px',
    boxSizing: 'border-box',
    justifyContent: 'start',
    '&:hover': {
      backgroundColor: isActive ? theme.palette.primary.main : '',
    },
  },
  menuItem: {
    paddingLeft: '10px',
  },
}));

interface NavigationProps {
  icon: ReactElement;
  name: string;
  link?: string;
}
