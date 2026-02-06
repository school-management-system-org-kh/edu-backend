import React from 'react';
import PaginationComponent from '../pagination/PaginationComponent';
const PaginationFetchData = ({ tableParams, setTableParams }) => {

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {

    }
  };

  return (
    <>
      <div className='w-100 mt-3'>
        <PaginationComponent
          onChange={(page, pageSize) => {
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination,
                current: page,
                pageSize: pageSize,
              },
            });
          }}
          tableParams={tableParams} setTableParams={setTableParams}
          total={tableParams && tableParams.pagination && tableParams.pagination.total ? tableParams.pagination.total : 0}
        />
      </div>
    </>
  );
};
export default PaginationFetchData;