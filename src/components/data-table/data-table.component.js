import { Button, Form, Input, InputNumber, notification, Popconfirm, Table, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './data-table.css';

const EditableCell = ({ editing, dataIndex, title, editRender, record, index, children, form, ...restProps }) => {
  return (
    <td {...restProps} key={index}>
      {editing && !!editRender ? (
        typeof editRender === 'string' ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `${title} is required`,
              },
            ]}
          >
            {editRender === 'number' ? <InputNumber /> : <Input />}
          </Form.Item>
        ) : (
          editRender(record, form)
        )
      ) : (
        children
      )}
    </td>
  );
};

/**
 *
 * @param props
 *          settings: {
 *              columns: {
 *                 title: string - column header
 *                 dataIndex: string / string[] - property name of the data item. use array with nested object
 *                 render: (text, record, index) => ReactNode - the original text, the record data and index, define this function to modify cell value
 *                 editRender: 'false' |'input' | 'number' | (rowData, formRef) => ReactNode - define what element to render when edit the cell in this column, false means not allow to change
 *                 onCell: (record, rowIndex) => {} - Set props on per cell,
 *                 nameWhenEditing: string or array - used to get data from the editing form/ cell
 *                 nameWhenAppending: string - used to get data from the new appended row
 *                 filterable: boolean - column can be filtered
 *                 newRecordInputRender: for render input for adding new record, system will use editRender if this is undefined
 *              }
 *              tableClassName: string - the classname for table
 *              numbered: boolean - render row number column
 *              appendable: boolean - allow user to append new row
 *              editable: boolean - data are editable
 *              expandable: {} - see {@link https://ant.design/components/table#components-table-demo-nested-table}
 *              removable: boolean / {text: string} - pass boolean to enable/ disable removable on row, pass obj with text string to enable row removable and custom remove text
 *              customActions: [{needConfirm, text, whenPerform, shallNotRender, element}] - pass option to render custom action on row
 *                  needConfirm: boolean / {text: (record) => {}} - pass boolean to enable/disable confirm popup, pass obj with text function to enable popup and render confirm title
 *                  text: string - confirm content text
 *                  whenPerform: (record) => {} - action triggered when perform custom action
 *                  shallNotRender: (record, data) => boolean - define and return true will remove the action from this row
 *                  element: (record, data) => ReactNode - the element to render. if pass this, previous 3 param will be skipped
 *              operationColumnTitle: string - the header text for operation/ action column
 *              operationColumnClass: string - the classname for operation/ action column cells
 *              onRecordEdit: (key, rowData) => {} - called when edited row saves
 *              onRecordDelete: (key) => {} - called when row deleted
 *              onNewRecordCreate: (newRowData) => {} - called when new row created
 *              pagination: - see {@link https://ant.design/components/pagination/}
 *              bordered: boolean - is table bordered
 *              size: 'small' | 'middle' - default small
 *              tableHeader: string - header of the whole table
 *              actionColumnIndex: number - index of the table column where customActions are inserted into
 *              scroll: {x: number, y: number} - for fixed column and header
 *          }
 *          data: [{
 *              _id: string - data must has _id property.
 *              ...rest of the properties
 *          }]
 * @returns {JSX.Element}
 * @constructor
 */
