import React, { useRef } from "react";
import { Col, Input, Row, Switch, Table } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const DashboardSetting = () => {
    const messageModalRef = useRef('');
    const exportToExcel = (data, fileName = "Online_Admission_Form_Fields.xlsx") => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };

    const exportToPDF = (columns, data, fileName = "Online_Admission_Form_Fields.pdf") => {
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


    const copyTable = (columns, data) => {
        const header = columns.map((col) => col.title).join("\t");
        const rows = data.map((row) => columns.map((col) => row[col.dataIndex]).join("\t"));
        const clipboardText = [header, ...rows].join("\n");
        navigator.clipboard.writeText(clipboardText);
        messageModalRef.current.showSuccessConfirmsAutoClose("Table copied to clipboard!", () => { }, "", true);
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


    const dataSource = [
        { key: "1", name: "Homework" },
        { key: "2", name: "Library"},
        { key: "3", name: "Notice Board" },
        { key: "4", name: "Subject Progress" },
        { key: "5", name: "Teacher List" },
        { key: "6", name: "Upcomming Class" },
        { key: "7", name: "Visitor List" },
        { key: "8", name: "Welcome Student" },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "Student",
            key: "student",
            align: "right", // align to end
            width: "8%",
            render: (_, record) => (
                <Switch
                    defaultChecked
                    onChange={() => {
                        console.log("record", record);
                    }}
                />
            ),
        },
        {
            title: "Parent",
            key: "parent",
            align: "right", // align to end
            width: "8%",
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
        <div>
            <h3>Online Admission Form Fields</h3>
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 25,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Col span={6} style={{ fontSize: "1rem", fontWeight: 500 }}>
                    <Input placeholder="Search....." />
                </Col>
                <Col
                    span={18}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => copyTable(columns, dataSource)}
                        >
                            <TfiFiles size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => exportToExcel(dataSource)}
                        >
                            <AiOutlineFileExcel size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => exportToPDF(columns, dataSource)}
                        >
                            <AiOutlineFilePdf size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => printTable(columns, dataSource)}
                        >
                            <LiaPrintSolid size={19} />
                        </div>
                    </div>
                </Col>

            </Row>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{
                    y: 330,   // vertical scroll height (px)
                }}
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default DashboardSetting;