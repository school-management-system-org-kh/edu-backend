import React, { useRef } from "react";
import { Alert, Col, Input, Row, Spin, Tag } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import TableFetchData from "../../data-table/TableFetchData";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { deleteDataRequest } from "../../../api/serviceMethods";
import { SESSION_URL } from "../../../api/URLs";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";

const SessionList = ({ loading, data, tableParams, setTableParams, getListSession, setId, setLoading, setkeyword }) => {
    const messageModalRef = useRef('');
    const { t } = useTranslation();
    const today = dayjs().format("MM-DD-YYYY");
    const exportToExcel = (data, fileName = "session_lists.xlsx") => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };

    const exportToPDF = (columns, data, fileName = "session_lists.pdf") => {
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
        <h2>Session List Date: ${today}</h2>
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

    const handleDelete = async (item) => {
        messageModalRef.current.showWarningConfirm(t('Are you sure you want to delete this session ?'), async () => {
            setLoading(true)
            await deleteDataRequest(`${SESSION_URL}/${item?.id}`).then((res) => {
                messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => { }, "", true);
                getListSession();
                setLoading(false)
            }).catch((err) => {
                messageModalRef.current.showWarningConfirmsAutoClose(err.message, () => { }, "", true);
                setLoading(false)
            });
        }, "", true);
    };

    const tableSessionMangement = {
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
                title: <span style={{fontWeight:600}}>Session</span>,
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => a.name.localeCompare(b.name), // Proper string sorting
                sortDirections: ["ascend", "descend"], // show sort icons
                showSorterTooltip: false, // removes tooltip, keeps icon
            },
            {
                title: <span style={{fontWeight:600}}>Status</span>,
                render: (text) => (text && text?.status ? <Tag color="#87d068">Active</Tag> : null),
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
    }

    return (
        <div>
            <Alert closeIcon message={<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Note: Changing the session name format may cause issues on some pages or features, so it is recommended not to change the session name format.</span>} type="info" />
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 25,
                    marginTop: 20,
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
                            onClick={() => exportToPDF(tableSessionMangement.columns, data)}
                        >
                            <AiOutlineFilePdf size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => printTable(tableSessionMangement.columns, data)}
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
                            columns={tableSessionMangement.columns}
                            x={500}
                        />
                    </div>
                </Spin>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default SessionList;