const DataTable = ({ settings, data, loading }) => {
  const [form] = Form.useForm();
  const [newRecordForm] = Form.useForm();

  const [tableData, setTableData] = useState([]);

  const [editingKey, setEditingKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);

  const tableColumns = [...settings.columns];
  const isEditing = (record) => record._id === editingKey;

  const itemsPerPage = settings.pagination?.pageSize ? settings.pagination?.pageSize : 10;

  const pagination = () => {
    if (settings.pagination === undefined) {
      return {
        current: currentPage,
        onChange: (nextPage) => setCurrentPage(nextPage),
        pageSize: itemsPerPage,
      };
    } else {
      if (settings.pagination) {
        return {
          ...settings.pagination,
          current: currentPage,
          onChange: (nextPage) => {
            if (settings.pagination.onChange) {
              settings.pagination.onChange(nextPage);
            }
            setCurrentPage(nextPage);
          },
        };
      } else {
        return false;
      }
    }
  };

  if (settings.numbered) {
    tableColumns.unshift({
      title: 'No.',
      dataIndex: 'number',
      sysGen: true,
      render: (_, record, index) => <span>{parseInt(index) + 1 + itemsPerPage * (currentPage - 1)}</span>,
    });
  } else if (settings.appendable) {
    tableColumns.unshift({
      title: '',
      dataIndex: '',
      sysGen: true,
      render: () => '',
    });
  }

  if (settings.editable || settings.removable || settings.customActions) {
    const actionColumn = {
      title: settings.operationColumnTitle || 'Operation',
      sysGen: true,
      className: settings.operationColumnClass || '',
      render: (_, record) => {
        const editing = isEditing(record);
        const removeText = settings.removable?.text ? settings.removable.text : 'Delete';

        const generateActions = () => {
          const actions = [];

          if (settings.editable) {
            if (editing) {
              actions.push(
                <span>
                  <Typography.Link
                    onClick={() => save(record._id)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </Typography.Link>
                  <Typography.Link onClick={cancel}>Cancel</Typography.Link>
                </span>
              );
              return actions;
            } else {
              actions.push(
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            }
          }
          if (settings.removable) {
            actions.push(
              <Popconfirm title={`Are you sure to ${removeText} this?`} onConfirm={() => doDelete(record._id)}>
                <Typography.Link disabled={editingKey !== ''}>{removeText}</Typography.Link>
              </Popconfirm>
            );
          }
          if (settings.customActions) {
            settings.customActions.forEach((customAction, i) => {
              const { needConfirm, text, whenPerform, element, shallNotRender } = customAction;
              if (!element) {
                let actionExists = !(shallNotRender && shallNotRender(record, data));
                if (actionExists) {
                  if (needConfirm) {
                    actions.push(
                      <Popconfirm
                        title={needConfirm.text(record)}
                        onConfirm={() => performCustomAction(record, whenPerform)}
                      >
                        <Typography.Link disabled={editingKey !== ''}>{text}</Typography.Link>
                      </Popconfirm>
                    );
                  } else {
                    actions.push(
                      <Typography.Link
                        disabled={editingKey !== ''}
                        onClick={() => performCustomAction(record, whenPerform)}
                      >
                        {text}
                      </Typography.Link>
                    );
                  }
                }
              } else {
                actions.push(element(record, data));
              }
            });
          }
          return actions;
        };

        return generateActions().reduce(
          (acc, x) =>
            acc === null ? (
              x
            ) : (
              <>
                {acc} / {x}
              </>
            ),
          null
        );
      },
    };
    if (typeof settings.actionColumnIndex === 'number') {
      tableColumns.splice(settings.actionColumnIndex, 0, actionColumn);
    } else {
      tableColumns.push(actionColumn);
    }
  }

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      try {
        displayNotification(await settings.onRecordEdit(key, row));
      } catch (updateFailError) {
        displayNotification(updateFailError);
      }
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const doDelete = async (key) => {
    try {
      displayNotification(await settings.onRecordDelete(key));
    } catch (updateFailError) {
      displayNotification(updateFailError);
    }
  };

  const performCustomAction = async (record, whenPerform) => {
    try {
      displayNotification(await whenPerform(record));
    } catch (updateFailError) {
      displayNotification(updateFailError);
    }
  };

  const onCreateNewRecord = async () => {
    try {
      const row = await newRecordForm.validateFields();
      try {
        displayNotification(await settings.onNewRecordCreate(row));
        const totalPages = Math.ceil((data.length + 1) / itemsPerPage);
        setCurrentPage(totalPages);
        newRecordForm.resetFields();
      } catch (updateFailError) {
        console.log(updateFailError);
        displayNotification(updateFailError);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const mergedColumns = tableColumns.map((col) => {
    if (col.sysGen) {
      return col;
    }

    const getCellValue = (dataItem, dataIndex) => {
      if (typeof dataIndex === 'string') {
        return dataItem[dataIndex];
      } else if (Array.isArray(dataIndex)) {
        let currentLevel = dataItem;
        for (const key of dataIndex) {
          currentLevel = currentLevel[key];
          if (!currentLevel) {
            return undefined;
          }
        }
        return currentLevel;
      }
    };

    return {
      ...col,
      onCell: (record) => {
        let predefinedOnCell = {};
        if (col.onCell) {
          predefinedOnCell = col.onCell(record);
        }
        return {
          ...predefinedOnCell,
          record,
          editRender: col.editRender,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          form: form,
        };
      },
      filters: col.filterable
        ? Array.from(new Set(data.map((item) => getCellValue(item, col.dataIndex))))
            .filter((item) => item)
            .map((item) => ({ text: item, value: item }))
        : null,
      onFilter: (value, record) => getCellValue(record, col.dataIndex) === value,
    };
  });

  const newRecordRow = () => {
    return (
      <div className='w-100'>
      <Table.Summary.Row>
        <Form component={false} autoComplete="off" form={newRecordForm}>
          <Table.Summary.Cell>+</Table.Summary.Cell>
          {settings.columns.map((col) => {
            let renderer;
            if (col.newRecordInputRender === undefined) {
              renderer = col.editRender;
            } else {
              renderer = col.newRecordInputRender;
            }
            if (!!renderer) {
              if (typeof renderer === 'string') {
                return (
                  <Table.Summary.Cell>
                    <Form.Item
                      name={col.nameWhenAppending}
                      style={{
                        margin: 0,
                      }}
                      rules={[
                        {
                          required: true,
                          message: `New ${col.title} is required`,
                        },
                      ]}
                    >
                      {renderer === 'number' ? (
                        <InputNumber placeholder={`New ${col.title}`} />
                      ) : (
                        <Input placeholder={`New ${col.title}`} />
                      )}
                    </Form.Item>
                  </Table.Summary.Cell>
                );
              } else {
                return <Table.Summary.Cell>{renderer(null, newRecordForm)}</Table.Summary.Cell>;
              }
            }
          })}
          <Table.Summary.Cell>
            <Form.Item
              style={{
                margin: 0,
              }}
            >
              <Button type="primary" onClick={onCreateNewRecord}>
                Create
              </Button>
            </Form.Item>
          </Table.Summary.Cell>
        </Form>
      </Table.Summary.Row>
      </div>
    );
  };

  const displayNotification = ({ text, title, type }) => {
    if (type) {
      notification[type]({
        message: title,
        description: text,
        duration: 10,
      });
    }
  };

  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      const resultTableWrapper = ref.current.nativeElement;
      const resultTableContent = resultTableWrapper.querySelector(`.ant-table-content`);
      const resultActualTable = resultTableWrapper.querySelector(`table`);

      if (resultActualTable.getBoundingClientRect().width > resultTableWrapper.getBoundingClientRect().width) {
        let pos = { top: 0, left: 0, x: 0, y: 0 };
        const mouseDownHandler = function (e) {
          pos = {
            left: resultTableContent.scrollLeft,
            top: resultTableContent.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
          };

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
        };
        const mouseMoveHandler = function (e) {
          resultTableContent.style.userSelect = 'none';
          resultTableContent.style.cursor = 'grabbing';
          // How far the mouse has been moved
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;

          // Scroll the element
          resultTableContent.scrollTop = pos.top - dy;
          resultTableContent.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
          resultTableContent.style.cursor = 'unset';
          resultTableContent.style.removeProperty('user-select');

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };
        const scrollableColumns = resultTableWrapper.querySelectorAll(`.drag-to-scroll`);
        scrollableColumns.forEach((c) => c.addEventListener('mousedown', mouseDownHandler));
      }
    }
  }, [ref.current]);

  return (
    <Form form={form} component={false}>
      <Table
        ref={ref}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        expandable={settings.expandable}
        className={settings.tableClassName}
        layout="inline"
        loading={loading}
        title={settings.tableHeader ? () => settings.tableHeader : null}
        summary={() => (settings.appendable ? newRecordRow() : null)}
        dataSource={tableData}
        columns={mergedColumns}
        rowClassName={(record, index) => {
          if (record.__newRecord__) {
            const removeFlash = setTimeout(() => {
              record.__newRecord__ = false;
              clearTimeout(removeFlash);
            }, 10000);
            return 'flashing-row';
          }
          return settings.editable ? 'editable-row' : '';
        }}
        size={settings.size || 'small'}
        bordered={!!settings.bordered}
        style={{ marginBottom: 30 }}
        pagination={pagination()}
        scroll={settings.scroll}
      />
    </Form>
  );
};

export default DataTable;
