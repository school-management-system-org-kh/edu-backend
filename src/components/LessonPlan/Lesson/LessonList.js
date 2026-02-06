import React, { useRef } from "react";
import { Col, Input, Row, Table } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const LessonList = ({ setData, t }) => {
    const messageModalRef = useRef('');
    const exportToExcel = (data, fileName = "lesson_lists.xlsx") => {
        // Flatten objects/arrays into readable strings
        const cleanedData = data.map((row) => {
            const newRow = { ...row };

            Object.keys(newRow).forEach((key) => {
                let cell = newRow[key];

                if (Array.isArray(cell)) {
                    cell = cell
                        .map((s) => (s?.name ? s.name : JSON.stringify(s)))
                        .join(", ");
                }

                if (typeof cell === "object" && cell !== null) {
                    cell = JSON.stringify(cell);
                }

                newRow[key] = cell ?? "";
            });

            return newRow;
        });

        // Create sheet
        const worksheet = XLSX.utils.json_to_sheet(cleanedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };


    const exportToPDF = (columns, data, fileName = "lesson_lists.pdf") => {
        const doc = new jsPDF();

        // Extract headers (skip non-dataIndex columns)
        const tableColumn = columns
            .filter((col) => col.dataIndex)
            .map((col) => col.title);

        const tableRows = data.map((row) =>
            columns
                .filter((col) => col.dataIndex)
                .map((col) => {
                    let cell = row[col.dataIndex];

                    // Array of objects (like section: [{name:"A"}, {name:"B"}])
                    if (Array.isArray(cell)) {
                        cell = cell.map((s) => (s?.name ? s.name : JSON.stringify(s))).join(", ");
                    }

                    // Plain object
                    if (typeof cell === "object" && cell !== null) {
                        cell = JSON.stringify(cell);
                    }

                    return cell ?? "";
                })
        );

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10 }, // optional for readability
            headStyles: { fillColor: [79, 129, 189] }, // match your print table style
        });

        doc.save(fileName);
    };



    const copyTable = (columns, data) => {
        const header = columns.map((col) => col.title).join("\t");

        const rows = data.map((row) =>
            columns
                .map((col) => {
                    let cell = row[col.dataIndex];

                    // Array of objects (e.g., section: [{name:"A"}, {name:"B"}])
                    if (Array.isArray(cell)) {
                        cell = cell.map((s) => (s?.name ? s.name : JSON.stringify(s))).join(", ");
                    }

                    // Plain object
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
            "Table copied to clipboard!",
            () => { },
            "",
            true
        );
    };

    const printTable = (columns, data) => {
        // Extract headers (skip action column)
        const headers = columns
            .filter((col) => col.dataIndex)
            .map(
                (col) =>
                    `<th style="border:1px solid #ddd; padding:8px; background:#4F81BD; color:white;">${col.title}</th>`
            )
            .join("");

        // Rows
        const rows = data
            .map(
                (row) =>
                    `<tr>${columns
                        .filter((col) => col.dataIndex)
                        .map((col) => {
                            let cell = row[col.dataIndex];

                            if (Array.isArray(cell)) {
                                cell = cell.map((s) => (s.name ? s.name : JSON.stringify(s))).join(", ");
                            }

                            if (typeof cell === "object" && cell !== null) {
                                cell = JSON.stringify(cell);
                            }

                            return `<td style="border:1px solid #ddd; padding:8px; text-align:start;">${cell ?? ""
                                }</td>`;
                        })
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


    const handleUpdate = async (item) => {
        console.log("item", item);
        setData(item)
    };

    const handleDelete = async (item) => {
        // if (dataDonor.length == 1) {
        //   message.error("At least one program is required",2);
        //   return;
        // } else {
        messageModalRef.current.showWarningConfirm('Are you sure you want to delete this topic?', () => {
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
            key: "1",
            name: "Class A",
            section: "A",
            group: "Class 5th Subject Group",
            subject: "Mathematics",
            lessonname: "The Temperate Grasslands. The Climate in Our Country The Great Indian Desert."

        },
        {
            key: "1",
            name: "Class B",
            section: "B",
            group: "Class 6th Subject Group",
            subject: "Science",
            lessonname: "Alice In Wonderland The Milkman’s Cow I Had a Little Pony"
        },
    ];

    const columns = [
        {
            title: t("Class"),
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name), // Proper string sorting
            sortDirections: ["ascend", "descend"], // show sort icons
            showSorterTooltip: false, // removes tooltip, keeps icon
        },
        {
            title: t("Section"),
            dataIndex: "section",
            key: "section",
            sorter: (a, b) => a.section.localeCompare(b.section),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Subject Group"),
            dataIndex: "group",
            key: "group",
            sorter: (a, b) => a.group.localeCompare(b.group),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Subject"),
            dataIndex: "subject",
            key: "subject",
            sorter: (a, b) => a.subject.localeCompare(b.subject),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Lesson"),
            dataIndex: "lessonname",
            key: "lessonname",
            sorter: (a, b) => a.lessonname.localeCompare(b.lessonname),
            sortDirections: ["ascend", "descend"],
            showSorterTooltip: false,
        },
        {
            title: t("Action"),
            key: "action",
            width: 100,
            align: "right", // align to end
            fixed: 'right',
            render: (_, record) => (
                <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <FaRegEdit
                        style={{ fontSize: "1.2rem", color: "#1677ff", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                        onClick={() => handleUpdate(record)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: "1.2rem", color: "#e60b29", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
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
                scroll={{ x: 1000, y: 400 }}
                columns={columns}
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default LessonList;