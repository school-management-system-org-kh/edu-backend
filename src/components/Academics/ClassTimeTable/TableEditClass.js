import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, Select } from 'antd';
import { FaPlus, FaRegClock } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import MessageConfirmModal from '../../Modals/MessageConfirmModal';

const { Option } = Select;
const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  inputType,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus?.();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
  let inputNode;
  if (inputType === "select-subject") {
    inputNode = (
      <Select
        ref={inputRef}
        value={record[dataIndex]}
        onChange={(val) => save({ target: { value: val } })}
        style={{ width: "100%" }}
      >
        <Option value="Math">Math</Option>
        <Option value="English">English</Option>
        <Option value="Science">Science</Option>
      </Select>
    );
  } else if (inputType === "select-teacher") {
    inputNode = (
      <Select
        ref={inputRef}
        value={record[dataIndex]}
        onChange={(val) => save({ target: { value: val } })}
        style={{ width: "100%" }}
      >
        <Option value="Mr. Smith">Mr. Smith</Option>
        <Option value="Ms. Johnson">Ms. Johnson</Option>
        <Option value="Dr. Brown">Dr. Brown</Option>
      </Select>
    );
  } else if (inputType === "time") {
    inputNode = (
      <Input
        type="time"
        onChange={(e) => save({ target: { value: e.target.value } })}
        value={record[dataIndex]}
        addonAfter={<FaRegClock style={{ cursor: "pointer" }}
          onClick={() => inputRef.current?.showPicker?.()} />}
        className="custom-time-input"
      />
      // <Input
      //   type="time"
      //   value={record[dataIndex]}
      //   onChange={(e) => save({ target: { value: e.target.value } })}
      // />
    );
  } else {
    inputNode = (
      <Input
        value={record[dataIndex]}
        onChange={(e) => save({ target: { value: e.target.value } })}
      />
    );
  }

  childNode = (
    <Form.Item style={{ margin: 0 }} name={dataIndex}>
      {inputNode}
    </Form.Item>
  );
}

  return <td {...restProps}>{childNode}</td>;
};

const TableEditClass = () => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  const messageModalRef = useRef('');

  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.key !== key);
  //   setDataSource(newData);
  // };
  const handleDelete = async (key) => {
        // if (dataDonor.length == 1) {
        //   message.error("At least one program is required",2);
        //   return;
        // } else {
        const newData = dataSource.filter((item) => item.key !== key);
        messageModalRef.current.showWarningConfirm('Are you sure you want to delete this class time table?', () => {
            // .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose("Successfully", () => { 
              setDataSource(newData);
            }, "", true);
            // }).catch((err) => {
            //   messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
            // });
        }, "", true);
        // }
    }

  const defaultColumns = [
    {
      title: "Subject",
      dataIndex: "subject",
      editable: true,
      inputType: "select-subject",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      editable: true,
      inputType: "select-teacher",
    },
    {
      title: "Time From",
      dataIndex: "timeFrom",
      editable: true,
      inputType: "time",
    },
    {
      title: "Time To",
      dataIndex: "timeTo",
      editable: true,
      inputType: "time",
    },
    {
      title: "Room No.",
      dataIndex: "room",
      editable: true,
      inputType: "text",
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          // <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <MdDelete fontSize={24} color="red" style={{ cursor: "pointer" }} onClick={() => handleDelete(record.key)}/>
          // </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      subject: "Math",
      teacher: "Mr. Smith",
      timeFrom: "",
      timeTo: "",
      room: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
          backgroundColor: "#525252",
          color: "white",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        <FaPlus size={19} /> Add New
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
       <MessageConfirmModal textCentered ref={messageModalRef} />
    </div>
  );
};

export default TableEditClass;
