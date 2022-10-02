import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { AddNewSaleForm } from '../components/AddNewSale/AddNewSaleForm';

// Actions
import { discardData, setSelectedProducts } from '../features/newSale/slice';
import { errorSnackBar, successSnackBar } from '../features/snackBar/slice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { discardEditSaleData, editSale } from '../features/editSale/slice';

// Other resources
import { ROUTES } from '../constants/routes';
import { STATUS } from '../constants/statuses';
import { STRINGS } from '../constants/strings';
// import { SaleData } from '../types/types';

export const EditSale = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [prevSale, setPrevSale] = useState<SaleData>();
  const { sale } = useAppSelector(state => state.newSale);
  const { saleId, status, error } = useAppSelector(state => state.editSale);

  useEffect(() => {
    const products: string[] = [];
    sale.order.forEach(item => products.push(item.product.id));
    dispatch(setSelectedProducts(products));
    // setPrevSale(sale);
  }, []);

  useEffect(() => {
    if (status === STATUS.FAILED) dispatch(errorSnackBar(error));
    if (status === STATUS.FULFILLED) {
      dispatch(successSnackBar(STRINGS.EDIT_SALE_SUCCESS));
      navigate(ROUTES.SALES);
      setTimeout(() => {
        dispatch(discardData());
        dispatch(discardEditSaleData());
      }, 1000);
    }
  }, [status]);

  const editSaleData = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(editSale({ uid: saleId, data: sale }));

    // const saleBeforeEdit = prevSale as SaleData;
    // console.log(+sale.customer.receivables);
    // console.log(sale.totalIncome);

    // console.log(saleBeforeEdit.totalIncome);

    // const receivables = (+sale.customer.receivables + sale.totalIncome - saleBeforeEdit.totalIncome).toFixed(2);
    // dispatch(addReceivables({ uid: sale.customer.id as string, data: receivables }));

    // sale.order.forEach((product, i) => {
    //   const stock = (+product.product.stock - +product.units + +sale.order[i].product.stock).toFixed();
    //   dispatch(updateProduct({ uid: product.product.id, data: stock }));
    // });
  };

  return <AddNewSaleForm submitHandler={editSaleData} buttonTitle={STRINGS.EDIT_SALE} title={STRINGS.EDIT_SALE} />;
};
