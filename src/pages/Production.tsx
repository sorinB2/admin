import React, { useRef, useState } from 'react';
import { Box, Button, Card, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

// Components
import { AddNewProductionForm } from '../components/AddNewProduction/AddNewProductionForm';

// Actions
import { useAppDispatch } from '../hooks/reduxHooks';
import { setDate } from '../features/newProduction/slice';

// Other resources
import { STRINGS } from '../constants/strings';

export const Production = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const events = [
    {
      title: 'Produced',
      start: '2022-10-06',
      end: '2022-10-06',
      allday: true,
    },
    {
      title: 'Test2',
      start: '2022-10-07',
      end: '2022-10-07',
      allday: true,
    },
    {
      title: 'Test3',
      start: '2022-10-08',
      end: '2022-10-08',
      allday: true,
      id: 'ceva',
    },
  ];

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

  const dateClickHandler = (event: DateClickArg) => {
    dispatch(setDate(event.date.toString()));
    setIsVisible(true);
  };

  return (
    <Card className={classes.wrapper}>
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
      <AddNewProductionForm isVisible={isVisible} hideModal={() => setIsVisible(false)} />
      <FullCalendar
        ref={calendarRef}
        viewClassNames={classes.calendar}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        headerToolbar={{
          right: '',
        }}
        dateClick={dateClickHandler}
        events={events}
        eventClick={event => console.log(event.event._def.publicId)}
      />
    </Card>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  calendar: {
    overflow: 'hidden',
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
