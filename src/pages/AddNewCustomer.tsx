import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { AddNewCustomerForm } from '../components/AddNewCustomer/AddNewCustomerForm';

// Actions
import { createNewCustomer, discardData } from '../features/newCustomer/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { errorSnackBar, successSnackBar } from '../features/snackBar/slice';
import { getProducts } from '../features/allProducts/slice';

// Other resources
import { STRINGS } from '../constants/strings';
import { STATUS } from '../constants/statuses';
import { ROUTES } from '../constants/routes';

export const AddNewCustomer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customer, status, error } = useAppSelector(state => state.newCustomer);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.CUSTOMER_SUCCESS));
      navigate(ROUTES.CUSTOMERS);
      setTimeout(() => dispatch(discardData()), 1000);
    }
  }, [status]);

  const createCustomer = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewCustomer(customer));
  };

  return (
    <AddNewCustomerForm
      submitHandler={createCustomer}
      buttonTitle={STRINGS.ADD_CUSTOMER}
      title={STRINGS.ADD_NEW_CUSTOMER}
    />
  );
};
