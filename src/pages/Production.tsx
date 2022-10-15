import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

// Components
import { AddNewProductionForm } from '../components/AddNewProduction/AddNewProductionForm';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setDate } from '../features/newProduction/slice';
import { getProduction } from '../features/allProduction/slice';
import { formatEventDate } from '../utils/formatDate';

// Other resources
import { STRINGS } from '../constants/strings';
import { STATUS } from '../constants/statuses';
import { Event } from '../types/types';
import { Colors } from '../constants/colors';

export const Production = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const { status: newProductionStatus } = useAppSelector(state => state.newProduction);
  const { allProduction, status: allProductionStatus } = useAppSelector(state => state.allProduction);
  const isLoading = newProductionStatus === STATUS.PENDING || allProductionStatus === STATUS.PENDING;

  useEffect(() => {
    dispatch(getProduction());
  }, []);

  useEffect(() => {
    if (newProductionStatus === STATUS.FULFILLED) dispatch(getProduction());
  }, [newProductionStatus]);

  useEffect(() => {
    const allEvents = allProduction.map(item => {
      return {
        title: 'Servetele',
        start: formatEventDate(new Date(item.date)),
        className: classes.event,
        color: Colors.lightGreen,
        textColor: Colors.black,
        id: item.id,
      };
    });
    setEvents(allEvents);
  }, [allProduction]);

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
    <>
      {isLoading && <LoadingSpinner />}
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
          eventDisplay="auto"
          headerToolbar={{
            right: '',
          }}
          dateClick={dateClickHandler}
          events={events}
          eventClick={event => console.log(event.event._def.publicId)}
        />
      </Card>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    overflowY: 'hidden',
    position: 'relative',
  },
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
  event: {
    cursor: 'pointer',
    paddingLeft: theme.spacing(1),
    fontWeight: '500',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
}));
