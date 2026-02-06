import React, { useRef } from "react";
import { Col, Input, Row, Select, Switch, Table } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const StudentTab = ({selectModule, setSelectModule, loading, setLoading}) => {
    const messageModalRef = useRef('');
    const exportToExcel = (data, fileName = "student_lists.xlsx") => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };

    const exportToPDF = (columns, data, fileName = "student_lists.pdf") => {
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
        { key: "1", admissionNo: "9000563", studentName: "Cathrine Rosengrenr", userName:"std0001", class:"Class 5(A)", fatherName:"Gagnon Rosengren", phoneNumber:"+885 93668718" },
        { key: "2", admissionNo: "1800011", studentName: "Edward Thomas", userName:"std0002", class:"Class 5(B)", fatherName:"Olivier Thomas", phoneNumber:"+855 96500734" },
        { key: "3", admissionNo: "980879", studentName: "Sophia Miller", userName:"std0003", class:"Class 3(A)", fatherName:"Jonson Stones", phoneNumber:"+855 12668718" }
    ];

    const columns = [
        {
            title: "Admission No",
            dataIndex: "admissionNo",
            key: "admissionNo",
            sorter: (a, b) => a.admissionNo.localeCompare(b.admissionNo), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "Student Name",
            dataIndex: "studentName",
            key: "studentName",
            sorter: (a, b) => a.studentName.localeCompare(b.studentName), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            sorter: (a, b) => a.userName.localeCompare(b.userName), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "Class",
            dataIndex: "class",
            key: "class",
            sorter: (a, b) => a.class.localeCompare(b.class), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "Father Name",
            dataIndex: "fatherName",
            key: "fatherName",
            sorter: (a, b) => a.fatherName.localeCompare(b.fatherName), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
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
        <div>
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 25,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Col span={6}>
                    <Select
                        placeholder="Select Module"
                        size="middle"
                        defaultValue="system"
                        value={selectModule}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                            setLoading(true); // Start loading
                            setSelectModule(e);

                            // Simulate data fetching or processing delay
                            setTimeout(() => {
                                setLoading(false); // Stop loading after delay
                            }, 3000); // Adjust duration as needed
                        }}
                        options={[
                            { value: "student", label: "Student" },
                            { value: "parent", label: "Parent" },
                            { value: "staff", label: "Staff" },
                        ]}
                    />
                </Col>
                <Col span={6} style={{ fontSize: "1rem", fontWeight: 500 }}>
                    <Input placeholder="Search....." />
                </Col>
                <Col
                    span={12}
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
                loading={loading}
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default StudentTab;