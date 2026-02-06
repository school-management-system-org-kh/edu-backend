import React, { useRef } from "react";
import { Col, Input, Row, Spin } from "antd";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { FaEdit, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableFetchData from "../../data-table/TableFetchData";

const RoleList = ({ loading, data, tableParams, setTableParams, setkeyword, setId }) => {
  const messageModalRef = useRef('');
  const navigate = useNavigate();
  const exportToExcel = (data, fileName = "role_lists.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  const exportToPDF = (columns, data, fileName = "role_lists.pdf") => {
    const doc = new jsPDF();

    // Extract headers & rows
    const tableColumn = columns
      .filter((col) => col.dataIndex) // exclude action/switch column
      .map((col) => col.title);

    const tableRows = data.map((row) =>
      columns
        .filter((col) => col.dataIndex)
        .map((col) => row[col.dataIndex])
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(fileName);
  };

  const printTable = (columns, data) => {
    // Extract headers (skip action column)
    const headers = columns
      .filter((col) => col.dataIndex)
      .map((col) => `<th style="border:1px solid #ddd; padding:8px; background:#4F81BD; color:white;">${col.title}</th>`)
      .join("");

    // Rows
    const rows = data
      .map(
        (row) =>
          `<tr>${columns
            .filter((col) => col.dataIndex)
            .map(
              (col) =>
                `<td style="border:1px solid #ddd; padding:8px; text-align:start;">${row[col.dataIndex] ?? ""
                }</td>`
            )
            .join("")}</tr>`
      )
      .join("");

    // Full HTML
    const printContent = `
    <html>
      <head>
        <title>Print Table</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #4F81BD; color: white; text-align:start }
        </style>
      </head>
      <body>
        <h2>Online Admission Form Fields</h2>
        <table>
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;

    // Open Print Window
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const tableRoleMangement = {
    appendable: false,
    removable: false,
    bordered: false,
    numbered: true,
    size: 'middle',
    pagination: {
      showLessItems: true,
      showSizeChanger: false,
      pageSize: 20,
    },
    columns: [
      {
        title: <span style={{fontWeight:600}}>Name</span>,
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name), // Proper string sorting
        sortDirections: ["ascend", "descend"], // show sort icons
        showSorterTooltip: false, // removes tooltip, keeps icon
      },
      {
        title: <span style={{fontWeight:600}}>Type</span>,
        dataIndex: "type",
        key: "type",
        render: (_, record) => (
          <span>{record.type ? record.type : 'System'}</span>
        )
      },
      {
        title: "Action",
        key: "action",
        align: "right", // align to end
        render: (_, record) => (
          <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <FaTag onClick={() => navigate('/admin/roles/permission')} size={16} style={{ cursor: "pointer" }} />
            <FaEdit
              size={16}
              style={{ marginLeft: '0.8rem', cursor: "pointer" }}
              onClick={() => {
                setId(record && record?.id)
              }}
            />
          </div>
        ),
      },
    ]
  }

  return (
    <div>
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 25,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>
          <Input
            placeholder="Search....."
            onChange={(e) => setkeyword(e.target.value)}
            allowClear
          />
        </Col>
        <Col
          span={16}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
              onClick={() => exportToExcel(data)}
            >
              <AiOutlineFileExcel size={18} />
            </div>
            <div
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
              onClick={() => exportToPDF(tableRoleMangement.columns, data)}
            >
              <AiOutlineFilePdf size={18} />
            </div>
            <div
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
              onClick={() => printTable(tableRoleMangement.columns, data)}
            >
              <LiaPrintSolid size={19} />
            </div>
          </div>
        </Col>

      </Row>
      <div className="w-100 h-100 overflow-auto" style={{ overflow: 'auto', width: "100%", height: '100%' }}>
        <Spin spinning={loading}>
          <div className="w-100">
            <TableFetchData
              tableParams={tableParams} setTableParams={setTableParams}
              data={data}
              columns={tableRoleMangement.columns}
              x={500}
            />
          </div>
        </Spin>
      </div>
      <MessageConfirmModal textCentered ref={messageModalRef} />
    </div>
  )
}

export default RoleList;