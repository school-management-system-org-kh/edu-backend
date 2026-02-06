import React, { useRef } from "react";
import { Switch, Table } from "antd";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const AllowedEditFormFieldsTable = () => {
const messageModalRef = useRef('');

  const dataSource = [
    { key: "1", name: "Weight" },
    { key: "2", name: "Blood Group" },
    { key: "3", name: "Religion" },
    { key: "4", name: "House" },
    { key: "5", name: "Bank Account Number" },
    { key: "6", name: "If Guardian Address Is Current Address" },
    { key: "7", name: "Mother Occupation" },
    { key: "8", name: "Upload Documents" },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Action",
      key: "action",
      align: "right", // align to end
      render: (_, record) => (
        <Switch
          defaultChecked
          onChange={() => {
            console.log("record", record);
          }}
        />
      ),
    },
  ];

  return (
    <div className="">
        <div span={24} style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom:"0.5rem" }}>Allowed Edit Form Fields On Student Profile</div>
        <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{
              y: 330,
            }}
          />
        <MessageConfirmModal textCentered ref={messageModalRef} />
    </div>
  );
};

export default AllowedEditFormFieldsTable;
