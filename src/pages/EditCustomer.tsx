import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { AddNewCustomerForm } from '../components/AddNewCustomer/AddNewCustomerForm';

// Actions
import { discardData, setSelectedProducts } from '../features/newCustomer/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { discardEditCustomerData, editCustomer } from '../features/editCustomer/slice';
import { errorSnackBar, successSnackBar } from '../features/snackBar/slice';

// Other resources
import { STRINGS } from '../constants/strings';
import { STATUS } from '../constants/statuses';
import { ROUTES } from '../constants/routes';

export const EditCustomer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customer } = useAppSelector(state => state.newCustomer);
  const { customerId, status, error } = useAppSelector(state => state.editCustomer);

  useEffect(() => {
    const products: string[] = [];
    customer.products.forEach(item => products.push(item.id));
    dispatch(setSelectedProducts(products));
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.EDIT_CUSTOMER_SUCCESS));
      navigate(ROUTES.CUSTOMERS);
      setTimeout(() => {
        dispatch(discardData());
        dispatch(discardEditCustomerData());
      }, 1000);
    }
  }, [status]);

  const editCustomerData = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(editCustomer({ uid: customerId, data: customer }));
  };
  return (
    <AddNewCustomerForm
      submitHandler={editCustomerData}
      buttonTitle={STRINGS.EDIT_CUSTOMER}
      title={STRINGS.EDIT_CUSTOMER}
    />
  );
};
