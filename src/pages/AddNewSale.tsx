import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { AddNewSaleForm } from '../components/AddNewSale/AddNewSaleForm';

// Actions
import { addReceivables, createNewSale, discardData, updateProduct } from '../features/newSale/slice';
import { errorSnackBar, successSnackBar } from '../features/snackBar/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getCustomers } from '../features/allCustomers/slice';
import { getProducts } from '../features/allProducts/slice';

// Other resources
import { ROUTES } from '../constants/routes';
import { STATUS } from '../constants/statuses';
import { STRINGS } from '../constants/strings';

export const AddNewSale = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sale, status, error } = useAppSelector(state => state.newSale);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.SALE_SUCCESS));
      navigate(ROUTES.SALES);
      setTimeout(() => dispatch(discardData()), 1000);
    }
  }, [status]);

  const createSale = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createNewSale(sale));

    const receivables = (+sale.customer.receivables + sale.totalIncome).toFixed(2);
    dispatch(addReceivables({ uid: sale.customer.id as string, data: receivables }));

    sale.order.forEach(product => {
      const stock = (+product.product.stock - +product.units).toFixed();
      dispatch(updateProduct({ uid: product.product.id, data: stock }));
    });
  };

  return <AddNewSaleForm submitHandler={createSale} buttonTitle={STRINGS.ADD_SALE} title={STRINGS.ADD_NEW_SALE} />;
};
