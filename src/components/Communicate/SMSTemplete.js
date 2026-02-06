import React, { useRef } from "react";
import { Col, Input, Row, Spin, Table } from "antd";
import { TfiFiles } from "react-icons/tfi";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import MessageConfirmModal from "../Modals/MessageConfirmModal";
import { capitalizedText } from "../../utils/validators";
import AddSMSTempleteModal from "../Modals/AddSMSTempleteModal";
import dayjs from "dayjs";
import { SMSTEMPLETE_URL } from "../../api/URLs";
import { deleteDataRequest } from "../../api/serviceMethods";
import TableFetchData from "../data-table/TableFetchData";

const SMSTemplete = ({ t, show, setShow, getSMSTemplete, id, setId, setLoading, tableParams, setTableParams, setkeyword, data, loading }) => {
    const messageModalRef = useRef('');
    const today = dayjs().format("MM-DD-YYYY");
    const exportToExcel = (data, fileName = "sms_templetes_lists.xlsx") => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName);
    };

    // Extract text from React JSX Title
    const getColumnTitle = (title) => {
        if (typeof title === "string") return title;

        // If JSX like <span>Title</span>
        if (title?.props?.children) {
            return typeof title.props.children === "string"
                ? title.props.children
                : title.props.children[0] || "";
        }

        return String(title);
    };

    // Fix printing/exporting object cell values
    const formatCell = (value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") {
            // If value is like { label: "Text" }
            if (value.label) return value.label;
            if (value.name) return value.name;
            if (value.title) return value.title;

            return JSON.stringify(value);
        }
        return value;
    };

    // =======================================================
    //               PDF EXPORT FUNCTION
    // =======================================================
    const exportToPDF = (columns, data, fileName = "sms_templetes_lists.pdf") => {
        const doc = new jsPDF();

        const tableColumn = columns
            .filter((col) => col.dataIndex)
            .map((col) => getColumnTitle(col.title));

        const tableRows = data.map((row) =>
            columns
                .filter((col) => col.dataIndex)
                .map((col) => formatCell(row[col.dataIndex]))
        );

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
        });

        doc.save(fileName);
    };

    // =======================================================
    //                 PRINT TABLE FUNCTION
    // =======================================================
    const printTable = (columns, data) => {
        const headers = columns
            .filter((col) => col.dataIndex)
            .map(
                (col) =>
                    `<th style="border:1px solid #ddd; padding:8px; background:#4F81BD; color:white;">
                    ${getColumnTitle(col.title)}
                </th>`
            )
            .join("");

        const rows = data
            .map(
                (row) =>
                    `<tr>${columns
                        .filter((col) => col.dataIndex)
                        .map(
                            (col) =>
                                `<td style="border:1px solid #ddd; padding:8px; text-align:start;">
                                ${formatCell(row[col.dataIndex])}
                            </td>`
                        )
                        .join("")}</tr>`
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
              th { background: #4F81BD; color: white; text-align:start; }
            </style>
          </head>
          <body>
            <h2>SMS Template List Date: ${today}</h2>
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
        setShow(true)
        // setData(item)
    };

    const handleDelete = async (item) => {
        messageModalRef.current.showWarningConfirm(t('Are you sure you want to delete this sms templete ?'), async () => {
            setLoading(true)
            await deleteDataRequest(`${SMSTEMPLETE_URL}/${item?.id}`).then((res) => {
                messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => { }, "", true);
                getSMSTemplete();
                setLoading(false)
            }).catch((err) => {
                messageModalRef.current.showWarningConfirmsAutoClose(err.message, () => { }, "", true);
                setLoading(false)
            });
        }, "", true);
    };



    const tableSMSTempleteMangement = {
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
                title: <span style={{ fontWeight: 600 }}>{t("Title")}</span>,
                dataIndex: "title",
                key: "title",
                width: "15%",
                sorter: (a, b) => a.title.localeCompare(b.title), // Proper string sorting
                sortDirections: ["ascend", "descend"], // show sort icons
                showSorterTooltip: false, // removes tooltip, keeps icon
            },
            {
                title: <span style={{ fontWeight: 600 }}>{t("Message")}</span>,
                dataIndex: "message",
                key: "message",
                // render: (text) => {
                //     if (!text) return "";
                //     const truncated = text.length > 100 ? text.slice(0, 100) + "..." : text;
                //     return (
                //         <Tooltip title={text}>
                //             <span>{truncated}</span>
                //         </Tooltip>
                //     );
                // },
                sorter: (a, b) => a.message.localeCompare(b.message),
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
                            onClick={() => {
                                setId(record && record?.id)
                                setShow(true)
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
                            onClick={() => exportToExcel(data)}
                        >
                            <AiOutlineFileExcel size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => exportToPDF(tableSMSTempleteMangement.columns, data)}
                        >
                            <AiOutlineFilePdf size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => printTable(tableSMSTempleteMangement.columns, data)}
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
                            columns={tableSMSTempleteMangement.columns}
                            x={500}
                        />
                    </div>
                </Spin>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
            <AddSMSTempleteModal
                getSMSTemplete={getSMSTemplete} id={id}
                setId={setId} setLoading={setLoading} show={show}
                setShow={setShow} data={data} t={t}
                messageModalRef={messageModalRef}
            />
        </div>
    )
}

export default SMSTemplete;