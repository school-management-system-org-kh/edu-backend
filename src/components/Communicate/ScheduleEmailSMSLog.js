import React, { useRef } from "react";
import { Checkbox, Col, Input, Row, Table, Tooltip } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../Modals/MessageConfirmModal";
import { capitalizedText } from "../../utils/validators";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";

const ScheduleEmailSMSLog = ({ t }) => {
    const messageModalRef = useRef('');
    const navigate = useNavigate();
    // =============================================
    // EXPORT TO EXCEL
    // =============================================
    const exportToExcel = (data, fileName = "Schedule Email SMS Log.xlsx") => {

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
    const exportToPDF = (columns, data, fileName = "Schedule Email SMS Log.pdf") => {
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

    const handleView = async (item) => {
        console.log("item", item);
        navigate("/communicate/send-email")
        // setData(item)
    };

    const handleDelete = async (item) => {
        // if (dataDonor.length == 1) {
        //   message.error("At least one program is required",2);
        //   return;
        // } else {
        messageModalRef.current.showWarningConfirm('Are you sure you want to delete this schedule email sms log?', () => {
            // .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose("Successfully", () => { }, "", true);
            // }).catch((err) => {
            //   messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
            // });
        }, "", true);
        // }
    }


    const dataSource = [
        {
            title: "International Yoga Day",
            description:
                "International Yoga Day, celebrated annually on June 21st, offers schools a valuable opportunity to promote physical and mental well-being. Schools often organize yoga sessions, demonstrations of asanas, and awareness campaigns to introduce students to the benefits of yoga.",
            date: "06/03/2025 03:33 pm",
            scheduleDate:"06/03/2025 03:32 pm",
            email: true,
            sms: true,
            group: true,
            individual: true,
            class: true
        },
        {
            title: "International Yoga Day",
            description:
                "International Yoga Day, celebrated annually on June 21st, offers schools a valuable opportunity to promote physical and mental well-being. Schools often organize yoga sessions, demonstrations of asanas, and awareness campaigns to introduce students to the benefits of yoga.",
            date: "06/03/2025 03:32 pm",
            scheduleDate:"06/03/2025 03:32 pm",
            email: false,
            sms: false,
            group: true,
            individual: false,
            class: false
        },
        {
            title: "New Academic admission start (2025-26)",
            description:
                "NEW ADMISSIONS FOR THE NEXT SESSION 2025-26 ARE OPEN FROM CLASSES NURSERY TO CLASS- VIII FROM 1ST APRIL 2025.",
            date: "04/04/2025 01:27 pm",
            scheduleDate:"06/03/2025 03:32 pm",
            email: false,
            sms: false,
            group: false,
            individual: true,
            class: false
        },
        {
            title: "Online Classes",
            description:
                "Be very punctual in log in time, screen off time, activity time table etc. Be ready with necessary text books, note books, pen, pencil and other accessories before class begins. Make sure the device is sufficiently charged before the beginning of the class.",
            date: "02/04/2025 06:02 pm",
            scheduleDate:"06/03/2025 03:32 pm",
            email: false,
            sms: false,
            group: false,
            individual: false,
            class: true
        }
    ];

    const columns = [
        {
            title: t("Title"),
            dataIndex: "title",
            key: "title",
            width:"15%",
            sorter: (a, b) => a.title.localeCompare(b.title), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: t("Description"),
            dataIndex: "description",
            width: "40%",
            key: "description",
            render: (text) => {
                if (!text) return "";
                const truncated = text.length > 100 ? text.slice(0, 100) + "..." : text;
                return (
                    <Tooltip title={text}>
                        <span>{truncated}</span>
                    </Tooltip>
                );
            },
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Date"),
            dataIndex: "date",
            width:"15%",
            key: "date",
            sorter: (a, b) => a.date.localeCompare(b.date),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Schedule Date"),
            dataIndex: "scheduleDate",
            width:"15%",
            key: "scheduleDate",
            sorter: (a, b) => a.scheduleDate.localeCompare(b.scheduleDate),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Email"),
            dataIndex: "email",
            key: "email",
            render: (_, record) => {
                if (!record.sms) return null;
                return (
                    <Checkbox
                        checked
                        readOnly
                        style={{ pointerEvents: "none" }} // stop user from changing
                    />
                );
            }
        },
        {
            title: t("SMS"),
            dataIndex: "sms",
            key: "sms",
            render: (_, record) => {
                if (!record.sms) return null;
                return (
                    <Checkbox
                        checked
                        readOnly
                        style={{ pointerEvents: "none" }} // stop user from changing
                    />
                );
            }
        },
        {
            title: t("Group"),
            dataIndex: "group",
            key: "group",
            render: (_, record) => {
                if (!record.group) return null;
                return (
                    <Checkbox
                        checked
                        readOnly
                        style={{ pointerEvents: "none" }} // stop user from changing
                    />
                );
            }
        },
        {
            title: t("Individual"),
            dataIndex: "individual",
            key: "individual",
            render: (_, record) => {
                if (!record.individual) return null;
                return (
                    <Checkbox
                        checked
                        readOnly
                        style={{ pointerEvents: "none" }} // stop user from changing
                    />
                );
            }
        },
        {
            title: t("Class"),
            dataIndex: "class",
            key: "class",
            render: (_, record) => {
                if (!record.class) return null;
                return (
                    <Checkbox
                        checked
                        readOnly
                        style={{ pointerEvents: "none" }} // stop user from changing
                    />
                );
            }
        },

        {
            title: t("Action"),
            key: "action",
            width: 100,
            align: "right", // align to end
            fixed: 'right',
            render: (_, record) => (
                <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <IoReorderThree
                        style={{ fontSize: "1.2rem", color: "#1677ff", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                        onClick={() => handleView(record)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: "1rem", color: "#e60b29", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                        onClick={() => handleDelete(record)}
                    />

                </div>
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
                <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>
                    <Input placeholder="Search....." />
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
                // scroll={{
                //     x: 'max-content', // horizontal scroll if content exceeds container
                //     y: 600
                // }}
                columns={columns}
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default ScheduleEmailSMSLog;