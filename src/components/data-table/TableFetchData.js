
import { Spin, Table } from 'antd';
import PaginationComponent from '../pagination/PaginationComponent';
const TableFetchData = ({ x, y, size, tableParams, setTableParams, data, setData, loading, setLoading, columns }) => {
  // size= large, middle, small

  // const [tableParams, setTableParams] = useState({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     sorter: true,
  //     render: (_, record, index) => `${record.first} ${record.last}`,
  //     width: '20%',
  //   },
  //   {
  //     title: 'Gender',
  //     dataIndex: 'gender',
  //     filters: [
  //       {
  //         text: 'Male',
  //         value: 'male',
  //       },
  //       {
  //         text: 'Female',
  //         value: 'female',
  //       },
  //     ],
  //     width: '20%',
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //   },
  // ];

  // const fetchData = () => {
  // };
  // useEffect(fetchData, [
  //   tableParams.pagination?.current,
  //   tableParams.pagination?.pageSize,
  //   tableParams?.sortOrder,
  //   tableParams?.sortField,
  //   JSON.stringify(tableParams.filters),
  // ]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      // pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  };

  return (
    <>
    <Spin spinning={loading ? loading : false}>
      <Table
        columns={columns}
        size={size ? size : 'middle'}
        dataSource={data}
        pagination={false}
        // pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
        scroll={{ x: x ? x : 1000, y: y ? y : null }}//y : 520
      />
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
    </Spin>
    </>
  );
};
export default TableFetchData;