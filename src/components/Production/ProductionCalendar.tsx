import React, { useRef } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

// Other resources
import { STRINGS } from '../../constants/strings';
import { ProductionCalendarProps } from '../../types/types';

export const ProductionCalendar = ({ dateClickHandler, events, onEventClick }: ProductionCalendarProps) => {
  const { classes } = useStyles();
  const calendarRef = useRef<FullCalendar | null>(null);

  const previousMonthHandler = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.prev();
  };

  const nextMonthHandler = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.next();
  };

  const todayHandler = () => {
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi?.today();
  };
  return (
    <>
      <Box className={classes.buttonsBox}>
        <Button onClick={todayHandler} className={classes.todayButton}>
          {STRINGS.TODAY}
        </Button>
        <IconButton onClick={previousMonthHandler}>
          <KeyboardArrowLeftOutlinedIcon />
        </IconButton>
        <IconButton onClick={nextMonthHandler}>
          <KeyboardArrowRightOutlinedIcon />
        </IconButton>
      </Box>
      <FullCalendar
        ref={calendarRef}
        viewClassNames={classes.calendar}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        eventDisplay="auto"
        headerToolbar={{
          right: '',
        }}
        dateClick={dateClickHandler}
        events={events}
        eventClick={event => onEventClick(event.event._def.publicId)}
      />
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  calendar: {
    overflowY: 'hidden',
  },
  buttonsBox: {
    position: 'absolute',
    right: '0',
  },
  todayButton: {
    color: '#3C4043',
    border: `1px solid ${theme.palette.secondary.light}`,
    marginRight: theme.spacing(2),
  },
}));
