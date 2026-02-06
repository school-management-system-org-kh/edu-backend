import React, { useState, useEffect } from 'react';
import { Input, Pagination, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const PaginationComponent = ({ total = 40, onChange, tableParams, setTableParams }) => {
  const [jumPage, setJumPage] = useState(""); // For page jump input
  const { t } = useTranslation();

  // Ensure tableParams has pagination initialized
  useEffect(() => {
    if (!tableParams.pagination) {
      setTableParams({
        ...tableParams,
        pagination: {
          current: 1,
          pageSize: 10,
          total: total,
        },
      });
    }
  }, [tableParams, total, setTableParams]);

  // Custom render for prev/next buttons
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  // Handle pagination change (page and pageSize)
  const handlePaginationChange = (page, pageSize) => {
    if (onChange) {
      onChange(page, pageSize);  // Pass the new page and pageSize to the parent component
    }
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize: pageSize,
      },
    });
  };

  // Handle "Enter" key for page jump
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const totalPages = Math.ceil(total / (tableParams?.pagination?.pageSize || 10));
      let page = parseInt(jumPage, 10);
      page = page > totalPages ? totalPages : page;
      setJumPage(page.toString());
      onChange && onChange(page, tableParams?.pagination?.pageSize || 10); // Pass the new page and pageSize to the parent component

      setJumPage('')
    }
  };

  return (
    <div className="w-100 d-flex justify-content-end" 
    style={{
      width:"100%",
      display:'flex',
      justifyContent:'end',
      marginTop:'1rem'
    }}
    >
      {/* Page size selector */}
      <Select
        value={tableParams?.pagination?.pageSize || 10}
        style={{ width: 100 }}
        onChange={(value) => {
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              current: 1,
              pageSize: value,
            },
          });
          onChange && onChange(1, value); // Reset to first page when page size changes
        }}
        options={[
          { value: 5, label: <span>5 / {t('pageSite')}</span> },
          { value: 10, label: <span>10 / {t('pageSite')}</span> },
          { value: 20, label: <span>20 / {t('pageSite')}</span> },
          { value: 50, label: <span>50 / {t('pageSite')}</span> },
          { value: 100, label: <span>100 / {t('pageSite')}</span> },
        ]}
      />

      {/* Pagination control */}
      <Pagination
        total={total}
        pageSize={tableParams?.pagination?.pageSize || 10}
        current={tableParams?.pagination?.current || 1}
        showSizeChanger={false}
        showQuickJumper={false}
        onChange={handlePaginationChange}
        // itemRender={itemRender}
      />

      {/* Jump to specific page */}
      <span className='d-flex align-items-center me-1'
      style={{
        display:'flex',
        alignItems:'center',
        marginRight:"1rem"
      }}
      >
        {t('Go Page')}
      </span>
      <Input
        value={jumPage}
        onChange={(e) => setJumPage(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyPress={(e) => {
          const charCode = e.which ? e.which : e.keyCode;
          const charStr = String.fromCharCode(charCode);
          const allowedChars = /[0-9]/ ;
          if (
            !allowedChars.test(charStr)
            || (charStr === '.' && e.target.value.includes('.'))
            || (charStr === '-' && e.target.value.length > 0)
          ) {
            e.preventDefault();
          }
        }}
        style={{ width: "50px" }}
        // placeholder="Page"
      />
    </div>
  );
};

export default PaginationComponent;
