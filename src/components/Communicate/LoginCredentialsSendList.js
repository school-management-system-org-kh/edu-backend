import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import MessageConfirmModal from "../Modals/MessageConfirmModal";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { capitalizedText } from "../../utils/validators";

const LoginCredentialsSendList = ({ t }) => {
    const [form] = Form.useForm();
    const messageModalRef = useRef('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = newSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSave = async () => {
        try {
            form.validateFields();
        } catch (err) {
            console.log("Validation failed:", err);
        }
    };

    const dataSource = [
        { key: "1", no: "120020", studentName: "Chham Pichmaly", class: "Class (A)", bod: "09/05/2000", gender: "Female", phone: "0967273677" },
        { key: "2", no: "18001", studentName: "Chham Kanika", class: "Class (A)", bod: "09/05/2007", gender: "Female", phone: "015849376" },
        { key: "3", no: "520039", studentName: "Chham Dararaksmey", class: "Class (A)", bod: "09/05/1995", gender: "Male", phone: "093668718" },
    ];

    const columns = [
        {
            title: "Admission No",
            dataIndex: "no",
            key: "no",
            sorter: (a, b) => a.no.localeCompare(b.no),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: "Student Name",
            dataIndex: "studentName",
            key: "studentName",
            sorter: (a, b) => a.studentName.localeCompare(b.studentName),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: "Class",
            dataIndex: "class",
            key: "class",
            sorter: (a, b) => a.class.localeCompare(b.class),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: "Date Of Birth",
            dataIndex: "bod",
            key: "bod",
            sorter: (a, b) => a.bod.localeCompare(b.bod),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: "Mobile Number",
            dataIndex: "phone",
            key: "phone",
        },
    ];

    const optionsMessageTo = [
        {
            label: 'Both',
            value: 'both',
        },
        {
            label: 'Parent',
            value: 'parent',
        },
        {
            label: 'Student',
            value: 'student',
        }
    ]

    const optionsNotificationType = [
        {
            label: 'Both',
            value: 'both',
        },
        {
            label: 'Student Admission',
            value: 'admission',
        },
        {
            label: 'Login Credential',
            value: 'login',
        }
    ]
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleChangeType = (value) => {
        console.log(`selected ${value}`);
    };

    // =============================================
    // EXPORT TO EXCEL
    // =============================================
    const exportToExcel = (data, fileName = "Login Credentials Send List.xlsx") => {

        // Flatten and format data
        const cleanedData = data.map((row) => {
            const newRow = { ...row };

            Object.keys(newRow).forEach((key) => {
                let cell = newRow[key];

                // Convert boolean to ✔ or empty
                if (typeof cell === "boolean") {
                    cell = cell ? "✔" : "";
                }

                if (Array.isArray(cell)) {
                    cell = cell.map((s) => (s?.name ? s.name : JSON.stringify(s))).join(", ");
                }

                if (typeof cell === "object" && cell !== null) {
                    cell = JSON.stringify(cell);
                }

                newRow[key] = cell ?? "";
            });

            return newRow;
        });

        const worksheet = XLSX.utils.json_to_sheet(cleanedData);

        // Set professional column widths
        worksheet["!cols"] = [
            { wch: 20 },  // Title
            { wch: 45 },  // Description (30% screen width approx)
            { wch: 20 },  // Date
            { wch: 10 },  // Email
            { wch: 10 },  // SMS
            { wch: 10 },  // Group
            { wch: 10 },  // Individual
            { wch: 10 },  // Class
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };


    // =============================================
    // EXPORT TO PDF
    // =============================================
    const exportToPDF = (columns, data, fileName = "Login Credentials Send List.pdf") => {
        const doc = new jsPDF();

        const tableColumn = columns
            .filter((col) => col.dataIndex)
            .map((col) => col && capitalizedText(col.title));

        const tableRows = data.map((row) =>
            columns
                .filter((col) => col.dataIndex)
                .map((col) => {
                    let cell = row[col.dataIndex];

                    // Convert boolean to Yes / No
                    if (typeof cell === "boolean") {
                        cell = cell ? "Yes" : "";
                    }

                    if (Array.isArray(cell)) {
                        cell = cell
                            .map((s) => (s?.name ? s.name : JSON.stringify(s)))
                            .join(", ");
                    }

                    if (typeof cell === "object" && cell !== null) {
                        cell = JSON.stringify(cell);
                    }

                    return cell ?? "";
                })
        );

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 129, 189] },
        });

        doc.save(fileName);
    };



    // =============================================
    // COPY TABLE TO CLIPBOARD
    // =============================================
    const copyTable = (columns, data) => {
        const header = columns.map((col) => col.title).join("\t");

        const rows = data.map((row) =>
            columns
                .map((col) => {
                    let cell = row[col.dataIndex];

                    if (typeof cell === "boolean") {
                        cell = cell ? "✔" : "";
                    }

                    if (Array.isArray(cell)) {
                        cell = cell.map((s) => (s?.name ? s.name : JSON.stringify(s))).join(", ");
                    }

                    if (typeof cell === "object" && cell !== null) {
                        cell = JSON.stringify(cell);
                    }

                    return cell ?? "";
                })
                .join("\t")
        );

        const clipboardText = [header, ...rows].join("\n");

        navigator.clipboard.writeText(clipboardText);
        messageModalRef.current.showSuccessConfirmsAutoClose(
            "Table copied to clipboard!", () => { }, "", true
        );
    };


    // =============================================
    // PRINT TABLE
    // =============================================
    const printTable = (columns, data) => {

        const headers = columns
            .filter((col) => col.dataIndex)
            .map(
                (col) =>
                    `<th 
                        style="
                            border:1px solid #ddd; 
                            padding:8px; 
                            background:#4F81BD; 
                            color:white; 
                            text-align:start;
                            ${col.dataIndex === "description" ? "width:30%;" : ""}
                        "
                    >
                        ${col.title}
                    </th>`
            )
            .join("");


        const rows = data
            .map(
                (row) =>
                    `<tr>
                        ${columns
                        .filter((col) => col.dataIndex)
                        .map((col) => {
                            let cell = row[col.dataIndex];

                            if (typeof cell === "boolean") {
                                cell = cell ? "✔" : "";
                            }

                            if (Array.isArray(cell)) {
                                cell = cell
                                    .map((s) => (s?.name ? s.name : JSON.stringify(s)))
                                    .join(", ");
                            }

                            if (typeof cell === "object" && cell !== null) {
                                cell = JSON.stringify(cell);
                            }

                            return `<td style="border:1px solid #ddd; padding:8px; text-align:start;">
                                    ${cell ?? ""}
                                </td>`;
                        })
                        .join("")}
                    </tr>`
            )
            .join("");


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
            <h2>Data Export</h2>
            <table>
              <thead><tr>${headers}</tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </body>
        </html>
      `;

        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };


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
                <Col
                    span={12}>
                    <div className="" style={{ display: 'flex' }}>
                        <Col span={14} style={{ fontSize: "1rem", fontWeight: 500 }}>
                            <Input placeholder="Search....." />
                        </Col>
                        <Col span={12} style={{ fontSize: "1rem", fontWeight: 500 }}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Message To")}<span style={{ color: "red" }}> *</span></span>}
                                name="port2"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a section")) }]}
                                style={{ marginBottom: 12 }}
                            >
                                <Select
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder=""
                                    size="middle"
                                    onChange={handleChange}
                                    options={optionsMessageTo}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ fontSize: "1rem", fontWeight: 500 }}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Notification Type")}<span style={{ color: "red" }}> *</span></span>}
                                name="port"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a section")) }]}
                                style={{ marginBottom: 12 }}
                            >
                                <Select
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder=""
                                    size="middle"
                                    onChange={handleChangeType}
                                    options={optionsNotificationType}
                                />
                            </Form.Item>
                        </Col>
                    </div>
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
                rowSelection={rowSelection}
                pagination={false}
                scroll={{
                    y: 330,   // vertical scroll height (px)
                }}
            />
            <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                    size="middle"
                    type="primary"
                    style={{ width: "15%", fontSize: "1rem", fontWeight: 600 }}
                    onClick={handleSave}
                >
                    Send
                </Button>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default LoginCredentialsSendList;