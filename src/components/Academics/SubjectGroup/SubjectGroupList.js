import React, { useRef } from "react";
import { Col, Input, Row, Spin, Table, Tooltip } from "antd";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { deleteDataRequest } from "../../../api/serviceMethods";
import { SUBJECTGROUP_DELETE_URL, SUBJECTGROUP_URL } from "../../../api/URLs";
import TableFetchData from "../../data-table/TableFetchData";

const SubjectGroupList = ({ loading, data, tableParams, setTableParams, getListSubjectGroup, setId, setLoading, setkeyword }) => {
    const messageModalRef = useRef('');
    const { t } = useTranslation();
    const today = dayjs().format("MM-DD-YYYY");
    // Helper: get plain text from column title
    const getColumnTitle = (col) => {
        if (typeof col.title === "string") return col.title;
        if (col.title?.props?.children) return col.title.props.children;
        return "";
    };

    // Helper: get cell value based on column
    const getCellValue = (col, row, type = "text") => {
        // Special case: classSelect => Class + Section
        if (col.dataIndex === "classSelect") {
            const classes = row?.Classes || [];
            const sections = row?.Sections || [];
            const items = [];
            classes.forEach(cls => {
                sections.forEach(sec => {
                    items.push(`${cls.name} (${sec.name})`);
                });
            });
            // Return line breaks for Excel/PDF, <br> for HTML
            return type === "html" ? items.join("<br>") : items.join("\n");
        }

        // Special case: subject
        if (col.dataIndex === "subject") {
            const subjects = row?.Subjects || [];
            return type === "html"
                ? subjects.map(s => s.name).join("<br>")
                : subjects.map(s => s.name).join("\n");
        }

        // If column has render function
        if (typeof col.render === "function") {
            const rendered = col.render(row[col.dataIndex], row);
            if (typeof rendered === "string") return rendered;
            if (Array.isArray(rendered)) return type === "html" ? rendered.join("<br>") : rendered.join("\n");
            if (rendered?.props) {
                const children = rendered.props.children;
                if (Array.isArray(children)) return type === "html" ? children.join("<br>") : children.join("\n");
                return children || "";
            }
        }

        const cell = row[col.dataIndex];
        if (Array.isArray(cell)) return type === "html" ? cell.map(s => s?.name ?? JSON.stringify(s)).join("<br>") : cell.map(s => s?.name ?? JSON.stringify(s)).join("\n");
        if (typeof cell === "object" && cell !== null) return JSON.stringify(cell);
        return cell ?? "";
    };

    // Filter exportable columns
    const exportableColumns = (columns) => columns.filter(col => col.dataIndex);

    // ----------------- EXPORT TO EXCEL -----------------
    const exportToExcel = (columns = [], data = [], fileName = "subject_group_lists.xlsx") => {
        const cols = exportableColumns(columns);
        const header = cols.map(getColumnTitle);
        const rows = data.map(row => cols.map(col => getCellValue(col, row)));

        if (!cols.length || !data?.length) {
            console.warn("No columns or data to export!");
            return;
        }

        const worksheetData = [header, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };

    // ----------------- EXPORT TO PDF -----------------
    const exportToPDF = (columns = [], data = [], fileName = "subject_group_lists.pdf") => {
        const cols = exportableColumns(columns);
        const tableColumn = cols.map(getColumnTitle);
        const tableRows = data.map(row => cols.map(col => getCellValue(col, row)));

        const doc = new jsPDF();
        autoTable(doc, { head: [tableColumn], body: tableRows, styles: { fontSize: 10 } });
        doc.save(fileName);
    };

    // ----------------- PRINT TABLE -----------------
    const printTable = (columns = [], data = []) => {
        const cols = exportableColumns(columns);

        const headers = cols.map(col => {
            const titleText = getColumnTitle(col);
            return `<th style="border:1px solid #ddd; padding:8px; background:#4F81BD; color:white;">${titleText}</th>`;
        }).join("");

        const rows = data.map(row => {
            return `<tr>${cols.map(col => `<td style="border:1px solid #ddd; padding:8px; text-align:start;">${getCellValue(col, row, "html")}</td>`).join("")}</tr>`;
        }).join("");

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
        <h2>Subject Group List</h2>
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


    const handleDelete = async (item) => {
        messageModalRef.current.showWarningConfirm(t('Are you sure you want to delete this section ?'), async () => {
            setLoading(true)
            await deleteDataRequest(`${SUBJECTGROUP_URL}/${item?.id}`).then((res) => {
                messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => { }, "", true);
                getListSubjectGroup();
                setLoading(false)
            }).catch((err) => {
                messageModalRef.current.showWarningConfirmsAutoClose(err.message, () => { }, "", true);
                setLoading(false)
            });
        }, "", true);
    };

    const tableSubjectGroupMangement = {
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
                title: <span style={{ fontWeight: 600 }}>Name</span>,
                dataIndex: "name",
                render:(_, record) => <Tooltip style={{cursor:"pointer"}} placement="top" title={record.description}>{record?.name}</Tooltip>,
                key: "name",
                sorter: (a, b) => a.name.localeCompare(b.name), // Proper string sorting
                sortDirections: ["ascend", "descend"], // show sort icons
                showSorterTooltip: false, // removes tooltip, keeps icon
            },
            {
                title: <span style={{ fontWeight: 600 }}>Class (Section)</span>,
                dataIndex: "classSelect",
                key: "classSelect",
                render: (_, record) => {
                    const items = [];
                    record?.Classes?.forEach((cls) => {
                        record?.Sections?.forEach((sec) => {
                            items.push(`${cls.name} (${sec.name})`);
                        });
                    });
                    return (
                        <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
                            {items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ol>
                    );
                },
                sorter: (a, b) => {
                    // flatten all class-section pairs into strings for sorting
                    const aPairs = [];
                    a?.Classes?.forEach(cls => a?.Sections?.forEach(sec => aPairs.push(`${cls.name}(${sec.name})`)));
                    const bPairs = [];
                    b?.Classes?.forEach(cls => b?.Sections?.forEach(sec => bPairs.push(`${cls.name}(${sec.name})`)));

                    return aPairs.join(",").localeCompare(bPairs.join(","));
                },
                sortDirections: ["ascend", "descend"],
                showSorterTooltip: false,
            },
            {
                title: <span style={{ fontWeight: 600 }}>Subject</span>,
                dataIndex: "subject",
                key: "subject",
                render: (_, record) => (
                    <div>
                        {record?.Subjects?.map((s, i) => (
                            <div key={i}>{s.name}</div> // each subject on a new line
                        ))}
                    </div>
                ),
                sorter: (a, b) => {
                    // flatten subjects into a single string for sorting
                    const aSubjects = a?.Subjects?.map(s => s.name).join(" ");
                    const bSubjects = b?.Subjects?.map(s => s.name).join(" ");
                    return aSubjects.localeCompare(bSubjects);
                },
                sortDirections: ["ascend", "descend"],
                showSorterTooltip: false,
            },
            {
                title: "Action",
                key: "action",
                align: "right", // align to end
                render: (_, record) => (
                    <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <FaRegEdit
                            style={{ fontSize: "1.2rem", color: "#1677ff", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                            onClick={() => {
                                setId(record && record?.id)
                            }}
                        />
                        <DeleteOutlined
                            style={{ fontSize: "1.2rem", color: "#e60b29", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                            onClick={() => handleDelete(record)}
                        />

                    </div>
                ),
            },
        ]
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
                            onClick={() => exportToExcel(tableSubjectGroupMangement.columns, data)}
                        >
                            <AiOutlineFileExcel size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => exportToPDF(tableSubjectGroupMangement.columns, data)}
                        >
                            <AiOutlineFilePdf size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => printTable(tableSubjectGroupMangement.columns, data)}
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
                            columns={tableSubjectGroupMangement.columns}
                            x={500}
                        />
                    </div>
                </Spin>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default SubjectGroupList;