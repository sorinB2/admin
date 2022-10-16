import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { DateClickArg } from '@fullcalendar/interaction';

// Components
import { AddNewProductionForm } from '../components/AddNewProduction/AddNewProductionForm';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ProductionModal } from '../components/Production/ProductionModal';
import { ProductionCalendar } from '../components/Production/ProductionCalendar';

// Actions
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setDate } from '../features/newProduction/slice';
import { getProduction } from '../features/allProduction/slice';
import { formatEventDate } from '../utils/formatDate';

// Other resources
import { STATUS } from '../constants/statuses';
import { Event, ProductionFetchData } from '../types/types';
import { Colors } from '../constants/colors';

export const Production = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { allProduction, status: allProductionStatus } = useAppSelector(state => state.allProduction);
  const { status: newProductionStatus } = useAppSelector(state => state.newProduction);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [selectedProduction, setSelectedProduction] = useState<ProductionFetchData>(allProduction[0]);
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

  const dateClickHandler = (event: DateClickArg) => {
    dispatch(setDate(event.date.toString()));
    setIsVisible(true);
  };

  const eventClickHandler = (eventId: string) => {
    const production = allProduction.find(item => item.id === eventId);
    production && setSelectedProduction(production);
    setModalIsVisible(true);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ProductionModal open={modalIsVisible} onClose={() => setModalIsVisible(false)} production={selectedProduction} />
      <Card className={classes.wrapper}>
        <ProductionCalendar dateClickHandler={dateClickHandler} events={events} onEventClick={eventClickHandler} />
        <AddNewProductionForm isVisible={isVisible} hideModal={() => setIsVisible(false)} />
      </Card>
    </>
  );
};

const useStyles = makeStyles()(theme => ({
  wrapper: {
    overflowY: 'hidden',
    position: 'relative',
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
