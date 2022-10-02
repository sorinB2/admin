import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

// Other resources
import { STRINGS } from '../../constants/strings';

export const Options = ({ id, onEdit, onDelete }: { id: string; onEdit: () => void; onDelete: () => void }) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const optionsOpen = Boolean(anchorEl);

  const optionsCloseHandler = () => {
    setAnchorEl(null);
  };

  const optionsClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        className={classes.optionsButton}
        id={id}
        aria-controls={optionsOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={optionsOpen ? 'true' : undefined}
        onClick={optionsClickHandler}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
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
        <MenuItem className={classes.optionsMenuItem} onClick={onEdit}>
          {STRINGS.EDIT}
        </MenuItem>
        <MenuItem
          className={classes.optionsMenuItem}
          onClick={() => {
            setAnchorEl(null);
            onDelete();
          }}
        >
          {STRINGS.DELETE}
        </MenuItem>
      </Menu>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
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
