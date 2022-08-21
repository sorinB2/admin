import React from 'react';
import { Pagination } from '@mui/material';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';

export const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      count={pageCount}
      page={page + 1}
      siblingCount={0}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};
